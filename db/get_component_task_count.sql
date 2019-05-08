select count(*), components.name, components.component_id
from components
join tasks on components.component_id = tasks.component_id
where tasks.manager_id = ${manager_id} and tasks.product_id = ${product_id}
group by components.component_id;