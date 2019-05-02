delete from devs;

insert into devs (
  first_name,
  last_name,
  manager_id,
  product_id
) values (
  'Chase',
  'Bossman',
  1,
  1
), (
  'Brad',
  'Master',
  1,
  1
), (
  'Princeton',
  'Frontman',
  1,
  1
), (
  'Nick',
  'Newbie',
  1,
  1
);

select * from devs;