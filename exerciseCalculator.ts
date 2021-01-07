interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (hours: Array<number>, target: number): Result => {
    const periodLength: number = hours.length;
    let trainingDays: number = 0;
    let success: boolean = false;
    let rating: number = 1;
    let ratingDescription: string;
    let average: number = 0;
    let sum: number = 0;

    for (let i = 0; i < hours.length; i++) {
        if (hours[i] != 0) {
            trainingDays++;
        }

        sum += hours[i];
    }

    average = sum / hours.length;
    success = average >= target ? true : false;

    if (average < 1) {
        rating = 1;
        ratingDescription = 'You haven\'t done nothing';
    } else if (average < 2) {
        rating = 2;
        ratingDescription = 'Not too bad but could be better';
    } else {
        rating = 3;
        ratingDescription = 'You have done great';
    }

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    }
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
