insert into components (
  name
) values (
  ${name}
)
returning component_id;