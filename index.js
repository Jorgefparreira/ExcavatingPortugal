const express = require("express");
const path = require("path");
const data = require("./public/js/data.json");

const app = express();
const port = process.env.PORT || "8000";

app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, "public")));

app.get('/', function (req, res) {
  res.render('../src/views/pages/index', { data })
})

app.get('/project', function (req, res) {
  res.render('../src/views/pages/index', { title: 'Hey', message: 'Project!' })
})

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});