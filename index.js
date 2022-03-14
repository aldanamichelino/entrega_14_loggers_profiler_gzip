const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');

const { Contenedor } = require('./Contenedor');
const { sqlite, mariaDB } = require('./db/config');
const knexSqlite = require('knex')(sqlite);
const knexMDb = require('knex')(mariaDB);

const PORT = process.env.PORT || 8080;
const app = express();
const httpServer = http.createServer(app);
const io = socketIo(httpServer);


//Middlewares
app.use(express.static(path.resolve(__dirname, './public')));
app.use(express.static(path.resolve(__dirname, './views')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Template engine
app.engine('hbs', engine({
    extname: 'hbs',
    defaultLayout: 'index.hbs'
}));

app.set('views', './views');
app.set('view engine', 'hbs');


//Port connection
httpServer.listen(PORT, () => {
    console.log(`Server is up & running on port ${PORT}`);
});

//Sockets events
io.on('connection',  async (socket) => {
    console.log('Nuevo cliente conectado');

    const contenedorProductos = new Contenedor(knexMDb, 'productos');
    const contenedorMensajes = new Contenedor(knexSqlite, 'mensajes');
    

    //Products
    const products = await contenedorProductos.getAll();
    socket.emit('products', products);

    socket.on('new-product', async (newProduct) => {
        await contenedorProductos.save(newProduct);
        const productos = await contenedorProductos.getAll();
        io.emit('products', productos);
    });


    //Messages
    const messages = await contenedorMensajes.getAll();
    socket.emit('messages', messages);

    socket.on('new-message', async (newMessage) => {
        await contenedorMensajes.save(newMessage);
        
        io.emit('messages-to-everyone', newMessage);
    });

});
