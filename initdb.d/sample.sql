drop table if exists `users`;

-- エディタ上に出ているエラーは無視で良い
create table users
(
    id            int(11) not null auto_increment,
    name          varchar(60),
    email  text,
    password      varchar(100),
    hash_password text,
    created_at    datetime default current_timestamp,
    primary key (`id`)
) engine=innodb auto_increment=1 default charset=utf8mb4;

-- insert into users (name, mail_address, password)
-- values ('yamada', 'yamada@test.com', '123');
