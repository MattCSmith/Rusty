const express = require('express')
const app = express()
const port = 42550;
const MongoClient = require('mongodb').MongoClient



module.exports = (client) => {
    app.listen(port, function () {
        console.log('zerBot - Webserver is running on port:', port);
    })

    app.get('/data', function (req, res) {
        res.sendFile(__dirname + "/advent/adventData.json");
    })

    app.get('/solutions', function (req, res) {
        console.log(req.query.day);

        MongoClient.connect("mongodb://code_links:DEEpAaUwe3xp33k@ds163683.mlab.com:63683/code-snippet", { useNewUrlParser: true }, function (err, db) {
            if (err) throw err;
            var dbo = db.db("code-snippet");
            dbo.collection("snippets").find({ dayNumber: req.query.day }).toArray(function (err, result) {
                if (err) throw err;
                res.json(result);
                db.close();
            });
        });
    });

    app.get('/solutions/all', function (req, res) {

        MongoClient.connect("mongodb://code_links:DEEpAaUwe3xp33k@ds163683.mlab.com:63683/code-snippet", { useNewUrlParser: true }, function (err, db) {
            if (err) throw err;
            var dbo = db.db("code-snippet");
            dbo.collection("snippets").find({}).toArray(function (err, result) {
                if (err) throw err;
                res.json(result);
                db.close();
            });
        });
    });

    //route for student list
    app.get('/user', (req, res) => {
        MongoClient.connect("mongodb://code_links:DEEpAaUwe3xp33k@ds163683.mlab.com:63683/code-snippet", { useNewUrlParser: true }, function (err, db) {
            if (err) throw err;
            var dbo = db.db("code-snippet");
            dbo.collection("users").find({}).toArray(function (err, result) {
                if (err) throw err;
                res.json(result);
                db.close();
            });
        });
    });

 
}

