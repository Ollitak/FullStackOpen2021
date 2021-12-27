interface exerciseResults {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
 }

type ratingDescription = 'excellent' | 'good' | 'could do better';

interface ratingResults {
  rating: number;
  ratingDescription: ratingDescription
}

interface exerciseParameters {
  hours: Array<number>;
  goal: number;
}

const parseParameters = (args: Array<string>): exerciseParameters => {
  if (args.length < 4) throw new Error('Not enough arguments');

  args = args.slice(2,args.length);
  args.forEach(a => {
    if(isNaN(Number(a))) throw new Error('Values were not numbers');
  });

  const hours = args.slice(1, args.length).map(a => Number(a));
  const goal = Number(args[0]);
  
  return {
    hours: hours,
    goal: goal
  };
};

const calculateRating = (average: number): ratingResults => {
  if(average > 2) return { rating: 3, ratingDescription: 'excellent' };
  else if (average > 0.5) return { rating: 2, ratingDescription: 'good' };
  else return { rating: 1, ratingDescription: 'could do better' };
};

export const calculateExercises = (hours: Array<number>, goal: number): exerciseResults => {
  const trainingDays = hours.reduce((a,v) => (v !== 0 ? a+1 : a), 0);  
  const periodLength = hours.length;
  const average = hours.reduce((a,v) => a+v, 0) / periodLength;

  const ratingResults = calculateRating(average);
  const rating = ratingResults.rating;
  const ratingDescription = ratingResults.ratingDescription;

  const target = goal;
  const success = average >= target ? true : false;

  return {
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: average
  };
};

try {
  const { hours, goal } = parseParameters(process.argv);
  console.log(calculateExercises(hours, goal));
} catch (e) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  console.log(e.message);
}
