create table tasks (
  task_id serial primary key,
  name varchar,
  due_date date,
  notes varchar,
  dev_id int,
  FOREIGN KEY (dev_id) REFERENCES devs (dev_id),
  component_id int,
  FOREIGN KEY (component_id) REFERENCES components (component_id),
  manager_id int,
  FOREIGN KEY (manager_id) REFERENCES managers (manager_id),
  product_id int,
  FOREIGN KEY (product_id) REFERENCES products (product_id))