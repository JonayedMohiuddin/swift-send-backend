INSERT INTO USERS(EMAIL, NAME, PASSWORD) VALUES('jonayedmohiuddin@gmail.com', 'Jonayed Mohiuddin', HASH_PASSWORD('abc'));

INSERT INTO SUPPLIER(NAME, PASSWORD, EMAIL) VALUES('ELECTRONICS MART', HASH_PASSWORD('abc'), 'jonayedmohiuddin@gmail.com');
INSERT INTO SUPPLIER(NAME, PASSWORD, EMAIL) VALUES('FASHION MART', HASH_PASSWORD('abc'), 'jonayedmohiuddin2@gmail.com');
INSERT INTO SUPPLIER(NAME, PASSWORD, EMAIL) VALUES('LOGIC GATES', HASH_PASSWORD('abc'), 'jonayedmohiuddin3@gmail.com');

INSERT INTO ADMIN(NAME, PASSWORD, EMAIL) VALUES('JONAYED MOHIUDDIN', HASH_PASSWORD('abc'), 'jonayedmohiuddin@gmail.com');

INSERT INTO CATEGORY(NAME) VALUES('CAT1');
INSERT INTO CATEGORY(NAME) VALUES('CAT2');
INSERT INTO CATEGORY(NAME) VALUES('CAT3');

INSERT INTO PRODUCT (SUPPLIER_ID, CATEGORY_ID, NAME, PRICE) VALUES(1, 1, 'Bulb', 219);
INSERT INTO PRODUCT (SUPPLIER_ID, CATEGORY_ID, NAME, PRICE) VALUES(1, 2, 'Fan', 999);
INSERT INTO PRODUCT (SUPPLIER_ID, CATEGORY_ID, NAME, PRICE) VALUES(1, 3, 'Iron', 499);
INSERT INTO PRODUCT (SUPPLIER_ID, CATEGORY_ID, NAME, PRICE) VALUES(1, 1, 'Heater', 1999);
INSERT INTO PRODUCT (SUPPLIER_ID, CATEGORY_ID, NAME, PRICE) VALUES(2, 2, 'Kettle', 799);
INSERT INTO PRODUCT (SUPPLIER_ID, CATEGORY_ID, NAME, PRICE) VALUES(2, 3, 'Toaster', 499);
INSERT INTO PRODUCT (SUPPLIER_ID, CATEGORY_ID, NAME, PRICE) VALUES(2, 1, 'Cooker', 2999);
INSERT INTO PRODUCT (SUPPLIER_ID, CATEGORY_ID, NAME, PRICE) VALUES(2, 2, 'Mixer', 999);
INSERT INTO PRODUCT (SUPPLIER_ID, CATEGORY_ID, NAME, PRICE) VALUES(2, 3, 'Blender', 499);
INSERT INTO PRODUCT (SUPPLIER_ID, CATEGORY_ID, NAME, PRICE) VALUES(2, 1, 'Juicer', 1999);
INSERT INTO PRODUCT (SUPPLIER_ID, CATEGORY_ID, NAME, PRICE) VALUES(2, 2, 'Grinder', 799);
INSERT INTO PRODUCT (SUPPLIER_ID, CATEGORY_ID, NAME, PRICE) VALUES(2, 3, 'Chopper', 499);
INSERT INTO PRODUCT (SUPPLIER_ID, CATEGORY_ID, NAME, PRICE) VALUES(3, 1, 'Shaver', 2999);
INSERT INTO PRODUCT (SUPPLIER_ID, CATEGORY_ID, NAME, PRICE) VALUES(3, 2, 'Trimmer', 999);
INSERT INTO PRODUCT (SUPPLIER_ID, CATEGORY_ID, NAME, PRICE) VALUES(3, 3, 'Hair Dryer', 499);
INSERT INTO PRODUCT (SUPPLIER_ID, CATEGORY_ID, NAME, PRICE) VALUES(3, 1, 'Hair Straightener', 1999);
INSERT INTO PRODUCT (SUPPLIER_ID, CATEGORY_ID, NAME, PRICE) VALUES(3, 2, 'Hair Curler', 799);
INSERT INTO PRODUCT (SUPPLIER_ID, CATEGORY_ID, NAME, PRICE) VALUES(3, 3, 'Hair Crimper', 499);
INSERT INTO PRODUCT (SUPPLIER_ID, CATEGORY_ID, NAME, PRICE) VALUES(3, 1, 'Hair Roller', 2999);
INSERT INTO PRODUCT (SUPPLIER_ID, CATEGORY_ID, NAME, PRICE) VALUES(3, 2, 'Hair Waver', 999);

INSERT INTO ORDERS(USER_ID, PHONE, ADDRESS) VALUES(1, '1234567890', 'Kathmandu');
INSERT INTO ORDER_ITEM(ORDER_ID, PRODUCT_ID, QUANTITY, STATUS) VALUES(1, 1, 2, 'PENDING');
INSERT INTO ORDER_ITEM(ORDER_ID, PRODUCT_ID, QUANTITY, STATUS) VALUES(1, 2, 6, 'PENDING');
INSERT INTO ORDER_ITEM(ORDER_ID, PRODUCT_ID, QUANTITY, STATUS) VALUES(1, 3, 23, 'PENDING');
INSERT INTO ORDER_ITEM(ORDER_ID, PRODUCT_ID, QUANTITY, STATUS) VALUES(1, 4, 7, 'PENDING');

INSERT INTO RATING_REVIEW(USER_ID, PRODUCT_ID, RATING, REVIEW) VALUES(1, 1, 5, 'Very good product satisfied using it. Recommended everyone!');
INSERT INTO RATING_REVIEW(USER_ID, PRODUCT_ID, RATING, REVIEW) VALUES(1, 2, 4, 'Good product. Bought it on sales discount happy to use it.');
INSERT INTO RATING_REVIEW(USER_ID, PRODUCT_ID, RATING, REVIEW) VALUES(1, 3, 3, 'Average product. Not satisfied with the quality.');
INSERT INTO RATING_REVIEW(USER_ID, PRODUCT_ID, RATING, REVIEW) VALUES(1, 4, 2, 'Bad product. Not recommended to buy it.');
INSERT INTO RATING_REVIEW(USER_ID, PRODUCT_ID, RATING, REVIEW) VALUES(1, 5, 1, 'Worst product. Not satisfied with the quality.');
INSERT INTO RATING_REVIEW(USER_ID, PRODUCT_ID, RATING, REVIEW) VALUES(1, 6, 5, 'Very good product satisfied using it. Recommended everyone!');
