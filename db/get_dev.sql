select tasks.name, due_date, notes, devs.dev_id as dev_id, tasks.product_id as product_id, tickets, first_name, last_name, title, products.name as productname
from tasks
join devs on devs.dev_id = tasks.dev_id
left join products on tasks.product_id = products.product_id
where devs.dev_id = ${dev_id} and devs.manager_id = ${manager_id};