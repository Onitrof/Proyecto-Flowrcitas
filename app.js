const express = require('express');
const app = express();
const session = require('express-session');
const path = require('path');
const methodOverride = require('method-override'); // este metodo sirve para las peticiones put y delete que seran utilizadas en la siguiente fase del proyecto

//El método override es una técnica utilizada en las aplicaciones web basadas en HTTP para permitir que los formularios HTML realicen solicitudes HTTP con métodos  distintos de GET y POST, que son los únicos métodos soportados por los formularios HTML por defecto. Este método es comúnmente habilitado por la biblioteca method-override

//Routes Imports

const landingRoutes = require('./src/Routes/landing.routes');
const authRoutes = require('./src/Routes/auth.routes');
const homeRoutes = require('./src/Routes/home.routes');



// Configuración de express-session
app.use(session({
    secret: 'tu_secreto_aqui', // Cambia por una cadena aleatoria para firmar la cookie de sesión
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Ajusta según tus necesidades de seguridad
}));

app.use("/public", express.static(__dirname + "/public"));
//app.use(express.static('public'));

const PORT = 3003;

// Configurar middleware

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

//configurar vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));


// usar las rutas

app.use('/', landingRoutes);
app.use('/landing', landingRoutes);
app.use('/auth', authRoutes);
app.use('/home', homeRoutes);



app.listen(PORT, () => console.log(`Servidor corriendo en 🚀 http://localhost:${PORT}`));