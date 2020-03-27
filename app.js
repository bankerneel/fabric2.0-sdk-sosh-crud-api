const wallet = require('./routes/v1/routes')
const express = require('express');
const http =  require('http')
const app = express();
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(logger('dev'));

app.use('/api/v1',wallet);

const port = process.env.PORT || 3000;
app.set('port', port)

const server = http.createServer(app)
server.listen(port, () =>{
    console.log(`connected on ${port}`)
})
