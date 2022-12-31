CREATE TABLE users (
  name varchar(60),
  mail_address varchar(100),
  password varchar(100),
  created_at datetime default current_timestamp
);

INSERT INTO users (name, mail_address, password) VALUES ('yamada', 'yamada@test.com', '123');
