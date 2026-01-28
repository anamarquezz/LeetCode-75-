//  ============================================
//  Equal Row and Column Pairs
// Purpose: Count matching rows/columns using a hash map
//  ============================================
/*
Given a 0-indexed n x n integer matrix grid, return the number of pairs (ri, cj) such that row ri and column cj are equal.

A row and column pair is considered equal if they contain the same elements in the same order (i.e., an equal array).

Example 1:
Input: grid = [[3,2,1],[1,7,6],[2,7,7]]
Output: 1
Explanation: There is 1 equal row and column pair:
- (Row 2, Column 1): [2,7,7]

Example 2:
Input: grid = [[3,1,2,2],[1,4,4,5],[2,4,2,2],[2,4,2,2]]
Output: 3
Explanation: There are 3 equal row and column pairs:
- (Row 0, Column 0): [3,1,2,2]
- (Row 2, Column 2): [2,4,2,2]
- (Row 3, Column 2): [2,4,2,2]

Constraints:
n == grid.length == grid[i].length
1 <= n <= 200
1 <= grid[i][j] <= 10^5
*/

//  ============================================
//  Solution Function
//  ============================================

/**
 * @param {number[][]} grid
 * @return {number}
 */
var equalPairs = function(grid) {
  const n = grid.length;
  const rowCounts = new Map();

  // Step 1: Store each row signature in a hash map
  for (let r = 0; r < n; r++) {
    const key = grid[r].join("#");
    rowCounts.set(key, (rowCounts.get(key) || 0) + 1);
  }

  // Step 2: Build each column signature and count matches
  let pairs = 0;
  for (let c = 0; c < n; c++) {
    const column = [];
    for (let r = 0; r < n; r++) {
      column.push(grid[r][c]);
    }
    const key = column.join("#");
    if (rowCounts.has(key)) {
      pairs += rowCounts.get(key);
    }
  }

  return pairs;
};

//  ============================================
//  Test Cases
//  ============================================

console.log("Test 1:", equalPairs([[3,2,1],[1,7,6],[2,7,7]])); // Expected: 1
console.log("Test 2:", equalPairs([[3,1,2,2],[1,4,4,5],[2,4,2,2],[2,4,2,2]])); // Expected: 3
console.log("Test 3:", equalPairs([[1,1],[1,1]])); // Expected: 4

//  ============================================
//  Explanation
//  ============================================
// Algorithm: Hash Map
// 1. Convert each row into a string key and count occurrences in a map
// 2. For each column, build its key and add the map count to the answer
//
// Time Complexity:  O(n^2) - build rows and columns
// Space Complexity: O(n^2) - stored row keys