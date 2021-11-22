const express = require('express');
const router = express.Router();
const Question = require('../models/question')
const isAuthenticated = require('../middlewares/isAuthenticated')

router.get('/', (req, res, next) => {
    Question.find({}, function (err, questions){
        if (err){
            next(new Error("Couldn't get questions"))
        } else {
            var questionMap = {};
            questions.forEach(function(question){
                questionMap[question._id] = question;
            });
            res.json(questionMap);
        }
    });
});

router.post('/add', isAuthenticated, (req, res, next) => {
    const questionNew = new Question({
        questionText: req.query.questionText,
        author: req.query.author
    });

    questionNew.save(function (err) {
        if (err){
            next(new Error("Couldn't add question"));
        } else {
            res.send("Question added!")
        }
    });
})


router.post('/answer', isAuthenticated, (req, res,next) => {
    Question.find({_id: req.query._id}, (e, question) => {
        if (e) {
            next(new Error("Couldn't search for question"))
        };
        if (question){
            question = question[0];
            question.answer = req.query.answer;
            question.save(err => {
                if (err) {
                    next(new Error("Couldn't add answer"));
                } else {
                    return res.send("Answered");
                }
                
            })
        }
    })
})

module.exports = router