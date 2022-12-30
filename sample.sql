CREATE TABLE User (
  name varchar(60),
  mail_address varchar(100),
  password varchar(100),
  created_at datetime default current_timestamp
);
