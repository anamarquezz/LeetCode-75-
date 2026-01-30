// ============================================
// Binary Tree Right Side View
// Purpose: Return the right side view of a binary tree using BFS
// ============================================
/*
199. Binary Tree Right Side View

Given the root of a binary tree, imagine yourself standing on the right side of it,
return the values of the nodes you can see ordered from top to bottom.

Example 1:
Input: root = [1,2,3,null,5,null,4]
Output: [1,3,4]
Explanation:
     1           <- view
   /   \
  2     3        <- view (3 is rightmost)
   \     \
    5     4      <- view (4 is rightmost)

Example 2:
Input: root = [1,2,3,4,null,null,null,5]
Output: [1,3,4,5]
Explanation:
        1            <- view
      /   \ 
    2     3       <- view (3 is rightmost)
    /
   4         <- view (4 is rightmost)
  /
5          <- view (5 is rightmost)



Constraints:
- The number of nodes in the tree is in the range [0, 100].
- -100 <= Node.val <= 100
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
 * @return {number[]}
 */
var rightSideView = function(root) {
    if (!root) return [];
    
    const result = [];
    const queue = [root];
    
    while (queue.length > 0) {
        const levelSize = queue.length;
        
        // Process all nodes at current level
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            
            // If this is the last node in the level, add to result
            if (i === levelSize - 1) {
                result.push(node.val);
            }
            
            // Add children to queue for next level
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
    }
    
    return result;
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

console.log("Test 1 - Right side view with balanced tree:");
let tree1 = buildTree([1, 2, 3, null, 5, null, 4]);
console.log("Result:", rightSideView(tree1)); // Expected: [1,3,4]

console.log("\nTest 2 - Right side view with skewed tree:");
let tree2 = buildTree([1, 2, 3, 4, null, null, null, 5]);
console.log("Result:", rightSideView(tree2)); // Expected: [1,3,4,5]

console.log("\nTest 3 - Single node tree:");
let tree3 = buildTree([1]);
console.log("Result:", rightSideView(tree3)); // Expected: [1]

console.log("\nTest 4 - Empty tree:");
console.log("Result:", rightSideView(null)); // Expected: []

console.log("\nTest 5 - Right-skewed tree:");
let tree5 = buildTree([1, null, 2, null, 3]);
console.log("Result:", rightSideView(tree5)); // Expected: [1,2,3]

console.log("\nTest 6 - Left-skewed tree:");
let tree6 = buildTree([1, 2, null, 3]);
console.log("Result:", rightSideView(tree6)); // Expected: [1,2,3]

// ============================================
// Explanation
// ============================================
//
// Time Complexity: O(n) where n is the number of nodes
// - We visit each node once
//
// Space Complexity: O(w) where w is the maximum width of the tree
// - Queue stores at most w nodes at a time
//
// Algorithm (Level Order Traversal - BFS):
// 1. Use a queue to perform level-order (breadth-first) traversal
// 2. For each level, process all nodes currently in the queue
// 3. Keep track of the level size to identify the last node
// 4. Add the value of the rightmost node (last node at each level) to result
// 5. Add children to queue for the next level
//
// Why this works:
// - The rightmost node at each level is always the last one we process
// - BFS ensures we visit nodes level by level from left to right
// - The last node processed at each level is the rightmost visible node

