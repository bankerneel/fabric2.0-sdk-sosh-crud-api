const api = require('./app.route')
const express = require('express');
const http =  require('http')
const app = express();
const bodyParser = require('body-parser')
const logger = require('morgan');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(logger('dev'));

app.use('/api/v1',api);

const port = process.env.PORT || 3000;
app.set('port', port)

const server = http.createServer(app)
server.listen(port, () =>{
    console.log(`connected on ${port}`)
})
