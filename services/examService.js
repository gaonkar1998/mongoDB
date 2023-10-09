const db = require("../models/index");
const User = db.user;
const Exam = db.exam;
const Question = db.question;
const ExamQuestion = db.exam_question;
const bcrypt = require("bcryptjs");
const authService = require("../shared/auth.service");


const getExamQuestions = async(req, res) => {
    const exam_id = req.params.exam_id;
    await ExamQuestion.find({ exam_id: exam_id })
        .populate("question")
        .then(data => {
            if (data.length) {
                // Response with error message
                res.status(401).send({ message: "Fetched", data });
            } else {

            }
        })
        .catch(e => {
            console.log(e);
        });
    // ..and populate all of the notes associated with it
    // .populate("exam_question")
    // .then(dbProduct => {
    //     // If we were able to successfully find an Product with the given id, send it back to the client
    //     res.json(dbProduct);
    // })
    // .catch(function(err) {
    //     // If an error occurred, send it to the client
    //     res.json(err);
    // });
}



module.exports = {
    getExamQuestions
}