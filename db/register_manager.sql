INSERT INTO managers
(first_name, last_name, company, username, hash)
VALUES
(
  ${first_name}, ${last_name}, ${company}, ${username}, ${hash}
)
returning *;