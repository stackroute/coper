const express = require('express')
const router = express.Router()
const userController = require('./users.controller')
// define the home page route

router.get('/:username', function(req, res) {
    try {
        let username= req.params.username;
        console.log(req.params);
        userController.findUser(username).then(function(user){
          res.status(200).send({user: user});
        },function(err){
          res.status(500).send({
                        error: 'Failed to complete operation...!'
                    });
        })

    } catch (ex) {
      console.log(ex);
        res.status(500).send({error: 'Internal server error.'})
    }
});

module.exports = router
