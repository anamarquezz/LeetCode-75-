// ⭐ ============================================
// 📝 Container With Most Water
// Purpose: Find two lines that hold the most water
// ⭐ ============================================
/*
You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).

Find two lines that together with the x-axis form a container, such that the container contains the most water.

Return the maximum amount of water a container can store.

Notice that you may not slant the container.

 

Example 1:

Input: height = [1,8,6,2,5,4,8,3,7]
Output: 49
Explanation: The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49.
Example 2:

Input: height = [1,1]
Output: 1
*/

// ⭐ ============================================
// 🔧 Solution Function
// ⭐ ============================================

var maxArea = function(height) {
    let left = 0;
    let right = height.length - 1;
    let maxWater = 0;
    
    while (left < right) {
        // Calculate current area
        const width = right - left;
        const currentHeight = Math.min(height[left], height[right]);
        const currentArea = width * currentHeight;
        
        // Update max water
        maxWater = Math.max(maxWater, currentArea);
        
        // Move the pointer with smaller height
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }
    
    return maxWater;
};

// ⭐ ============================================
// 📊 Test Cases
// ⭐ ============================================

console.log("[1,8,6,2,5,4,8,3,7]", maxArea([1,8,6,2,5,4,8,3,7])); // Output: 49
console.log("[1,1]", maxArea([1,1]));               // Output: 1

// ⭐ ============================================
// 📋 Explanation
// ⭐ ============================================
//
// Algorithm: Two-pointer approach (Greedy)
// 1. Initialize left pointer at the start (index 0) and right pointer at the end
// 2. Calculate the area between left and right: width × min(height[left], height[right])
// 3. Keep track of the maximum area found so far
// 4. Move the pointer pointing to the smaller height inward
//    (moving the taller pointer can only reduce area since width decreases)
// 5. Repeat until left and right pointers meet
// 6. Return the maximum area
//
// Why this works:
// - The area is determined by: distance × min(left_height, right_height)
// - When we move the pointer with smaller height, we have a chance to find a taller line
// - Moving the pointer with larger height guarantees smaller area (distance ↓, min height ≤)
//
// Time Complexity:  O(n) - we iterate through the array once with two pointers
// Space Complexity: O(1) - only using pointer variables
//
// Example: height = [1,8,6,2,5,4,8,3,7]
// left=0, right=8: area = 8 × min(1,7) = 8 × 1 = 8
// left=1, right=8: area = 7 × min(8,7) = 7 × 7 = 49 ✓ (max)
// left=2, right=8: area = 6 × min(6,7) = 6 × 6 = 36
// left=3, right=8: area = 5 × min(2,7) = 5 × 2 = 10
// ... and so on
// Result: 49 ✅