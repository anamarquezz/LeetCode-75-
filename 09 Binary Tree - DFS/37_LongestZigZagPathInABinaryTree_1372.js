// ============================================
// Longest ZigZag Path in a Binary Tree
// Purpose: Find longest zigzag path using DFS
// ============================================
/*
1372. Longest ZigZag Path in a Binary Tree

You are given the root of a binary tree.

A ZigZag path for a binary tree is defined as follow:
- Choose any node in the binary tree and a direction (right or left).
- If the current direction is right, move to the right child of the current node; 
  otherwise, move to the left child.
- Change the direction from right to left or from left to right.
- Repeat the second and third steps until you can't move in the tree.

Zigzag length is defined as the number of nodes visited - 1. 
(A single node has a length of 0).

Return the longest ZigZag path contained in that tree.

Example 1:
Input: root = [1,null,1,1,1,null,null,1,1,null,1,null,null,null,1]
Output: 3
Explanation: Longest ZigZag path in blue nodes (right -> left -> right).

Example 2:
Input: root = [1,1,1,null,1,null,null,1,1,null,1]
Output: 4
Explanation: Longest ZigZag path in blue nodes (left -> right -> left -> right).

Example 3:
Input: root = [1]
Output: 0

Constraints:
- The number of nodes in the tree is in the range [1, 5 * 10^4].
- 1 <= Node.val <= 100
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
var longestZigZag = function(root) {
    let maxLength = 0;
    
    // DFS helper: node, direction we came from, current zigzag length
    // direction: 'left' means we went left to get here, 'right' means we went right
    const dfs = (node, direction, length) => {
        if (node === null) return;
        
        // Update max length
        maxLength = Math.max(maxLength, length);
        
        // If we came from left, going right continues zigzag
        // If we came from right, going left continues zigzag
        if (direction === 'left') {
            // Continue zigzag by going right
            dfs(node.right, 'right', length + 1);
            // Start new zigzag by going left (length resets to 1)
            dfs(node.left, 'left', 1);
        } else {
            // Continue zigzag by going left
            dfs(node.left, 'left', length + 1);
            // Start new zigzag by going right (length resets to 1)
            dfs(node.right, 'right', 1);
        }
    };
    
    // Start DFS from root's children in both directions
    dfs(root.left, 'left', 1);
    dfs(root.right, 'right', 1);
    
    return maxLength;
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

console.log("Test 1:", longestZigZag(buildTree([1,null,1,1,1,null,null,1,1,null,1,null,null,null,1]))); // Expected: 3
console.log("Test 2:", longestZigZag(buildTree([1,1,1,null,1,null,null,1,1,null,1]))); // Expected: 4
console.log("Test 3:", longestZigZag(buildTree([1]))); // Expected: 0

// ============================================
// Explanation
// ============================================
//
// Algorithm: DFS with Direction Tracking
// 1. At each node, track the direction we came from and current zigzag length
// 2. If we continue in the opposite direction, increment length
// 3. If we go in the same direction, reset length to 1 (start new zigzag)
// 4. Track maximum length seen across all paths
//
// Key Insight:
// - At each node, we have two choices: go left or go right
// - One choice continues the zigzag (opposite direction)
// - Other choice starts a new zigzag (same direction, length = 1)
// - We must explore both to find the global maximum
//
// Why DFS works here:
// - DFS naturally explores all paths in the tree
// - We can pass direction and length as parameters
// - Each recursive call handles the zigzag logic
//
// Time Complexity: O(n) - visit each node at most twice
// Space Complexity: O(h) - recursion stack, h is tree height
//
// Example: root = [1,null,1,1,1,null,null,1,1,null,1,null,null,null,1]
//     1
//      \
//       1
//      / \
//     1   1
//        / \
//       1   1
//        \
//         1
//          \
//           1
//
// Longest zigzag: right -> left -> right = 3
// Path: 1 -> (right) -> 1 -> (left) -> 1 -> (right) -> 1
