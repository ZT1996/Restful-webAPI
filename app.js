var express = require('express');
var fs = require('fs');

var app = express();

app.use('/',require('./readCartItems.js'));
app.use('/',require('./addCartItem.js'));
app.use('/',require('./deleteCartItem.js'));
app.use('/',require('./cartItemDetails.js'));
app.use('/',require('./newCartItem.js'));


fs.open('fixtures.json','w+',function (err) {
  if(err){
    throw err;
    return;
  }
  fs.readFile('./fixtures.json','utf8',function (data,err) {
    if(data === null){
      fs.writeFile('./fixtures.json','[]',function (err) {
        if(err) throw err;
      })
    }
    if(err) throw err;
  })
});

var server = app.listen(4000, function () {
  console.log(server.address().port);
});

