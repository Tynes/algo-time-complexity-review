/*

Types of Complexity
-- Constant - O(1) - Increasing the problem size does not change the number of operations
-- Linear - O(n) - The number of operations is proportional to problem size
-- Quadratic - O(n^2) The number of operations is proportional to the square of the problem size
-- Logarithmic - O(log n) - Multiplying the problem size by constant adds the same number of operations
-- Exponential - O(c^n) - The number of operations is proportional to some constant raised to the power of the problem size
--

Polynomial - O(n^3), O(n^4)...

Determining Complexity
1 - Determine what variables represent problem size (this is n)
2 - Write number of operations in terms of n
  * Lines in series are added
  * Lines nested in other function calls or loops are multiplied
3 - Find leading term and drop coefficients

Native JS Methods - check out the polyfill
Recursive Functions - draw a decision tree

//Example - O(n)
for each page         n
  if cohort is 21     1
    add to list      0/1

//Example - O(n^2)
for each copy
  for each page in copy    n
    write page count       1
    capitalize first name  1
    capitalize last name   1

*/
/////////// Prompt 1 ///////////
/////////// time complexity:
// n is array length
function findMax(array){
  var max = -Infinity; // 1
  for (var i = 0; i < array.length; i++){ // n
    if (array[i] > max){ // 1
      max = array[i]; // 0/1
    }
  }
  return max; // 1
}

// ((1+1)*n) + 1 + 1 = 2n + 2
// O(n)

/////////// Prompt 2 ///////////
/////////// time complexity:
// n is array length
function contains(array, target){
  return array.indexOf(target) > -1; // n
}

// n
// O(n)

/////////// Prompt 3 ///////////
/////////// time complexity:
// n is array length
function partialContains(array, target, start){
  return array.slice(start).indexOf(target) > -1; // n + n (methods happen in series)
}

// O(n)

/////////// Prompt 4 ///////////
/////////// time complexity:
// n is array length
function square(array){
  for (var i = 0; i < 3; i++){ // 3
    array[i] = array[i] * array[i]; //1
  }
  return array; // 1
}

// O(1)

/////////// Prompt 5 ///////////
/////////// time complexity:
// n is array length
function repeat(array){
  var repeat = []; // 1
  for (var j = 0; j < 10; j++){ // 1
    repeat[j] = []; // 1
    for (var i = 0; i < array.length; i++){ // n
      repeat[j].push(array[i]); // 1
    }
  }
  return repeat; // 1
}

// O(n)
//what if we replace 10 with a parameter?
// O(n^2)

/////////// Prompt 6 ///////////
/////////// time complexity:
// n is the smaller of num1 and num2
function gcf(num1, num2){
  if (num1 > num2){ //this ensures num1 is the smaller number
    var temp = num1; //1
    num1 = num2; //1
    num2 = temp; //1
  }
  for (var i = num1; i > 1; i--){ //n
    if (num1 % i === 0 && num2 % i === 0){ //2
      return i; //1
    }
  }
  return 1; //1
}

// O(n)

/////////// Prompt 7 ///////////
/////////// time complexity:
// n is string length
function countChar(string){
  var counts = {}; // 1
  var currChar, currCharCount; // 1
  for (var i = 0; i < string.length; i++){ // n
    currChar = string[i]; // 1
    currCharCount = 1; // 1
    for (var j = i+1; j < string.length; j++){ // (n - j)
      if (currChar === string[j]){ // 1
        currCharCount++; // 1
      }
    }
    if (!counts.hasOwnProperty(currChar)){ // 1
      counts[currChar] = currCharCount; // 1
    }
  }
  return counts; // 1
}

// 3n + (sum of all numbers from 0 to n-1)
// 3n + 1/2(n^2 - n)
//O(n^2)

/////////// Prompt 8 ///////////
/////////// time complexity:
// n is size of num
var factorial = function(num){
  if (num < 0){
    return;
  }
  if (num === 0 || num === 1){
    return 1; 
  } else {
    return num * factorial(num-1);
  }
}

// O(n)

/////////// Prompt 9 ///////////
/////////// time complexity:
// n is number of players
function tournament(players){
  var results;
  if (players.length < 3){
    return players[0];
  } else {
    results = hotPotato(players);
    //assume hotPotato is a function where sets of
    //three players are teleported simultaneously
    //to a room with a potato. at the end of 5 minutes,
    //the player in each room holding the potato is the winner
    //and all winners get teleported to the results array
    return tournament(results);
  }
}

//log base 3 because dividing by 3 each time
//O(log n)

/////////// Prompt 10 ///////////
/////////// time complexity:
// n is maxLength
function allPasswords(allowedChars, maxLength){
  var results = [];

  function findPassword(currentAttempt){
    if (currentAttempt.length > 0){
      results.push(currentAttempt.join(""));
    }
    if (currentAttempt.length <= maxLength){
      for (var i = 0; i < allowedChars.length; i++){
        findPassword(currentAttempt.concat(allowedChars[i]));
      }
    }
  }

  findPassword([]);
  return results;
}

//exponential
// O(c^n)
// c - characters in alphabet
// n - max number of characters in password

/////////// Prompt 11 ///////////
/////////// time complexity:
function findColor(quadTree, coordinates){
  //a quad tree is a tree where each node has 4 children
  //or no children, usually used to divide a two-dimensional
  //space into coordinates
  //coordinates is an array [xpos, ypos]

  if (!Array.isArray(quadTree.color)){
    return quadTree.color;
  } else {
    var quadrant = findQuadrant(quadTree, coordinates);
    if (quadrant === "NE") {
      return findColor(quadTree.color[0], coordinates);
    }
    if (quadrant === "SE") {
      return findColor(quadTree.color[1], coordinates);
    }
    if (quadrant === "SW") {
      return findColor(quadTree.color[2], coordinates);
    }
    if (quadrant === "NW") {
      return findColor(quadTree.color[3], coordinates);
    }
  }

  function findQuadrant(quadTree, coordinates){
    var y = (quadTree.coordinates.top + quadTree.coordinates.bottom)/2;
    var x = (quadTree.coordinates.left + quadTree.coordinates.right)/2;
    if (coordinates[0] > x){
      if (coordinates[1] > y){
        return "NE";
      } else {
        return "SE";
      }
    } else {
      if (coordinates[1] > y){
        return "NW";
      } else {
        return "SW";
      }
    }
  }
}

// log base 4
// O(log n)

/////////// Bonus! ///////////
/////////// time complexity:
//this will require some math to determine
function tournamentRedux(players){
  var results;
  if (players.length < 3){
    return players[0];
  } else {
    for (i = 0; i < players.length; i = i + 3){
      results.push(hotPotato([players[i], players[i+1], players[i+2]]));
      //assume hotPotato is a function where
      //the three players at a time must play hot potato for 5 minutes.
      //the player in the room holding the potato is the winner
      //and gets returned from the function
    }
    return tournament(results);
  }
}
