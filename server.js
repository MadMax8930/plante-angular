const express = require('express');

const path = require('path');
const app = express();

var port = process.env.PORT || 8080

app.use(express.static(dirname + '/dist/plantes'));

app.get('/*', function(req,res) {
res.sendFile(path.join(dirname+
'/dist/plantes/index.html'));});

app.listen(port);
