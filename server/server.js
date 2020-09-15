var express = require('express');
var bodyparser = require('body-parser');

var path = require('path');
var CORS = require('cors');
// var fs = require('fs')
// var logger = require('morgan');
var mongoClient = require("mongodb").MongoClient;


var app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(CORS())
// var accessLogStream = fs.createWriteStream(
//     path.join(__dirname, 'access.log'), { flags: 'a' }
// );
// app.use(logger('combined', { stream: accessLogStream }));

require('dotenv').config({path:path.join(__dirname+'../.env')})



const url_mongo = process.env.DATABASE_URI || "mongodb+srv://admin:admin123@guhan1.eklob.mongodb.net/to_do?retryWrites=true&w=majority";



app.use(express.static(path.join(__dirname + '/../build')));


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/../build", "index.html"));
});


mongoClient.connect(url_mongo, { useUnifiedTopology: true })
    .then(client => {
        const db = client.db('project1')
        const collection_todo = db.collection('to_do');
        const collection_bucket = db.collection('bucket_list');


        app.post('/addTodo', function (req, res) {
            collection_todo.insertOne(req.body)
                .then(result => {
                    console.log(result)
                    res.sendStatus(201).send("Ok")
                })
                .catch(err => console.log(err));
        })

        app.get('/getTodo', function (req, res) {
            collection_todo.find().toArray()
                .then(result => {
                    console.log(result)
                    res.send(result);
                })
                .catch(err => console.log(err));
        })

        app.get('/getTodo/:getid', function (req, res) {
            collection_todo.findOne({ todo_id: req.params.getid })
                .then(result => {
                    console.log(result)
                    res.send(result);
                })
                .catch(err => console.log(err));
        })

        app.put('/editTodo', function (req, res) {
            collection_todo.findOneAndUpdate(
                { todo_id: req.body.editId },
                { $set: { value: req.body.editVal } },
                { returnNewDocument: true })
                .then(result => {
                    console.log(result)
                    res.send(result);
                })
                .catch(err => console.log(err));

        })

        app.put('/editStatusTodo', function (req, res) {
            collection_todo.findOneAndUpdate(
                { todo_id: req.body.editId },
                { $set: { status: req.body.editStatus } },
                { returnNewDocument: true })
                .then(result => {
                    console.log(result)
                    res.send(result);
                })
                .catch(err => console.log(err));
        })

        app.delete('/deleteTodo', function (req, res) {
            collection_todo.findOneAndDelete({ todo_id: req.body.deleteId })
                .then(result => {
                    console.log(result)
                    res.send(result);
                })
                .catch(err => console.log(err));
        })

        app.post('/addBucket', function (req, res) {
            collection_bucket.insertOne(req.body)
                .then(result => {
                    console.log(result)
                    res.sendStatus(201).send("Ok")
                })
                .catch(err => console.log(err));
        })

        app.get('/getBucketList', function (req, res) {
            collection_bucket.find({}, { projection: { _id: 0 } }).toArray()
                .then(result => {
                    console.log(result)
                    res.send(result);
                })
                .catch(err => console.log(err));
        })

        app.delete('/deleteBucketList', function (req, res) {
            collection_bucket.remove()
                .then(result => {
                    res.send(result);
                })
                .catch(err => console.log(err));
        })

        app.get('/getBucketTodo/:bucketName', function (req, res) {
            collection_todo.find({ bucket: { $in: [req.params.bucketName] } }, { projection: { todo_id: 0, _id: 0 } }).toArray()
                .then(result => {
                    console.log(result)
                    res.send(result);
                })
                .catch(err => console.log(err));
        })




        app.listen(process.env.PORT || 8000, () => { console.log("Express running at 8000") })


    })

    .catch((err) => {

        console.log("Mongo connection not made , hence app not started !! ");

        console.error(err)
    })
