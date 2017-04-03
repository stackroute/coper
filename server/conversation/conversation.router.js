const express = require('express');
const router = express.Router();
const conversationController = require('./conversation.controller');


router.get('/:userName', function(req, res) {
    try {
        let userName = req.params.userName;
        conversationController.findConversation(userName).then(function(conversation) {
            res.status(200).send({conversation: conversation});
        }, function(err) {
            res.status(500).send({error: 'Failed to complete operation...!'});
        });
    } catch (ex) {
        res.status(500).send({error: 'Internal server error.'});
    }
});

router.post('/:object', function(req, res) {
  try {
    let objectTobeSaved = req.params.object;
    conversationController.saveUserConversation(objectTobeSaved, (err, result) => {
      if (err) {
        return res.status(500).json({
          error: 'Something went wrong, please try later..!'
        });
      }
      return res.json(result);
    });
    return userConversation;
  } catch (err) {
    console.log("Caught exception: ", err);
    return res.status(500).json({
      error: 'Something went wrong, please try later..!'
    });
  }
});

module.exports = router;
