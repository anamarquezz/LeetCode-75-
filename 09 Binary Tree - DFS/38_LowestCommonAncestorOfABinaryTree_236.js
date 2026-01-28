// ============================================
// Lowest Common Ancestor of a Binary Tree
// Purpose: Find LCA using DFS recursion
// ============================================
/*
236. Lowest Common Ancestor of a Binary Tree

Given a binary tree, find the lowest common ancestor (LCA) of two given nodes 
in the tree.

According to the definition of LCA on Wikipedia: "The lowest common ancestor 
is defined between two nodes p and q as the lowest node in T that has both 
p and q as descendants (where we allow a node to be a descendant of itself)."

Example 1:
Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
Output: 3
Explanation: The LCA of nodes 5 and 1 is 3.

Example 2:
Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
Output: 5
Explanation: The LCA of nodes 5 and 4 is 5, since a node can be a descendant 
of itself according to the LCA definition.

Example 3:
Input: root = [1,2], p = 1, q = 2
Output: 1

Constraints:
- The number of nodes in the tree is in the range [2, 10^5].
- -10^9 <= Node.val <= 10^9
- All Node.val are unique.
- p != q
- p and q will exist in the tree.
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
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function(root, p, q) {
    // Base case: null node or found p or q
    if (root === null || root === p || root === q) {
        return root;
    }
    
    // DFS: search for p and q in left and right subtrees
    const left = lowestCommonAncestor(root.left, p, q);
    const right = lowestCommonAncestor(root.right, p, q);
    
    // If both left and right are non-null, current node is LCA
    // (p is in one subtree, q is in the other)
    if (left !== null && right !== null) {
        return root;
    }
    
    // Otherwise, return whichever side found something
    // (both p and q are in that subtree, or only one was found)
    return left !== null ? left : right;
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

function findNode(root, val) {
    if (root === null) return null;
    if (root.val === val) return root;
    return findNode(root.left, val) || findNode(root.right, val);
}

// ============================================
// Test Cases
// ============================================

const tree1 = buildTree([3,5,1,6,2,0,8,null,null,7,4]);
const p1 = findNode(tree1, 5);
const q1 = findNode(tree1, 1);
console.log("Test 1:", lowestCommonAncestor(tree1, p1, q1).val); // Expected: 3

const tree2 = buildTree([3,5,1,6,2,0,8,null,null,7,4]);
const p2 = findNode(tree2, 5);
const q2 = findNode(tree2, 4);
console.log("Test 2:", lowestCommonAncestor(tree2, p2, q2).val); // Expected: 5

const tree3 = buildTree([1,2]);
const p3 = findNode(tree3, 1);
const q3 = findNode(tree3, 2);
console.log("Test 3:", lowestCommonAncestor(tree3, p3, q3).val); // Expected: 1

// ============================================
// Explanation
// ============================================
//
// Algorithm: Recursive DFS (Post-order)
// 1. Base case: if node is null, or equals p or q, return node
// 2. Recursively search left and right subtrees
// 3. If both return non-null, current node is LCA
// 4. If only one returns non-null, return that result
//
// Key Insight:
// - If p and q are in different subtrees, their LCA is the split point
// - If one is ancestor of the other, that ancestor is the LCA
// - Post-order ensures we find the LOWEST common ancestor
//
// Why DFS works here:
// - DFS explores the entire tree and bubbles up results
// - When both left and right find something, we've found the LCA
// - The first node where both subtrees return non-null is the answer
//
// Time Complexity: O(n) - visit each node at most once
// Space Complexity: O(h) - recursion stack, h is tree height
//
// Example: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
//         3        <- LCA (left found 5, right found 1)
//        / \
//       5   1
//      / \ / \
//     6  2 0  8
//       / \
//      7   4
//
// DFS traversal:
// - At node 5: matches p, return 5
// - At node 1: matches q, return 1
// - At node 3: left=5 (non-null), right=1 (non-null)
//   -> Both non-null means 3 is the LCA
