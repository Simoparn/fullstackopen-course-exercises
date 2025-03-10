
type ratingDescription = 'bad score' | 'medium score' | 'good score'
//type ratings = 1 | 2 | 3



interface inputValuesForExerciseCalculator {
    exerciseHoursForEachDay: number[],
    target: number
}

interface ExerciseCalculatorResult {
    periodLength: number;
    trainingDays: number;
    targetWasReached: boolean;
    rating: number;
    ratingDescription: ratingDescription;
    target: number;
    averageTime: number;
}

const parseExerciseArguments = (args: String[]): inputValuesForExerciseCalculator => {
    if(args.length >= 4){
        const exerciseHoursForPeriod=args.slice(2, args.length-1)
        const target = args[args.length-1]
        const NaNInputs=args.slice(2, args.length).filter((a)=>isNaN(Number(a)))
        
        console.log('exercise hours:',exerciseHoursForPeriod)
        console.log('target rating:', target)
        console.log('NaN inputs:', NaNInputs)

        if(NaNInputs.length === 0 && (target === "1" || target === "2" || target === "3")){
         
         
            const exerciseHoursForPeriodAsInteger=exerciseHoursForPeriod.map((e)=>Number(e))
            const targetAsInteger=Number(target)
         
            console.log('exercise hours converted to integer:', exerciseHoursForPeriodAsInteger)
            console.log('target rating converted to integer:', targetAsInteger)
            return { exerciseHoursForEachDay: exerciseHoursForPeriodAsInteger, target:targetAsInteger }
            

        }
        else{
            throw new Error("Invalid inputs found, please use only numbers and make sure that the last number is an integer between 1-3")
        }
    } 
    else{
        throw new Error("Atleast 2 number parameters needed (npm RUN <FILENAME> <NUMBER1>, <NUMBER2>....),")
        
    }
}


const calculateExercises = (exerciseHoursForWeekDays: number[], target: number): ExerciseCalculatorResult => {
    const periodSum= exerciseHoursForWeekDays.reduce((accumulated, current)=>{ 
        //console.log('reduce, accumulated:', accumulated, "current:", current )
        return accumulated + current }
    )
    console.log('final sum for period:', periodSum)
    
    const averageTime=periodSum/exerciseHoursForWeekDays.length
    const calculatedRating= averageTime< 1.5 ? 1 : (averageTime >= 1.5 && averageTime < 2.5 ? 2 : 3)

    return{
        periodLength: exerciseHoursForWeekDays.length,
        trainingDays: exerciseHoursForWeekDays.filter((h)=>h !== 0).length,
        targetWasReached: calculatedRating >= target ? true : false,
        rating: calculatedRating,
        ratingDescription: calculatedRating === 1 ? "bad score" : (calculatedRating === 2 ? "medium score" : "good score"),
        target: target,
        averageTime: averageTime

    }




}



try{
    //console.log('process.argv:',process.argv)
    const { exerciseHoursForEachDay, target } = parseExerciseArguments(process.argv)
    console.log(calculateExercises(exerciseHoursForEachDay, target))
}catch(error){
    console.log('error found:', error.message)
}