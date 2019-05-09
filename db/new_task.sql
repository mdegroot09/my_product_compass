insert into tasks (
  name,
  notes,
  -- dev_id,
  component_id,
  manager_id,
  product_id,
  tickets
) values (
  ${taskName},
  ${notes},
  -- ${dev_id},
  ${component_id},
  ${manager_id},
  ${product_id},
  ${tickets}
)
returning *;