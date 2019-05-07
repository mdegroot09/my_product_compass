update tasks
set product_id = null
where product_id = ${product_id} and manager_id = ${manager_id};

update devs 
set product_id = null
where product_id = ${product_id} and manager_id = ${manager_id};

update components 
set product_id = null
where product_id = ${product_id} and manager_id = ${manager_id};

delete from products
where product_id = ${product_id} and manager_id = ${manager_id};