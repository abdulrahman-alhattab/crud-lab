// imports
const express = require('express') //importing express package
const app = express() // creates a express application
require('dotenv').config() // allows us to use the .env variables
const mongoose = require('mongoose') // importing mongoose
const morgan = require('morgan')
const methodOverride = require('method-override')
const food = require('./models/food')

// Middleware
app.use(express.static('public')) //all static files are in the public folder
app.use(express.urlencoded({ extended: false })) // this will allow us to see the data being sent in the POST or PUT
app.use(methodOverride('_method')) // Changes the method based on the ?_method
app.use(morgan('dev')) // logs the requests as they are sent to our sever in the terminal

async function conntectToDB() {
  //connection to the database
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Connected to Database')
  } catch (error) {
    console.log('Error Occured', error)
  }
}

conntectToDB() // connect to database

// Routes go here

app.get('/', async (req, res) => {
  const allFoods = await food.find()

  res.render('home.ejs', { foods: allFoods })
})

app.get('/food/new-food', (req, res) => {
  try {
    res.render('newFood.ejs')
  } catch (err) {
    console.log(err)
  }
})
app.post('/food', async (req, res) => {
  try {
    const createdFood = await food.create(req.body)
    res.redirect('/')
  } catch (err) {
    console.log(err)
  }
})

app.get('/food', async (req, res) => {
  const allFoods = await food.find()
  res.render('/food/foodList.ejs', { allFoods })
})

app.get('/food/:id', async (req, res) => {
  const { id } = req.params
  const foundFood = await food.findById(id)
  res.render('showFood.ejs', { foundFood })
})
app.listen(3000, () => {
  console.log('App is running on port 3000')
}) // app will be waiting for requests on port 3000
