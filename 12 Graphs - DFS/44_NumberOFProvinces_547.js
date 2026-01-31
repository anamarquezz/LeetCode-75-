// ============================================
// 547. Number of Provinces
// Purpose: Count connected components in an undirected graph
// ============================================
/*
547. Number of Provinces

There are n cities. Some of them are connected, while some are not. 
If city a is connected directly with city b, and city b is connected directly with city c, 
then city a is connected indirectly with city c.

A province is a group of directly or indirectly connected cities and 
no other cities outside of the group.

You are given an n x n matrix isConnected where isConnected[i][j] = 1 
if the ith city and the jth city are directly connected, 
and isConnected[i][j] = 0 otherwise.

Return the total number of provinces.

Example 1:
Input: isConnected = [[1,1,0],[1,1,0],[0,0,1]]
Output: 2
Explanation: Cities 0 and 1 are connected, city 2 is separate.

Example 2:
Input: isConnected = [[1,0,0],[0,1,0],[0,0,1]]
Output: 3
Explanation: All cities are disconnected from each other.

Constraints:
- 1 <= n <= 200
- n == isConnected.length
- n == isConnected[i].length
- isConnected[i][j] is 1 or 0
- isConnected[i][i] == 1 (each city is connected to itself)
- isConnected[i][j] == isConnected[j][i] (undirected graph)
*/

// ============================================
// Solution Function - DFS Approach
// ============================================

/**
 * @param {number[][]} isConnected
 * @return {number}
 */
var findCircleNum = function(isConnected) {
    const n = isConnected.length;
    const visited = new Array(n).fill(false);
    let provinces = 0;
    
    // Depth-First Search to mark all cities in the same province
    function dfs(city) {
        visited[city] = true;
        
        // Check all other cities for connections
        for (let neighbor = 0; neighbor < n; neighbor++) {
            // If cities are connected and neighbor hasn't been visited
            if (isConnected[city][neighbor] === 1 && !visited[neighbor]) {
                dfs(neighbor);
            }
        }
    }
    
    // Iterate through all cities
    for (let city = 0; city < n; city++) {
        if (!visited[city]) {
            // Start a new province
            provinces++;
            dfs(city);
        }
    }
    
    return provinces;
};

// ============================================
// Solution Function - BFS Approach
// ============================================

/**
 * @param {number[][]} isConnected
 * @return {number}
 */
var findCircleNumBFS = function(isConnected) {
    const n = isConnected.length;
    const visited = new Array(n).fill(false);
    let provinces = 0;
    
    for (let city = 0; city < n; city++) {
        if (!visited[city]) {
            provinces++;
            
            // BFS queue
            const queue = [city];
            visited[city] = true;
            
            while (queue.length > 0) {
                const current = queue.shift();
                
                // Check all connections from current city
                for (let neighbor = 0; neighbor < n; neighbor++) {
                    if (isConnected[current][neighbor] === 1 && !visited[neighbor]) {
                        visited[neighbor] = true;
                        queue.push(neighbor);
                    }
                }
            }
        }
    }
    
    return provinces;
};

// ============================================
// Solution Function - Union-Find Approach
// ============================================

/**
 * @param {number[][]} isConnected
 * @return {number}
 */
var findCircleNumUnionFind = function(isConnected) {
    const n = isConnected.length;
    
    // Initialize Union-Find data structure
    const parent = new Array(n);
    for (let i = 0; i < n; i++) {
        parent[i] = i; // Each city is its own parent initially
    }
    
    // Find with path compression
    function find(x) {
        if (parent[x] !== x) {
            parent[x] = find(parent[x]); // Path compression
        }
        return parent[x];
    }
    
    // Union operation
    function union(x, y) {
        const rootX = find(x);
        const rootY = find(y);
        if (rootX !== rootY) {
            parent[rootY] = rootX;
        }
    }
    
    // Process all connections
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            if (isConnected[i][j] === 1) {
                union(i, j);
            }
        }
    }
    
    // Count distinct roots (provinces)
    const roots = new Set();
    for (let i = 0; i < n; i++) {
        roots.add(find(i));
    }
    
    return roots.size;
};

// ============================================
// Test Cases
// ============================================

console.log("Test 1 - Two provinces:");
const matrix1 = [
    [1, 1, 0],
    [1, 1, 0],
    [0, 0, 1]
];
console.log("DFS Result:", findCircleNum(matrix1)); // Expected: 2
console.log("BFS Result:", findCircleNumBFS(matrix1)); // Expected: 2
console.log("Union-Find Result:", findCircleNumUnionFind(matrix1)); // Expected: 2

console.log("\nTest 2 - Three provinces (disconnected):");
const matrix2 = [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1]
];
console.log("DFS Result:", findCircleNum(matrix2)); // Expected: 3
console.log("BFS Result:", findCircleNumBFS(matrix2)); // Expected: 3
console.log("Union-Find Result:", findCircleNumUnionFind(matrix2)); // Expected: 3

console.log("\nTest 3 - One province (fully connected 3 cities):");
const matrix3 = [
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1]
];
console.log("DFS Result:", findCircleNum(matrix3)); // Expected: 1
console.log("BFS Result:", findCircleNumBFS(matrix3)); // Expected: 1
console.log("Union-Find Result:", findCircleNumUnionFind(matrix3)); // Expected: 1

console.log("\nTest 4 - Chain of cities (1 province):");
const matrix4 = [
    [1, 1, 0, 0],
    [1, 1, 1, 0],
    [0, 1, 1, 1],
    [0, 0, 1, 1]
];
console.log("DFS Result:", findCircleNum(matrix4)); // Expected: 1
console.log("BFS Result:", findCircleNumBFS(matrix4)); // Expected: 1
console.log("Union-Find Result:", findCircleNumUnionFind(matrix4)); // Expected: 1

console.log("\nTest 5 - Four cities, two pairs:");
const matrix5 = [
    [1, 1, 0, 0],
    [1, 1, 0, 0],
    [0, 0, 1, 1],
    [0, 0, 1, 1]
];
console.log("DFS Result:", findCircleNum(matrix5)); // Expected: 2
console.log("BFS Result:", findCircleNumBFS(matrix5)); // Expected: 2
console.log("Union-Find Result:", findCircleNumUnionFind(matrix5)); // Expected: 2

console.log("\nTest 6 - Single city:");
const matrix6 = [[1]];
console.log("DFS Result:", findCircleNum(matrix6)); // Expected: 1
console.log("BFS Result:", findCircleNumBFS(matrix6)); // Expected: 1
console.log("Union-Find Result:", findCircleNumUnionFind(matrix6)); // Expected: 1

console.log("\nTest 7 - Complex 5 cities:");
const matrix7 = [
    [1, 0, 0, 0, 1],
    [0, 1, 1, 0, 0],
    [0, 1, 1, 0, 0],
    [0, 0, 0, 1, 0],
    [1, 0, 0, 0, 1]
];
console.log("DFS Result:", findCircleNum(matrix7)); // Expected: 3
console.log("BFS Result:", findCircleNumBFS(matrix7)); // Expected: 3
console.log("Union-Find Result:", findCircleNumUnionFind(matrix7)); // Expected: 3

// ============================================
// Test Helper Function (Optional)
// ============================================

function testProvinceScenario(description, matrix, expected) {
    console.log(`\n${description}:`);
    console.log("Matrix:", matrix.map(row => `[${row.join(',')}]`).join(', '));
    console.log("Expected:", expected);
    
    const dfsResult = findCircleNum(matrix);
    const bfsResult = findCircleNumBFS(matrix);
    const ufResult = findCircleNumUnionFind(matrix);
    
    console.log("DFS:", dfsResult, dfsResult === expected ? "✓" : "✗");
    console.log("BFS:", bfsResult, bfsResult === expected ? "✓" : "✗");
    console.log("Union-Find:", ufResult, ufResult === expected ? "✓" : "✗");
}

// Run alternative test helper
console.log("\n" + "=".repeat(50));
console.log("Alternative Test Format:");
console.log("=".repeat(50));

testProvinceScenario("Triangle connection", 
    [[1,1,0],[1,1,1],[0,1,1]], 1);

testProvinceScenario("Star connection", 
    [[1,1,1,1],[1,1,0,0],[1,0,1,0],[1,0,0,1]], 1);

testProvinceScenario("Two separate groups with isolated node", 
    [[1,1,0,0],[1,1,0,0],[0,0,1,0],[0,0,0,1]], 3);

// ============================================
// Explanation
// ============================================
//
// Time Complexity:
// - DFS/BFS: O(n²) where n is number of cities
//   - We might check all n² connections in worst case
//   - Actually O(n + connections) but connections can be O(n²)
// - Union-Find: O(n² * α(n)) where α is inverse Ackermann function (very slow growing)
//
// Space Complexity:
// - DFS: O(n) for visited array and recursion stack (O(n) in worst case)
// - BFS: O(n) for visited array and queue
// - Union-Find: O(n) for parent array
//
// Problem Understanding:
// - This is essentially finding the number of connected components in an undirected graph
// - Cities = vertices/nodes
// - isConnected[i][j] = 1 means there's an edge between city i and city j
// - Self-connections (diagonal) are always 1 (each city connects to itself)
// - Graph is undirected (matrix is symmetric)
//
// Algorithm Approaches:
//
// 1. DFS Approach:
//    - Use visited array to track visited cities
//    - For each unvisited city, start DFS to mark all connected cities
//    - Each DFS call discovers one province
//    - Count the number of DFS starts
//
// 2. BFS Approach:
//    - Similar to DFS but uses queue instead of recursion
//    - For each unvisited city, start BFS to visit all connected cities
//    - Count the number of BFS starts
//
// 3. Union-Find Approach:
//    - Treat each city as its own set initially
//    - Union cities that are directly connected
//    - Count distinct roots at the end
//    - More efficient for dynamic graphs
//
// Key Insights:
// - The diagonal is always 1 (self-connection), but this doesn't affect province count
// - Matrix is symmetric, confirming it's an undirected graph
// - A province is a connected component in graph theory terms
// - All three approaches will give the same result
//
// Optimization Notes:
// - For dense graphs (many connections), BFS/DFS might be simpler
// - For very large n, Union-Find with path compression is efficient
// - Since n ≤ 200, all approaches are acceptable