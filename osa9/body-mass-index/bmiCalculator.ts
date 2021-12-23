type bmiType = 'underweight' | 'normal weight' | 'overweight' | 'obese'

const calculateBMI =  (h: number, w: number): bmiType => {
  const bmi = w / Math.pow(h/100 ,2)
  if(bmi < 18.5) return 'underweight'
  else if (bmi < 25.0) return 'normal weight'
  else if (bmi < 30) return 'overweight'
  else return 'obese'
}

console.log(calculateBMI(184, 80))