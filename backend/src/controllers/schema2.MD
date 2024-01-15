CREATE DATABASE ecommerce;
USE ecommerce;

CREATE TABLE roles (
    id INT UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
    role_nome VARCHAR(100) NOT NULL
);
INSERT INTO roles (role_nome) 
VALUES 
("Client"),
("Client Vip"),
("Product Manager"),
("Order Manager"),
("Customer Service"),
("Accounting and Finance"),
("Admin"),
("Owner");
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    fullname VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    profile_img VARCHAR(255),
    password_hash CHAR(64) NOT NULL,
    date_of_birth DATE,
    address VARCHAR(255),
    phone VARCHAR(20),
    shopping INT,
    gender VARCHAR(50),
    cpf VARCHAR(14) UNIQUE,
    cards INT,
    created_at DATETIME DEFAULT NOW() NOT NULL,
    messages INT,
    classe VARCHAR(255)
);
-- INSERT INTO users (fullname, username, email, password_hash, date_of_birth, address, phone, shopping, gender, cpf, cards, created_at, messages, classe)
-- VALUES ('John Doe', 'john_doe', 'john@example.com', 'hashed_password', '1990-01-01', '123 Main St', '123456789', 1, 'Male', '12345678901', 2, '2022-01-01 12:00:00', 1, 'Class A');

 select * from users;
-- describe users;

CREATE TABLE notify_messages (
    notify_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    message VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
-- INSERT INTO notify_messages (user_id, message)
-- VALUES (1, 'You have a new message!');
-- SELECT * FROM notify_messages WHERE user_id = 1;

CREATE TABLE credit_cards (
    card_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    card_number VARCHAR(20) NOT NULL,
    card_holder_name VARCHAR(100) NOT NULL,
    expiration_date DATE NOT NULL,
    cvv VARCHAR(3) NOT NULL,
    billing_address VARCHAR(255) NOT NULL,
    is_default BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- INSERT INTO credit_cards (card_number, card_holder_name, expiration_date, cvv, billing_address, is_default, user_id) 
-- VALUES 
-- ('1234 5678 9101 1120', 'Carlos Miguel', '2029-12-01', '123', 'São Paulo, SP', 1, 1);
-- SELECT * FROM credit_cards WHERE user_id = 1;

CREATE TABLE users_roles (
    user_id INT,
    role_id INT UNSIGNED,
    FOREIGN KEY (role_id) REFERENCES roles(id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
-- INSERT INTO users_roles (user_id, role_id) VALUES (2, 3);
-- describe  roles;

-- SELECT users_roles.user_id, users_roles.role_id, users.username, roles.role_name
-- FROM users_roles
-- JOIN users ON users_roles.user_id = users.user_id
-- JOIN roles ON users_roles.role_id = roles.id;

CREATE TABLE product (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    summary TEXT NOT NULL,
    quantidy INT NOT NULL,
    sold INT,
    price DECIMAL(10, 2) DEFAULT 0,
    state BOOLEAN DEFAULT TRUE,
    category VARCHAR(100) NOT NULL,
    brand VARCHAR(100),
    guarantee VARCHAR(100),
    assessment DOUBLE DEFAULT 0,
    qtd_assessment INT,
    parcelable BOOLEAN DEFAULT FALSE,
    max_installments INT,
    interest_rate DOUBLE,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    created_at DATETIME DEFAULT NOW() NOT NULL
);
select * from product;
CREATE TABLE product_images (
    image_id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT,
    url VARCHAR(255),
    FOREIGN KEY (product_id) REFERENCES product(id)
);
CREATE TABLE colors (
    color_id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT,
    name_color VARCHAR(15),
    FOREIGN KEY (product_id) REFERENCES product(id)
);
CREATE TABLE product_flags (
    flag_id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT,
    flag VARCHAR(50),
    FOREIGN KEY (product_id) REFERENCES product(id)
);
CREATE TABLE product_details (
    detail_id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT,
    detail VARCHAR(250),
    FOREIGN KEY (product_id) REFERENCES product(id)
);
CREATE TABLE product_sizes (
    size_id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT,
    size VARCHAR(50),
    FOREIGN KEY (product_id) REFERENCES product(id)
);
CREATE TABLE promotions (
    promotion_id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT,
    discount_percentage INT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    FOREIGN KEY (product_id) REFERENCES product(id)
);
-- INSERT INTO promotions (product_id, discount_percentage, start_date, end_date)
-- VALUES
--    (1, 10, '2023-01-01', '2023-02-01'),  -- Promoção para o produto com product_id = 1
--   (2, 20, '2023-03-15', '2023-04-15'),  -- Promoção para outro produto com product_id = 2
--    (1, 30, '2023-05-01', '2023-06-01');  -- Outra promoção para o produto com product_id = 1

CREATE TABLE comments (
    comment_id INT AUTO_INCREMENT PRIMARY KEY,
    comment_text TEXT NOT NULL,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    rating DOUBLE NOT NULL,
    timespost TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (product_id) REFERENCES product(id)
);
 -- TRUNCATE TABLE product;

-- SELECT * FROM SequelizeMeta;

/*gambiarra


ALTER TABLE product ADD classe VARCHAR(255);
ALTER TABLE users
DROP COLUMN classe;

*/
select * from product;

select * from product_flags;
describe product;

-- INSERT INTO product_images (product_id, url)
-- VALUES
--    (2, "calca.jpg"),
--    (2, "calca2.jpg");
/*    
CREATE TABLE buy_product(
    solicitation_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_buy INT,
    FOREIGN KEY (user_buy) REFERENCES users(user_id),
    product_buy INT UNSIGNED NOT NULL,
    FOREIGN KEY (product_buy) REFERENCES product(id),
    guarantee VARCHAR(100),
    variation VARCHAR(100),
    size VARCHAR(100),
    payment_method VARCHAR(50),
    card INT,
    FOREIGN KEY (card) REFERENCES credit_cards(card_id),
    status_product VARCHAR(50),
    shipping_address TEXT,
    paid BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT NOW() NOT NULL
);

INSERT INTO buy_product(user_buy, product_buy , guarantee, variation,payment_method , shipping_address, paid, created_at) VALUES 
(4, 3, " 1 Mês", "Estampa 1", "Credit Card", "São Paulo, SP", 0, now());

ALTER TABLE users ADD FOREIGN KEY (shopping) REFERENCES buy_product(solicitation_id);
-- mysqldump -u root -p loja_virtual_atacado > /home/aylton/backup.sql
-- mysql -u root -p teste-restore < /home/aylton/backup.sql
*/
-- Inserir produtos OK
-- Relacionar imagens aos produtos OK
-- Criação de Usuarios OK
-- Relacionar cartões aos usuarios OK
-- Criado Cargos OK
-- Relação  Cargos e Usuarios 	OK
-- comentarios de usuarios sobre produtos OK