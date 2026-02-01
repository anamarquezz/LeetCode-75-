// ============================================
// 1926. Nearest Exit from Entrance in Maze
// Purpose: Find shortest path to nearest exit using BFS
// ============================================
/*
1926. Nearest Exit from Entrance in Maze

You are given an m x n matrix maze (0-indexed) with empty cells (represented as '.')
and walls (represented as '+'). You are also given the entrance of the maze,
where entrance = [entrancerow, entrancecol] denotes the row and column of the cell
you are initially standing at.

In one step, you can move one cell up, down, left, or right.
You cannot step into a cell with a wall, and you cannot step outside the maze.
Your goal is to find the nearest exit from the entrance.
An exit is defined as an empty cell that is at the border of the maze.
The entrance does not count as an exit.

Return the number of steps in the shortest path from the entrance to the nearest exit,
or -1 if no such path exists.

Example 1:
Input: maze = [["+","+",".","+"],[".",".",".","+"],["+","+","+","."]], entrance = [1,2]
Output: 1
Explanation: There are 3 exits in this maze at [1,0], [0,2], and [2,3].
Initially, you are at the entrance cell [1,2].
- You can reach [1,0] by moving 2 steps left.
- You can reach [0,2] by moving 1 step up.
It is impossible to reach [2,3] from the entrance.
Thus, the nearest exit is [0,2], which is 1 step away.

Example 2:
Input: maze = [["+","+","+"],[".",".","."],["+","+","+"]], entrance = [1,0]
Output: 2
Explanation: There is 1 exit in this maze at [1,2].
[1,0] does not count as an exit since it is the entrance cell.
Initially, you are at the entrance cell [1,0].
- You can reach [1,2] by moving 2 steps right.
Thus, the nearest exit is [1,2], which is 2 steps away.

Example 3:
Input: maze = [[".","+"]]; entrance = [0,0]
Output: -1
Explanation: There are no exits in this maze.

Constraints:
- maze.length == m
- maze[i].length == n
- 1 <= m, n <= 100
- maze[i][j] is either '.' or '+'.
- entrance.length == 2
- 0 <= entrancerow < m
- 0 <= entrancecol < n
- entrance will always be an empty cell.
*/

// ============================================
// Solution Function - BFS Approach
// ============================================

/**
 * @param {character[][]} maze
 * @param {number[]} entrance
 * @return {number}
 */
var nearestExit = function(maze, entrance) {
    const rows = maze.length;
    const cols = maze[0].length;
    const [startRow, startCol] = entrance;
    
    // Directions: up, down, left, right
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    
    // BFS queue: [row, col, steps]
    const queue = [[startRow, startCol, 0]];
    
    // Mark entrance as visited
    maze[startRow][startCol] = '+';
    
    // Helper function to check if a cell is on the border
    const isOnBorder = (r, c) => {
        return r === 0 || r === rows - 1 || c === 0 || c === cols - 1;
    };
    
    while (queue.length > 0) {
        const [row, col, steps] = queue.shift();
        
        // Explore all 4 directions
        for (const [dr, dc] of directions) {
            const newRow = row + dr;
            const newCol = col + dc;
            
            // Check if within bounds and is an empty cell
            if (newRow >= 0 && newRow < rows &&
                newCol >= 0 && newCol < cols &&
                maze[newRow][newCol] === '.') {
                
                // Check if this is an exit (on border and not entrance)
                if (isOnBorder(newRow, newCol)) {
                    return steps + 1;
                }
                
                // Mark as visited and add to queue
                maze[newRow][newCol] = '+';
                queue.push([newRow, newCol, steps + 1]);
            }
        }
    }
    
    // No exit found
    return -1;
};

// ============================================
// Alternative Solution - BFS with Visited Set
// ============================================

/**
 * @param {character[][]} maze
 * @param {number[]} entrance
 * @return {number}
 */
var nearestExitWithSet = function(maze, entrance) {
    const rows = maze.length;
    const cols = maze[0].length;
    const [startRow, startCol] = entrance;
    
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    const visited = new Set();
    const queue = [[startRow, startCol, 0]];
    
    visited.add(`${startRow},${startCol}`);
    
    const isOnBorder = (r, c) => r === 0 || r === rows - 1 || c === 0 || c === cols - 1;
    
    while (queue.length > 0) {
        const [row, col, steps] = queue.shift();
        
        for (const [dr, dc] of directions) {
            const newRow = row + dr;
            const newCol = col + dc;
            const key = `${newRow},${newCol}`;
            
            if (newRow >= 0 && newRow < rows &&
                newCol >= 0 && newCol < cols &&
                maze[newRow][newCol] === '.' &&
                !visited.has(key)) {
                
                if (isOnBorder(newRow, newCol)) {
                    return steps + 1;
                }
                
                visited.add(key);
                queue.push([newRow, newCol, steps + 1]);
            }
        }
    }
    
    return -1;
};

// ============================================
// Test Cases
// ============================================

// Test Case 1
console.log(nearestExit([["+","+",".","+"],[".",".",".","+"],["+","+","+","."]], [1,2])); 
// Expected: 1

// Test Case 2
console.log(nearestExit([["+","+","+"],[".",".","."],["+","+","+"]], [1,0])); 
// Expected: 2

// Test Case 3
console.log(nearestExit([[".","+"]], [0,0])); 
// Expected: -1

// ============================================
// Complexity Analysis
// ============================================
/*
Time Complexity: O(m * n)
- We visit each cell at most once during BFS
- Each cell is processed and marked in constant time

Space Complexity: O(m * n)
- In the worst case, the queue could contain all cells
- We modify the maze in-place to mark visited cells (or use a visited set)

Algorithm:
1. Start BFS from the entrance
2. Explore all 4 directions at each step
3. For each valid empty cell:
   - If it's on the border (and not the entrance), it's an exit - return steps
   - Otherwise, mark as visited and continue BFS
4. If queue is exhausted without finding an exit, return -1

Key Insight: BFS guarantees the shortest path in an unweighted graph,
so the first exit we reach is the nearest one.
*/