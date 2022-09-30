/** Exercise 01 - Fizzbuzz

Write a program that writes all the numbers from 1 to 100, with some exceptions: 
- For numbers divisible by 3, print “fizz” 
- For numbers divisible by 5 (but not 3), print “buzz” 
- For numbers divisible by 3 and 5, print “fizzbuzz”

Use console.log() to write the proper output to the command line.

**/

const fizzbuzz = () => {
  for( i = 1; i <= 100; i++){
    var thing_to_say = i 
    if(i % 3 == 0){
      thing_to_say="Fizz!"
    }else if(i % 5 == 0){
      thing_to_say="Buzz!"
    } else if( i % 5 == 0 && i % 3 == 0){
      thing_to_say="FizzBuzz!"
    }

    console.log(thing_to_say)
  }
};

fizzbuzz();
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
