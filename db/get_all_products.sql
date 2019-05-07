select products.product_id, products.name as productname, tasks.name as taskname, tasks.notes as tasknotes, component_id, tickets, due_date 
from products
left join tasks on tasks.product_id = products.product_id
where products.manager_id = ${manager_id};