const User = require('../models/userModel.js')

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
        res.cookie('LoggedIn', userDetails._id);
        res.send('good!')
      })
      .catch((err) => {
        console.log(`ERROR: ${err} in userController.getUser`);
      });
}


    
    

module.exports = userController;