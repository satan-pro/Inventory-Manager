create table supplier(
supplier_id varchar(5) primary key,
supplier_name varchar(50),
contact varchar(20),
credits numeric(5));

create table customers(
customer_id varchar(5) primary key,
customer_name varchar(20),
contact varchar(20));

create table products(
product_id varchar(5) primary key,
supplier_id varchar(5),
product_name varchar(50),
brand varchar(20),
product_category varchar(20),
quantity int,
cost_price numeric(10,2),
product_img varchar(100),
foreign key(supplier_id) references supplier);

create table orders(
order_id varchar(5) primary key,
customer_id varchar(5),
order_date date);

alter table orders add foreign key(customer_id) references customers;

create table delivery(
delivery_id varchar(5),
order_id varchar(5),
status varchar(10) check(status in('Confirmed', 'Packed', 'Shipped', 'Delivered')),
primary key(order_id, delivery_id),
foreign key(order_id) references orders);

create table invoice(
order_id varchar(5),
product_id varchar(5),
sell_price numeric(10,2),
primary key(order_id, product_id),
foreign key(order_id) references orders,
foreign key(product_id) references products);

INSERT INTO customers (customer_id, customer_name, contact) VALUES ('C001', 'John Doe', 'john@example.com');
INSERT INTO customers (customer_id, customer_name, contact) VALUES ('C002', 'Jane Smith', 'jane@example.com');
INSERT INTO customers (customer_id, customer_name, contact) VALUES ('C003', 'Alice Johnson', 'alice@example.com');
INSERT INTO customers (customer_id, customer_name, contact) VALUES ('C004', 'Bob Brown', 'bob@example.com');
INSERT INTO customers (customer_id, customer_name, contact) VALUES ('C005', 'Emily Davis', 'emily@example.com');

INSERT INTO supplier (supplier_id, supplier_name, contact, credits) VALUES ('S001', 'Tech Supplies INC', 'ts@gmail.com', 1000);
INSERT INTO supplier (supplier_id, supplier_name, contact, credits) VALUES ('S002', 'Office Furniture Co.', 'ofc@gmail.com', 1500);
INSERT INTO supplier (supplier_id, supplier_name, contact, credits) VALUES ('S003', 'LMN Enterprises', 'lmn@gmail.com', 2000);
INSERT INTO supplier (supplier_id, supplier_name, contact, credits) VALUES ('S004', 'Global Clothing', 'gc@gmail.com', 1200);
INSERT INTO supplier (supplier_id, supplier_name, contact, credits) VALUES ('S005', 'Art and Media Suppliers', 'ams@gmail.com', 1800);

