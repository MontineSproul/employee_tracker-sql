const express = require('express');
const PORT = process.env.PORT || 3007;
const app = express();
const mysql = require('mysql2');

//Express Middleware
app.use(express.urlencoded({ extended: false}));
app.use(express.json());
//Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'employee'
    },
    console.log('Connected to the employee database.')
);

db.query('SELECT * FROM employees', (err, rows) => {
    console.log(rows);
});

//GET a single employee
db.query('SELECT * FROM employees WHERE id = 12', (err, row) => {
    if (err) {
        console.log(err);
    }
    console.log(row);
} );

//DELETE an employee
db.query("DELETE FROM employees where id = ?", 1, (err, result) => {
    if (err) {
        console.log(err);
    }
    console.log(result);
});
//Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
});

//CREATE an employee
const sql = 'INSERT INTO employees (id, first_name, last_name, job_title, department, salary) VALUES (?,?,?,?,?,?)';
const params = [1, 'Erin', 'Randalf', 'CEO', 'Company', 200];

db.query(sql, params, (err, result) => {
    if (err) {
        console.log(err);
    }
    console.log(result);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});