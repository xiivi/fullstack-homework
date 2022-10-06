/** Exercise 01 - Fizzbuzz

Write a program that writes all the numbers from 1 to 100, with some exceptions: 
- For numbers divisible by 3, print “fizz” 
- For numbers divisible by 5 (but not 3), print “buzz” 
- For numbers divisible by 3 and 5, print “fizzbuzz”

Use console.log() to write the proper output to the command line.

**/

const fizzBuzz = () => {
  for(i = 1; i <= 100; i++){
    
    if(i % 3 === 0 && i % 5 === 0) { 
      console.log("FizzBuzz!");
    } 

    if(i % 3 === 0) {
      console.log("Buzz!");
    } 

    if(i % 5 === 0) { 
      console.log("Fizz!");
    } 

    if(i % 3 !== 0 && i % 5 !== 0) { 
      console.log(i);
    }
  }
};

fizzBuzz();
// 1
// 2
// fizz
// 4
// buzz
// fizz
// 7
// 8
// fizz
// buzz
// 11
// fizz
// 13
// 14
// fizzbuzz
// ...

// Coding in Javascript
// Use strict equality (===) and not (==)
// To declare variables, use let and const. Don't use var
// 

// Style guide 
// 1. ESlint 
// 2. AirBnb Javascript Style Guide <-- Used in this class