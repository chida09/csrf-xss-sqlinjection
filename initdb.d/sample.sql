DROP TABLE IF EXISTS `users`;

-- エディタ上に出ているエラーは無視で良い
CREATE TABLE users
(
    id         int(11) NOT NULL AUTO_INCREMENT,
    name         varchar(60),
    mail_address text,
    password     varchar(100),
    created_at   datetime default current_timestamp,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

INSERT INTO users (name, mail_address, password)
VALUES ('yamada', 'yamada@test.com', '123');
