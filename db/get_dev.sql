select * 
from tasks
join devs on devs.dev_id = tasks.dev_id
where devs.dev_id = ${dev_id};