require('dotenv').config();
const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table');

// const express = require('express');
// const PORT = process.env.PORT || 3007;
// const app = express();


//Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
    },
    console.log('Connected to the employee database.')
);

db.connect(err => {
    if(err)throw err
    employeeStart();
  })
     // START
  const employeeStart = (data) => {
    inquirer
    .prompt({
      name:"Start",
      type: 'list',
      message: 'Select one:',
      choices: [
        'All Departments', 
      'Add New Department',
      'All Roles', 
      'Add New Role',
      'All Employees',
      'Add New Employee',
      'Update Current Employee',
    ]
    })
    .then((data)=> {
      switch (data.Start){
        case "All Departments":
          DepartmentsAll();
          break;
        case 'Add New Department':
            addNewDepartment();
            break;
        case 'All Roles':
          RolesAll();
          break;
        case 'Add New Role':
          addNewRole ();
          break;
        case 'All Employees':
          EmployeesAll();
          break;
        case 'Add New Employee':
          addNewEmployee();
          break;
        case 'Update Current Employee':
          updateCurrentEmployee();
          break;
      }
      return data;
    });
  };
  //All Departments
  const DepartmentsAll = () => {
    db.query(
      `SELECT name, id FROM department;`,
      function (err, res){
        if(err) throw err;
        console.table(res);
        employeeStart()
      }
    );
  };
  
  // 'Add Department',
  const addNewDepartment = () =>{
    return inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: "Department name:",
      },
    ])
    .then((input) => {
      const inputs = input.name;
      const add = `INSERT INTO department (name) VALUES (?)`;
      db.query(add, inputs, (err, res) => { 
        if(err) throw err;
        return input;});
    })
    .then(()=> {employeeStart();});
  };
  
  //ALL Roles 
  const RolesAll = () => {
    db.query(
      `SELECT role.id, role.title, role.salary, role.department_id FROM role;`,
      function (err, res){
        if(err) throw err;
        console.table(res);
        employeeStart();
      }
    );
  };
  
  const addNewRole = () =>{
  return inquirer
   .prompt([
    {
    type: 'input',
    name: 'title',
    message: "Role:",
    },
    {
      type: 'input',
      name: 'salary',
      message: "Yearly Salary:",
    },
    {
      type: 'input',
      name: 'department_id',
      message: "Department ID:",
    },
   ])
   .then ((input)=> {
    const roleInfo = [input.title, input.salary, input.department_id];
    const add = `INSERT INTO role (title, salary, department_id) VALUES (?,?,?)`;
    db.query(add, roleInfo, (err, res) => {
      if (err) throw err;
      return input
    });
   })
    .then(()=> {
      employeeStart();
    });
  };
  
  // All Employees
  const EmployeesAll = () =>{
    db.query( 
      `SELECT employee.id, employee.first_name, employee.last_name, employee.role_id FROM employee`,
      function (err, res){
        if (err) throw err;
        console.table(res);
        employeeStart();
      }
    )
  };
  
  // 'Add Employee',
  const addNewEmployee =() =>{
    return inquirer
    .prompt ([
      {
        type: "input",
        name: "first_name",
        message: "First Name:",
      },
      {
        type: "input",
        name: "last_name",
        message: "Last Name:",
      },
      {
        type: "input",
        name: "role_id",
        message: "Select Role ID:",
      },
      {
        type: "list",
          name: "manager_id",
          message: "Select Manager ID:",
          choices: ["1"],
      }
    ])
    .then((input)=>{
      const employeeInfo = [ input.first_name, input.last_name, input.role_id, input.manager_id,];
      const add = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
      db.query (add, employeeInfo, (err, res)=> {
        if (err) throw err;
        return input;
      });
      })
      .then (()=> {
        employeeStart();
      });
    };
  
    // Update Employee
    const updateCurrentEmployee = () =>{
      return inquirer
      .prompt([
        {
          type: 'input',
          name: 'id',
          message: "Current Employee ID:",
        },
        {
          type: 'input',
          name: 'role_id',
          message: "New ID:",
        },
      ])
      .then ((input)=> {
        const updateCurrentEmployee=[ input.role_id, input.id];
        const add = `UPDATE employee SET role_id = ? WHERE id = ?`;
        db.query(add, updateCurrentEmployee, (err, res)=>{
          if (err) throw err;
          return input;
        })
      })
      .then(()=> {
        employeeStart();
      });
    };

// //Express Middleware
// app.use(express.urlencoded({ extended: false}));
// app.use(express.json());


// db.query('SELECT * FROM employees', (err, rows) => {
//     console.log(rows);
// });
// // GET all candidates 
// app.get('/api/candidates', (req,res) => {
//     const sql = 'SELECT * FROM employees';

//     db.query(sql, (err, rows) => {
//         if (err) {
//             res.status(500).json({ error:err.message});
//             return;
//         }
//         res.json({
//             message: 'sucess',
//             data:rows     
//        });
//     });
// });
// //GET a single employee
// db.query('SELECT * FROM employees WHERE id = 1', (err, row) => {
//     if (err) {
//         console.log(err);
//     }
//     console.log(row);
// } );

// //DELETE an employee
// db.query("DELETE FROM employees where id = ?", 1, (err, result) => {
//     if (err) {
//         console.log(err);
//     }
//     console.log(result);
// });
// //Default response for any other request (Not Found)
// app.use((req, res) => {
//     res.status(404).end();
// });

// //CREATE an employee
// const sql = 'INSERT INTO employees (id, first_name, last_name, job_title, department, salary) VALUES (?,?,?,?,?,?)';
// const params = [1, 'Erin', 'Randalf', 'CEO', 'Company', 200];

// db.query(sql, params, (err, result) => {
//     if (err) {
//         console.log(err);
//     }
//     console.log(result);
// });

// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });