-- Insert data into UserDetails
INSERT INTO UserDetails (name, address, phone_number, email, is_student, password, role, is_archived, created_at)
VALUES
('Alice Johnson', '123 University St, City ville', '1234567890', 'alice.johnson@university.edu', true, '$2a$10$NzefgGAg6gwPF.yOK7ITS.WOkT9eL/xXKgpfjI5.bI8k4YYyN74x.', 'user', FALSE, NOW()),
('Bob Smith', '456 College Ave, Townsville', '0987654321', 'bob.smith@gmail.com', false, '$2a$10$NzefgGAg6gwPF.yOK7ITS.WOkT9eL/xXKgpfjI5.bI8k4YYyN74x.', 'user', FALSE, NOW()),
('Charlie Brown', '789 Campus Rd, City ville', '1122334455', 'charlie.brown@university.edu', true, '$2a$10$NzefgGAg6gwPF.yOK7ITS.WOkT9eL/xXKgpfjI5.bI8k4YYyN74x.', 'user', FALSE, NOW()),
('Ali Esmaeili', '130 University Dr, Callaghan', '1122334455', 'aliesmaeili.main@gmail.com', true, '$2a$10$NzefgGAg6gwPF.yOK7ITS.WOkT9eL/xXKgpfjI5.bI8k4YYyN74x.', 'user', FALSE, NOW()),
('Admin', '130 University Dr, Callaghan', '1122334455', 'admin@admin.com', true, '$2a$10$NzefgGAg6gwPF.yOK7ITS.WOkT9eL/xXKgpfjI5.bI8k4YYyN74x.', 'admin', FALSE, NOW());