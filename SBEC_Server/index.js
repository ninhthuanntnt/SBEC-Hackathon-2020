var express = require('express');
var socket = require('socket.io');
//Setup
var app = express();
var server = app.listen(1300, function () {
    console.log('Listening on port 1300');
});

//Setup static file
app.use(express.static('public'));
app.set('view engine','ejs');
app.set('views', './views');
var io = socket(server);
io.on('connection', function (socket) {

    socket.on('client-sent-text', data => {
        getRecommendProduct(data);
    })
    console.log('Made socket connection', socket.id);
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
    res.render('pages/admin');
});
app.get('/',(req, res)=>{
    res.render('pages/index');
});