update tasks
set dev_id = null
where dev_id = ${dev_id} & manager_id = ${manager_id};
delete from devs
where dev_id = ${dev_id} & manager_id = ${manager_id};