const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const users = require('./members.json');
const questions = require('./questions.json');
const userResults = require('./users.json');
const cors = require('cors');

const port = process.env.PORT || 3030;
const app = express();
app.use(express.json());
app.use(express.urlencoded());

app.use(bodyParser.json());

const readFile = (fileName) =>{
    const dataBuffer = fs.readFileSync(fileName);
    const dataJson = dataBuffer.toString();
    return JSON.parse(dataJson)
}

const writeFile = (fileName, content) => {
    const dataJson = JSON.stringify(content);
    fs.writeFileSync(fileName,dataJson);
}


app.get('/', (req, res)=>{
    res.send('<h1>Welcome to my API built with express</h1>');
})

// users
app.get('/quiz/results/:userId', (req, res)=>{
   let user =  userResults.find(item => req.params.userId === item.userId.toString());
   res.setHeader('Content-Type', 'application/json');
   res.send(user);
});

app.get('/quiz/results/:userId/summery', (req, res)=>{
    let user =  users.find(item => req.params.userId === item.userId.toString());
    let user_results =  userResults.find(item => req.params.userId === item.userId.toString());
    let rank = 0;

    for(let index=0; index<user.questionAnswer.length; index++){
        if(user.questionAnswer[index]===user_results.questionAnswer[index]){
            rank++;
        }
    }
    res.setHeader('Content-Type', 'application/json');
    
 });

 app.post('/quiz/:username/create', (req, res)=> {
        let user =  users.find(item => req.params.username === item.username);
        if(user !== undefined){
            return res.status(409).send('User name already taken')
        }else{
            user={
                userId: Math.floor(Math.random()* 10000)+1,
                userName: req.params.username,
                Location: "",
                questionAnswer: []
            }
            
            const userData = readFile('users.json');
            userData.push(user);
            console.log(userData);
            writeFile('users.json', userData);
     
        }
});

app.put('/quiz/:username/update', (req,res)=> {
    
    let userIndex =  userResults.findIndex(item => req.params.username === item.userName)
    if(userIndex===-1) return res.status(404).send('User not found!');
    user = {
      userId: req.body.userId,
      userName: req.body.userName,
      Location: req.body.location,
      questionAnswer: req.body.questionAnswer,
    };
    const userData = readFile('users.json');
    userData[userIndex]=req.body;
    console.log(userData);
    writeFile('users.json', userData);
});

app.post('/quiz/:username/answer', (req, res)=> {

    let user = users.find(item => req.params.username === item.userName);
    if (user === undefined) return res.status(404).send('User doesn\'t exist');

   const members = readFile('members.json');
   const friendName =  members.find(item => (req.params.username === item.userName)&&(req.body.friendName===item.friendName))
    console.log(friendName);

});

app.get('/quiz/:username/get-questions', (req,res)=>{
    let user = users.find(item => req.params.username === item.userName.toString());
    if (user === undefined) return res.status(404).send('User doesn\'t exist');

    const questions = readFile('questions.json');
    
    let questionsList = []
    questions.forEach(element => {
        questionsList.push(element.question)
    });
    res.setHeader('Content-Type', 'application/json');
    res.send(questionsList);
});

app.get('/quiz/:username/get-questions/:id', (req,res)=>{
    let user = users.find(item => req.params.username === item.userName.toString());
    if (user === undefined) return res.status(404).send('User doesn\'t exist');
    console.log(req.params);
    const questionsList = readFile('questions.json');
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(questionsList[req.params.id-1].question));
});

app.listen(port, ()=>{
    console.log('Server is up on port '+ port);
});