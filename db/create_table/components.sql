create table components (
  component_id serial primary key,
  name varchar,
  dev_id int,
  FOREIGN KEY (dev_id) REFERENCES devs (dev_id),
  manager_id int,
  FOREIGN KEY (manager_id) REFERENCES managers (manager_id),
  product_id int,
  FOREIGN KEY (product_id) REFERENCES products (product_id))