select devs.dev_id, devs.first_name as devFirstName, devs.last_name as devLastName, devs.title, managers.first_name as mgrFirstName, managers.last_name as mgrLastName, managers.company, products.name as productName
from devs
join managers on managers.manager_id = devs.manager_id
join products on products.product_id = devs.product_id
where managers.manager_id = ${manager_id};