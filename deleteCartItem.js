var express = require('express');
var router2 = express();
var fs = require('fs');

router2.delete('/cart/:id',function (req,res) {

    fs.readFile('./fixtures.json', 'utf-8', function (err, data) {

        data = JSON.parse(data);
        if (err) {
            res.status(404);
            return;
        }
        if (data == null) {
            res.status(404);
            return;
        }
        newCartItem(data,req,res);

    });
});

function newCartItem(data,req,res) {
    for (var i = 0; i < data.length; i++) {
        if (data[i].id.toString() === req.params.id) {
            data.splice(i, 1);
            writeFile(data,res);
            break;
        }
        else{
            res.status(404).send('');
            return;
        }
    }
}
function writeFile(data,res) {
    fs.writeFile('./fixtures.json', JSON.stringify(data), function (err) {
        if (err) {
            res.status(404);
            return;
        }
        if (data == null) {
            res.status(404);
            return;
        }
        res.status(204).send('');
    });
}
module.exports = router2;
