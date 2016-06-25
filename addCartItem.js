var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var router1 = express();

router1.use(bodyParser.json());
router1.use(bodyParser.urlencoded({extended: true}));

router1.post('/cart',function (req,res) {
    fs.readFile('fixtures.json','utf-8',function (err,data) {
        if(err){
            res.status(404).send('');
            return;
        }
        data = JSON.parse(data);
        addNewCart(res,req,data);
    });
});

function addNewCart(res,req,data) {
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
    writeFile(data,newitem,res);
    writeNewId(newitem,res);

}

  function findMaxId() {
     fs.readFile('maxId.json','utf-8',function(err,data) {
         if(err){
             res.status(404).send('');
             return;
         }
         var max = JSON.parse(data);
         console.log(max.maxId);
         return max.maxId;
     });
 }

function writeFile(data,newitem,res) {
    fs.writeFile('fixtures.json',JSON.stringify(data),function (err) {
        if(err){
            res.status(404).send('');
            return;
        }
        res.status(200).json(newitem);
    });
}

function writeNewId(newitem,res) {
    var maxid = {
      "maxId":newitem.id
    };
    fs.writeFile('maxId.json',JSON.stringify(maxid),function (err) {
        if(err){
            res.status(404).send('');
        }
    });
}
module.exports = router1;
