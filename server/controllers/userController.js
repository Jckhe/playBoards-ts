const User = require('../models/userModel.js')
const Board = require('../models/boardModel.js')
const userController = {};


userController.createUser = (req, res, next) => {
    const {username, password} = req.body;
    if (username === undefined || password === undefined) {
       console.log('No username and/or password');
    }
    else {
       User.create({'username' : username, 'password' : password});
       res.cookie("test", "test ")
       res.json("ACCOUNT CREATED!");
    }
}

userController.loginUser = (req,res) => {
    const {username, password} = req.body;
    User.find({ username: username, password: password })
      .then((data) => {
        if (data[0] === undefined) res.send(400);
        console.log("yo")
        let userDetails = data[0];
        console.log(userDetails)
        res.cookie('LoggedIn', userDetails.username);
        res.send('good!')
      })
      .catch((err) => {
        console.log(`ERROR: ${err} in userController.getUser`);
      });
}

userController.getBoards = (req, res) => {
  const { username } = req.params;
  console.log("REQ PARAMS", username.slice(1))
  Board.findOne({ username: username.slice(1) })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(`ERROR: ${err} in userController.storeBoards`);
    });
}

userController.storeBoards = (req,res) => {
  const { username, boards } = req.body;
  Board.findOne({username: username})
    .then((response) => {
      if (!response) {
        Board.create({ username: username, boards: JSON.stringify(boards) })
          .then((data) => {
            console.log("DATA")
            res.send("OK! Stored.");
          })
          .catch((err) => {
            console.log(`ERROR: ${err} in userController.storeBoards`);
          });
      } else {
        Board.findOneAndUpdate({ username: username }, {boards: JSON.stringify(boards)})
          .then((data) => {
            console.log("FINDONEANDUPDATE:", data)
            res.send("OK! Stored.")
          })
          .catch((err) => {
            console.log(`ERROR: ${err} in userController.storeBoards`);
          });
      }
    })
}

userController.verifyUser = (req, res) => {
  
}


    
    

module.exports = userController;