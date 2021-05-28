const express = require('express');
const router = express.Router();
const messageController = require('../controllers/controllers')


router.post('/messages', (req, res) => {
    console.log(req.body)
    messageController.sendMessage(req.body).then(sent => res.send(sent));
});

module.exports = router;