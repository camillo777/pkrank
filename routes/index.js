require('dotenv').config()

var express = require('express');
var router = express.Router();

//import neatCsv from 'neat-csv';
//import fs from 'fs'
//import path from 'path'

var neatCsv = require('neat-csv');
var fs = require('fs');
var path = require('path');

const CdcApi = require('../src/cdc-api');
var cdcApi = new CdcApi();

const csv = './psychokitties.csv'
var items

const title = 'Psycho Kitties Info'

main();

async function main() {
  var data = fs.readFileSync(csv)
	items = await neatCsv( data )
  console.log( `Read ${ items.length } items` );
}

console.log( 'process.env.BASE_URL', process.env.BASE_URL );

/* GET home page. */
router.get( `/${ process.env.BASE_URL }`, get);
//router.get( `/pkrank`, get);
router.post( `/${ process.env.BASE_URL }`, post)
//router.post( `/pkrank`, post);

async function get(req,res,next) {
  var collectionData = await getCollectionData();

  res.setHeader('Surrogate-Control', 'no-store'); 
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate'); 
  res.setHeader('Pragma', 'no-cache'); 
  res.setHeader('Expires', '0');
  
  res.render('index', { 
    title: title,
    baseUrl: process.env.BASE_URL,
    metrics: collectionData.metrics,
    totalSales: numToString( collectionData.metrics.totalSalesDecimal )
  });
}
async function post(req,res) {
  console.log(req.body);

  var tokenID = req.body.tokenID;

  console.log( tokenID )
	const item = items.find( el => {
		//console.log( el )
		return ( el.ID == tokenID )
	})
	console.log( item );

  var collectionData = await getCollectionData();
  var searchData = await cdcApi.querySearchAsset( tokenID );
  var id = searchData.assets[0].id;
  var assetData = await cdcApi.queryGetAssetByID( id );
  var assetAttributes = await cdcApi.queryGetAssetAttributes( id );

  res.setHeader('Surrogate-Control', 'no-store'); 
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate'); 
  res.setHeader('Pragma', 'no-cache'); 
  res.setHeader('Expires', '0');

  res.render('index', { 
    title: title, 
    tokenID: `${ item.ID }`, 
    rank: `${ item.Rank }`,
    score: `${ item.Score }`,
    baseUrl: process.env.BASE_URL,
    metrics: collectionData.metrics,
    assetData: assetData.asset,
    assetAttributes: assetAttributes,
    totalSales: numToString( collectionData.metrics.totalSalesDecimal ),
    tokenID: tokenID
  });
} 

async function getCollectionData() {
  console.log('---> getCollectionData')

  var data = await cdcApi.queryGetCollection();
  console.log( data );
  return data;
}

function numToString (value) {
  value = Math.floor( value );
  var suffixes = ["", "K", "M", "B","T"];
  var suffixNum = Math.floor((""+value).length/3);
  var shortValue = parseFloat((suffixNum != 0 ? (value / Math.pow(1000,suffixNum)) : value).toPrecision(2));
  if (shortValue % 1 != 0) {
      shortValue = shortValue.toFixed(1);
  }
  return shortValue+suffixes[suffixNum];
}

module.exports = router;
