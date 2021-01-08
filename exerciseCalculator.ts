interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface Exercises {
    target: number;
    hours: Array<number>;
}

const parseArguments = (args: Array<string>): Exercises => {
    if (args.length < 2) throw new Error('Not enough arguments');

    return {
        target: Number(args[2]),
        hours: args.map(Number).slice(3)
    };
};

export const calculateExercises = (target: number, hours: Array<number>): Result => {
    const periodLength: number = hours.length;
    let trainingDays = 0;
    let success = false;
    let rating = 1;
    let ratingDescription: string;
    let average = 0;
    let sum = 0;

    for (let i = 0; i < hours.length; i++) {
        if (hours[i] != 0) {
            trainingDays++;
        }

        sum += hours[i];
    }

    average = sum / hours.length;
    success = average >= target ? true : false;

    if (average >= target) {
        rating = 3;
        ratingDescription = 'You have done great';
    } else if (average < target) {
        rating = 2;
        ratingDescription = 'Not too bad but could be better';
    } else {
        rating = 1;
        ratingDescription = 'You haven\'t done anything';
    }

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    };
};

const { target, hours } = parseArguments(process.argv);

console.log(calculateExercises(target, hours));