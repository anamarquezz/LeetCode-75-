// ============================================
// Maximum Depth of Binary Tree
// Purpose: Find the maximum depth using DFS
// ============================================
/*
104. Maximum Depth of Binary Tree

Given the root of a binary tree, return its maximum depth.

A binary tree's maximum depth is the number of nodes along the longest path 
from the root node down to the farthest leaf node.

Example 1:
Input: root = [3,9,20,null,null,15,7]
Output: 3

Example 2:
Input: root = [1,null,2]
Output: 2

Constraints:
- The number of nodes in the tree is in the range [0, 10^4].
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
 * @return {number}
 */
var maxDepth = function(root) {
    // Base case: empty tree has depth 0
    if (root === null) {
        return 0;
    }
    
    // DFS: recursively find max depth of left and right subtrees
    const leftDepth = maxDepth(root.left);
    const rightDepth = maxDepth(root.right);
    
    // Return 1 (current node) + max of both subtrees
    return 1 + Math.max(leftDepth, rightDepth);
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

console.log("Test 1:", maxDepth(buildTree([3,9,20,null,null,15,7]))); // Expected: 3
console.log("Test 2:", maxDepth(buildTree([1,null,2]))); // Expected: 2
console.log("Test 3:", maxDepth(buildTree([]))); // Expected: 0
console.log("Test 4:", maxDepth(buildTree([1]))); // Expected: 1

// ============================================
// Explanation
// ============================================
//
// Algorithm: Recursive DFS (Depth-First Search)
// 1. Base case: if node is null, return 0 (no depth)
// 2. Recursively calculate the depth of left subtree
// 3. Recursively calculate the depth of right subtree
// 4. Return 1 + max(leftDepth, rightDepth)
//
// Why DFS works here:
// - DFS naturally explores each path from root to leaf
// - By returning depth values upward, we find the maximum path length
// - Post-order traversal ensures children are processed before parent
//
// Time Complexity: O(n) - visit each node exactly once
// Space Complexity: O(h) - recursion stack, where h is tree height
//                   O(n) worst case for skewed tree, O(log n) for balanced
//
// Example: root = [3,9,20,null,null,15,7]
//        3
//       / \
//      9  20
//        /  \
//       15   7
// 
// DFS traversal:
// - maxDepth(9) = 1 + max(0, 0) = 1
// - maxDepth(15) = 1 + max(0, 0) = 1
// - maxDepth(7) = 1 + max(0, 0) = 1
// - maxDepth(20) = 1 + max(1, 1) = 2
// - maxDepth(3) = 1 + max(1, 2) = 3
