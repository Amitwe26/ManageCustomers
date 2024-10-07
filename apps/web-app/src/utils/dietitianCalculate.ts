type CustomerInfo = {
  weight: number;
  height: number;
  age: number;
  gender: 'male' | 'female';
};

export const calculateBMI = (weight: number, height: number): number => {
  const heightInMeters = height / 100; // convert cm to meters
  return weight / (heightInMeters * heightInMeters);
};

export const calculateRMR = (
  weight: number,
  height: number,
  age: number,
  gender: 'male' | 'female',
): number => {
  if (gender === 'male') {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    return 10 * weight + 6.25 * height - 5 * age - 161;
  }
};

export const calculateHealthMetrics = (
  weight: number,
  height: number,
  age: number,
  gender: 'male' | 'female',
) => {
  const bmi = calculateBMI(weight, height);
  const rmr = calculateRMR(weight, height, age, gender);

  return {
    bmi: parseFloat(bmi.toFixed(2)), // Round to 2 decimal places
    rmr: parseFloat(rmr.toFixed(2)), // Round to 2 decimal places
  };
};

export const determineWeightChange = (
  startWeight: number,
  endWeight: number,
): string => {
  if (startWeight > endWeight) {
    return 'Weight is going down';
  } else if (startWeight < endWeight) {
    return 'Weight is going up';
  } else {
    return 'Weight remains the same';
  }
};

export const calculateProteinIntake = (
  weight: number,
  proteinFactor: number = 1.8,
): number => {
  return weight * proteinFactor;
};

export const calculateCarbohydrateIntake = (
  weight: number,
  height: number,
  age: number,
  gender: 'male' | 'female',
  activityFactor: number,
  carbPercentage: number = 0.5,
): number => {
  let BMR;
  if (gender === 'male') {
    BMR = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    BMR = 10 * weight + 6.25 * height - 5 * age - 161;
  }
  const TDEE = BMR * activityFactor;
  const weightLossCalories = TDEE - 500;
  return (weightLossCalories * carbPercentage) / 4;
};
