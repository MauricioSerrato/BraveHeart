//___________________
//Dependencies
//___________________
const { application } = require('express');
const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const app = express ();
const db = mongoose.connection;
require('dotenv').config()
const Data = require('./models/data.js')
const Exercise = require('./models/schema.js')
//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3003; //port 300 doest work go to 3003

//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to Mongo &
// Fix Depreciation Warnings from Mongoose
// May or may not need these depending on your Mongoose version
mongoose.connect(MONGODB_URI);

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

//___________________
//Middleware
//___________________

//use public folder for static assets
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project

//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form



//___________________
// inserting data
//___________________

// Exercise.create(Data, (err, data) =>{
//     console.log('added the exercise log to db')
// })


//___________________
// Routes
//___________________

//___________________
// Creating Show route
//  for exercises
//___________________


app.get('/home/workouts-chest/:id', (req,res) => {
    Exercise.findById(req.params.id, (err, exercise) =>{
        res.render('show.ejs', {
            exercise: exercise
        })
    })
})

app.get('/home/workouts', (req, res)=>{
    Exercise.find({}, (err, allLog) => {
        res.render(
            'index.ejs', 
            {
                log: allLog
            })
    })
})


app.get('/home/workouts-chest', (req,res) =>{
    Exercise.find({}, (err, data) =>{
        res.render('chest.ejs', 
        {
            log: data
        })
    })
    
})


app.get('/home',(req, res) => {
    res.render('home.ejs')
})
  
//localhost:3000
app.get('/' , (req, res) => {
    res.send('Hello World!');
  });
//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));

