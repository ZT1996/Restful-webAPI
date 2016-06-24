var express = require('express');
var router3 = express();
var fs = require('fs');

router3.get('/cart/:id',function (req,res) {

    fs.readFile('./fixtures.json','utf-8',function (err,data) {
        
        data = JSON.parse(data);
       if(err){
           res.status(404);
           return;
       }
       if(data == ''){
           res.status(404);
           return;
       }

       for(var i = 0; i < data.length; i++){

           if(data[i].id.toString() === req.params.id){

               res.status(200).json(data[i]);
               break;
           }
       }

       
   })
});

module.exports = router3;