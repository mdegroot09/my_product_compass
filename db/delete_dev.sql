update tasks
set dev_id = null
where dev_id = ${dev_id};
delete from devs
where dev_id = ${dev_id};