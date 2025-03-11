interface inputValuesForBmi {
    heightInCms: number,
    weightInKgs: number
}

interface bmiData {
    weight: number
    height: number
    bmi: string
    calculatedBmi: number
}

const parseBmiArguments = (args:String[]): inputValuesForBmi => {
    if(args.length === 4){
        if(!isNaN(Number(args[2])) && !isNaN(Number(args[3]))){
            return { heightInCms:Number(args[2]), weightInKgs:Number(args[3]) }
        }
        else{
            throw new Error('parseBmiArguments: invalid weight or height input given from command line, please use numbers only')
        }
    }
    else{
        throw new Error('parseBmiArguments: Need exactly 4 arguments (npm RUN <FILENAME> <HEIGHT_IN_CM>, <WEIGHT_IN_KG>....),:')
    }
}

export const calculateBmi = (heightInCms: number, weightInKgs: number): bmiData => {
    if(require.main === module){
        console.log('Calculating BMI from command line.....')
    }
    else{
        console.log('Calculating BMI for an incoming web application query.....')
    }
    //console.log('height in cm:', heightInCms, 'weight in kgs:', weightInKgs)
    if(heightInCms > 0 ){
        const calculatedBmi = weightInKgs / (Math.pow(heightInCms / 100, 2))
        if(calculatedBmi > 0 && calculatedBmi < 20){
            const bmiData= {weight:weightInKgs, height:heightInCms, bmi:'Underweight range', calculatedBmi}
            console.log('BMI data:', bmiData)
            return bmiData
        }
        else if(calculatedBmi >= 20 && calculatedBmi < 25){
            const bmiData= {weight:weightInKgs, height:heightInCms, bmi:'Normal range', calculatedBmi}
            console.log('BMI data:', bmiData)
            return  bmiData
        }
        else if(calculatedBmi >= 25){
            const bmiData={weight:weightInKgs, height:heightInCms, bmi:'Overweight range', calculatedBmi}
            console.log('BMI data:', bmiData)
            return bmiData
        }
        else{
            throw new Error('Weight cannot be zero or negative').message
        }
    }
    else{
        throw new Error('Height cannot zero be or negative').message
    }
}


if(require.main === module) {
    try{

        const { heightInCms, weightInKgs }= parseBmiArguments(process.argv)
        
        console.log('BMI data:', calculateBmi(heightInCms, weightInKgs))
    }catch(error){
        console.log('error:', error.message)
    }
}