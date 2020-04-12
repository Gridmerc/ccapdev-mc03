const db = require('../models/db.js');
const User = require('../models/UserModel.js');

const controller = {

    getFavicon: function (req, res) {
        res.status(204);
    },

    /*
    TODO:   This function is executed when the client sends an HTTP GET
            request to path `/`. This displays `home.hbs` with all contacts
            current stored in the database.
    */
    getIndex: function(req, res) {
        var name = req.params.name;
        var number = req.params.number;

        var query = {
            name: name,
            number: number
        };
        var projection = {};
        var mySort = {};

        db.findMany(User, query, projection, function(result) {
            if(result != null) {
                res.render('home', {userContact: result});
            }
            else
                res.render('home');
        }, mySort);
    },

    /*
    TODO:   This function is executed when the client sends an HTTP GET
            request to path `/getCheckNumber`. This function checks if a
            specific number is stored in the database. If the number is
            stored in the database, it returns an object containing the
            number, otherwise, it returns an empty string.
    */
    getCheckNumber: function(req, res) {
        var uNumber = req.query.uNumber;
        db.findOne(User, {uNumber: uNumber}, 'uNumber', function(result) {
            res.send(result);
        });
    },

    /*
    TODO:   This function is executed when the client sends an HTTP GET
            request to path `/getAdd`. This function adds the contact sent
            by the client to the database, then appends the new contact to the
            list of contacts in `home.hbs`.
    */
    getAdd: function(req, res) {
        var uName = req.query.uName;
        var uNumber = req.query.uNumber;
        //var details = {name: uName, number: uNumber};

        db.insertOne(User, {
            uName: uName,
            uNumber: uNumber
        }, function(result) {
            res.send(result);
        });

        //res.render('home', {userContact: {name: uName, number: uNumber}});
    },

    /*
    TODO:   This function is executed when the client sends an HTTP GET
            request to path `/getDelete`. This function deletes the contact
            from the database, then removes the contact to the list of
            contacts in `home.hbs`.
    */
    getDelete: function (req, res) {
        var uName = req.query.uName;
        var uNumber = req.query.uNumber;

        db.deleteOne(User, {
            uName: uName,
            uNumber: uNumber
        }, function(result) {
            res.send(result);
        });
    }

}

module.exports = controller;
