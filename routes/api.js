const express = require('express');
const User = require('mongoose').model('User');
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

router.put('/profile/:id', (req,res) => {
  console.log('you are here');
  var userId = req.params.id;
  if(userId == res.user._id){
  console.log(userId);
  User.findOne({ _id: userId }, function(err, foundUser) {
  if (err) {
    res.status(500).json({ error: err.message });
  } else {
    // update the users's profile
    foundUser.firstname = req.body.firstname || foundUser.firstname;
    foundUser.lastname = req.body.lastname || foundUser.lastname;
    foundUser.email = req.body.email || foundUser.email;
    foundUser.city = req.body.city || foundUser.city;

    // save updated user in db
    foundUser.save(function(err, savedUser) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(200).json({message:'user updated',user:savedUser});
      }
    });
  }
});
}else{
res.status(500).json({message:'get the fuck out of here '});
}
});


module.exports = router;
