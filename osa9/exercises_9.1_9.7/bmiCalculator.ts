interface inputValuesForBmi {
    heightInCms: number,
    weightInKgs: number
}

const parseBmiArguments = (args:String[]): inputValuesForBmi => {
    if(args.length === 4){
        if(!isNaN(Number(args[2])) && !isNaN(Number(args[3]))){
            return { heightInCms:Number(args[2]), weightInKgs:Number(args[3]) }
        }
        else{
            throw new Error('invalid weight or height input given from command line, please use numbers only')
        }
    }
    else{
        throw new Error('Need exactly 4 arguments (npm RUN <FILENAME> <HEIGHT_IN_CM>, <WEIGHT_IN_KG>....),:')
    }
}

const calculateBmi = (heightInCms: number, weightInKgs: number): number => {
    console.log('BMI calculator')
    console.log('height in cm:', heightInCms, 'weight in kgs:', weightInKgs)
    if(heightInCms !== 0){
        const bmi = weightInKgs / (Math.pow(heightInCms / 100, 2))
        if(bmi > 0 && bmi < 20){
            console.log('Underweight range, bmi:', bmi)
            return bmi
        }
        else if(bmi >= 20 && bmi < 25){
            console.log('Normal range, bmi:', bmi)
            return bmi
        }
        else if(bmi >= 25){
            console.log('Overweight range, bmi:', bmi)
            return bmi
        }
        else{
            throw new Error('Weight cannot be negative')
        }
    }
    else{
        throw new Error('Height cannot be zero, divide by zero error')
    }
}



try{
    const { heightInCms, weightInKgs }= parseBmiArguments(process.argv)
    console.log(calculateBmi(heightInCms, weightInKgs))
}catch(error){
    console.log('error:', error.message)
}