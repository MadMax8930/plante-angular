const express = require('express');

const path = require('path');
const app = express();

var port = process.env.PORT || 80

app.use(express.static(__dirname + '/dist/plantes'));

app.get('/*', function(req,res) {
res.sendFile(path.join(__dirname + '/dist/plantes/index.html'));});

app.listen(port);
