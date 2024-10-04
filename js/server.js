const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '../'))); // Serve static files from the project root

// Registration endpoint
app.post('/register', (req, res) => {
    const newUser = req.body;
    const filePath = path.join(__dirname, '../users.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to read users file.' });
        }

        let users = [];
        if (data && data.trim() !== "") {
            users = JSON.parse(data);
        }

        users.push(newUser);
        fs.writeFile(filePath, JSON.stringify(users, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ message: 'Failed to write users file.' });
            }
            res.status(201).json({ message: 'User registered successfully' });
        });
    });
});

// Login endpoint
app.post('/login', (req, res) => {
    const { emailAddress, password } = req.body;
    const filePath = path.join(__dirname, '../users.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to read users file.' });
        }

        let users = [];
        if (data && data.trim() !== "") {
            users = JSON.parse(data);
        }

        const user = users.find(user => user.emailAddress === emailAddress && user.password === password);
        if (user) {
            res.json({ message: 'Login successful!' });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
