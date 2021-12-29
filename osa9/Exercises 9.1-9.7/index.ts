/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { calculateBMI } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
import express = require('express');
const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack");
});

app.get("/bmi", (req, res) => {
  if(isNaN(Number(req.query.height)) || isNaN(Number(req.query.weight))){
    res.status(400).send({ error: "malformatted parameters" });
  }
  
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  const bmi = calculateBMI(height, weight);
  const output = { 
    weight: weight,
    height: height,
    bmi: bmi
  };
  res.status(200).send(output);
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const body: any = req.body;

  if(!body.daily_exercises || !body.target) res.status(400).send({ error: "parameters missing" });
  if(isNaN(Number(body.target)) || !Array.isArray(body.daily_exercises)) res.status(400).send({ error: "malformatted parameters" });

  const target = Number(body.target);
  const daily_exercises: Array<number> = body.daily_exercises;
  
  daily_exercises.forEach(a => {
    if(isNaN(Number(a))) res.status(400).send({ error: "malformatted parameters" });
  });  

  res.status(200).send(calculateExercises(daily_exercises, target));
});


const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server runnin on port ${PORT}`);
});
