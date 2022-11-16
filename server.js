#!/usr/bin/env node

import minimist from 'minimist';
import express from 'express';
import { roll } from "./lib/roll.js";

// enable minimist
const args = minimist(process.argv.slice(2));

// enable express
const app = express();

// set port
let port = 0;
if (args.port) {
	port = args.port;
} else if (process.env.PORT) {
	port = process.env.PORT;
} else {
	port = 5000;
}

//look
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// app dir returns 200
app.get('/app/', (req,res) => {
    res.status(200),
    res.send("200 OK")
})

// default role params
const sides = 6;
const dice = 2;
const rolls = 1;

app.get('/app/roll/', (req, res) => {
    res.status(200)
    res.send(roll(sides, dice, rolls))
})

app.post('/app/roll/', (req, res) => {
    const sides = parseInt(req.body.sides);
    const dice = parseInt(req.body.dice);
    const rolls = parseInt(req.body.rolls);
    res.status(200);
    res.send(roll(sides, dice, rolls));    
})

// sides
app.post('/app/roll/:sides', (req,res) => {
	const sides = parseInt(req.params.sides)
    res.status(200);
    res.send(roll(sides, dice, rolls));
})

// sides, dice
app.get('/app/roll/:sides/:dice', (req, res) => {
    const sides = parseInt(req.params.sides);
    const dice = parseInt(req.params.dice);
    res.status(200);
    res.send(roll(sides, dice, rolls));
})

// sides, dice, rolls
app.get('/app/roll/:sides/:dice/:rolls', (req, res) => {
    const sides = parseInt(req.params.sides);
    const dice = parseInt(req.params.dice);
    const rolls = parseInt(req.params.rolls);
    res.status(200);
    res.send(roll(sides, dice, rolls));
})

//default returns 404
app.get("*", (req, res) => {
    res.status(404);
    res.send("404 NOT FOUND");
})

app.listen(port, () => {
    console.log("Server listening on port " + port)
})