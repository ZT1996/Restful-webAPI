var express = require('express');
var router4 = express();
var bodyParser = require('body-parser');
var fs = require('fs');

router4.use(bodyParser.json());
router4.use(bodyParser.urlencoded({extended: true}));


router4.put('/cart/:id',function (req,res) {

    fs.readFile('./fixtures.json','utf8',function (err,data) {
        var id = req.params.id;

        data = JSON.parse(data);

        if(data === ''){
            res.status(400).send('');
            return;
        }

        newCart(data,id,req,res);
    });
});

function newCart(data,id,req,res) {

    var cart = req.body;
    if(typeof cart.name != "string"
        || typeof cart.barcode != "string"
        || typeof cart.unit != "string"
        || typeof cart.price != "number"){
        res.status(401).send('');
        return;
    }
    for(var j = 0; j < cart.length; j++){
        if(!(cart.name && cart.barcode && cart.unit && cart.price)){
            res.status(401).send('');
            return;
        }
    }
    for(var i = 0; i < data.length; i++){
        if(data[i].id.toString() === id){
            var index = i;
            data[i].barcode = cart.barcode;
            data[i].name = cart.name;
            data[i].unit = cart.unit;
            data[i].price = cart.price;
            break;
        }
        else{
            res.status(400).send('');
            return;
        }
    }
    writeFile(data,res,index);
}

function writeFile(data,res,index) {
    fs.writeFile('./fixtures.json',JSON.stringify(data),function (err) {
        if(err){
            res.status(400).send('');
            return;
        }
        res.status(201).json(data[index]);
    })
}

module.exports = router4;