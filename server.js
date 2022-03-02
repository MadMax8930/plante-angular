const express = require('express');

const path = require('path');
const app = express();

var port = process.env.PORT || 80

app.use(express.static(dirname + '/dist/live-plante'));

app.get('/*', function(req,res) {
res.sendFile(path.join(dirname+
'/dist/live-plante/index.html'));});

app.listen(port);
