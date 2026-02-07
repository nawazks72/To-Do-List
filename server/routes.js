const express = require('express');
const router = express.Router();
const db = require('./database');

// GET all tasks
router.get('/tasks', (req, res) => {
    const sql = 'SELECT * FROM tasks ORDER BY created_at DESC';
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

// POST new task
router.post('/tasks', (req, res) => {
    const { text, due_date } = req.body;
    const sql = 'INSERT INTO tasks (text, due_date) VALUES (?, ?)';
    const params = [text, due_date];

    db.run(sql, params, function (err) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: { id: this.lastID, text, due_date, completed: 0 }
        });
    });
});

// PUT update task (toggle completion or update details)
router.put('/tasks/:id', (req, res) => {
    const { text, completed, due_date } = req.body;
    let updates = [];
    let params = [];

    if (text !== undefined) {
        updates.push('text = ?');
        params.push(text);
    }
    if (completed !== undefined) {
        updates.push('completed = ?');
        params.push(completed ? 1 : 0);
    }
    if (due_date !== undefined) {
        updates.push('due_date = ?');
        params.push(due_date);
    }

    if (updates.length === 0) {
        res.status(400).json({ error: 'No fields to update' });
        return;
    }

    const sql = `UPDATE tasks SET ${updates.join(', ')} WHERE id = ?`;
    params.push(req.params.id);

    db.run(sql, params, function (err) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            changes: this.changes
        });
    });
});

// DELETE task
router.delete('/tasks/:id', (req, res) => {
    const sql = 'DELETE FROM tasks WHERE id = ?';
    const params = [req.params.id];

    db.run(sql, params, function (err) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            changes: this.changes
        });
    });
});

module.exports = router;
