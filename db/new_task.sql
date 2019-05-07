insert into tasks (
  name,
  -- due_date,
  notes,
  dev_id,
  component_id,
  manager_id,
  product_id,
  tickets
) values (
  ${taskName},
  -- ${due_date},
  ${notes},
  ${dev_id},
  ${component_id},
  ${manager_id},
  ${product_id},
  ${tickets}
)
