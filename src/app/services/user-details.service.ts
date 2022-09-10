import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {

  constructor() { }

  calculateBMI(height: any, weight: any) {
  
    let result = ''
  
    // Checking the user providing a proper
    // value or not
    if (height === "" || isNaN(height)) 
        result = "Provide a valid Height!";
  
    else if (weight === "" || isNaN(weight)) 
        result = "Provide a valid Weight!";
  
    // If both input is valid, calculate the bmi
    else {
  
        // Fixing upto 2 decimal places
        let bmi: any = (weight / ((height * height) 
                            / 10000)).toFixed(2);
  
        // Dividing as per the bmi conditions
        if (bmi < 18.6) result = bmi
            // Under Weight 
  
        else if (bmi >= 18.6 && bmi < 24.9) 
            result = bmi
            // Normal 
  
        else result = bmi
            // Over Weight 
    }
    return result
  }

  calculateBmr(height: any, weight: any, age: any): number {
    return 66.5 + (13.75 * weight) + (5.003 * height) - (6.75 * age)
    // For men: BMR = 66.5 + (13.75 * weight in kg) + (5.003 * height in cm) - (6.75 * age)
    // For women: BMR = 655.1 + (9.563 * weight in kg) + (1.850 * height in cm) - (4.676 * age)
  }


  getAge(dateString: Date) {
    let ageDifMs = Date.now() - dateString.getTime();
    let ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

}
