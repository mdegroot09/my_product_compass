INSERT INTO managers
(first_name, last_name, email, company, username, hash)
VALUES
(
  ${first_name}, ${last_name}, ${email}, ${company}, ${username}, ${hash}
)
returning *;