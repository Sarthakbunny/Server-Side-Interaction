const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Leaders = require('../models/leader');
const authentiacte = require('../authenticate');
const cors = require('./cors');

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.options(cors.corsWithOptions, (req,res) => { res.statusCode =200; })
    .get(cors.cors, (req, res, next) => {
        Leaders.find({})
        .then((leaders)=>{
            res.statusCode=200;
            res.setHeader('Content-Type','application/json');
            res.json(leaders);
        },(err)=>next(err))
        .catch((err)=>next(err));
    })
    .post(cors.corsWithOptions, authentiacte.verifyUser, (req, res, next) => {
        Leaders.create(req.body)
        .then((leader)=>{
            res.statusCode=200;
            res.setHeader('Content-Type','application/json');
            res.json(leader);
        },(err)=>next(err))
        .catch((err)=>next(err));
    })
    .put(cors.corsWithOptions, authentiacte.verifyUser, (req, res, next) => {
        res.statusCode = 403;
        res.end("PUT operation not allowed on /leader");
    })
    .delete(cors.corsWithOptions, authentiacte.verifyUser, (req, res, next) => {
        Leaders.remove({})
        .then((leader)=>{
            res.statusCode=200;
            res.setHeader('Content-Type','application/json');
            res.json(leader);
        },(err)=>next(err))
        .catch((err)=>next(err));
    });

leaderRouter.route('/:leaderId')
.options(cors.corsWithOptions, (req,res) => { res.statusCode =200; })
    .get(cors.cors, (req, res, next) => {
        Leaders.findById(req.params.leaderId)
        .then((leader)=>{
            res.statusCode=200;
            res.setHeader('Content-Type','application/json');
            res.json(leader);
        },(err)=>next(err))
        .catch((err)=>next(err));
    })
    .post(cors.corsWithOptions, authentiacte.verifyUser, (req, res, next) => {
        res.statusCode=403;
        res.end(`POST function not allowed on /leader/` + req.params.leaderId);
    })
    .put(cors.corsWithOptions, authentiacte.verifyUser, (req, res, next) => {
        Leaders.findByIdAndUpdate(req.params.leaderId,{
            $set: req.body
        },{new: true})
        .then((leader)=>{
            res.statusCode=200;
            res.setHeader('Content-Type','application/json');
            res.json(leader);
        },(err)=>next(err))
        .catch((err)=>next(err));
    })
    .delete(cors.corsWithOptions, authentiacte.verifyUser, (req, res, next) => {
        Leaders.findByIdAndRemove(req.params.leaderId)
        .then((resp)=>{
            res.statusCode=200;
            res.setHeader('Content-Type','application/json');
            res.json(resp);
        },(err)=>next(err))
        .catch((err)=>next(err));
    });
    
module.exports = leaderRouter;