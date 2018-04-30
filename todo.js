const express = require('express')
const mongo = require('mongodb')
const bodyParser = require("body-parser");

const server = express()
const db = mongo.MongoClient

server.use(express.static(__dirname + '/views'));
server.set('view engine','ejs')

let todos = []
db.connect('mongodb://localhost:27017',(err,client) => {

  database = client.db('test')

  server.get('/',(req,res) => {

    database.collection('todos').find().toArray((err,result) => {

      if (err) return process.exit(1)
      todos=result;
      res.render('index.ejs',{todos:result})
    })
  })

  server.get('/addTodo',(req,res) => {

    const task = req.query.task
    database.collection('todos').insert({task:task},(err,result) => {

      if (err) return process.exit(1)
      console.log(todos)
      res.render('index.ejs',{todos:result})
    })

    todos.unshift(task)
    res.render('index.ejs',{todos:todos})
  })

  server.listen(3000)

})
