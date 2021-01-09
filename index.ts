import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;

  if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
    const bmi = calculateBmi(Number(height), Number(weight));

    res.json({
      weight: Number(weight),
      height: Number(height),
      bmi,
    });
  } else {
    res.status(400).json({
      error: "malformatted parameters",
    });
  }
});

app.post("/exercises", (req, res) => {
  const { daily_exercises: dailyExercises, target } = req.body;

  if (
    !isNaN(Number(target)) &&
    dailyExercises.every((num: any) => !isNaN(num))
  ) {
    const response = calculateExercises(Number(target), dailyExercises);
    res.json(response);
  } else if (Object.keys(req.body).length < 2) {
    res.json({ error: "parameters missing" });
  } else {
    res.json({ error: "malformatted parameters" });
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
