delete from tasks;

insert into tasks (
  name,
  -- due_date,
  notes,
  dev_id,
  component_id,
  manager_id,
  product_id,
  tickets
) values (
  'Create SQL queries',
  -- 2019-05-01,
  'Started 4/30/19',
  1,
  null,
  6,
  2,
  2
), (
  'Create endpoints',
  -- 2019-05-01,
  'Will start 5/1',
  2,
  null,
  6,
  2,
  3
), (
  'Create front-end axios calls',
  -- 2019-05-01,
  'Unlikely to be completed by 5/1',
  3,
  22,
  6,
  2,
  1
), (
  'Format Tasks component',
  -- 2019-05-02,
  'Is 5/2 deadline a joke?',
  4,
  23,
  6,
  2,
  5
);

select * from tasks;