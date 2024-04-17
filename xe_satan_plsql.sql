-- Authenticating using password --
create or replace function authFunc(username in admins.admin_name%type) 
return varchar
as
    authPass varchar(20);
begin 
    select pass into authPass from admins where admins.admin_name=username;
    return authPass;
end;
/

set serveroutput on 
begin
    dbms_output.put_line(authFunc('Satan'));
end;
/

-- Total Sales --
create or replace procedure totalSales is
    c1 sys_refcursor;
    inv invoice%rowtype;
    sales number(10,2);
begin
    sales:=0;
   open c1 for select * from invoice;
    loop
        fetch c1 into inv;
        exit when c1%notfound;
        sales:=sales+inv.sell_price;
    end loop;
    close c1;
    dbms_output.put_line(sales);
end;
/


-- Filtering by Category --
create or replace function categoryFilter(category products.product_category%type)
return int
as
    items int;
    cursor c1 is select * from products where product_category=category;
    prod c1%rowtype;
begin
    items:=0;
    for prod in c1 
    loop
        items:=items+1;
    end loop;
    return items;
end;
/

set serveroutput on
declare 
    cursor c1 is select distinct product_category from products group by product_category;
    cat c1%rowtype;
begin
    for cat in c1
    loop
        dbms_output.put_line('Category : '||cat.product_category);
        dbms_output.put_line(' Items : '||categoryFilter(cat.product_category));
    end loop;
end;
/

-- Finding Popular Products --
create or replace function popularProd
return varchar
as
    popular varchar(20);
    item int;
    cursor c1 is select count(product_id) as prodCount, product_category from invoice join products using(product_id) group by product_category;
    poprow c1%rowtype;
begin
    item:=0;
    for poprow in c1
    loop
        if poprow.prodCount>=item then
            item:=poprow.prodCount;
            popular:=poprow.product_category;
        end if;
    end loop;
    return popular;
end;
/

set serveroutput on
begin
    dbms_output.put_line('Popular Category : '||popularProd());
end;
/

-- Finding Least Popular Products --
create or replace function leastPopularProd
return varchar
as
    least varchar(20);
    item int;
    cursor c1 is select count(product_id) as prodCount, product_category from invoice join products using(product_id) group by product_category;
    lesrow c1%rowtype;
begin
    item:=999;
    for lesrow in c1
    loop
        if lesrow.prodCount<=item then
            item:=lesrow.prodCount;
            least:=lesrow.product_category;
        end if;
    end loop;
    return least;
end;
/

set serveroutput on
begin
    dbms_output.put_line('Least Popular Category : '||leastPopularProd());
end;
/