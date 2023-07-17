//using this to test build of random number generation
//use this function within the dataGeneration file for imports

function numberRange(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random()*(max-min + 1)) + min;
}

function dateInRange(){
 return Math.floor(Math.random() * 28) + 1;
}

console.log(numberRange(1000, 100000000000));
console.log(dateInRange())

export{numberRange}
export{dateInRange}