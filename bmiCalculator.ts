interface Measurements {
  height: number;
  weight: number;
}

const parseArguments = (args: Array<string>): Measurements => {
  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

export const calculateBmi = (height: number, weight: number): string => {
  const bmi: number = weight / Math.pow(height / 100, 2);

  switch (true) {
    case bmi < 15:
      return "Very severely underweight";
    case bmi < 16:
      return "Severely underweight";
    case bmi < 18.5:
      return "Underweight";
    case bmi < 25:
      return "Normal (healthy weight)";
    case bmi < 30:
      return "Overweight";
    case bmi < 35:
      return "Obese Class I (Moderately obese)";
    case bmi < 40:
      return "Obese Class II (Severely obese)";
    default:
      return "Obese Class III (Very severely obese)";
  }
};

try {
  const { height, weight } = parseArguments(process.argv);
  calculateBmi(height, weight);
} catch (error) {
    if (error instanceof Error) {
        console.log("Error, something bad happened, messaage: ", error.message);
    } else {
        throw error;
    }
}