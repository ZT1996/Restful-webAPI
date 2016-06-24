var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var router1 = express();

router4.use(bodyParser.json());
router4.use(bodyParser.urlencoded({extended: true}));

router1.post('/cart',function (req,res) {
    fs.readFile('./fixtures.json','utf-8',function (err,data) {
        if(err){
            res.status(404).send('');
            return;
        }
        addNewCart(res,req,data);
    });
});

function addNewCart(res,req,data) {
    data = JSON.parse(data);
    var item = req.body;
    var max = findMaxId();
    var newitem = {
        id:max + 1,
        barcode:item.barcode,
        name:item.name,
        unit:item.unit,
        price:item.price
    };
    data.push(newitem);
    writeFile(data,item,res);
    writeNewId(newitem,res);

}

function findMaxId() {
    fs.readFile('./maxId.json','utf-8',function (err,data) {
        data = JSON.parse(data);
        if(err){
            res.status(404).send('');
            return;
        }
        console.log(data);
        var max = data.maxId;
        console.log(max);
        return max;
    });
}

function writeFile(data,item,res) {
    fs.writeFile('./fixtures.json',JSON.stringify(data),function (err) {
        if(err){
            res.status(404).send('');
            return;
        }
        res.status(200).json(item);
    });
}

function writeNewId(newitem,res) {
    var maxid = {
      "maxId":newitem.id
    };
    fs.writeFile('./maxId.json',JSON.stringify(maxid),function (err) {
        if(err){
            res.status(404).send('');
        }
    });
}
module.exports = router1;
