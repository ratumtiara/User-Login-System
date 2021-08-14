require('dotenv').config()
const express = require('express')
const bcrypt = require('bcrypt')
const db = require('./models/index')
const getUserModel = require('./models/user')

db.sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

const User = getUserModel(db.sequelize)
User.sync({ alter: true })

const app = express()

app.set('view-engine', 'ejs')
app.use(express.urlencoded({extended: false}))


app.get('/', (req,res) => {
    res.redirect('/login')
})

app.get('/login', (req,res) => {
    res.render('login.ejs')
})

app.post('/login', async (req,res) => {
    try{
        const user = await User.findOne({ 
            where: {
                email: req.body.email
            }
        })
        console.log(`Found user: ${JSON.stringify(user)}`);
        const match = await bcrypt.compare(req.body.password, user.password)
        if (match) {
            res.render('index.ejs', {name: user.name})
        }
        throw new Error('Wrong password')
    } catch (err) {
        console.log(err);
        res.redirect('/login')
    }
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
