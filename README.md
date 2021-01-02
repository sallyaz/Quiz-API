# nodejs based server api
## Quiz Application Server

Basepoint:
https://sally-quiz.herokuapp.com/

Endpoints:
## create new user and his questions & answers
	/quiz/:username/create
	Body:username location questions id(automaticly generated)
## Get user by uid
	/quiz/results/:userId
## Get summery by userId
	/quiz/results/:userId/summery
## update user (patch)
	/quiz/:username/update
	Body: userId userName Location questionAnswer
## Gets a question answer by username 
	/quiz/:username/answer
## Gets all questions by username 
  /quiz/:username/get-questions
## Gets all questions id's by username 
  /quiz/:username/get-questions/:id

NOT IMPLEMENTED
## Get all users
	/Quiz/users
## Running on
- https://sally-quiz.herokuapp.com/

## Github
- https://github.com/sallyaz/Quiz-API
## Using:
- Nodejs
- Express
- Heroku
