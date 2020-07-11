const express = require("express");
const path = require("path");
const app = express(); 
const port = process.env.PORT || "8000";
const environment = process.env.NODE_ENV || 'development';
let mongoUrl = '';
let mapsCredential = '';
if(environment === "development"){
  mongoUrl = require("./config.js").mongoUrl;
  mapsCredential = require('./config.js').mapsCredential;
} else {
  mongoUrl = process.env.mongoUrl;
  mapsCredential = process.env.mapsCredential;
}
const MongoClient = require('mongodb').MongoClient;

app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, "public")));

app.get('/', function (req, res) {
  MongoClient.connect(mongoUrl,{ useUnifiedTopology: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("excavating_portugal");
    dbo.collection("projects").find({}).sort( { id: 1 } ).toArray(function(err, data) {
      if (err) throw err;
      res.render('../public/views/pages/index', { data })
      db.close();
    });
  });    
  
})

app.get('/:id', function(req, res){
  MongoClient.connect(mongoUrl,{ useUnifiedTopology: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("excavating_portugal");
    dbo.collection("projects").find({"anchor":req.params.id }).toArray(function(err, result) {
      if (err) throw err;
      if(result[0].text){
        const data = result[0]
        res.render('../public/views/pages/dig_detail', { data, req, mapsCredential })
        db.close();
      } else {
        res.render('../public/views/pages/coming_soon', {})
        db.close();
      }
    });
  });  
})

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});