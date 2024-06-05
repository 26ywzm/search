const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

app.use(express.static('public'));

app.get('/search', (req, res) => {
    const { bank, type, keyword } = req.query;
    const questionFiles = bank === 'all' ? ['1.json', '2.json', '3.json', '4.json', '5.json'] : [`${bank}.json`];
    let results = [];

    questionFiles.forEach(file => {
        const filePath = path.join(__dirname, 'db', file);
        if (fs.existsSync(filePath)) {
            const questions = JSON.parse(fs.readFileSync(filePath, 'utf-8')).questions;
            questions.forEach(question => {
                if ((type === 'all' || question.type === type) && question.question.includes(keyword)) {
                    results.push(question);
                }
            });
        }
    });

    res.json(results);
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
