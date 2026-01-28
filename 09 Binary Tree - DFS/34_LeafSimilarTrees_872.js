// ============================================
// Leaf-Similar Trees
// Purpose: Compare leaf sequences using DFS
// ============================================
/*
872. Leaf-Similar Trees

Consider all the leaves of a binary tree, from left to right order, 
the values of those leaves form a leaf value sequence.

Two binary trees are considered leaf-similar if their leaf value sequence is the same.

Return true if and only if the two given trees with head nodes root1 and root2 
are leaf-similar.

Example 1:
Input: root1 = [3,5,1,6,2,9,8,null,null,7,4], root2 = [3,5,1,6,7,4,2,null,null,null,null,null,null,9,8]
Output: true

Example 2:
Input: root1 = [1,2,3], root2 = [1,3,2]
Output: false

Constraints:
- The number of nodes in each tree will be in the range [1, 200].
- Both of the given trees will have values in the range [0, 200].
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
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {boolean}
 */
var leafSimilar = function(root1, root2) {
    // Helper function to collect leaves using DFS
    const getLeaves = (node, leaves) => {
        if (node === null) return;
        
        // If it's a leaf node, add to leaves array
        if (node.left === null && node.right === null) {
            leaves.push(node.val);
            return;
        }
        
        // DFS: traverse left first, then right (ensures left-to-right order)
        getLeaves(node.left, leaves);
        getLeaves(node.right, leaves);
    };
    
    // Collect leaves from both trees
    const leaves1 = [];
    const leaves2 = [];
    
    getLeaves(root1, leaves1);
    getLeaves(root2, leaves2);
    
    // Compare leaf sequences
    if (leaves1.length !== leaves2.length) return false;
    
    for (let i = 0; i < leaves1.length; i++) {
        if (leaves1[i] !== leaves2[i]) return false;
    }
    
    return true;
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

const tree1 = buildTree([3,5,1,6,2,9,8,null,null,7,4]);
const tree2 = buildTree([3,5,1,6,7,4,2,null,null,null,null,null,null,9,8]);
console.log("Test 1:", leafSimilar(tree1, tree2)); // Expected: true

const tree3 = buildTree([1,2,3]);
const tree4 = buildTree([1,3,2]);
console.log("Test 2:", leafSimilar(tree3, tree4)); // Expected: false

const tree5 = buildTree([1]);
const tree6 = buildTree([1]);
console.log("Test 3:", leafSimilar(tree5, tree6)); // Expected: true

// ============================================
// Explanation
// ============================================
//
// Algorithm: DFS Leaf Collection
// 1. Use DFS to traverse each tree in left-to-right order
// 2. When encountering a leaf (no children), add its value to the array
// 3. Compare the two leaf sequences
//
// Why DFS works here:
// - DFS with left-first traversal naturally visits leaves left-to-right
// - Pre-order traversal ensures we process nodes in the correct sequence
// - Leaf nodes are identified when both left and right children are null
//
// Time Complexity: O(n + m) - visit all nodes in both trees
// Space Complexity: O(n + m) - store leaves + recursion stack
//
// Example: root1 = [3,5,1,6,2,9,8,null,null,7,4]
//         3
//        / \
//       5   1
//      / \ / \
//     6  2 9  8
//       / \
//      7   4
// 
// DFS traversal finds leaves: [6, 7, 4, 9, 8]
// - Visit 3 -> 5 -> 6 (leaf) -> 2 -> 7 (leaf) -> 4 (leaf) -> 1 -> 9 (leaf) -> 8 (leaf)
