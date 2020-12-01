const calculateBmi = (height: number, weight: number): string =>{
  const bmi = weight/((height/100) * (height/100));

  if(bmi < 18.5){
    return `Underweight (unhealthy weight)`;
  }
  else if( bmi < 25)
  {
    return `Normal (healthy weight)`;
  }
  else if( bmi < 30)
  {
    return `Overweight (unhealthy weight)`;
  }
  else
  {
    return `Obese (unhealthy weight)`;
  }
};

const parseArgs = (args: Array<string>): [number, number] => {
  if(args.length > 4){
    throw new Error('Wrong number of arguments');
  }
  
  return [Number(args[2]), Number(args[3])];
};

try {
  const args = parseArgs(process.argv);
  console.log(calculateBmi(args[0], args[1]));
}
catch (e) {
  console.log('Error, something bad happened, message: ', (e as Error).message);
}

export default calculateBmi;
