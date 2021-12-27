type bmiType = 'underweight' | 'normal weight' | 'overweight' | 'obese';

interface bmiParameters {
  heigth: number;
  weight: number;
}

const parseArguments = (args: Array<string>): bmiParameters => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');
  
  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      heigth: Number(args[2]),
      weight: Number(args[3])
    };
  } else {
    throw new Error('Values were not numbers');
  }
};

export const calculateBMI =  (h: number, w: number): bmiType => {
  const bmi = w / Math.pow(h/100 ,2);
  if(bmi < 18.5) return 'underweight';
  else if (bmi < 25.0) return 'normal weight';
  else if (bmi < 30) return 'overweight';
  else return 'obese';
};

try {
  const { heigth, weight } = parseArguments(process.argv);
  console.log(calculateBMI(heigth, weight));
} catch (error) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  console.log(error.message);
}