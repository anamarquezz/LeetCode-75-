// ============================================
// Asteroid Collision
// Purpose: Simulate asteroid collisions with stack
// ⭐ ============================================
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

Constraints:
2 <= asteroids.length <= 104
-1000 <= asteroids[i] <= 1000
asteroids[i] != 0
*/

// ============================================
// Solution Function
// ============================================

/**
 * @param {number[]} asteroids
 * @return {number[]}
 */
var asteroidCollision = function(asteroids) {
  const stack = [];

  for (const ast of asteroids) {
    let alive = true;

    // Step 1: Process each asteroid
    while (alive && ast < 0 && stack.length > 0 && stack[stack.length - 1] > 0) {
      const top = stack[stack.length - 1];

      // Step 2: If top asteroid is moving right and current is moving left, collision occurs
      if (top < Math.abs(ast)) {
        // Top asteroid explodes
        stack.pop();
        continue;
      } else if (top === Math.abs(ast)) {
        // Both asteroids explode
        stack.pop();
        alive = false;
      } else {
        // Current asteroid explodes
        alive = false;
      }
    }

    // Step 3: Add asteroid to stack if it survived
    if (alive) {
      stack.push(ast);
    }
  }

  return stack;
};

// ============================================
// Test Cases
// ============================================

console.log("Test 1: [5,10,-5]", asteroidCollision([5,10,-5])); // Expected: [5,10]
console.log("Test 2: [8,-8]", asteroidCollision([8,-8])); // Expected: []
console.log("Test 3: [10,2,-5]", asteroidCollision([10,2,-5])); // Expected: [10]
console.log("Test 4: [3,5,-6,2,-1,4]", asteroidCollision([3,5,-6,2,-1,4])); // Expected: [-6,2,4]

// ============================================
// Explanation
// ============================================
// Algorithm: Stack with Collision Simulation
// 1. Use a stack to track surviving asteroids
// 2. For each asteroid:
//    - If moving right (positive), push to stack (no collision possible)
//    - If moving left (negative), check collision with top of stack
// 3. Collision rules:
//    - Only happens if top is moving right and current is moving left
//    - Compare absolute values to determine survivor
//    - If equal size, both explode
// 4. Return remaining asteroids in stack
//
// Time Complexity:  O(n) - each asteroid is processed once
// Space Complexity: O(n) - stack storage
//
// Example: asteroids = [3,5,-6,2,-1,4]
// Process 3: stack = [3]
// Process 5: stack = [3, 5]
// Process -6: collide with 5 -> 5 explodes, collide with 3 -> 3 explodes, -6 survives -> stack = [-6]
// Process 2: stack = [-6, 2]
// Process -1: collide with 2 -> 2 explodes, stack = [-6]
// Process 4: stack = [-6, 4]
// Result: [-6, 4]