// ============================================
// 1466. Reorder Routes to Make All Paths Lead to the City Zero
// Purpose: Minimum edge reversals to make all nodes reach node 0
// ============================================
/*
1466. Reorder Routes to Make All Paths Lead to the City Zero

There are n cities numbered from 0 to n - 1 and n - 1 roads such that 
there is only one way to travel between two different cities (this network form a tree). 
Last year, The ministry of transport decided to orient the roads in one direction 
because they are too narrow.

Roads are represented by connections where connections[i] = [ai, bi] 
represents a road from city ai to city bi.

This year, there will be a big event in the capital (city 0), 
and many people want to travel to this city.

Your task consists of reorienting some roads such that each city can visit the city 0. 
Return the minimum number of edges changed.

It's guaranteed that each city can reach city 0 after reorder.

Example 1:
Input: n = 6, connections = [[0,1],[1,3],[2,3],[4,0],[4,5]]
Output: 3
Explanation: Change the direction of edges show in red such that each node can reach node 0.

Example 2:
Input: n = 5, connections = [[1,0],[1,2],[3,2],[3,4]]
Output: 2
Explanation: Change the direction of edges show in red such that each node can reach node 0.

Example 3:
Input: n = 3, connections = [[1,0],[2,0]]
Output: 0
Explanation: All paths already lead to city 0.

Constraints:
- 2 <= n <= 5 * 10^4
- connections.length == n - 1 (tree structure)
- connections[i].length == 2
- 0 <= ai, bi <= n - 1
- ai != bi
- Guaranteed that each city can reach city 0 after reorder
*/

// ============================================
// Solution Function - DFS Approach
// ============================================

/**
 * @param {number} n
 * @param {number[][]} connections
 * @return {number}
 */
var minReorder = function(n, connections) {
    // Build adjacency list: store both direction and if it's an original edge
    const graph = new Array(n).fill(0).map(() => []);
    
    // Populate the graph
    // We'll store pairs [neighbor, direction] where:
    // direction = 1 if edge is from current -> neighbor (needs reversal)
    // direction = 0 if edge is from neighbor -> current (correct direction)
    for (const [from, to] of connections) {
        graph[from].push([to, 1]); // Original edge from->to, needs reversal
        graph[to].push([from, 0]); // Reverse edge for traversal, correct direction
    }
    
    let changes = 0;
    const visited = new Array(n).fill(false);
    
    // DFS traversal starting from city 0
    function dfs(city) {
        visited[city] = true;
        
        for (const [neighbor, direction] of graph[city]) {
            if (!visited[neighbor]) {
                // If direction is 1, it means the original edge goes FROM current city TO neighbor
                // This is opposite to what we need (we need paths TO city 0)
                // So we need to reverse this edge
                changes += direction;
                dfs(neighbor);
            }
        }
    }
    
    dfs(0);
    return changes;
};

// ============================================
// Solution Function - BFS Approach
// ============================================

/**
 * @param {number} n
 * @param {number[][]} connections
 * @return {number}
 */
var minReorderBFS = function(n, connections) {
    // Build adjacency list
    const graph = new Array(n).fill(0).map(() => []);
    
    for (const [from, to] of connections) {
        graph[from].push([to, 1]); // Original edge, needs reversal
        graph[to].push([from, 0]); // Reverse edge, correct direction
    }
    
    let changes = 0;
    const visited = new Array(n).fill(false);
    const queue = [0];
    visited[0] = true;
    
    while (queue.length > 0) {
        const city = queue.shift();
        
        for (const [neighbor, direction] of graph[city]) {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                changes += direction; // Count edges that need reversal
                queue.push(neighbor);
            }
        }
    }
    
    return changes;
};

// ============================================
// Alternative Solution - Using Set for Original Edges
// ============================================

/**
 * @param {number} n
 * @param {number[][]} connections
 * @return {number}
 */
var minReorderSet = function(n, connections) {
    // Build adjacency list (undirected)
    const graph = new Array(n).fill(0).map(() => []);
    
    // Store original directed edges in a set for quick lookup
    const originalEdges = new Set();
    for (const [from, to] of connections) {
        graph[from].push(to);
        graph[to].push(from);
        originalEdges.add(`${from},${to}`); // Store as string for quick lookup
    }
    
    let changes = 0;
    const visited = new Array(n).fill(false);
    
    function dfs(city) {
        visited[city] = true;
        
        for (const neighbor of graph[city]) {
            if (!visited[neighbor]) {
                // Check if the edge from city->neighbor exists in original edges
                // If it does, it means the edge points away from city 0, so needs reversal
                if (originalEdges.has(`${city},${neighbor}`)) {
                    changes++;
                }
                dfs(neighbor);
            }
        }
    }
    
    dfs(0);
    return changes;
};

// ============================================
// Test Cases
// ============================================

console.log("Test 1 - Example 1:");
const n1 = 6;
const connections1 = [[0,1],[1,3],[2,3],[4,0],[4,5]];
console.log("DFS Result:", minReorder(n1, connections1)); // Expected: 3
console.log("BFS Result:", minReorderBFS(n1, connections1)); // Expected: 3
console.log("Set Result:", minReorderSet(n1, connections1)); // Expected: 3

console.log("\nTest 2 - Example 2:");
const n2 = 5;
const connections2 = [[1,0],[1,2],[3,2],[3,4]];
console.log("DFS Result:", minReorder(n2, connections2)); // Expected: 2
console.log("BFS Result:", minReorderBFS(n2, connections2)); // Expected: 2
console.log("Set Result:", minReorderSet(n2, connections2)); // Expected: 2

console.log("\nTest 3 - Example 3:");
const n3 = 3;
const connections3 = [[1,0],[2,0]];
console.log("DFS Result:", minReorder(n3, connections3)); // Expected: 0
console.log("BFS Result:", minReorderBFS(n3, connections3)); // Expected: 0
console.log("Set Result:", minReorderSet(n3, connections3)); // Expected: 0

console.log("\nTest 4 - Simple 2 cities:");
const n4 = 2;
const connections4 = [[0,1]]; // Edge from 0 to 1 needs reversal
console.log("DFS Result:", minReorder(n4, connections4)); // Expected: 1
console.log("BFS Result:", minReorderBFS(n4, connections4)); // Expected: 1
console.log("Set Result:", minReorderSet(n4, connections4)); // Expected: 1

console.log("\nTest 5 - Star shape with city 0 at center:");
const n5 = 5;
const connections5 = [[0,1],[0,2],[0,3],[0,4]]; // All edges already point to 0
console.log("DFS Result:", minReorder(n5, connections5)); // Expected: 0
console.log("BFS Result:", minReorderBFS(n5, connections5)); // Expected: 0
console.log("Set Result:", minReorderSet(n5, connections5)); // Expected: 0

console.log("\nTest 6 - Linear tree away from 0:");
const n6 = 4;
const connections6 = [[0,1],[1,2],[2,3]]; // All edges point away from 0
console.log("DFS Result:", minReorder(n6, connections6)); // Expected: 3
console.log("BFS Result:", minReorderBFS(n6, connections6)); // Expected: 3
console.log("Set Result:", minReorderSet(n6, connections6)); // Expected: 3

console.log("\nTest 7 - Complex tree:");
const n7 = 7;
const connections7 = [[0,1],[0,2],[1,3],[1,4],[2,5],[2,6]];
console.log("DFS Result:", minReorder(n7, connections7)); // Expected: 0
console.log("BFS Result:", minReorderBFS(n7, connections7)); // Expected: 0
console.log("Set Result:", minReorderSet(n7, connections7)); // Expected: 0

console.log("\nTest 8 - Mixed directions:");
const n8 = 5;
const connections8 = [[0,1],[2,0],[3,1],[4,3]]; // 0->1, 2->0, 3->1, 4->3
console.log("DFS Result:", minReorder(n8, connections8)); // Expected: 2
console.log("BFS Result:", minReorderBFS(n8, connections8)); // Expected: 2
console.log("Set Result:", minReorderSet(n8, connections8)); // Expected: 2

// ============================================
// Test Helper Function (Optional)
// ============================================

function testReorderScenario(description, n, connections, expected) {
    console.log(`\n${description}:`);
    console.log(`n = ${n}, connections = ${JSON.stringify(connections)}`);
    console.log("Expected:", expected);
    
    const dfsResult = minReorder(n, connections);
    const bfsResult = minReorderBFS(n, connections);
    const setResult = minReorderSet(n, connections);
    
    console.log("DFS:", dfsResult, dfsResult === expected ? "✓" : "✗");
    console.log("BFS:", bfsResult, bfsResult === expected ? "✓" : "✗");
    console.log("Set:", setResult, setResult === expected ? "✓" : "✗");
}

// Run alternative test helper
console.log("\n" + "=".repeat(50));
console.log("Alternative Test Format:");
console.log("=".repeat(50));

testReorderScenario("Binary tree with root at 0", 
    7, 
    [[0,1],[0,2],[1,3],[1,4],[2,5],[2,6]], 
    0);

testReorderScenario("All edges point away from 0", 
    4, 
    [[0,1],[1,2],[2,3]], 
    3);

testReorderScenario("All edges point toward 0", 
    4, 
    [[1,0],[2,0],[3,0]], 
    0);

// ============================================
// Explanation
// ============================================
//
// Time Complexity: O(n)
// - We build adjacency list: O(n) since there are n-1 edges
// - We traverse the tree once: O(n) since we visit each node once
// - Total: O(n)
//
// Space Complexity: O(n)
// - Adjacency list: O(n) to store n nodes and n-1 edges
// - Visited array: O(n)
// - DFS recursion stack / BFS queue: O(n) in worst case (linear tree)
//
// Problem Understanding:
// - We have a tree with n nodes and n-1 edges
// - Each edge has a direction (from ai to bi)
// - We want all paths to lead to city 0 (the capital)
// - We can only change edge directions (not add/remove edges)
// - We need minimum number of edge reversals
//
// Key Insights:
// 1. Since it's a tree, there's exactly one path between any two nodes
// 2. To reach city 0 from any node, all edges on that path must point toward 0
// 3. We can start DFS/BFS from city 0 and traverse outward
// 4. When traversing from city A to city B:
//    - If the original edge is A->B, it needs reversal (count it)
//    - If the original edge is B->A, it's already correct (don't count it)
//
// Algorithm Approaches:
//
// 1. DFS/BFS with direction flag:
//    - Build adjacency list with direction information
//    - For each edge, store both directions with flags:
//      - (neighbor, 1) if original edge is current->neighbor
//      - (neighbor, 0) if original edge is neighbor->current
//    - Start traversal from city 0
//    - When moving to neighbor, add direction flag to count
//
// 2. Alternative Set approach:
//    - Store original edges in a set for O(1) lookup
//    - Build undirected adjacency list
//    - During traversal, check if edge exists in original set
//    - If original edge goes away from city 0, count it
//
// Why DFS/BFS from city 0 works:
// - We know all nodes can eventually reach city 0
// - Starting from city 0, we can determine which edges point away from it
// - Each edge pointing away from city 0 needs to be reversed
// - Since it's a tree, we visit each edge exactly once
//
// Optimization Notes:
// - Since n ≤ 5 * 10^4, O(n) solutions are required
// - All three approaches are O(n) time and O(n) space
// - The direction flag approach avoids string operations of the set approach
// - BFS uses iterative approach, avoiding recursion depth limits for large n