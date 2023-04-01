INSERT INTO department (name) 
VALUES 
('Sales'),
('Management'),
('Frontend'),
('Backend'),
('Design');

INSERT INTO role (title, salary, department_id)
VALUES
('Frontend Manager', 170000.00, 3),
('Backend Manager', 180000.00, 4),
('Sr Developer', 125000.00, 4),
('Sr Developer', 125000.00, 3),
('Sr Developer', 125000.00, 5),
('Jr Developer', 85000.00, 4),
('Sr Developer', 125000.00, 4),
('Jr Developer', 85000.00, 3),
('Jr Developer', 85000.00, 5),
('Sales Rep', 90000.00, 1);

INSERT INTO employee (first_name, last_name, role_id)
VALUES
('Ronald', 'Fairbank', 1),
('Virginia', 'Wolfe', 4),
('Piers', 'Gaveston', 4),
('Charles', 'LeRoi', 2),
('Katherine', 'Smith', 2 ),
('Montague', 'Lawrence', 1 ),
('Octavia', 'Spencer', 3 ),
('Edward', 'Cullen', 3 ),
('Alice', 'Johnson', 5),
('Lary', 'Power', 2);



