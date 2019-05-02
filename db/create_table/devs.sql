create table devs (
  dev_id serial primary key,
  first_name varchar,
  last_name varchar,
  manager_id int,
  FOREIGN KEY (manager_id) REFERENCES managers (manager_id),
  product_id int,
  FOREIGN KEY (product_id) REFERENCES products (product_id)
)