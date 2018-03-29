const express = require('express');

const router = new express.Router();

router.get('/okay', (req, res) => {
  res.status(200).json({
    message: "You're authorized to see this secret message.",
    user:res.user
  });
});
router.get('/felix',(req,res) => {
  res.status(200).json({
    message:'this is felix you are here because your token is valid means you are signed in',
    user:res.user
  });
});
module.exports = router;
