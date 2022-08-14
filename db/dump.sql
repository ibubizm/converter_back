CREATE TABLE IF NOT EXISTS exchange_rate(
       id INT PRIMARY KEY AUTO_INCREMENT, 
       date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
       rub FLOAT,
       eur FLOAT,
       jpy FLOAT,
       usd FLOAT DEFAULT 1, 

);
INSERT INTO exchange_rate(
       rub, 
       eur,
       jpy) 
VALUES(
       78, 
        0.92,
        124
);
INSERT INTO exchange_rate(
       rub, 
       eur,
       jpy) 
VALUES(
       82, 
        0.92,
        126
);
INSERT INTO exchange_rate(
       rub, 
       eur,
       jpy) 
VALUES(
       87, 
        0.9,
        127
);
ALTER exchange_rate 'root' IDENTIFIED WITH mysql_native_password BY ''; 
flush privileges;