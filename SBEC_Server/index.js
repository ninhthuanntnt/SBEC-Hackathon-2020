var express = require('express');
var socket = require('socket.io');
var connectDb = require('./config/connectDb');
var parseBody = require('./config/parseBody');

//Setup
var app = express();
var server = app.listen(1300, 'localhost', function () {
    console.log('Listening on port 1300');
});
var io = socket(server);

connectDb();

parseBody(app);


//Setup static file
app.use(express.static('public'));
app.set('view engine','ejs');
app.set('views', './views');



io.on('connection', function (socket) {

    socket.on('client-sent-text', data => {
        getRecommendProduct(data);
    })
    console.log('Made socket connection', socket.id);

    socket.on('client-request-call-to-server', function() {
        io.sockets.emit('server-sent-request-to-admin');
    })

    socket.on('admin-accept-call-request-to-server', function(data) {
        console.log(data);
        io.sockets.emit('server-sent-accept-call-from-admin', data);
    })

    socket.on('client-admin-calling-request', function() {
        io.sockets.emit('client-admin-calling-response');
    })
});

//filter
function getRecommendProduct(data) {
    filterKeyWord(data);
    let listProduct = [];
    //fake data
    for (let i = 0; i < 2; i++) {
        let product = {
            id: 0
        }
        product.id = (i+1);
        product.name = 'product ' + (i+1);
        product.price = (i+1)*1000;
        product.imagePath = 'images/products/product.jpg';
        listProduct.push(product);
    }
    io.sockets.emit('recommend-product', listProduct);
}

function filterKeyWord(data) {

}

app.get('/admin',(req, res)=>{
    res.render('pages/admin_product');
});
app.get('/',(req, res)=>{
    res.render('pages/index');
});
app.get('/admin/call-channel', (req,res)=>{
    res.render('pages/call_channel');
});