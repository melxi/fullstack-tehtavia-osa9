import express from "express";
import patientService from "../services/patientService";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getNonSSNPatientEntry());
});

router.post("/", (req, res) => {
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;
  const newPatientEntry = patientService.addPatientEntry({
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
  });

  res.json(newPatientEntry);
});

export default router;
