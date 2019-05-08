select * from tasks
left join devs on tasks.dev_id = devs.dev_id
where tasks.manager_id = ${manager_id} and tasks.task_id = ${task_id};