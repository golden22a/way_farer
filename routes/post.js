const express = require('express');
const router = new express.Router();
const Post = require('mongoose').model('Post');
function validpost(payload){
  const errors = {};
  let isFormValid = true;
  let message = '';

  if (!payload || typeof payload.title !== 'string' || payload.title.trim().length < 0) {
    isFormValid = false;
    errors.title = 'Please provide a  title.';
  }

  if (!payload || typeof payload.body !== 'string' || payload.body.trim().length < 0) {
    isFormValid = false;
    errors.body = 'please provie a body.';
  }

  if (!payload || typeof payload.city !== 'string' || payload.city.trim().length === 0) {
    isFormValid = false;
    errors.city = 'Please pick a  city.';
  }
  if (!isFormValid) {
    message = 'Check the form for errors.';
  }
  return {
    success: isFormValid,
    message,
    errors
  };
}
router.get('/posts', (req,res) => {
    Post.find({},(err,allPosts) => {
      if(err){
        res.status(400).json({message:'problem problem big problem with post'});
      }
      res.status(200).json({posts: allPosts});
    });

});


router.post('/post',(req,res) => {
  let valid=validpost(req.body);
  if(!valid.success){
    return res.status(400).json({
      success: false,
      message: valid.message,
      errors: valid.errors
    });
  }else{
  Post.create({
    title:req.body.title,
    body:req.body.body,
    city:req.body.city,
    user:req.user
  }, (err,created) => {
    if(err){
    res.status(500).json({message:'post not created check your form'});
  }else{

    res.status(200).json({post:created});
}
});
}
});

router.get('/post/:id',(req,res) => {
  let titlegot=req.params.title.trim();
  let title=titlegot.split('-').join(' ');
  Post.find({title:title},(err,found) => {
    if(err){
      res.status(400).json({message:'poast not found'})
    }
    else{
      res.status(200).json({post:found});
    }
  })
});

router.put('/post/:id', (req,res) => {
  const postId = req.params.id;
  Post.findOne({ _id: postId }, function(err, foundPost) {
  if (err) {
    res.status(500).json({ error: err.message });
  } else {
    // update the post
    if(foundPost.user.toString() == req.user._id.toString()){
    foundPost.title = req.body.title || foundPost.title;
    foundPost.body = req.body.body || foundPost.body;
    foundPost.city = req.body.city || foundPost.city;

    // save updated post in db
    foundPost.save(function(err, savedPost) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(200).json({message:'post updated',post:savedPost});
      }
    });
      }
      else {
        res.status(500).json({message:'unauthorized you can only update posts you created'});
      }
    }
  });



});
router.get('/profile/posts', (req,res) => {
  Post.find({user:req.user},(err,found) =>{
    if(err){
      res.status(500).json({message:err.message});
    }else{
      res.status(200).json({posts:found});

    }

  })
});

module.exports = router;
