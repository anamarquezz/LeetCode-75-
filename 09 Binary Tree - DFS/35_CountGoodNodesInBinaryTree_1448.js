// ============================================
// Count Good Nodes in Binary Tree
// Purpose: Count nodes using DFS with max tracking
// ============================================
/*
1448. Count Good Nodes in Binary Tree

Given a binary tree root, a node X in the tree is named good if in the path 
from root to X there are no nodes with a value greater than X.

Return the number of good nodes in the binary tree.

Example 1:
Input: root = [3,1,4,3,null,1,5]
Output: 4
Explanation: Nodes in blue are good.
- Root Node (3) is always a good node.
- Node 4 -> (3,4) is the maximum value in the path starting from the root.
- Node 5 -> (3,4,5) is the maximum value in the path
- Node 3 -> (3,1,3) is the maximum value in the path.

Example 2:
Input: root = [3,3,null,4,2]
Output: 3
Explanation: Node 2 -> (3, 3, 2) is not good, because "3" is higher than it.

Example 3:
Input: root = [1]
Output: 1
Explanation: Root is considered as good.

Constraints:
- The number of nodes in the binary tree is in the range [1, 10^5].
- Each node's value is between [-10^4, 10^4].
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
var goodNodes = function(root) {
    // DFS helper function that tracks maximum value in path
    const dfs = (node, maxSoFar) => {
        if (node === null) return 0;
        
        let count = 0;
        
        // If current node's value >= max in path, it's a good node
        if (node.val >= maxSoFar) {
            count = 1;
            maxSoFar = node.val; // Update max for children
        }
        
        // DFS: count good nodes in left and right subtrees
        count += dfs(node.left, maxSoFar);
        count += dfs(node.right, maxSoFar);
        
        return count;
    };
    
    // Start DFS from root with initial max as root's value
    return dfs(root, root.val);
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

console.log("Test 1:", goodNodes(buildTree([3,1,4,3,null,1,5]))); // Expected: 4
console.log("Test 2:", goodNodes(buildTree([3,3,null,4,2]))); // Expected: 3
console.log("Test 3:", goodNodes(buildTree([1]))); // Expected: 1

// ============================================
// Explanation
// ============================================
//
// Algorithm: DFS with Maximum Path Tracking
// 1. Start DFS from root, tracking the maximum value seen so far
// 2. At each node, check if current value >= maxSoFar
// 3. If yes, increment count and update maxSoFar
// 4. Recursively count good nodes in both subtrees
// 5. Return total count
//
// Why DFS works here:
// - DFS naturally follows paths from root to leaves
// - We can pass maxSoFar as parameter down the recursion
// - Each path maintains its own maximum value context
//
// Time Complexity: O(n) - visit each node exactly once
// Space Complexity: O(h) - recursion stack, h is tree height
//
// Example: root = [3,1,4,3,null,1,5]
//        3 (good, max=3)
//       / \
//      1   4 (good, max=4)
//     /   / \
//    3   1   5 (good, max=5)
//  (good)
// 
// DFS traversal:
// - Node 3 (root): val=3 >= max=3 -> good, count=1
// - Node 1: val=1 < max=3 -> not good
// - Node 3 (child): val=3 >= max=3 -> good, count=2
// - Node 4: val=4 >= max=3 -> good, count=3
// - Node 1 (child of 4): val=1 < max=4 -> not good
// - Node 5: val=5 >= max=4 -> good, count=4
