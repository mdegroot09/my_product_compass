select devs.dev_id, devs.first_name as devFirstName, devs.last_name as devFirstName, managers.first_name as mgrFirstName, managers.last_name as mgrLastName, managers.company, products.name as productName, tasks.name as taskName, tasks.due_date, tasks.notes, tasks.tickets as taskTickets
from devs
join managers on managers.manager_id = devs.manager_id
join products on products.product_id = devs.product_id
left join tasks on tasks.dev_id = devs.dev_id;