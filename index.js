const express = require('express');
const cors = require('cors');
const jenosizeController = require('./controller/jenosizeController');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use('/jenosize', jenosizeController);

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
