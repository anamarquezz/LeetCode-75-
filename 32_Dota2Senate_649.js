// ============================================
// Dota2 Senate
// Purpose: Predict voting outcome using queue simulation
// ? ============================================
/*
In the world of Dota2, there are two parties: the Radiant and the Dire.

The Dota2 senate consists of senators coming from two parties. Now the Senate wants to decide on a change in the Dota2 game. The voting for this change is a round-based procedure. In each round, each senator can exercise one of the two rights:

1. Ban one senator's right: A senator can make another senator lose all his rights in this and all the following rounds.
2. Announce the victory: If this senator found the senators who still have rights to vote are all from the same party, he can announce the victory and decide on the change in the game.

Given a string senate representing each senator's party belonging. The character 'R' and 'D' represent the Radiant party and the Dire party. Then if there are n senators, the size of the given string will be n.

The round-based procedure starts from the first senator to the last senator in the given order. This procedure will last until the end of voting. All the senators who have lost their rights will be skipped during the procedure.

Suppose every senator is smart enough and will play the best strategy for his own party. Predict which party will finally announce the victory and change the Dota2 game. The output should be "Radiant" or "Dire".

Example 1:
Input: senate = "RD"
Output: "Radiant"
Explanation: 
The first senator comes from Radiant and he can just ban the next senator's right in round 1. 
And the second senator can't exercise any rights anymore since his right has been banned. 
And in round 2, the first senator can just announce the victory since he is the only guy in the senate who can vote.

Example 2:
Input: senate = "RDD"
Output: "Dire"
Explanation: 
The first senator comes from Radiant and he can just ban the next senator's right in round 1. 
And the second senator can't exercise any rights anymore since his right has been banned. 
And the third senator comes from Dire and he can ban the first senator's right in round 1. 
And in round 2, the third senator can just announce the victory since he is the only guy in the senate who can vote.

Constraints:
n == senate.length
1 <= n <= 10^4
senate[i] is either 'R' or 'D'.
*/


// ============================================
// Solution Function
// ============================================

/**
 * @param {string} senate
 * @return {string}
 */
var predicting_Winner = function(senate) {
    // Create queues to store indices of Radiant and Dire senators
    const radiantQueue = [];
    const direQueue = [];
    
    // Initialize queues with senator indices
    for (let i = 0; i < senate.length; i++) {
        if (senate[i] === 'R') {
            radiantQueue.push(i);
        } else {
            direQueue.push(i);
        }
    }
    
    // Simulate the voting process
    while (radiantQueue.length > 0 && direQueue.length > 0) {
        const radiantIndex = radiantQueue.shift();
        const direIndex = direQueue.shift();
        
        // The senator with the smaller index wins and bans the other
        // The winner gets to vote again in the next round
        if (radiantIndex < direIndex) {
            radiantQueue.push(radiantIndex + senate.length);
        } else {
            direQueue.push(direIndex + senate.length);
        }
    }
    
    // Return the party that has senators remaining
    return radiantQueue.length > 0 ? "Radiant" : "Dire";
};

// ============================================
// Test Cases
// ============================================

console.log(predicting_Winner("RD"));        // "Radiant"
console.log(predicting_Winner("RDD"));       // "Dire"
console.log(predicting_Winner("RDDR"));      // "Radiant"
console.log(predicting_Winner("DDRRR"));     // "Dire"
console.log(predicting_Winner("RRD"));       // "Radiant"

// ============================================
// Explanation
// ============================================
//
// Algorithm Steps:
// 1. Create two queues: one for Radiant (R) senators, one for Dire (D) senators
// 2. Store senator indices (their original voting order) in respective queues
// 3. Simulate voting rounds:
//    - Compare front senators from both queues (whoever voted first wins)
//    - The winner with smaller index bans the other
//    - Winner rejoins queue with adjusted index (original + senate.length) 
//      to represent voting in the next round
// 4. Continue until one queue is empty
// 5. Return the party with remaining senators
//
// Time Complexity: O(n) where n is the length of senate string
// Space Complexity: O(n) for the two queues
//
// Example: senate = "RDD"
// Initial: radiantQueue=[0], direQueue=[1,2]
// Round 1:
//   Compare 0 vs 1: 0 < 1, Radiant wins, push 0+3=3 to radiantQueue
//   radiantQueue=[3], direQueue=[2]
//   Compare 2 vs 3: 2 < 3, Dire wins, push 2+3=5 to direQueue
//   radiantQueue=[], direQueue=[5]
// Winner: Dire (radiantQueue is empty)
//
// Example: senate = "RD"
// Initial: radiantQueue=[0], direQueue=[1]
// Round 1:
//   Compare 0 vs 1: 0 < 1, Radiant wins, push 0+2=2 to radiantQueue
//   radiantQueue=[2], direQueue=[]
// Winner: Radiant (direQueue is empty)
