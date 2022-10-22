const express = require('express');
const app = express();
const users = require('./routes/users');
const path = require('path');
const {createProxyMiddleware} = require('http-proxy-middleware')
const cors = require('cors');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const userController = require('./controllers/userController')


mongoose.connect(
    "mongodb+srv://bigboss:pk1234@cluster1.akypwpz.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
)



const PORT = 3333;



app.use(cors({credentials: true, origin: 'http://localhost:8080', methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']}))
// app.use(cors({credentials: true, origin: 'http://localhost:8080'}))
app.use(bodyParser.json());


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.get('/', (req, res) => {
    res.send(200);
})


app.get('/getboards/:username', userController.getBoards)


app.post('/login', userController.loginUser)

app.post('/store', userController.storeBoards)

app.post('/signup', userController.createUser)
app.use(express.static("client/dist"));


app.listen(3333, () => {
    console.log(`Server listening on port: ${PORT}...`);
});

/**
 * 404 handler
 */
app.use('*', (req,res) => {
    es.status(404).send('Not Found');
});
  
  /**
   * Global error handler
   */
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send({ error: err });
});



module.exports = app;