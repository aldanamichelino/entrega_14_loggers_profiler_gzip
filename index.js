const express = require('express');
const { engine } = require('express-handlebars');
const passport = require('./middlewares/passport');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');
const MongoStore = require('connect-mongo');

const MongoMensajesDao = require('./MongoMensajesDao');
const {Contenedor} = require('./models/containers/Contenedor');
const { sqlite, mariaDB } = require('./db/config');
// const knexSqlite = require('knex')(sqlite);
const knexMDb = require('knex')(mariaDB);

const PORT = process.env.PORT || 8080;
const app = express();
const httpServer = http.createServer(app);
const io = socketIo(httpServer);
const apisRoutes = require('./routers/app.routers');
const session = require('express-session');
require('dotenv').config();


//Middlewares
app.use(express.static(path.resolve(__dirname, './public')));
app.use(express.static(path.resolve(__dirname, './views')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    name: 'some-session',
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: `mongodb+srv://amichelino:${process.env.DATABASE_PASSWORD}@ecommerce.jtfko.mongodb.net/ecommerce?retryWrites=true&w=majority`,
    }),
    // rolling: true,
    cookie: {
        maxAge: 600000
    }
}));

//es necesario setear esto debajo de la session de express
app.use(passport.initialize());
app.use(passport.session());


//Template engine
app.engine('hbs', engine({
    extname: 'hbs',
    defaultLayout: 'index.hbs'
}));
app.set('views', './views');
app.set('view engine', 'hbs');

app.use(apisRoutes);


//Port connection
httpServer.listen(PORT, () => {
    console.log(`Server is up & running on port ${PORT}`);
});

//Sockets events
io.on('connection',  async (socket) => {
    console.log('Nuevo cliente conectado');

    const contenedorProductos = new Contenedor(knexMDb, 'productos');
    const contenedorMensajes = new MongoMensajesDao;


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
