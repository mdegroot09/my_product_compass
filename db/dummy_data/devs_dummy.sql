delete from devs;

insert into devs (
  first_name,
  last_name,
  manager_id,
  product_id,
  title
) values (
  'Chase',
  'Bossman',
  6,
  2,
  'Team Lead'
), (
  'Brad',
  'Master',
  6,
  2,
  'Senior Dev'
), (
  'Princeton',
  'Frontman',
  6,
  2,
  'Junior Dev'
), (
  'Nick',
  'Newbie',
  6,
  2,
  'Junior Dev'
);

select * from devs;