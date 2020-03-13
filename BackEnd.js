//  take input like:
//  http://localhost:5000/get?x=2&y=10&d=5&r=10

//  and to show api
//  http://localhost:5000/show

const express = require("express");
const app = express();

app.get("/get", function(req, res) {
  let x = req.query.x; // time
  let y = req.query.y; // height
  let d = req.query.d; // distance
  let rate = req.query.r; // bouncing rate

  var arr1 = new Array();
  var obj;
  var count = 0;
  while (y >= 1) {
    y = Math.floor(y - (y * rate) / 100);
    x = Number(x) + Number(d);

    var arr2 = new Array(x, y);
    arr1.push(arr2);
    count++;
    obj = { "Number of bounces": count, "Array of coordinates": arr1 };
  }

  var fs = require("fs");
  fs.writeFile("myFile.txt", JSON.stringify(obj), function(err) {
    if (err) throw err;
    console.log("saved");
  });
  res.send(obj);
  res.end();
});

app.get("/show", function(req, res) {
  var fs = require("fs");
  fs.readFile("myFile.txt", function(err, data) {
    res.write(data);
    res.end();
  });
});

app.listen(5000);
