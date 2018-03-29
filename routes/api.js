const express = require('express');

const router = new express.Router();

router.get('/okay', (req, res) => {
  res.status(200).json({
    message: "You're authorized to see this secret message.",
    user:res.user
  });
});

module.exports = router;
