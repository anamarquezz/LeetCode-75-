// ============================================
// 841. Keys and Rooms
// Purpose: Check if all rooms can be visited starting from room 0
// ============================================
/*
841. Keys and Rooms

There are n rooms labeled from 0 to n - 1 and all the rooms are locked except for room 0. 
Your goal is to visit all the rooms. However, you cannot enter a locked room without having its key.

When you visit a room, you may find a set of distinct keys in it. Each key has a number on it, 
denoting which room it unlocks, and you can take all of them with you to unlock the other rooms.

Given an array rooms where rooms[i] is the set of keys that you can obtain if you visited room i, 
return true if you can visit all the rooms, or false otherwise.

Example 1:
Input: rooms = [[1],[2],[3],[]]
Output: true
Explanation: 
We visit room 0 and pick up key 1.
We then visit room 1 and pick up key 2.
We then visit room 2 and pick up key 3.
We then visit room 3.
Since we were able to visit every room, we return true.

Example 2:
Input: rooms = [[1,3],[3,0,1],[2],[0]]
Output: false
Explanation: We can not enter room number 2 since the only key that unlocks it is in that room.

Constraints:
- n == rooms.length
- 2 <= n <= 1000
- 0 <= rooms[i].length <= 1000
- 1 <= sum(rooms[i].length) <= 3000
- 0 <= rooms[i][j] < n
- All the values of rooms[i] are unique.
*/

// ============================================
// Solution Function - DFS Approach
// ============================================

/**
 * @param {number[][]} rooms
 * @return {boolean}
 */
var canVisitAllRooms = function(rooms) {
    const n = rooms.length;
    const visited = new Set();
    
    // Depth-First Search to visit all accessible rooms
    function dfs(room) {
        // Mark current room as visited
        visited.add(room);
        
        // Try to visit all rooms we have keys for
        for (const key of rooms[room]) {
            if (!visited.has(key)) {
                dfs(key);
            }
        }
    }
    
    // Start DFS from room 0 (the only initially unlocked room)
    dfs(0);
    
    // Check if all rooms have been visited
    return visited.size === n;
};

// ============================================
// Solution Function - BFS Approach
// ============================================

/**
 * @param {number[][]} rooms
 * @return {boolean}
 */
var canVisitAllRoomsBFS = function(rooms) {
    const n = rooms.length;
    const visited = new Set([0]); // Start with room 0 visited
    const queue = [0]; // BFS queue starting from room 0
    
    while (queue.length > 0) {
        const currentRoom = queue.shift();
        
        // Process all keys in the current room
        for (const key of rooms[currentRoom]) {
            if (!visited.has(key)) {
                visited.add(key);
                queue.push(key);
            }
        }
    }
    
    // Check if we visited all rooms
    return visited.size === n;
};

// ============================================
// Test Cases
// ============================================

console.log("Test 1 - All rooms accessible:");
const rooms1 = [[1], [2], [3], []];
console.log("DFS Result:", canVisitAllRooms(rooms1)); // Expected: true
console.log("BFS Result:", canVisitAllRoomsBFS(rooms1)); // Expected: true

console.log("\nTest 2 - Room 2 inaccessible:");
const rooms2 = [[1,3], [3,0,1], [2], [0]];
console.log("DFS Result:", canVisitAllRooms(rooms2)); // Expected: false
console.log("BFS Result:", canVisitAllRoomsBFS(rooms2)); // Expected: false

console.log("\nTest 3 - Circular access but all reachable:");
const rooms3 = [[1], [2], [0], []];
console.log("DFS Result:", canVisitAllRooms(rooms3)); // Expected: true
console.log("BFS Result:", canVisitAllRoomsBFS(rooms3)); // Expected: true

console.log("\nTest 4 - Single room:");
const rooms4 = [[]];
console.log("DFS Result:", canVisitAllRooms(rooms4)); // Expected: true
console.log("BFS Result:", canVisitAllRoomsBFS(rooms4)); // Expected: true

console.log("\nTest 5 - Disconnected rooms:");
const rooms5 = [[1], [0], [3], [2]];
console.log("DFS Result:", canVisitAllRooms(rooms5)); // Expected: false
console.log("BFS Result:", canVisitAllRoomsBFS(rooms5)); // Expected: false

console.log("\nTest 6 - Complex case with multiple paths:");
const rooms6 = [[1,3], [2], [], [1]];
console.log("DFS Result:", canVisitAllRooms(rooms6)); // Expected: true
console.log("BFS Result:", canVisitAllRoomsBFS(rooms6)); // Expected: true

// ============================================
// Alternative Test Helper (Optional)
// ============================================

function testRoomScenario(description, rooms, expected) {
    console.log(`\n${description}:`);
    console.log("Rooms:", JSON.stringify(rooms));
    console.log("Expected:", expected);
    console.log("DFS Actual:", canVisitAllRooms(rooms), 
                "-", canVisitAllRooms(rooms) === expected ? "✓" : "✗");
    console.log("BFS Actual:", canVisitAllRoomsBFS(rooms),
                "-", canVisitAllRoomsBFS(rooms) === expected ? "✓" : "✗");
}

// Run alternative test helper
console.log("\n" + "=".repeat(50));
console.log("Alternative Test Format:");
console.log("=".repeat(50));

testRoomScenario("All rooms sequentially accessible", 
                 [[1], [2], [3], []], true);

testRoomScenario("Room 2 locked (key in itself)", 
                 [[1,3], [3,0,1], [2], [0]], false);

testRoomScenario("Three rooms in cycle", 
                 [[1], [2], [0]], true);

// ============================================
// Explanation
// ============================================
//
// Time Complexity: O(n + k) where n is number of rooms and k is total number of keys
// - We visit each room at most once (O(n))
// - We process each key at most once (O(k))
// - Total: O(n + k)
//
// Space Complexity: O(n)
// - visited Set stores at most n rooms
// - DFS recursion stack / BFS queue can store at most n rooms
//
// Algorithm Approach:
// 1. DFS Approach:
//    - Start DFS from room 0 (the only initially unlocked room)
//    - Mark each visited room
//    - Recursively visit all rooms for which we have keys
//    - Check if number of visited rooms equals total rooms
//
// 2. BFS Approach:
//    - Start BFS from room 0
//    - Use queue to process rooms level by level
//    - Add unvisited rooms to queue when we find their keys
//    - Check if all rooms are visited
//
// Both approaches are valid and have similar time/space complexity.
// The choice depends on whether you prefer DFS (recursive/stack) or BFS (queue).
//
// Graph Theory Perspective:
// - Rooms are vertices/nodes
// - Keys are directed edges
// - Problem reduces to: "Can we visit all nodes starting from node 0?"
// - This is essentially checking connectivity in a directed graph
//
// Key Insight:
// - We can only enter rooms for which we have keys
// - Starting from room 0, we collect keys and expand our reach
// - If we can't reach all rooms, return false
// - The problem constraints ensure no duplicate keys in any room