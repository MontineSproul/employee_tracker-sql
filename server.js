const express = require('express');
const PORT = process.env.PORT || 3007;
const app = express();

//Express Middleware
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

//Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});