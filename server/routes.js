const express = require('express');
const router = express.Router();
const pool = require('./database');

// GET all tasks
router.get('/tasks', (req, res) => {
    const sql = 'SELECT * FROM tasks ORDER BY created_at DESC';
    pool.query(sql, [], (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: result.rows
        });
    });
});

// POST new task
router.post('/tasks', (req, res) => {
    const { text, due_date } = req.body;
    const sql = 'INSERT INTO tasks (text, due_date) VALUES ($1, $2) RETURNING *';
    const params = [text, due_date];

    pool.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: result.rows[0]
        });
    });
});

// PUT update task (toggle completion or update details)
router.put('/tasks/:id', (req, res) => {
    const { text, completed, due_date } = req.body;
    let updates = [];
    let params = [];
    let paramCount = 1;

    if (text !== undefined) {
        updates.push(`text = $${paramCount++}`);
        params.push(text);
    }
    if (completed !== undefined) {
        updates.push(`completed = $${paramCount++}`);
        params.push(completed);
    }
    if (due_date !== undefined) {
        updates.push(`due_date = $${paramCount++}`);
        params.push(due_date);
    }

    if (updates.length === 0) {
        res.status(400).json({ error: 'No fields to update' });
        return;
    }

    params.push(req.params.id);
    const sql = `UPDATE tasks SET ${updates.join(', ')} WHERE id = $${paramCount} RETURNING *`;

    pool.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: result.rows[0]
        });
    });
});

// DELETE task
router.delete('/tasks/:id', (req, res) => {
    const sql = 'DELETE FROM tasks WHERE id = $1 RETURNING *';
    const params = [req.params.id];

    pool.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: result.rows[0]
        });
    });
});

module.exports = router;
