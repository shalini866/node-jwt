const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const {requireAuth , checkUser} = require('./middleware/authMiddleware');
const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json())
app.use(cookieParser())

// view engine
app.set('view engine', 'ejs'); 

// database connection
const dbURI = 'mongodb+srv://admin:smartwork123@cluster0.zq3u635.mongodb.net/Node-Crud?retryWrites=true&w=majority'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then((result) => {
    console.log('The database is connected');
    app.listen(3001);
  })
  .catch((err) => console.log(err));

// routes
app.get('*',checkUser)
app.get('/', requireAuth,(req, res) => res.render('home'));
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));
app.use(authRoutes);

//get cookies

// app.get('/set-cookies',(req,res)=>{

//   // res.setHeader('Set-Cookies','newUser=true');

//   res.cookie('newUser',false);

//   res.cookie('isEmployee', true, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });


//   res.send('you got the cookies')
// });

// app.get('/read-cookies',(req,res)=>{

//   const cookies = req.cookies;
//   console.log(cookies)


//   res.json(cookies)

// })