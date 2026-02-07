const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const apiRoutes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client')));

app.use('/api', apiRoutes);

// Fallback to index.html for SPA-like behavior (optional, but good for landing)
app.get(/(.*)/, (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

module.exports = app;
