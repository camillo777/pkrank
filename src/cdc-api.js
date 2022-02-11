const axios = require('axios');

class CdcApi {
    constructor() {
        this.endpoint = 'https://crypto.com/nft-api/graphql'
        this.config = {
            //headers: { Authorization: `Bearer ${token}` }
        };
    }

    

    async queryGetCollection( collectionID ) {
        console.log('---> queryGetCollection');
        const getCollection = {
            "operationName": "GetCollection",
            "variables": {
                "collectionId": `${ collectionID }`
            },
            "query": "query GetCollection($collectionId: ID!) {\n  public {\n    collection(id: $collectionId) {\n      id\n      name\n      description\n      categories\n      banner {\n        url\n        __typename\n      }\n      logo {\n        url\n        __typename\n      }\n      creator {\n        displayName\n        __typename\n      }\n      aggregatedAttributes {\n        label: traitType\n        options: attributes {\n          value: id\n          label: value\n          total\n          __typename\n        }\n        __typename\n      }\n      metrics {\n        items\n        minAuctionListingPriceDecimal\n        minSaleListingPriceDecimal\n        owners\n        totalSalesDecimal\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}\n"
        }
        var data = await this.query( getCollection );
        return data.data.public.collection;
    }

    async queryGetAssetByID( id ) {
        const getAssetByID = {
            "operationName": "GetAssetById",
            "variables": {
                "id": `${ id }`, //"9784a22a5ae0772e8672b144a237aa72",
                "cacheId": `getAssetById-${ id }` //"getAssetById-9784a22a5ae0772e8672b144a237aa72"
            },
            "query": "fragment UserData on User {\n  uuid\n  id\n  username\n  displayName\n  isCreator\n  avatar {\n    url\n    __typename\n  }\n  __typename\n}\n\nquery GetAssetById($id: ID!, $cacheId: ID) {\n  public(cacheId: $cacheId) {\n    asset(id: $id) {\n      id\n      name\n      collectiblePerPack\n      maxItemsPerCheckout\n      copies\n      copiesInCirculation\n      description\n      categories {\n        name\n        __typename\n      }\n      creator {\n        ...UserData\n        __typename\n      }\n      main {\n        url\n        __typename\n      }\n      cover {\n        url\n        __typename\n      }\n      royaltiesRateDecimal\n      primaryListingsCount\n      secondaryListingsCount\n      primarySalesCount\n      isAssetWithdrawableOnChain\n      drop {\n        id\n        startAt\n        endAt\n        __typename\n      }\n      defaultPrimaryListing {\n        id\n        editionId\n        priceDecimal\n        mode\n        auctionHasBids\n        primary\n        __typename\n      }\n      kind\n      pack {\n        id\n        __typename\n      }\n      likes\n      views\n      auctionMaxEndDate\n      remark\n      isCurated\n      collection {\n        logo {\n          url\n          __typename\n        }\n        id\n        name\n        __typename\n      }\n      denomId\n      defaultAuctionListing {\n        editionId\n        priceDecimal\n        auctionMinPriceDecimal\n        auctionCloseAt\n        mode\n        auctionHasBids\n        __typename\n      }\n      defaultSaleListing {\n        editionId\n        priceDecimal\n        mode\n        __typename\n      }\n      defaultSecondaryAuctionListing {\n        editionId\n        priceDecimal\n        auctionMinPriceDecimal\n        auctionCloseAt\n        mode\n        auctionHasBids\n        __typename\n      }\n      defaultSecondarySaleListing {\n        editionId\n        priceDecimal\n        mode\n        __typename\n      }\n      isLiked\n      __typename\n    }\n    __typename\n  }\n}\n"
        }

        var data = await this.query( getAssetByID );
        console.log( data.data.public );
        return data.data.public;
    }

    async queryGetAssetAttributes( id ) {
        const getAssetAttributes = {
            "operationName": "getAssetAttributes",
            "variables": {
                "id": `${ id }`
            },
            "query": "query getAssetAttributes($id: ID!) {\n  assetAttributes(id: $id) {\n    traitType\n    value\n    percentage\n    __typename\n  }\n}\n"
        }

        var data = await this.query( getAssetAttributes );
        console.log( data.data.assetAttributes );
        return data.data.assetAttributes;
    }

    async querySearchAsset( tokenID, collectionID ) {
        console.log('querySearchAsset');
        const getAssets = {
            "operationName": "GetAssets",
            "variables": {
                "collectionId": `${ collectionID }`, //"faa3d8da88f9ee2f25267e895db71471",
                "first": 6,
                "skip": 0,
                "cacheId": "getAssetsQuery-88faf3df14bf1367a4d4082ff20bf4c2b4562838",
                "where": {
                    "assetName": `${ tokenID }`,
                    "description": `${ tokenID }`,
                    "minPrice": null,
                    "maxPrice": null,
                    "buyNow": false,
                    "auction": false,
                    "attributes": []
                },
                "sort": [
                    {
                        "order": "DESC",
                        "field": "createdAt"
                    }
                ]
            },
            "query": "fragment UserData on User {\n  uuid\n  id\n  username\n  displayName\n  isCreator\n  avatar {\n    url\n    __typename\n  }\n  __typename\n}\n\nquery GetAssets($audience: Audience, $brandId: ID, $categories: [ID!], $collectionId: ID, $creatorId: ID, $ownerId: ID, $first: Int!, $skip: Int!, $cacheId: ID, $hasSecondaryListing: Boolean, $where: AssetsSearch, $sort: [SingleFieldSort!], $isCurated: Boolean, $createdPublicView: Boolean) {\n  public(cacheId: $cacheId) {\n    assets(\n      audience: $audience\n      brandId: $brandId\n      categories: $categories\n      collectionId: $collectionId\n      creatorId: $creatorId\n      ownerId: $ownerId\n      first: $first\n      skip: $skip\n      hasSecondaryListing: $hasSecondaryListing\n      where: $where\n      sort: $sort\n      isCurated: $isCurated\n      createdPublicView: $createdPublicView\n    ) {\n      id\n      name\n      copies\n      copiesInCirculation\n      creator {\n        ...UserData\n        __typename\n      }\n      main {\n        url\n        __typename\n      }\n      cover {\n        url\n        __typename\n      }\n      royaltiesRateDecimal\n      primaryListingsCount\n      secondaryListingsCount\n      primarySalesCount\n      totalSalesDecimal\n      defaultListing {\n        editionId\n        priceDecimal\n        mode\n        auctionHasBids\n        __typename\n      }\n      defaultAuctionListing {\n        editionId\n        priceDecimal\n        auctionMinPriceDecimal\n        auctionCloseAt\n        mode\n        auctionHasBids\n        __typename\n      }\n      defaultSaleListing {\n        editionId\n        priceDecimal\n        mode\n        __typename\n      }\n      defaultPrimaryListing {\n        editionId\n        priceDecimal\n        mode\n        auctionHasBids\n        primary\n        __typename\n      }\n      defaultSecondaryListing {\n        editionId\n        priceDecimal\n        mode\n        auctionHasBids\n        __typename\n      }\n      defaultSecondaryAuctionListing {\n        editionId\n        priceDecimal\n        auctionMinPriceDecimal\n        auctionCloseAt\n        mode\n        auctionHasBids\n        __typename\n      }\n      defaultSecondarySaleListing {\n        editionId\n        priceDecimal\n        mode\n        __typename\n      }\n      likes\n      views\n      isCurated\n      defaultEditionId\n      isLiked\n      __typename\n    }\n    __typename\n  }\n}\n"
        }

        var data = await this.query( getAssets );
        console.log( data.data.public );
        return data.data.public;
    }

    async queryGetAssetTotal( tokenID, collectionID ) {
        const getAssetsTotal = {
            "operationName": "GetAssetsTotal",
            "variables": {
                "where": {
                    "assetName": `${ tokenID }`,
                    "description": `${ tokenID }`,
                    "minPrice": null,
                    "maxPrice": null,
                    "buyNow": false,
                    "auction": false,
                    "attributes": []
                },
                "sort": [
                    {
                        "order": "DESC",
                        "field": "createdAt"
                    }
                ],
                "collectionId": `${ collectionID }` //"faa3d8da88f9ee2f25267e895db71471"
            },
            "query": "query GetAssetsTotal($audience: Audience, $brandId: ID, $categories: [ID!], $collectionId: ID, $creatorId: ID, $ownerId: ID, $cacheId: ID, $hasSecondaryListing: Boolean, $where: AssetsSearch, $sort: [SingleFieldSort!], $isCurated: Boolean, $createdPublicView: Boolean) {\n  public(cacheId: $cacheId) {\n    assetsTotal(\n      audience: $audience\n      brandId: $brandId\n      categories: $categories\n      collectionId: $collectionId\n      creatorId: $creatorId\n      ownerId: $ownerId\n      hasSecondaryListing: $hasSecondaryListing\n      where: $where\n      sort: $sort\n      isCurated: $isCurated\n      createdPublicView: $createdPublicView\n    )\n    __typename\n  }\n}\n"
          }

        var data = await this.query( getAssetsTotal );
        console.log( data.data.public );
        return data.data.public;
    }

    async query( body ) {
        console.log('---> query');

        try {
            var response = await axios.post( this.endpoint, body, this.config)
            //console.log( response );
            //console.log( response.data );
            return response.data;
        }
        catch( error ) {
          console.log( error );
        };
  
    }

}

module.exports = CdcApi