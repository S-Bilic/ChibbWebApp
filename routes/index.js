var express = require('express');
var router = express.Router();

// Get Dashboard
router.get('/', ensureAuthenticated, function(req, res){
    res.render('index');
});

// Get Homepage
router.get('/chart', ensureAuthenticated, function(req, res){
    res.render('addChart');
});

function ensureAuthenticated (req, res, next) {
    if(req.isAuthenticated()){
        return next();
    } else {
        req.flash('error_msg','You are not logged in');
        res.redirect('/login');
    }
}

// Get Public Homepage
router.get('/public', function(req, res){
    res.render('indexPublic');
});

module.exports = router;