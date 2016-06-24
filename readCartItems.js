var express = require('express');
var router = express.Router();

var fs = require("fs");

router.get('/cart',function (req,res) {
    
    fs.readFile('./fixtures.json','utf8',function (err,data) {
        if(err){
            res.status(404);
            return;
        }
        if(data == null) {
            res.status(404);
            return;
        }
        data = JSON.parse(data);
        res.json(data);

    });
});

module.exports = router;
