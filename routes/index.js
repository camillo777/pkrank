require('dotenv').config()

var express = require('express');
var router = express.Router();

//import neatCsv from 'neat-csv';
//import fs from 'fs'
//import path from 'path'

var neatCsv = require('neat-csv');
var fs = require('fs');
var path = require('path');

const csv = './psychokitties.csv'
var items

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

function get(req,res,next) {
  res.render('index', { 
    title: 'PK RANK',
    baseUrl: process.env.BASE_URL 
  });
}
function post(req,res) {
  console.log(req.body);

  var id = req.body.tokenID;

  console.log( id )
	const item = items.find( el => {
		//console.log( el )
		return ( el.ID == id )
	})
	console.log( item );

  res.render('index', { 
    title: 'PK RANK', 
    tokenID: `${ item.ID }`, 
    rank: `${ item.Rank }`,
    score: `${ item.Score }`,
    baseUrl: process.env.BASE_URL
  });
} 

module.exports = router;
