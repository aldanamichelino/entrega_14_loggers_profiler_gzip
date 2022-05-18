const startServer = (args) => {

    const express = require('express');
    const { engine } = require('express-handlebars');
    const passport = require('../middlewares/passport');
    const path = require('path');
    const { Server: HttpServer } = require('http')
    const { Server: SocketServer } = require('socket.io')
    const MongoStore = require('connect-mongo');
    const app = express()
    const httpServer = new HttpServer(app)
    const io = new SocketServer(httpServer)
    
    const MongoMensajesDao = require('../MongoMensajesDao');
    const {Contenedor} = require('../models/containers/Contenedor');
    const apiRoutes = require('../routers/api/api.routes');
    const session = require('express-session');
    const { sqlite, mariaDB } = require('../db/config');
    const knexMDb = require('knex')(mariaDB);
    const compression = require('compression');
    const auth = require('../middlewares/auth');
    const os = require('os');
    const { write } = require('../utils/winston.utils');
    
    const PORT = args.PORT || 8080;

    //Middlewares
    app.use(express.static('public'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(session({
        name: 'some-session',
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_URI,
        }),
        cookie: {
            maxAge: 600000
        }
    }));

    //es necesario setear esto debajo de la session de express
    app.use(passport.initialize());
    app.use(passport.session());

    app.use((req, res, next) => {
        write('info', `La url ingresada es: ${req.protocol + '://' + req.get('host') + req.originalUrl} y el método solicitado es: ${req.method}`);

        next();
    })


    //Template engine
    app.engine('hbs', engine({
        extname: 'hbs',
        defaultLayout: 'index.hbs'
    }));
    app.set('views', './public/views');
    app.set('view engine', 'hbs');

    //Routes
    app.use('/api', apiRoutes);

    app.get('/', (req, res) => {

        const user = req.user;
        if(user) {
            return res.redirect('/productos');
        } else {
            res.sendFile(path.resolve(__dirname, '../public/index.html'));
        } 
    });

    app.get('/rutaDeErrorRegistro', (req, res) => {
        res.render('registration-error');
    });

    app.get('/rutaDeErrorLogin', (req, res) => {
        res.render('login-error');
    });

    app.get('/productos', auth, (req, res) => {

        const user = req.user;
        res.render('productos',  {username: user.email});
    });

    app.get('/logout', auth, async (req, res, next) => {
        req.logOut();
        req.session.destroy(err => {
            res.clearCookie('some-session');
            if (err) {
                console.log(err);
            }
            else {
                console.log('Usuario deslogueado');
                res.redirect('/');
            }
        });
    });

    app.get('/info', (req, res) => {
        // const renderInfo = {
        //     argumentosEntrada: process.argv.slice(2),
        //     nombrePlataforma: process.platform,
        //     versionNode: process.version,
        //     memoriaTotalReservada: process.memoryUsage().rss,
        //     pathEjecucion: process.execPath,
        //     idProceso: process.pid,
        //     carpetaProyecto: process.cwd(),
        //     numeroProcesadoresDisponibles: os.cpus().length
        // };

        // console.log(renderInfo);

        res.render('info', {process: process, rss: process.memoryUsage().rss, argv: process.argv.slice(2), processors: os.cpus().length});
    });

    app.get('/infozip', compression(), (req, res) => {
        res.render('info', {process: process, rss: process.memoryUsage().rss, argv: process.argv.slice(2), processors: os.cpus().length});
    });


    app.all('*', (req, res) => {
        write('warn', `Esta ruta no existe. La url ingresada es: ${req.protocol + '://' + req.get('host') + req.originalUrl} y el método solicitado es: ${req.method}`);
        res.json({status: false});
    });

    //Port connection
    const connectedServer = httpServer.listen(PORT, () => {
        console.log(`Server is up and running on port ${PORT}`)
    })

    connectedServer.on('error', (error) => {
        console.log(error.message)
    })

    //Websocket connection
    io.on('connection', async (socket) => {
        try{
            console.log('Nuevo cliente conectado');

            const contenedorProductos = new Contenedor(knexMDb, 'productos');
            const contenedorMensajes = new MongoMensajesDao;

            //Products
            const products = await contenedorProductos.getAll();
            console.log(products);
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


        } catch(error){
            write('error', `Ocurrio un error: ${error.message} en la api de productos o mensajería.`)
        }
    });

}

module.exports = {
    startServer
}


