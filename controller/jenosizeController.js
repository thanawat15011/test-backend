const express = require('express');
const router = express.Router();
const firebase  = require('firebase-admin');

router.get('/', (req, res) => {
    res.send('ยินดีต้อนรับสู่ API ของ Jenosize');
});

router.get('/restaurants', (req, res) => {
    // ขอ key ไม่ได้
});

router.get('/game24/:numbers', (req, res) => {
    const numbers = req.params.numbers.split('-').map(Number);
    if (numbers.length !== 4 || numbers.some(n => isNaN(n) || n < 1 || n > 9)) {
        res.status(400).json({ error: 'Invalid input. Please provide 4 numbers between 1 and 9 separated by dashes (-).' });
        return;
    }

    const result = calculateGame24(numbers) ? 'YES' : 'NO';
    res.json({ result });
});

function calculateGame24(numbers) {
    const ops = ['+', '-', '*', '/'];

    function helper(nums) {
        if (nums.length === 1) {
            return Math.abs(nums[0] - 24) < Number.EPSILON;
        }
        for (let i = 0; i < nums.length; i++) {
            for (let j = i + 1; j < nums.length; j++) {
                const a = nums[i];
                const b = nums[j];
                for (const op of ops) {
                    const next = [...nums.slice(0, i), ...nums.slice(i + 1, j), ...nums.slice(j + 1)];
                    if (op === '/' && Math.abs(b) < Number.EPSILON) continue;
                    next.push(op === '+' ? a + b : op === '-' ? a - b : op === '*' ? a * b : a / b);
                    if (helper(next)) return true;
                    next.pop();
                    if (op !== '+' && op !== '*') {
                        next.push(op === '+' ? b + a : op === '-' ? b - a : op === '*' ? b * a : b / a);
                        if (helper(next)) return true;
                        next.pop();
                    }
                }
            }
        }
        return false;
    }
    return helper(numbers);
}

module.exports = router;
