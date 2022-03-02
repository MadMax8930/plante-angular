const express = require('express');

const path = require('path');
const app = express();

app.use(express.static(dirname + '/dist/live-plante'));

app.get('/*', function(req,res) {
res.sendFile(path.join(dirname+
'/dist/live-plante/index.html'));});

app.listen(process.env.PORT || 8080);
