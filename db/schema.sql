CREATE DATABASE employee_tracker;
USE employee_tracker;

DROP DATABASE IF EXISTS employee_tracker;


CREATE TABLE employee( 
    id INTEGER AUTO_INCREMENT PRIMARY KEY, 
    first_name VARCHAR(30) NOT NULL, 
    last_name VARCHAR(30) NOT NULL, 
    role_id INT, 
    manager_id INT, 
    FOREIGN KEY(role_id) REFERENCES role(id),
    FOREIGN KEY(manager_id) REFERENCES employee(id)
    );

CREATE TABLE department(
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(30) NOT NULL
    );
CREATE TABLE role(
        id INTEGER PRIMARY KEY AUTO_INCREMENT ,
        title VARCHAR(30) NOT NULL,
        salary DECIMAL NOT NULL,
        department_id INT,
        FOREIGN KEY(department_id) REFERENCES department(id)
    );

DROP TABLE IF EXISTS employee;
DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS role;