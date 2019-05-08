update tasks
set name = ${name}, notes = ${notes}, dev_id = ${dev_id}, component_id = ${component_id}, tickets = ${tickets}, manager_id = ${manager_id}
where task_id = ${task_id};