// ============================================
// Equal Row and Column Pairs
// Purpose: Count pairs where row equals column
// ⭐ ============================================
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
1 <= grid[i][j] <= 105
*/

// ============================================
// Solution Function
// ============================================

/**
 * @param {number[][]} grid
 * @return {number}
 */
var equalPairs = function(grid) {
    const n = grid.length;
    let count = 0;

    // Step 1: Store all rows in a hashmap with their string representation as key
    const rowMap = new Map();
    for (let i = 0; i < n; i++) {
        const rowKey = JSON.stringify(grid[i]);
        rowMap.set(rowKey, (rowMap.get(rowKey) || 0) + 1);
    }

    // Step 2: Extract each column and check if it matches any row
    for (let j = 0; j < n; j++) {
        const column = [];
        for (let i = 0; i < n; i++) {
            column.push(grid[i][j]);
        }
        const colKey = JSON.stringify(column);

        // Step 3: If column exists in rowMap, add its count to result
        if (rowMap.has(colKey)) {
            count += rowMap.get(colKey);
        }
    }

    return count;
};

// ============================================
// Test Cases
// ============================================

console.log("Test 1: [[3,2,1],[1,7,6],[2,7,7]]", equalPairs([[3,2,1],[1,7,6],[2,7,7]])); // Expected: 1
console.log("Test 2: [[3,1,2,2],[1,4,4,5],[2,4,2,2],[2,4,2,2]]", equalPairs([[3,1,2,2],[1,4,4,5],[2,4,2,2],[2,4,2,2]])); // Expected: 3
console.log("Test 3: [[13,13],[13,13]]", equalPairs([[13,13],[13,13]])); // Expected: 4

// ============================================
// Explanation
// ============================================
// Algorithm: Hash Map approach
// 1. Store all rows as string keys in a map with their frequency count
// 2. For each column, convert it to the same string format
// 3. Check if the column string exists in the row map
// 4. If it exists, add the frequency count to the result
//
// Time Complexity:  O(n²) - iterate through all rows and columns
// Space Complexity: O(n²) - store all rows in the hashmap
//
// Example: grid = [[3,2,1],[1,7,6],[2,7,7]]
// rowMap = {"[3,2,1]": 1, "[1,7,6]": 1, "[2,7,7]": 1}
// Column 0: [3,1,2] - not in map
// Column 1: [2,7,7] - found in map with count 1, total = 1
// Column 2: [1,6,7] - not in map
// Result: 1