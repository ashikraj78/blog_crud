var express = require('express');
var router = express.Router();
var Article = require("../model/Article");
var Comment = require('../model/Comment');

/* GET users listing. */
router.get('/', (req, res, next)=> {
  Article.find({},(err,articles)=>{
    if(err) return next(err);
    res.render("listArticles",{articles});
  })
});

router.get('/new', (req,res)=>{
  res.render("articleForm")
});

router.get('/:id', (req,res,next)=>{
  Article.findById(req.params.id,(err,article)=>{
    if(err) return next(err);
    Comment.find({articleId: req.params.id},(err,comments)=>{
      if(err) return next(err);
      res.render('singleArticle',{article,comments})
    } )
  })
});

router.post('/', (req,res,next)=>{
  Article.create(req.body, (err, article)=>{
    if(err) return next(err);
    res.redirect('/articles');
  })
});

// comment post
router.post('/:articleId/comments',(req,res,next)=>{
  var articleId = req.params.articleId;
  req.body.articleId = articleId;
  Comment.create(req.body,(err,comment)=>{
    if(err) return next(err);
    res.redirect('/articles/' + articleId)
  })
})

// article edit
router.get('/:articleId/edit',(req , res, next)=>{
  var articleId = req.params.articleId;
  Article.findById(articleId,{title:1,description:1}, (err, article)=>{
    if(err) return next(err);
    res.render('updateArticle', {article} );
  })
})

router.post('/:articleId', (req,res,next)=>{
  var articleId = req.params.articleId;
  Article.findByIdAndUpdate(articleId, req.body, {new:true}, (err, article)=>{
    if(err) return next(err);
    res.redirect('/articles/'+ articleId)
  })
})

// article delete
router.get('/:articleId/delete', (req,res,next)=>{
  var articleId = req.params.articleId;
  Article.findByIdAndDelete(articleId, (err, article)=>{
    res.redirect('/articles')
  })
})




module.exports = router;
