interface Result{
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const calculateExercises = (dailyExercises: Array<number>, targetAmount: number): Result =>{
  let data: Result = {
    periodLength: dailyExercises.length,
    trainingDays: dailyExercises.filter(h => h != 0).length,
    success: dailyExercises.every(h => h < targetAmount),
    rating: undefined,
    ratingDescription: undefined,
    target: targetAmount,
    average: dailyExercises.reduce((cur, acc) => acc + cur) / dailyExercises.length,
  }

  let rat: number = Math.floor( (dailyExercises.reduce((cur, acc) => acc + cur) / (dailyExercises.length * targetAmount)) * 3 )

  data.rating = rat > 3 ? 3 : (rat < 1 ? 1 : rat)

  switch(data.rating){
    case 1:
      {
        data.ratingDescription = 'very bad, need to study more'
        break
      }
    case 2:
      {
        data.ratingDescription = 'not too bad but could be better'
        break
      }
    case 3:
      {
        data.ratingDescription = 'good job'
        break
      }
    default:
      {
        throw new Error(`INVALID RATING VALUE: ${rat}`)
      }
  }

  return data
}

const parseArgs2 = (args: Array<string>): [Array<number>, number] => {
  if(args.length < 4){
    throw new Error('Wrong number of arguments')
  }
  const arg2 = Number(args[2])
  
  let arg1 = args.slice(3).map(val => Number(val))

  return [arg1, arg2]
}

try {
  const args = parseArgs2(process.argv)
  console.log(calculateExercises(args[0], args[1]))
}
catch (e) {
  console.log('Error, something bad happened, message: ', e.message);
}
