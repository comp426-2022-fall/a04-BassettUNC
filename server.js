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

// app dir returns 200
app.get('/app/', (req,res) => {
	res.status(200).send("200 OK").end();
})

//default returns 404
app.get("*", (req, res) => {
	res.status(404).end()
})

// default role params
const sides = 6;
const dice = 2;
const rolls = 1;

// sides
app.post('/app/roll/:sides', (req,res) => {
	sides = parseInt(req.params.sides)
	res.status("200").roll(sides,dice,rolls)
})

// sides, dice
app.post('/app/roll/:sides/:dice', (req,res) => {
	sides = parseInt(req.params.sides)
	dice = parseInt(req.params.dice)
	res.status("200").roll(sides,dice,rolls)
})

// sides, dice, rolls
app.post('/app/roll/:sides/:dice/:rolls', (req,res) => {
	sides = parseInt(req.params.sides)
	dice = parseInt(req.params.dice)
	rolls = parseInt(req.params.rolls)
	res.status("200").roll(sides,dice,rolls)
})

app.listen(port);