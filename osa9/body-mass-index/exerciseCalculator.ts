interface exerciseResults {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
 }

type ratingString = 'excellent' | 'good' | 'could do better'

interface ratingResults {
  rating: number;
  ratingDescription: ratingString
}

 const calculateRatingDescription = (average: number): ratingResults => {
   if(average > 2) return { rating: 3, ratingDescription: 'excellent' }
   else if (average > 0.5) return { rating: 2, ratingDescription: 'good' }
   else return { rating: 1, ratingDescription: 'could do better' }
 }

const calculateExercises = (hours: Array<number>, goal: number):exerciseResults => {
  const trainingDays = hours.reduce((a,v) => (v !== 0 ? a+1 : a), 0);  
  const periodLength = hours.length;
  const average = hours.reduce((a,v) => a+v, 0) / periodLength;

  const ratingResults = calculateRatingDescription(average)
  const rating = ratingResults.rating;
  const ratingDescription = ratingResults.ratingDescription;

  const target = goal;
  const success = average >= target ? true : false


  return {
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: average
  }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))