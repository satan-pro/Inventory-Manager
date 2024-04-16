create table supplier(
supplier_id varchar(5) primary key,
supplier_name varchar(50),
contact varchar(20),
credits numeric(5));

create table admins(
admin_id varchar(50) primary key,
admin_name varchar(20),
contact varchar(20),
pass varchar(20));

create table customers(
customer_id varchar(50) primary key,
customer_name varchar(20),
contact varchar(20),
pass varchar(20));

alter table customers modify customer_id varchar(50);

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
delivery_agent varchar(50),
status varchar(10) check(status in('Confirmed', 'Packed', 'Shipped', 'Delivered')),
delivery_date date,
delivery_charge numeric(10,2),
primary key(order_id, delivery_id),
foreign key(order_id) references orders);

create table invoice(
order_id varchar(5),
product_id varchar(5),
sell_price numeric(10,2),
product_quantity int,
primary key(order_id, product_id),
foreign key(order_id) references orders,
foreign key(product_id) references products);

create table cart(
customer_id varchar(50),
product_id varchar(5),
product_quantity int,
primary key(customer_id, product_id),
foreign key(product_id) references products);

drop table cart;

create or replace function authFunc(username in admins.admin_name%type) 
return varchar
as
    authPass varchar(20);
begin 
    select pass into authPass from admins where admins.admin_name=username;
    return authPass;
end;
/
select * from admins;
commit;

set serveroutput on 
begin
    dbms_output.put_line(authFunc('Satan'));
end;
/
select * from admins;

insert into admins values('1234','Satan','satan@ceo','123');

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

INSERT INTO orders (order_id, customer_id, order_date) VALUES ('O001', 'C001', TO_DATE('2024-04-06', 'YYYY-MM-DD'));
INSERT INTO orders (order_id, customer_id, order_date) VALUES ('O002', 'C002', TO_DATE('2024-04-06', 'YYYY-MM-DD'));
INSERT INTO orders (order_id, customer_id, order_date) VALUES ('O003', 'C003', TO_DATE('2024-04-06', 'YYYY-MM-DD'));
INSERT INTO orders (order_id, customer_id, order_date) VALUES ('O004', 'C004', TO_DATE('2024-04-06', 'YYYY-MM-DD'));
INSERT INTO orders (order_id, customer_id, order_date) VALUES ('O005', 'C005', TO_DATE('2024-04-06', 'YYYY-MM-DD'));
INSERT INTO orders (order_id, customer_id, order_date) VALUES ('O006', 'C001', TO_DATE('2024-04-07', 'YYYY-MM-DD'));
INSERT INTO orders (order_id, customer_id, order_date) VALUES ('O007', 'C002', TO_DATE('2024-04-07', 'YYYY-MM-DD'));
INSERT INTO orders (order_id, customer_id, order_date) VALUES ('O008', 'C003', TO_DATE('2024-04-07', 'YYYY-MM-DD'));
INSERT INTO orders (order_id, customer_id, order_date) VALUES ('O009', 'C004', TO_DATE('2024-04-07', 'YYYY-MM-DD'));
INSERT INTO orders (order_id, customer_id, order_date) VALUES ('O010', 'C005', TO_DATE('2024-04-07', 'YYYY-MM-DD'));

INSERT INTO delivery (delivery_id, order_id, delivery_agent, status, delivery_date, delivery_charge) VALUES ('D001', 'O001', 'FastShip', 'Confirmed', TO_DATE('2024-04-10', 'YYYY-MM-DD'), 10.00);
INSERT INTO delivery (delivery_id, order_id, delivery_agent, status, delivery_date, delivery_charge) VALUES ('D002', 'O002', 'QuickDeliver', 'Packed', TO_DATE('2024-04-11', 'YYYY-MM-DD'), 15.00);
INSERT INTO delivery (delivery_id, order_id, delivery_agent, status, delivery_date, delivery_charge) VALUES ('D003', 'O003', 'SpeedyShip', 'Shipped', TO_DATE('2024-04-12', 'YYYY-MM-DD'), 20.00);
INSERT INTO delivery (delivery_id, order_id, delivery_agent, status, delivery_date, delivery_charge) VALUES ('D004', 'O004', 'RapidLogistics', 'Delivered', TO_DATE('2024-04-13', 'YYYY-MM-DD'), 25.00);
INSERT INTO delivery (delivery_id, order_id, delivery_agent, status, delivery_date, delivery_charge) VALUES ('D005', 'O005', 'SwiftCourier', 'Confirmed', TO_DATE('2024-04-14', 'YYYY-MM-DD'), 30.00);
INSERT INTO delivery (delivery_id, order_id, delivery_agent, status, delivery_date, delivery_charge) VALUES ('D006', 'O006', 'QuickShip', 'Packed', TO_DATE('2024-04-15', 'YYYY-MM-DD'), 35.00);
INSERT INTO delivery (delivery_id, order_id, delivery_agent, status, delivery_date, delivery_charge) VALUES ('D007', 'O007', 'ExpressLogistics', 'Shipped', TO_DATE('2024-04-16', 'YYYY-MM-DD'), 40.00);
INSERT INTO delivery (delivery_id, order_id, delivery_agent, status, delivery_date, delivery_charge) VALUES ('D008', 'O008', 'RapidCargo', 'Delivered', TO_DATE('2024-04-17', 'YYYY-MM-DD'), 45.00);
INSERT INTO delivery (delivery_id, order_id, delivery_agent, status, delivery_date, delivery_charge) VALUES ('D009', 'O009', 'SpeedyDelivery', 'Confirmed', TO_DATE('2024-04-18', 'YYYY-MM-DD'), 50.00);
INSERT INTO delivery (delivery_id, order_id, delivery_agent, status, delivery_date, delivery_charge) VALUES ('D010', 'O010', 'EasyLogistics', 'Packed', TO_DATE('2024-04-19', 'YYYY-MM-DD'), 55.00);

INSERT INTO invoice (order_id, product_id, sell_price, product_quantity) VALUES 
('O001', 'P001', 20.00, 2);
INSERT INTO invoice (order_id, product_id, sell_price, product_quantity) VALUES 
('O001', 'P002', 15.00, 3);
INSERT INTO invoice (order_id, product_id, sell_price, product_quantity) VALUES 
('O001', 'P003', 30.00, 1);
INSERT INTO invoice (order_id, product_id, sell_price, product_quantity) VALUES 
('O002', 'P002', 15.00, 2);
INSERT INTO invoice (order_id, product_id, sell_price, product_quantity) VALUES 
('O002', 'P003', 30.00, 1);
INSERT INTO invoice (order_id, product_id, sell_price, product_quantity) VALUES 
('O002', 'P004', 25.00, 1);
INSERT INTO invoice (order_id, product_id, sell_price, product_quantity) VALUES 
('O003', 'P001', 20.00, 1);
INSERT INTO invoice (order_id, product_id, sell_price, product_quantity) VALUES 
('O003', 'P003', 30.00, 2);
INSERT INTO invoice (order_id, product_id, sell_price, product_quantity) VALUES 
('O004', 'P001', 20.00, 3);
INSERT INTO invoice (order_id, product_id, sell_price, product_quantity) VALUES 
('O004', 'P002', 15.00, 2);
INSERT INTO invoice (order_id, product_id, sell_price, product_quantity) VALUES 
('O005', 'P001', 20.00, 1);
INSERT INTO invoice (order_id, product_id, sell_price, product_quantity) VALUES 
('O005', 'P002', 15.00, 1);
INSERT INTO invoice (order_id, product_id, sell_price, product_quantity) VALUES 
('O005', 'P003', 30.00, 1);
INSERT INTO invoice (order_id, product_id, sell_price, product_quantity) VALUES 
('O005', 'P004', 25.00, 1);
INSERT INTO invoice (order_id, product_id, sell_price, product_quantity) VALUES 
('O006', 'P002', 15.00, 1);
INSERT INTO invoice (order_id, product_id, sell_price, product_quantity) VALUES 
('O006', 'P003', 30.00, 2);
INSERT INTO invoice (order_id, product_id, sell_price, product_quantity) VALUES 
('O006', 'P004', 25.00, 3);
INSERT INTO invoice (order_id, product_id, sell_price, product_quantity) VALUES 
('O007', 'P001', 20.00, 2);
INSERT INTO invoice (order_id, product_id, sell_price, product_quantity) VALUES 
('O007', 'P002', 15.00, 1);
INSERT INTO invoice (order_id, product_id, sell_price, product_quantity) VALUES 
('O007', 'P004', 25.00, 1);
INSERT INTO invoice (order_id, product_id, sell_price, product_quantity) VALUES 
('O008', 'P001', 20.00, 3);
INSERT INTO invoice (order_id, product_id, sell_price, product_quantity) VALUES 
('O008', 'P002', 15.00, 1);
INSERT INTO invoice (order_id, product_id, sell_price, product_quantity) VALUES 
('O008', 'P003', 30.00, 2);
INSERT INTO invoice (order_id, product_id, sell_price, product_quantity) VALUES 
('O008', 'P004', 25.00, 1);
INSERT INTO invoice (order_id, product_id, sell_price, product_quantity) VALUES 
('O009', 'P002', 15.00, 2);
INSERT INTO invoice (order_id, product_id, sell_price, product_quantity) VALUES 
('O009', 'P003', 30.00, 1);
INSERT INTO invoice (order_id, product_id, sell_price, product_quantity) VALUES 
('O009', 'P004', 25.00, 3);
INSERT INTO invoice (order_id, product_id, sell_price, product_quantity) VALUES 
('O010', 'P001', 20.00, 1);
INSERT INTO invoice (order_id, product_id, sell_price, product_quantity) VALUES 
('O010', 'P003', 30.00, 2);
INSERT INTO invoice (order_id, product_id, sell_price, product_quantity) VALUES 
('O010', 'P004', 25.00, 2);

select * from invoice;

select * from (orders join (products join invoice using(product_id)) using(order_id)) join customers using(customer_id) join supplier using(supplier_id) where order_id='O001';

select status from (orders join customers using(customer_id)) join delivery using(order_id) where order_id='O001';

select sum(sell_price) as total from orders join invoice using(order_id) group by order_id having order_id='O001';

select * from products order by product_id;

select product_category from products group by product_category;

select supplier_name from supplier;

select * from cart;

select * from orders;

select * from (orders join cart using(customer_id)) join products using(product_id);

select * from orders natural join customers;

delete from invoice where order_id='6bc0253a-5a1a-43c2-a24e-02ad6abd112f';

delete from customers;
delete from orders;
delete from delivery;
delete from invoice;
delete from cart;

select * from customers;
select * from admins;
select * from invoice;
select * from orders;
select * from cart;
select * from delivery;
select * from products;

select * from (cart join products using(product_id)) join invoice using(product_id) where customer_id='9772';
select * from cart join products using(product_id) where customer_id='1309';
delete from cart where customer_id='9772';