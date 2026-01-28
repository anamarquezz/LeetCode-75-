// ============================================
// Path Sum III
// Purpose: Count paths with target sum using DFS + Prefix Sum
// ============================================
/*
437. Path Sum III

Given the root of a binary tree and an integer targetSum, return the number 
of paths where the sum of the values along the path equals targetSum.

The path does not need to start or end at the root or a leaf, but it must 
go downwards (i.e., traveling only from parent nodes to child nodes).

Example 1:
Input: root = [10,5,-3,3,2,null,11,3,-2,null,1], targetSum = 8
Output: 3
Explanation: The paths that sum to 8 are shown.

Example 2:
Input: root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22
Output: 3

Constraints:
- The number of nodes in the tree is in the range [0, 1000].
- -10^9 <= Node.val <= 10^9
- -1000 <= targetSum <= 1000
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
 * @param {number} targetSum
 * @return {number}
 */
var pathSum = function(root, targetSum) {
    // Map to store prefix sums and their counts
    const prefixSumCount = new Map();
    prefixSumCount.set(0, 1); // Base case: empty path has sum 0
    
    // DFS helper with prefix sum tracking
    const dfs = (node, currentSum) => {
        if (node === null) return 0;
        
        // Update current running sum
        currentSum += node.val;
        
        // Count paths ending at current node with targetSum
        // If (currentSum - targetSum) exists in map, those are valid path starts
        let count = prefixSumCount.get(currentSum - targetSum) || 0;
        
        // Add current sum to map for children to use
        prefixSumCount.set(currentSum, (prefixSumCount.get(currentSum) || 0) + 1);
        
        // DFS into left and right subtrees
        count += dfs(node.left, currentSum);
        count += dfs(node.right, currentSum);
        
        // Backtrack: remove current sum from map (leaving this path)
        prefixSumCount.set(currentSum, prefixSumCount.get(currentSum) - 1);
        
        return count;
    };
    
    return dfs(root, 0);
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

console.log("Test 1:", pathSum(buildTree([10,5,-3,3,2,null,11,3,-2,null,1]), 8)); // Expected: 3
console.log("Test 2:", pathSum(buildTree([5,4,8,11,null,13,4,7,2,null,null,5,1]), 22)); // Expected: 3
console.log("Test 3:", pathSum(buildTree([1]), 1)); // Expected: 1
console.log("Test 4:", pathSum(buildTree([]), 0)); // Expected: 0

// ============================================
// Explanation
// ============================================
//
// Algorithm: DFS with Prefix Sum (similar to subarray sum equals k)
// 1. Use a hash map to store prefix sums seen along the current path
// 2. At each node, calculate running sum from root
// 3. Check if (currentSum - targetSum) exists in map
//    - If yes, there's a path ending here with sum = targetSum
// 4. Add current prefix sum to map, recurse into children
// 5. Backtrack by removing current sum from map when leaving node
//
// Key Insight:
// - If prefixSum at node A is X, and at node B (descendant) is Y
// - And Y - X = targetSum, then path from A to B sums to targetSum
// - This is the same technique used in "Subarray Sum Equals K"
//
// Why DFS + Prefix Sum works:
// - DFS explores each path from root to leaves
// - Prefix sum allows O(1) lookup for valid path starts
// - Backtracking ensures only ancestors are in the map
//
// Time Complexity: O(n) - visit each node once
// Space Complexity: O(n) - hash map + recursion stack
//
// Example: root = [10,5,-3,3,2,null,11], targetSum = 8
//         10
//        /  \
//       5   -3
//      / \    \
//     3   2   11
//    / \   \
//   3  -2   1
//
// Paths that sum to 8:
// 1. 5 -> 3 (sum = 8)
// 2. 5 -> 2 -> 1 (sum = 8)
// 3. -3 -> 11 (sum = 8)
