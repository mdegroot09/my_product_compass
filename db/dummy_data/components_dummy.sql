delete from components;

insert into components (
  name,
  manager_id,
  product_id,
  parent_component
) values (
  'App.js',
  6,
  2,
  0
), (
  'Devs.js',
  6,
  2,
  6
), (
  'ComponentTree.js',
  6,
  2,
  7
), (
  'Router.js',
  6,
  2,
  1
),(
  'Header.js',
  6,
  2,
  1
), (
  'Home.js',
  6,
  2,
  4
), (
  'Tasks.js',
  6,
  2,
  6
), (
  'NewPM.js',
  6,
  2,
  6
), (
  'NewProduct.js',
  6,
  2,
  6
), (
  'Task.js',
  6,
  2,
  7
), (
  'NewTask.js',
  6,
  2,
  7
), (
  'Dev.js',
  6,
  2,
  2
), (
  'NewDev.js',
  6,
  2,
  2
), (
  'Login.js',
  6,
  2,
  5
), (
  'About.js',
  6,
  2,
  5
), (
  'NewComponent.js',
  6,
  2,
  3
);

select * from components;