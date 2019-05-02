delete from components;

insert into components (
  name,
  manager_id,
  product_id,
  parent_component
) values (
  'App.js',
  1,
  1,
  0
), (
  'Devs.js',
  1,
  1,
  6
), (
  'ComponentTree.js',
  1,
  1,
  7
), (
  'Router.js',
  1,
  1,
  1
),(
  'Header.js',
  1,
  1,
  1
), (
  'Home.js',
  1,
  1,
  4
), (
  'Tasks.js',
  1,
  1,
  6
), (
  'NewPM.js',
  1,
  1,
  6
), (
  'NewProduct.js',
  1,
  1,
  6
), (
  'Task.js',
  1,
  1,
  7
), (
  'NewTask.js',
  1,
  1,
  7
), (
  'Dev.js',
  1,
  1,
  2
), (
  'NewDev.js',
  1,
  1,
  2
), (
  'Login.js',
  1,
  1,
  5
), (
  'About.js',
  1,
  1,
  5
), (
  'NewComponent.js',
  1,
  1,
  3
);

select * from components;