// ============================================
// Maximum Level Sum of a Binary Tree
// Purpose: Find the level with maximum sum using BFS
// ============================================
/*
1161. Maximum Level Sum of a Binary Tree

Given the root of a binary tree, the level of its root is 1, the level of its children is 2, and so on.

Return the smallest level x such that the sum of all the values of nodes at level x is maximal.

Example 1:
Input: root = [1,7,0,7,-8,null,null]
Output: 2
Explanation: 
Level 1 sum = 1.
Level 2 sum = 7 + 0 = 7.
Level 3 sum = 7 + (-8) = -1.
So we return the level with the maximum sum which is level 2.

Example 2:
Input: root = [989,null,10250,98693,-89388,null,null,null,-32127]
Output: 2

Constraints:
- The number of nodes in the tree is in the range [1, 10^4].
- -10^5 <= Node.val <= 10^5
*/

// ============================================
// TreeNode Definition
// ============================================

function TreeNode(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
}

// ============================================
// Solution Function
// ============================================

/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxLevelSum = function(root) {
    if (!root) return 1;
    
    let maxSum = root.val;
    let maxLevel = 1;
    let currentLevel = 1;
    
    const queue = [root];
    
    while (queue.length > 0) {
        const levelSize = queue.length;
        let levelSum = 0;
        
        // Calculate sum of all nodes at current level
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            levelSum += node.val;
            
            // Add children to queue for next level
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        
        // Update max sum and max level if current level sum is greater
        if (levelSum > maxSum) {
            maxSum = levelSum;
            maxLevel = currentLevel;
        }
        
        currentLevel++;
    }
    
    return maxLevel;
};

// ============================================
// Test Helpers
// ============================================

function buildTree(arr) {
    if (!arr || arr.length === 0 || arr[0] === null) return null;
    
    const root = new TreeNode(arr[0]);
    const queue = [root];
    let i = 1;
    
    while (queue.length > 0 && i < arr.length) {
        const node = queue.shift();
        
        if (i < arr.length && arr[i] !== null) {
            node.left = new TreeNode(arr[i]);
            queue.push(node.left);
        }
        i++;
        
        if (i < arr.length && arr[i] !== null) {
            node.right = new TreeNode(arr[i]);
            queue.push(node.right);
        }
        i++;
    }
    
    return root;
}

// ============================================
// Test Cases
// ============================================

console.log("Test 1 - Maximum level sum (positive and negative):");
let tree1 = buildTree([1, 7, 0, 7, -8, null, null]);
console.log("Result:", maxLevelSum(tree1)); // Expected: 2
console.log("Explanation: Level 1=1, Level 2=7, Level 3=-1, max is Level 2");

console.log("\nTest 2 - Maximum level sum with large positive/negative:");
let tree2 = buildTree([989, null, 10250, 98693, -89388, null, null, null, -32127]);
console.log("Result:", maxLevelSum(tree2)); // Expected: 2

console.log("\nTest 3 - Single node tree:");
let tree3 = buildTree([1]);
console.log("Result:", maxLevelSum(tree3)); // Expected: 1

console.log("\nTest 4 - All positive values:");
let tree4 = buildTree([1, 2, 3, 4, 5, 6, 7]);
console.log("Result:", maxLevelSum(tree4)); // Expected: 3 (sum = 4+5+6+7 = 22)

console.log("\nTest 5 - All negative values:");
let tree5 = buildTree([-1, -2, -3, -4, -5, -6, -7]);
console.log("Result:", maxLevelSum(tree5)); // Expected: 1 (sum = -1, which is largest)

console.log("\nTest 6 - Right-skewed tree:");
let tree6 = buildTree([1, null, 2, null, 3, null, 4]);
console.log("Result:", maxLevelSum(tree6)); // Expected: 4 (sum = 4, which is largest)

// ============================================
// Explanation
// ============================================
//
// Time Complexity: O(n) where n is the number of nodes
// - We visit each node exactly once
//
// Space Complexity: O(w) where w is the maximum width of the tree
// - Queue stores at most w nodes at a time
//
// Algorithm (Level Order Traversal - BFS):
// 1. Use a queue to perform level-order (breadth-first) traversal
// 2. For each level:
//    - Calculate the sum of all node values at that level
//    - Keep track of the level size using queue length
//    - Compare the level sum with the current maximum
// 3. Update max sum and corresponding level number if current level is greater
// 4. Move to next level and repeat until queue is empty
// 5. Return the level with the maximum sum
//
// Key points:
// - Levels are 1-indexed (root is at level 1)
// - We need the SMALLEST level when multiple levels have the same max sum
// - We only update when levelSum > maxSum (not >=), ensuring smallest level
// - BFS naturally processes level by level from top to bottom