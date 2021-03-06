/**
 * This view allows users to get a review for a desired user.
 */

"use strict"

var ReviewController = require('../../controller/reviewController.js');
var requiresLoggedIn = require('../userUtils.js');

function getReviews(req, res) {
    var userID = parseInt(req.params.userID);

    // Make sure the user ID is valid.
    if (userID < 1) {
        res.status(422).json({message: "invalid user ID"});

        return;
    }

    // Return the reviews for the given user.
    ReviewController.get(userID)
        .then((reviews) => {
            res.json(reviews); 
        });
}

function addReviews(req, res, user) {
    if (!user.verified) {
	return res.status(403).json({message: 'You are not verified'});
    }

    var userID = parseInt(req.params.userID);
    var rating = parseInt(req.body.rating);
    var comment = req.body.comment;

    //basic checks
    if (!userID || userID < 1) {
        return res.status(403).json({message: 'Profile does not exist'});
    }

    if (!comment || comment.length == 0) {
        return res.status(400).json({message: 'Your review cannot be empty.'});
    }

    if (isNaN(rating)) {
	return res.status(400).json({message: 'Please insert a valid rating field.'});
    }

    console.log(userID, user.userID, rating, comment)
    //add review
    ReviewController.add(userID, user.userID, rating, comment)
	.then((results) => {
	    //results is false
	    if(!results){
	        res.status(400).json({message: 'You do not have a completed session with this tutor'});
	    }
	    //results is true
	    else{
	        res.json({message: 'success'});
	    }
	});
}

module.exports = {
    '/:userID': {
        get: getReviews,
	post: requiresLoggedIn(addReviews)
    }
};
