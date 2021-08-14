require('dotenv').config()
const express = require('express')
const bcrypt = require('bcrypt')
const { Sequelize } = require('sequelize')
const getUserModel = require('./models/user')

const sequelize = new Sequelize(process.env.DB_URI)
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

const User = getUserModel(sequelize)
User.sync({ alter: true })

const app = express()

app.set('view-engine', 'ejs')
app.use(express.urlencoded({extended: false}))


app.get('/', (req,res) => {
    res.render('index.ejs', {name: 'Khalid'})
})

app.get('/login', (req,res) => {
    res.render('login.ejs')
})

app.post('/login', (req,res) => {

})

app.get('/register', (req,res) => {
    res.render('register.ejs')
})

app.post('/register', async (req,res) => {
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 5)
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        console.log(`Created user: ${JSON.stringify(user)}`);
        res.redirect('/login')
    } catch (err) {
        console.log(err);
        res.redirect('/register')
    }
})

const port = process.env.PORT || 3141
app.listen(port, () => console.log(`Serving in port ${port}`))
