/** Exercise 01 - Coins **/

const cashTypesArr = [1, .25, .10, .05, .01];
const cashTypesSingularArr = ["dollar", "quarter", "dime", "nickel", "penny"];
const cashTypesPluralArr = ["dollars", "quarters", "dimes", "nickels", "pennies"];

const calculateChange = (userInput) => {
  // Return error if input is not between $0-10.00
  if(userInput < 0 || userInput > 10){
    return "[Input Error #1] Input value is not between $0-$10.00. Please try again.";
  }

  let calculatedChangeArr = getResults(userInput, cashTypesArr);
  let resultString = printResults(calculatedChangeArr, cashTypesSingularArr, cashTypesPluralArr);

  return resultString;
};

const getChange = (userInput, cashType) => {
  const change = {typeCount: 0, remainder: 0};

  change.typeCount = Math.floor(userInput / cashType);
  change.remainder = Number((userInput % cashType).toFixed(2));

  return change;
}

const getResults = (userInput, cashTypesArr) => {
  let resultsArr = [];
  let change = {typeCount: 0, remainder: userInput};

  for(let i = 0; i < cashTypesArr.length; ++i){
    change = getChange(change.remainder, cashTypesArr[i]);
    resultsArr.push(change.typeCount);
  }

  return resultsArr;
}

const printResults = (resultsArr, cashTypesSingularArr, cashTypesPluralArr) => {
  let resultString = ``;

  for(let i = 0; i < resultsArr.length; ++i){
    if(resultsArr[i] < 1){
      continue;
    } else if(resultsArr[i] === 1){
      resultString += `${resultsArr[i]} ${cashTypesSingularArr[i]}` 
    } else if(resultsArr[i] > 1){
      resultString += `${resultsArr[i]} ${cashTypesPluralArr[i]}`
    } 

    if(i + 1 !== resultsArr.length){
      resultString += `, `;
    }
  }

  return resultString;
} 

// Sample Test Cases
console.log(calculateChange(4.62));
// $4.62 ==> 4 dollars, 2 quarters, 1 dime, 2 pennies
console.log(calculateChange(9.74));
// $9.74 ==> 9 dollars, 2 quarters, 2 dimes, 4 pennies
console.log(calculateChange(0.16));
// $0.16 ==> 1 dime, 1 nickel, 1 penny
console.log(calculateChange(15.11));
// $15.11 ==> Error: the number is too large
