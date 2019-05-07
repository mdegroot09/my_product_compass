update tasks
set tickets = (tickets + 1)
where task_id = ${task_id};

select * from tasks
join devs on tasks.dev_id = devs.dev_id
where tasks.manager_id = ${manager_id} and tasks.product_id = ${product_id};