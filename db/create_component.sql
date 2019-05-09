insert into components (
  name
  -- manager_id,
  -- product_id,
  -- parent_component
) values (
  ${name}
  -- null,
  -- null,
  -- null
)
returning component_id;