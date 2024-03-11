const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jenosizeController = require('./controller/jenosizeController');

const app = express();
const PORT = process.env.PORT || 3100;
const validateApiKey = (req, res, next) => {
    const apiKey = req.headers['api-key'];
    if (apiKey === 'test') {
        next(); 
    } else {
        res.status(401).send('Unauthorized');
    }
};

app.use(validateApiKey);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/jenosize', jenosizeController);
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
