// ============================================
// Number of Recent Calls
// Purpose: Count requests within a time window using queue
// ? ============================================
/*
You have a RecentCounter class which counts the number of recent requests within a certain time frame.

Implement the RecentCounter class:

RecentCounter() Initializes the counter with zero recent requests.
int ping(int t) Adds a new request at time t, where t represents some time in milliseconds, and returns the number of requests that has happened in the past 3000 milliseconds (including the new request). Specifically, return the number of requests that have happened in the inclusive range [t - 3000, t].

It is guaranteed that every call to ping uses a strictly larger value of t than the previous call.

Example 1:
Input
["RecentCounter", "ping", "ping", "ping", "ping"]
[[], [1], [100], [3001], [3002]]
Output
[null, 1, 2, 3, 3]

Explanation
RecentCounter recentCounter = new RecentCounter();
recentCounter.ping(1);     // requests = [1], range is [-2999,1], return 1
recentCounter.ping(100);   // requests = [1, 100], range is [-2900,100], return 2
recentCounter.ping(3001);  // requests = [1, 100, 3001], range is [1,3001], return 3
recentCounter.ping(3002);  // requests = [1, 100, 3001, 3002], range is [2,3002], return 3

Constraints:
1 <= t <= 10^9
Each test case will call ping with strictly increasing values of t.
At most 10^4 calls will be made to ping.
*/

// ============================================
// Solution Function
// ============================================

/**
 * @param {void}
 */
var RecentCounter = function() {
    // Use an array as a queue to store request timestamps
    this.queue = [];
};

/**
 * @param {number} t
 * @return {number}
 */
RecentCounter.prototype.ping = function(t) {
    // Add the current request to the queue
    this.queue.push(t);
    
    // Remove requests that are outside the 3000ms window
    // Window is [t - 3000, t]
    const minTime = t - 3000;
    while (this.queue.length > 0 && this.queue[0] < minTime) {
        this.queue.shift();
    }
    
    // Return the number of requests in the valid time window
    return this.queue.length;
};

/**
 * Your RecentCounter object will be instantiated and called as such:
 * var obj = new RecentCounter()
 * var param_1 = obj.ping(t)
 */

// ============================================
// Test Cases
// ============================================

const recentCounter = new RecentCounter();
console.log(recentCounter.ping(1));     // 1 (requests = [1])
console.log(recentCounter.ping(100));   // 2 (requests = [1, 100])
console.log(recentCounter.ping(3001));  // 3 (requests = [1, 100, 3001])
console.log(recentCounter.ping(3002));  // 3 (requests = [100, 3001, 3002])
console.log(recentCounter.ping(4000));  // 3 (requests = [3001, 3002, 4000])


// ============================================
// Explanation
// ============================================
//
// Algorithm Steps:
// 1. Maintain a queue of request timestamps
// 2. On each ping(t) call:
//    - Add the new timestamp to the end of queue (push)
//    - Remove all timestamps older than (t - 3000) from front of queue (shift)
//    - Return the current queue length (requests within the time window)
// 3. Since pings come in strictly increasing order, old requests naturally age out
//
// Time Complexity: O(1) amortized - each request is added/removed once
// Space Complexity: O(k) where k is number of requests in the 3000ms window
//
// Example: ping sequence [1, 100, 3001, 3002]
// ping(1):    queue=[1], return 1
//             Window [1-3000, 1] = [-2999, 1], includes: 1
// ping(100):  queue=[1,100], return 2
//             Window [100-3000, 100] = [-2900, 100], includes: 1, 100
// ping(3001): queue=[1,100,3001], return 3
//             Window [3001-3000, 3001] = [1, 3001], includes: 1, 100, 3001
// ping(3002): remove 1 (too old), queue=[100,3001,3002], return 3
//             Window [3002-3000, 3002] = [2, 3002], includes: 100, 3001, 3002
