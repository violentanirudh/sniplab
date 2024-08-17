const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const flash = require('connect-flash')
const mongoose = require('mongoose')

// MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/snippets').then(() => console.log('Connected')).catch(error => console.log(error))

// App
const app = express()


// Routers
const ViewsRouter = require('./routes/views')
const AuthRouter = require('./routes/auth')
const ProtectedRouter = require('./routes/protected')

// Configuration
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// Custom Middlewares

const AuthMiddleware = require('./middlewares/auth')


// Middlewares
app.use(session({
    secret: 'somethingsecret',
    resave: false,
    saveUninitialized: true
}))
app.use('/public', express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())
app.use(flash())
app.use(AuthMiddleware.checkAuthCookie())


// Routes
app.use('/auth', AuthRouter)
app.use('/', ViewsRouter)
app.use('/', AuthMiddleware.checkAuthorization(['user']), ProtectedRouter)

// Server
app.listen(3000, () => {
    console.log('Listening On : http://127.0.0.1:3000')
})