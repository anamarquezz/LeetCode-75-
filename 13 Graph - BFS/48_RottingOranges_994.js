// ============================================
// 994. Rotting Oranges
// Purpose: Find minimum time for all oranges to rot using BFS
// ============================================
/*
994. Rotting Oranges

You are given an m x n grid where each cell can have one of three values:
- 0 representing an empty cell,
- 1 representing a fresh orange, or
- 2 representing a rotten orange.

Every minute, any fresh orange that is 4-directionally adjacent to a rotten orange becomes rotten.

Return the minimum number of minutes that must elapse until no cell has a fresh orange.
If this is impossible, return -1.

Example 1:
Input: grid = [[2,1,1],[1,1,0],[0,1,1]]
Output: 4

Example 2:
Input: grid = [[2,1,1],[0,1,1],[1,0,1]]
Output: -1
Explanation: The orange in the bottom left corner (row 2, column 0) is never rotten,
because rotting only happens 4-directionally.

Example 3:
Input: grid = [[0,2]]
Output: 0
Explanation: Since there are already no fresh oranges at minute 0, the answer is just 0.

Constraints:
- m == grid.length
- n == grid[i].length
- 1 <= m, n <= 10
- grid[i][j] is 0, 1, or 2.
*/

// ============================================
// Solution Function - BFS Approach
// ============================================

/**
 * @param {number[][]} grid
 * @return {number}
 */
var orangesRotting = function(grid) {
    const rows = grid.length;
    const cols = grid[0].length;
    const queue = [];
    let freshCount = 0;
    
    // Step 1: Initialize queue with all rotten oranges and count fresh oranges
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] === 2) {
                queue.push([r, c, 0]); // [row, col, minutes]
            } else if (grid[r][c] === 1) {
                freshCount++;
            }
        }
    }
    
    // If no fresh oranges, return 0
    if (freshCount === 0) return 0;
    
    // Directions: up, down, left, right
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    let minutes = 0;
    
    // Step 2: BFS - Process level by level
    while (queue.length > 0) {
        const [row, col, time] = queue.shift();
        
        for (const [dr, dc] of directions) {
            const newRow = row + dr;
            const newCol = col + dc;
            
            // Check bounds and if it's a fresh orange
            if (newRow >= 0 && newRow < rows && 
                newCol >= 0 && newCol < cols && 
                grid[newRow][newCol] === 1) {
                
                // Mark as rotten
                grid[newRow][newCol] = 2;
                freshCount--;
                minutes = time + 1;
                queue.push([newRow, newCol, time + 1]);
            }
        }
    }
    
    // Return -1 if there are still fresh oranges
    return freshCount === 0 ? minutes : -1;
};

// ============================================
// Alternative Solution - BFS with Level Processing
// ============================================

/**
 * @param {number[][]} grid
 * @return {number}
 */
var orangesRottingLevelBFS = function(grid) {
    const rows = grid.length;
    const cols = grid[0].length;
    let queue = [];
    let freshCount = 0;
    
    // Initialize
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] === 2) {
                queue.push([r, c]);
            } else if (grid[r][c] === 1) {
                freshCount++;
            }
        }
    }
    
    if (freshCount === 0) return 0;
    
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    let minutes = 0;
    
    // Process level by level (all oranges that rot at the same minute)
    while (queue.length > 0 && freshCount > 0) {
        const size = queue.length;
        minutes++;
        
        for (let i = 0; i < size; i++) {
            const [row, col] = queue.shift();
            
            for (const [dr, dc] of directions) {
                const newRow = row + dr;
                const newCol = col + dc;
                
                if (newRow >= 0 && newRow < rows && 
                    newCol >= 0 && newCol < cols && 
                    grid[newRow][newCol] === 1) {
                    
                    grid[newRow][newCol] = 2;
                    freshCount--;
                    queue.push([newRow, newCol]);
                }
            }
        }
    }
    
    return freshCount === 0 ? minutes : -1;
};

// ============================================
// Test Cases
// ============================================

// Test Case 1
console.log(orangesRotting([[2,1,1],[1,1,0],[0,1,1]])); // Expected: 4

// Test Case 2
console.log(orangesRotting([[2,1,1],[0,1,1],[1,0,1]])); // Expected: -1

// Test Case 3
console.log(orangesRotting([[0,2]])); // Expected: 0

// ============================================
// Complexity Analysis
// ============================================
/*
Time Complexity: O(m * n)
- We visit each cell at most once during BFS
- Initial scan takes O(m * n) time

Space Complexity: O(m * n)
- In the worst case, all cells could be rotten oranges in the queue

Algorithm:
1. Multi-source BFS starting from all rotten oranges simultaneously
2. Each level of BFS represents one minute passing
3. Track fresh orange count and decrement as they rot
4. Return total minutes or -1 if fresh oranges remain
*/