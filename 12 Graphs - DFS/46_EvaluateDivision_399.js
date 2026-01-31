// ============================================
// 399. Evaluate Division
// Purpose: Evaluate division equations using graph representation
// ============================================
/*
399. Evaluate Division

You are given an array of variable pairs equations and an array of real numbers values,
where equations[i] = [Ai, Bi] and values[i] represent the equation Ai / Bi = values[i].
Each Ai or Bi is a string that represents a single variable.

You are also given some queries, where queries[j] = [Cj, Dj] represents the jth query
where you must find the answer for Cj / Dj = ?.

Return the answers to all queries. If a single answer cannot be determined, return -1.0.

Note: The input is always valid. You may assume that evaluating the queries will not
result in division by zero and that there is no contradiction.

Note: The variables that do not occur in the list of equations are undefined,
so the answer cannot be determined for them.

Example 1:
Input: equations = [["a","b"],["b","c"]], values = [2.0,3.0], 
       queries = [["a","c"],["b","a"],["a","e"],["a","a"],["x","x"]]
Output: [6.00000,0.50000,-1.00000,1.00000,-1.00000]
Explanation: 
Given: a / b = 2.0, b / c = 3.0
queries are: a / c = ?, b / a = ?, a / e = ?, a / a = ?, x / x = ? 
return: [6.0, 0.5, -1.0, 1.0, -1.0]
note: x is undefined => -1.0

Example 2:
Input: equations = [["a","b"],["b","c"],["bc","cd"]], values = [1.5,2.5,5.0], 
       queries = [["a","c"],["c","b"],["bc","cd"],["cd","bc"]]
Output: [3.75000,0.40000,5.00000,0.20000]

Example 3:
Input: equations = [["a","b"]], values = [0.5], 
       queries = [["a","b"],["b","a"],["a","c"],["x","y"]]
Output: [0.50000,2.00000,-1.00000,-1.00000]

Constraints:
- 1 <= equations.length <= 20
- equations[i].length == 2
- 1 <= Ai.length, Bi.length <= 5
- values.length == equations.length
- 0.0 < values[i] <= 20.0
- 1 <= queries.length <= 20
- queries[i].length == 2
- 1 <= Cj.length, Dj.length <= 5
- Ai, Bi, Cj, Dj consist of lower case English letters and digits.
*/

// ============================================
// Solution Function - DFS/Graph Approach
// ============================================

/**
 * @param {string[][]} equations
 * @param {number[]} values
 * @param {string[][]} queries
 * @return {number[]}
 */
var calcEquation = function(equations, values, queries) {
    // Build graph: adjacency list with weights
    const graph = new Map();
    
    // Initialize graph and populate with equations
    for (let i = 0; i < equations.length; i++) {
        const [A, B] = equations[i];
        const value = values[i];
        
        // Add forward edge: A -> B with weight = value
        if (!graph.has(A)) graph.set(A, []);
        graph.get(A).push([B, value]);
        
        // Add reverse edge: B -> A with weight = 1/value
        if (!graph.has(B)) graph.set(B, []);
        graph.get(B).push([A, 1 / value]);
    }
    
    // DFS function to find path and compute product
    function dfs(start, end, visited, product) {
        // Base case: if start or end doesn't exist in graph
        if (!graph.has(start) || !graph.has(end)) {
            return -1.0;
        }
        
        // If we reached the destination
        if (start === end) {
            return product;
        }
        
        visited.add(start);
        
        // Explore all neighbors
        const neighbors = graph.get(start) || [];
        for (const [neighbor, weight] of neighbors) {
            if (!visited.has(neighbor)) {
                const result = dfs(neighbor, end, visited, product * weight);
                if (result !== -1.0) {
                    return result;
                }
            }
        }
        
        return -1.0;
    }
    
    // Process each query
    const results = [];
    for (const [C, D] of queries) {
        // Special case: same variable
        if (C === D) {
            if (graph.has(C)) {
                results.push(1.0);
            } else {
                results.push(-1.0);
            }
        } else {
            const visited = new Set();
            results.push(dfs(C, D, visited, 1.0));
        }
    }
    
    return results;
};

// ============================================
// Solution Function - BFS Approach
// ============================================

/**
 * @param {string[][]} equations
 * @param {number[]} values
 * @param {string[][]} queries
 * @return {number[]}
 */
var calcEquationBFS = function(equations, values, queries) {
    // Build graph
    const graph = new Map();
    
    for (let i = 0; i < equations.length; i++) {
        const [A, B] = equations[i];
        const value = values[i];
        
        if (!graph.has(A)) graph.set(A, []);
        if (!graph.has(B)) graph.set(B, []);
        
        graph.get(A).push([B, value]);
        graph.get(B).push([A, 1 / value]);
    }
    
    // BFS function to find path between two nodes
    function bfs(start, end) {
        if (!graph.has(start) || !graph.has(end)) {
            return -1.0;
        }
        
        if (start === end) return 1.0;
        
        const queue = [[start, 1.0]];
        const visited = new Set([start]);
        
        while (queue.length > 0) {
            const [current, product] = queue.shift();
            
            if (current === end) {
                return product;
            }
            
            const neighbors = graph.get(current) || [];
            for (const [neighbor, weight] of neighbors) {
                if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    queue.push([neighbor, product * weight]);
                }
            }
        }
        
        return -1.0;
    }
    
    // Process queries
    return queries.map(([C, D]) => bfs(C, D));
};

// ============================================
// Solution Function - Union-Find with Weights
// ============================================

/**
 * @param {string[][]} equations
 * @param {number[]} values
 * @param {string[][]} queries
 * @return {number[]}
 */
var calcEquationUnionFind = function(equations, values, queries) {
    const parent = new Map();    // Stores parent of each node
    const weight = new Map();    // Stores weight from node to its parent
    
    // Find with path compression and weight accumulation
    function find(x) {
        if (!parent.has(x)) {
            parent.set(x, x);
            weight.set(x, 1.0);
            return [x, 1.0];
        }
        
        if (parent.get(x) === x) {
            return [x, 1.0];
        }
        
        const [root, rootWeight] = find(parent.get(x));
        const currentWeight = weight.get(x);
        
        // Path compression: make x point directly to root
        parent.set(x, root);
        weight.set(x, currentWeight * rootWeight);
        
        return [root, weight.get(x)];
    }
    
    // Union operation
    function union(x, y, value) {
        const [rootX, weightX] = find(x);
        const [rootY, weightY] = find(y);
        
        if (rootX === rootY) return;
        
        // Make rootX parent of rootY
        parent.set(rootY, rootX);
        // Set weight such that: x / y = value
        // We have: x = weightX * rootX, y = weightY * rootY
        // We want: rootX / rootY = (y/x) * value = (weightY/weightX) * value
        weight.set(rootY, (weightX / weightY) * value);
    }
    
    // Build Union-Find structure
    for (let i = 0; i < equations.length; i++) {
        const [A, B] = equations[i];
        const value = values[i];
        union(A, B, value);
    }
    
    // Process queries
    const results = [];
    for (const [C, D] of queries) {
        if (!parent.has(C) || !parent.has(D)) {
            results.push(-1.0);
        } else {
            const [rootC, weightC] = find(C);
            const [rootD, weightD] = find(D);
            
            if (rootC !== rootD) {
                results.push(-1.0);
            } else {
                // C/D = (weightC * root) / (weightD * root) = weightC / weightD
                results.push(weightC / weightD);
            }
        }
    }
    
    return results;
};

// ============================================
// Test Cases
// ============================================

console.log("Test 1 - Example 1:");
const equations1 = [["a","b"],["b","c"]];
const values1 = [2.0, 3.0];
const queries1 = [["a","c"],["b","a"],["a","e"],["a","a"],["x","x"]];
console.log("DFS Result:", calcEquation(equations1, values1, queries1));
console.log("Expected: [6.0, 0.5, -1.0, 1.0, -1.0]");

console.log("\nTest 2 - Example 2:");
const equations2 = [["a","b"],["b","c"],["bc","cd"]];
const values2 = [1.5, 2.5, 5.0];
const queries2 = [["a","c"],["c","b"],["bc","cd"],["cd","bc"]];
console.log("DFS Result:", calcEquation(equations2, values2, queries2));
console.log("Expected: [3.75, 0.4, 5.0, 0.2]");

console.log("\nTest 3 - Example 3:");
const equations3 = [["a","b"]];
const values3 = [0.5];
const queries3 = [["a","b"],["b","a"],["a","c"],["x","y"]];
console.log("DFS Result:", calcEquation(equations3, values3, queries3));
console.log("Expected: [0.5, 2.0, -1.0, -1.0]");

console.log("\nTest 4 - All three methods comparison:");
console.log("DFS:", calcEquation(equations1, values1, queries1));
console.log("BFS:", calcEquationBFS(equations1, values1, queries1));
console.log("Union-Find:", calcEquationUnionFind(equations1, values1, queries1));

console.log("\nTest 5 - Circular relationships:");
const equations5 = [["a","b"],["b","c"],["c","d"],["d","a"]];
const values5 = [2.0, 3.0, 4.0, 0.5]; // a/b=2, b/c=3, c/d=4, d/a=0.5
const queries5 = [["a","d"],["b","d"],["c","a"],["d","b"]];
console.log("DFS Result:", calcEquation(equations5, values5, queries5));
// a/d = a/b * b/c * c/d = 2 * 3 * 4 = 24
// b/d = b/c * c/d = 3 * 4 = 12
// c/a = 1/(a/c) = 1/(a/b * b/c) = 1/(2*3) = 1/6
// d/b = d/a * a/b = 0.5 * 2 = 1

console.log("\nTest 6 - Disconnected components:");
const equations6 = [["a","b"],["c","d"]];
const values6 = [2.0, 3.0];
const queries6 = [["a","c"],["b","d"],["a","b"],["c","d"]];
console.log("DFS Result:", calcEquation(equations6, values6, queries6));
console.log("Expected: [-1.0, -1.0, 2.0, 3.0]");

console.log("\nTest 7 - Self division and undefined:");
const equations7 = [["x","y"]];
const values7 = [1.5];
const queries7 = [["x","x"],["y","y"],["x","y"],["y","x"],["z","z"],["x","z"]];
console.log("DFS Result:", calcEquation(equations7, values7, queries7));
console.log("Expected: [1.0, 1.0, 1.5, 0.666..., -1.0, -1.0]");

console.log("\nTest 8 - Complex chain:");
const equations8 = [["a","b"],["b","c"],["c","d"],["d","e"]];
const values8 = [2.0, 3.0, 4.0, 5.0];
const queries8 = [["a","e"],["e","a"],["b","d"],["d","b"]];
console.log("DFS Result:", calcEquation(equations8, values8, queries8));
// a/e = a/b * b/c * c/d * d/e = 2*3*4*5 = 120
// e/a = 1/120 ≈ 0.00833
// b/d = b/c * c/d = 3*4 = 12
// d/b = 1/12 ≈ 0.0833

// ============================================
// Test Helper Function (Optional)
// ============================================

function testDivisionScenario(description, equations, values, queries, expected) {
    console.log(`\n${description}:`);
    console.log("Equations:", equations);
    console.log("Values:", values);
    console.log("Queries:", queries);
    console.log("Expected:", expected);
    
    const dfsResult = calcEquation(equations, values, queries);
    const bfsResult = calcEquationBFS(equations, values, queries);
    const ufResult = calcEquationUnionFind(equations, values, queries);
    
    console.log("DFS:", dfsResult.map(r => r.toFixed(5)), 
                arraysEqual(dfsResult, expected, 0.00001) ? "✓" : "✗");
    console.log("BFS:", bfsResult.map(r => r.toFixed(5)),
                arraysEqual(bfsResult, expected, 0.00001) ? "✓" : "✗");
    console.log("Union-Find:", ufResult.map(r => r.toFixed(5)),
                arraysEqual(ufResult, expected, 0.00001) ? "✓" : "✗");
}

function arraysEqual(arr1, arr2, tolerance = 0.00001) {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
        if (Math.abs(arr1[i] - arr2[i]) > tolerance) {
            return false;
        }
    }
    return true;
}

// Run alternative test helper
console.log("\n" + "=".repeat(50));
console.log("Alternative Test Format:");
console.log("=".repeat(50));

testDivisionScenario(
    "Simple chain",
    [["a","b"],["b","c"]],
    [2.0, 3.0],
    [["a","c"],["c","a"]],
    [6.0, 1/6]
);

testDivisionScenario(
    "Single equation",
    [["x","y"]],
    [1.5],
    [["x","y"],["y","x"],["x","x"],["z","z"]],
    [1.5, 2/3, 1.0, -1.0]
);

testDivisionScenario(
    "Multiple independent equations",
    [["a","b"],["c","d"],["e","f"]],
    [2.0, 3.0, 4.0],
    [["a","b"],["c","d"],["a","c"],["e","f"]],
    [2.0, 3.0, -1.0, 4.0]
);

// ============================================
// Explanation
// ============================================
//
// Time Complexity:
// - DFS/BFS: O((V+E) * Q) where V is number of variables, E is equations, Q is queries
//   - Building graph: O(E)
//   - Each query: O(V+E) in worst case (traverse entire graph)
//   - Total: O(E + Q*(V+E))
// - Union-Find: O((V+E) + Q*α(V)) where α is inverse Ackermann function
//   - Building Union-Find: O(E * α(V))
//   - Each query: O(α(V))
//   - More efficient for multiple queries
//
// Space Complexity: O(V+E) for all approaches
// - Graph: O(V+E)
// - Visited set: O(V)
// - Union-Find structures: O(V)
//
// Problem Understanding:
// - This is a weighted directed graph problem
// - Variables = nodes
// - Equations = edges with weights representing division results
// - Query a/b = find path from a to b and multiply edge weights
// - Graph is undirected in effect (we add both directions with reciprocal weights)
//
// Key Insights:
// 1. a/b = value implies b/a = 1/value
// 2. a/c = (a/b) * (b/c) if a, b, c are connected
// 3. The problem reduces to finding path between nodes in a graph
// 4. We need to handle disconnected components (return -1)
// 5. Variables not in equations are undefined (return -1)
//
// Algorithm Approaches:
//
// 1. DFS/Graph Approach:
//    - Build adjacency list with reciprocal edges
//    - For each query, perform DFS to find path
//    - Multiply weights along the path
//    - Return -1 if no path exists
//
// 2. BFS Approach:
//    - Similar to DFS but uses queue
//    - Better for finding shortest path (though all paths give same result)
//    - Avoids recursion depth issues
//
// 3. Union-Find with Weights:
//    - More efficient for multiple queries
//    - Stores relationships as weighted union
//    - Path compression maintains direct relationships
//    - Each query is O(α(n)) after preprocessing
//
// Graph Representation:
// - Edge A->B with weight w means A = w * B
// - Edge B->A with weight 1/w means B = (1/w) * A
// - This allows traversal in both directions
//
// Special Cases:
// 1. Same variable query (a/a): Return 1.0 if variable exists
// 2. Undefined variable: Return -1.0
// 3. Disconnected components: Return -1.0
// 4. Division by zero: Guaranteed not to occur by problem statement
//
// Optimization Notes:
// - Since max equations and queries are 20, all approaches are efficient
// - For larger scale, Union-Find is optimal for multiple queries
// - DFS/BFS are simpler to implement and understand
// - All approaches handle floating-point precision reasonably well