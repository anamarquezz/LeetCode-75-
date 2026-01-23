//  ============================================
//  Asteroid Collision
// Purpose: Resolve collisions using a stack
//  ============================================
/*
We are given an array asteroids of integers representing asteroids in a row.
The indices of the asteroid in the array represent their relative position in space.

For each asteroid, the absolute value represents its size, and the sign represents its direction
(positive meaning right, negative meaning left). Each asteroid moves at the same speed.

Find out the state of the asteroids after all collisions. If two asteroids meet, the smaller one
will explode. If both are the same size, both will explode. Two asteroids moving in the same
direction will never meet.

Example 1:
Input: asteroids = [5,10,-5]
Output: [5,10]
Explanation: The 10 and -5 collide resulting in 10. The 5 and 10 never collide.

Example 2:
Input: asteroids = [8,-8]
Output: []
Explanation: The 8 and -8 collide exploding each other.

Example 3:
Input: asteroids = [10,2,-5]
Output: [10]
Explanation: The 2 and -5 collide resulting in -5. The 10 and -5 collide resulting in 10.

Example 4:
Input: asteroids = [3,5,-6,2,-1,4]
Output: [-6,2,4]
Explanation: The asteroid -6 makes the asteroid 3 and 5 explode, and then continues going left.
On the other side, the asteroid 2 makes the asteroid -1 explode and then continues going right,
without reaching asteroid 4.

Constraints:
2 <= asteroids.length <= 10^4
-1000 <= asteroids[i] <= 1000
asteroids[i] != 0
*/

//  ============================================
//  Solution Function
//  ============================================

/**
 * @param {number[]} asteroids
 * @return {number[]}
 */
var asteroidCollision = function(asteroids) {
  const stack = [];

  for (const asteroid of asteroids) {
    let alive = true;

    while (alive && stack.length > 0 && asteroid < 0 && stack[stack.length - 1] > 0) {
      const top = stack[stack.length - 1];
      if (Math.abs(top) < Math.abs(asteroid)) {
        stack.pop();
        continue;
      }
      if (Math.abs(top) === Math.abs(asteroid)) {
        stack.pop();
      }
      alive = false;
    }

    if (alive) stack.push(asteroid);
  }

  return stack;
};

//  ============================================
//  Test Cases
//  ============================================

console.log("Test 1:", asteroidCollision([5,10,-5])); // Expected: [5,10]
console.log("Test 2:", asteroidCollision([8,-8])); // Expected: []
console.log("Test 3:", asteroidCollision([10,2,-5])); // Expected: [10]
console.log("Test 4:", asteroidCollision([3,5,-6,2,-1,4])); // Expected: [-6,2,4]

//  ============================================
//  Explanation
//  ============================================
// Algorithm: Stack
// 1. Iterate through asteroids and compare with the last right-moving one
// 2. While a left-moving asteroid meets a right-moving asteroid, resolve collisions
// 3. Push surviving asteroids to the stack
//
// Time Complexity:  O(n)
// Space Complexity: O(n)