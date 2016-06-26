var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var router1 = express();

router1.use(bodyParser.json());
router1.use(bodyParser.urlencoded({extended: true}));

router1.post('/cart',function (req,res) {
   fs.readFile('./fixtures.json','utf8',function (err,data) {
       if(err){
            res.status(400).send('');
           return;
       }
     var items = JSON.parse(data);
    getBodyItem(items,res,req);
   });
});

function getBodyItem(items,res,req) {
    var item = req.body;
    if(typeof item.name != "string"
        || typeof item.barcode != "string"
        || typeof item.unit != "string"
        || typeof item.price != "number"){
        res.status(401).send('');
        return;
     }
    insertItem(item,items,res);
}

function insertItem(item,items,res) {
    fs.readFile('./maxId.json','utf8',function (err,data) {
        if(err){
            res.status(404).send('');
            return;
        }
        var id = JSON.parse(data);
        var maxId = ++(id.maxId);
        var cart = {
            id:maxId,
            barcode:item.barcode,
            name:item.name,
            unit:item.unit,
            price:item.price
        };
        items.push(cart);
        console.log(items);
        updateMaxId(maxId,res);
        updateItems(items,cart,res);
    });
}

function updateMaxId(maxId,res) {
    fs.writeFile('./maxId.json',JSON.stringify({maxId:maxId}),function (err) {
        if(err){
            res.status(404).send('');
            return;
        }
    });
}

function updateItems(items,cart,res) {
    fs.writeFile('./fixtures.json',JSON.stringify(items),function (err) {
        if(err){
            res.status(404).send('');
            return;
        }
        res.status(200).json(cart);
    });
}

module.exports = router1;
