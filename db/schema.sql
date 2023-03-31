CREATE TABLE employees ( 
    id INTEGER AUTO_INCREMENT PRIMARY KEY, 
    first_name VARCHAR(30) NOT NULL, 
    last_name VARCHAR(30) NOT NULL, 
    job_title VARCHAR(30) NOT NULL, 
    department VARCHAR(30) NOT NULL, 
    salary INT NOT NULL 
    );