create table products (
  product_id serial primary key,
  name varchar,
  manager_id int,
  FOREIGN KEY (manager_id) REFERENCES managers (manager_id)
)