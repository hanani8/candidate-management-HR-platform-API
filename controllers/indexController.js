var express = require('express');
var router = express.Router;
var candidate = require('../models/candidate.js');
var editLog = require('../models/editlog.js');
var mongoose = require('mongoose');

//controller to render candidates' names,in alphabetically ascending order
exports.renderCandidates = function(req,res){
    candidate.find({}).exec(function(err,data){
        if(err) return console.log(err, 'Something went wrong while rendering data');

        var data = data.name;
        data.sort();
        res.render(data);
    })
}
//controller to save new candidate's data, with built-in functionality to raise concern when 
//the candidate already exists in the database.
exports.newCandidate = function(req,res){
    var candidateData = new candidate(req.body);
    candidate.find({'UID':req.body.UID}).exec(function(err,data){
        if(data){
            res.render('index',function(err){
                 return err;
            })
        }
        else{
            candidateData.save();
            res.send(new Date());
            res.send(candidateData);
        }
    })
}

//controller to search database, allows full-text search
exports.searchByAnything = function(req,res){
    var searchString = req.body;
    var query = req.query;
    candidate.find({$text: {$search: query}}).exec(function(err,data){
        if(err){
            console.log(err,'Something went wrong')
        }
        else{
            res.render('index',{data})
        }
    })
}

//contorller to filter data based on search queries.
//pretty much same as the "searchByAnything" method, but differentiating it
//for further expansion

exports.filterCandidates = function(req,res){
    var filterOption = req.body;
    var query = req.query;
    candidate.find({$text: {$search: query}}).exec(function(err,data){
        if(err){
            console.log(err,'something went wrong at filterCandidates')
        }
        else{
            res.render('index',{data})
        }
    })
}

//contoller to expose individual candidate's data.
exports.dashboardData = function(req,res){
    const data = req.body;
    const id = req.params.id
    candidate.find({'UID': data.UID}).exec(function(err,data){
        if(err){
            console.log(err,'something went wrong at dashboardData')
        }
        else{
            res.render('index',{data})
        }
    })
}
//If needed be, can be easily expanded to any number of keys, can also be advanced to do logical operations
//on the database data. Like, '<','>' etc...
exports.countBy = function(req,res){
    const data = req.body;
    if(req.body.choice == 'gender'){
        candidate.where({'gender': data.option}).countDocuments(function(err, count){
            if(err) return console.log(err);
            res.send(count);
        })
    }
}

//controller to handle editing of existing documents, and save the editlogs in a new collection
exports.editAndSave = function(req,res){
    const data = req.body
    const id = req.params.id
    candidate.find({'UID':data.UID}).exec(function(err,data){
        if(err)  return console.log(err,"something went wrong at editAndSave")
        var editlog = new editLog(data);
        editlog.save();
    })

    candidate.findOneAndUpdate({'UID':data.UID},{data},{new: true}).exec(function(err){
      if(err) return console.log(err);
    })
}

//controller to fetch edits made to the candidate's data whenever needed
exports.auditTrail = function(req,res){
    const data = req.body;
    const id = req.params.id;
    editLog.find({id}).exec(function(err,data){
        if(err) return console.log(err, "something went wrong in the auditTrail controller")
        else{
            //res.render('candidate', data);
        }
    })
}

exports.candidateMovement = function(req,res){
    const id = req.params.id;
    const data = req.body;
    editLog.find({id}).exec(function(err,data){
        if(err) return console.log(err);
        else{
            res.send('candidate',[data.length -1])
        }
    })
    candidate.find({id}).exec(function(err,data){
        if(err) return console.log(err);
        else{
            res.render('candidate',data)
        }
    })
}