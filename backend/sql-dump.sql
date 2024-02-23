DROP TABLE QUERY;
DROP TABLE CART_ITEM;
DROP TABLE ORDER_ITEM;
DROP TABLE RATING;
DROP TABLE REVIEW;
DROP TABLE WISH_LIST;
DROP TABLE NOTIFICATION;
DROP TABLE PRODUCT_PROPERTY;
DROP TABLE SWIFT_SEND_WAREHOUSE_ITEM;
DROP TABLE SUPPLIER_PENDING_ORDERS;
DROP TABLE PRODUCT;

-- DROP TABLE CART;
DROP TABLE VOUCHER;
DROP TABLE ORDERS;

DROP TABLE ADMIN;
DROP TABLE SUPPLIER;
DROP TABLE CATEGORY;
DROP TABLE PROPERTY;
DROP TABLE NOTIFICATION_TYPE;
DROP TABLE USERS;

CREATE TABLE ADMIN (
    ID          NUMBER GENERATED BY DEFAULT AS IDENTITY, 
    EMAIL       VARCHAR2(100) NOT NULL UNIQUE,
    NAME        VARCHAR2(500) NOT NULL,
    PASSWORD    NUMBER NOT NULL,
    IMAGE_URL   VARCHAR2(1000) DEFAULT '/images/no-profile-picture.jpg',
    ADDRESS     VARCHAR2(1000) NOT NULL,

    CONSTRAINT ADMIN_PK PRIMARY KEY(ID)
);

CREATE TABLE SUPPLIER (
    ID          NUMBER GENERATED BY DEFAULT AS IDENTITY,
	  EMAIL	      VARCHAR2(100) NOT NULL UNIQUE,
    NAME        VARCHAR2(500) NOT NULL,
    PASSWORD    NUMBER NOT NULL,
    IMAGE_URL   VARCHAR2(1000) DEFAULT '/images/no-profile-picture.jpg',
    DESCRIPTION VARCHAR2(3000),
    ADDRESS     VARCHAR2(1000),
    
    CONSTRAINT SUPPLIER_PK PRIMARY KEY(ID)
);

DROP SEQUENCE USERS_SEQUENCE;
CREATE SEQUENCE USERS_SEQUENCE START WITH 1 INCREMENT BY 1;

CREATE TABLE USERS (
--     ID                  NUMBER GENERATED BY DEFAULT AS IDENTITY,
    ID                  NUMBER DEFAULT USERS_SEQUENCE.NEXTVAL NOT NULL,
    EMAIL               VARCHAR2(100) NOT NULL UNIQUE,
    NAME                VARCHAR2(500) NOT NULL,
    PASSWORD            NUMBER NOT NULL,
    PHONE               VARCHAR2(100),
    DATE_OF_BIRTH       DATE,
    IMAGE_URL           VARCHAR2(1000) DEFAULT '/images/no-profile-picture.jpg',
    ADDRESS             VARCHAR2(1000),

    CREATED_ON          DATE DEFAULT SYSDATE,
    LAST_UPDATED_ON     DATE,
    
    CONSTRAINT USERS_PK PRIMARY KEY(ID)
);

CREATE TABLE QUERY (
    ID                  NUMBER GENERATED BY DEFAULT AS IDENTITY,
    USER_ID             NUMBER,
    SUPPLIER_ID         NUMBER,
    MESSAGE             VARCHAR2(1000) NOT NULL,
    REPLY               VARCHAR2(1000),
    
    CREATED_ON          DATE DEFAULT SYSDATE,
    LAST_UPDATED_ON     DATE,
    
    CONSTRAINT QUERY_PK PRIMARY KEY(ID),
    CONSTRAINT QUERY_USER_FK FOREIGN KEY(USER_ID) REFERENCES USERS(ID) ON DELETE SET NULL,
    CONSTRAINT QUERY_SUPPLIER_FK FOREIGN KEY(SUPPLIER_ID) REFERENCES SUPPLIER(ID) ON DELETE SET NULL
);

CREATE TABLE CATEGORY (
    ID              NUMBER GENERATED BY DEFAULT AS IDENTITY,
    NAME            VARCHAR2(100) NOT NULL,
    DESCRIPTION     VARCHAR2(3000),
    IMAGE_URL       VARCHAR2(1000) DEFAULT 'c/images/no-category-image.jpg',

    CONSTRAINT CATEGORY_PK PRIMARY KEY(ID)
);

CREATE TABLE PRODUCT (
    ID                  NUMBER GENERATED BY DEFAULT AS IDENTITY,
    SUPPLIER_ID         NUMBER NOT NULL,
    CATEGORY_ID         NUMBER NOT NULL,
    NAME                VARCHAR2(500) NOT NULL,
    PRICE               NUMBER NOT NULL CONSTRAINT PRICE_MIN CHECK (PRICE > 0),
    DESCRIPTION         VARCHAR2(3000),
    IMAGE_URL           VARCHAR2(1000) DEFAULT '/images/no-product-image.jpg',
    DISCOUNT            NUMBER DEFAULT 0,
    
    RATING_COUNT        NUMBER DEFAULT 0,
    TOTAL_RATING        NUMBER DEFAULT 0,

    CREATED_ON          DATE DEFAULT SYSDATE,
    LAST_UPDATED_ON     DATE,
    
    CONSTRAINT PRODUCT_PK PRIMARY KEY(ID),
    CONSTRAINT PRODUCT_SUPPLIER_FK FOREIGN KEY(SUPPLIER_ID) REFERENCES SUPPLIER(ID) ON DELETE CASCADE,
    CONSTRAINT PRODUCT_CATEGORY_FK FOREIGN KEY(CATEGORY_ID) REFERENCES CATEGORY(ID) ON DELETE CASCADE
);

CREATE TABLE PROPERTY (
    ID              NUMBER GENERATED BY DEFAULT AS IDENTITY,
    NAME            VARCHAR2(100) NOT NULL,
    DESCRIPTION     VARCHAR2(3000),
    DURATION        NUMBER DEFAULT 0,
    
    CONSTRAINT      PROPERTY_PK PRIMARY KEY(ID)
);

CREATE TABLE PRODUCT_PROPERTY (
    PRODUCT_ID  NUMBER,
    PROPERTY_ID NUMBER,

    CONSTRAINT PRODUCT_PROPERTY_PK PRIMARY KEY (PRODUCT_ID, PROPERTY_ID),
    CONSTRAINT PRODUCT_PROPERTY_PRODUCT_FK FOREIGN KEY (PRODUCT_ID) REFERENCES PRODUCT(ID),
    CONSTRAINT PRODUCT_PROPERTY_PROPERTY_FK FOREIGN KEY (PROPERTY_ID) REFERENCES PRODUCT(ID)
);


CREATE TABLE SWIFT_SEND_WAREHOUSE_ITEM (
    ID                  NUMBER GENERATED BY DEFAULT AS IDENTITY,
    SUPPLIER_ID         NUMBER,
    USER_ID             NUMBER,
    PRODUCT_ID          NUMBER,
    QUANTITY            NUMBER, 
    ADDRESS             VARCHAR2(1000) NOT NULL,
    CREATED_AT          DATE DEFAULT SYSDATE,
    
    CONSTRAINT SWIFT_SEND_WAREHOUSE_ITEM_PK PRIMARY KEY(ID),
    CONSTRAINT SWIFT_SEND_WAREHOUSE_ITEM_SUPPLIER_FK FOREIGN KEY(SUPPLIER_ID) REFERENCES SUPPLIER(ID),
    CONSTRAINT SWIFT_SEND_WAREHOUSE_ITEM_PRODUCT_FK FOREIGN KEY(PRODUCT_ID) REFERENCES PRODUCT(ID),
    CONSTRAINT SWIFT_SEND_WAREHOUSE_ITEM_USER_FK FOREIGN KEY(USER_ID) REFERENCES USERS(ID)
);

CREATE TABLE SUPPLIER_PENDING_ORDERS (
    ID                  NUMBER GENERATED BY DEFAULT AS IDENTITY,
    SUPPLIER_ID         NUMBER,
    USER_ID             NUMBER,
    PRODUCT_ID          NUMBER,
    QUANTITY            NUMBER, 
    ADDRESS             VARCHAR2(1000) NOT NULL,
    CREATED_AT          DATE DEFAULT SYSDATE,
    
    CONSTRAINT SUPPLIER_PENDING_ORDERS_PK PRIMARY KEY(ID),
    CONSTRAINT SUPPLIER_PENDING_ORDERS_SUPPLIER_FK FOREIGN KEY(SUPPLIER_ID) REFERENCES SUPPLIER(ID),
    CONSTRAINT SUPPLIER_PENDING_ORDERS_PRODUCT_FK FOREIGN KEY(PRODUCT_ID) REFERENCES PRODUCT(ID),
    CONSTRAINT SUPPLIER_PENDING_ORDERS_USER_FK FOREIGN KEY(USER_ID) REFERENCES USERS(ID)
);

CREATE TABLE CART_ITEM (
    ID                NUMBER GENERATED BY DEFAULT AS IDENTITY,
    USER_ID           NUMBER,
    PRODUCT_ID        NUMBER UNIQUE,
    QUANTITY          NUMBER DEFAULT 1 NOT NULL,    

    CONSTRAINT CART_ITEM_PK PRIMARY KEY(ID),
    CONSTRAINT CART_ITEM_USER_FK FOREIGN KEY(USER_ID) REFERENCES USERS(ID),
    CONSTRAINT CART_ITEM_PRODUCT_FK FOREIGN KEY(PRODUCT_ID) REFERENCES PRODUCT(ID)
);

-- CREATE TABLE CART (
--     ID            NUMBER GENERATED BY DEFAULT AS IDENTITY,
--     USER_ID       NUMBER,
--     STATUS        VARCHAR2(50),
--     CREATED_ON    DATE DEFAULT SYSDATE,
    
--     CONSTRAINT CART_PK PRIMARY KEY(ID),
--     CONSTRAINT CART_USER_FK FOREIGN KEY(USER_ID) REFERENCES USERS(ID)
-- );

-- CREATE TABLE CART_ITEM (
--     ID                NUMBER GENERATED BY DEFAULT AS IDENTITY,
--     CART_ID           NUMBER,
--     PRODUCT_ID        NUMBER,
--     QUANTITY          NUMBER DEFAULT 1 NOT NULL,    

--     CONSTRAINT CART_ITEM_PK PRIMARY KEY(ID),
--     CONSTRAINT CART_ITEM_CART_FK FOREIGN KEY(CART_ID) REFERENCES CART(ID),
--     CONSTRAINT CART_ITEM_PRODUCT_FK FOREIGN KEY(PRODUCT_ID) REFERENCES PRODUCT(ID)
-- );

CREATE TABLE ORDERS (
    ID                  NUMBER GENERATED BY DEFAULT AS IDENTITY,
    USER_ID             NUMBER,
    PHONE_1             VARCHAR2(20),
    PHONE_2             VARCHAR2(20),
    VOUCHER_ID        	NUMBER, 
    ADDRESS             VARCHAR2(1000) NOT NULL,
    CREATED_AT          DATE DEFAULT SYSDATE,

    CONSTRAINT ORDERS_PK PRIMARY KEY(ID),
    CONSTRAINT ORDERS_USER_FK FOREIGN KEY(USER_ID) REFERENCES USERS(ID)
);

CREATE TABLE ORDER_ITEM (
    ID                  NUMBER GENERATED BY DEFAULT AS IDENTITY,
    ORDER_ID            NUMBER,
    PRODUCT_ID          NUMBER,
    QUANTITY            NUMBER DEFAULT 1 NOT NULL,
    STATUS              VARCHAR2(50), -- Processed, Shipped, Delivered

    CONSTRAINT ORDER_ITEM_PK PRIMARY KEY(ID),
    CONSTRAINT ORDER_ITEM_ORDERS_FK FOREIGN KEY(ORDER_ID) REFERENCES ORDERS(ID),
    CONSTRAINT ORDER_ITEM_PRODUCT_FK FOREIGN KEY(PRODUCT_ID) REFERENCES PRODUCT(ID)
);


CREATE TABLE VOUCHER (
    ID              NUMBER GENERATED BY DEFAULT AS IDENTITY,
    SUPPLIER_ID     NUMBER,
    DESCRIPTION     VARCHAR2(1000),
    DISCOUNT        NUMBER NOT NULL,
    VALIDITY        DATE,
    CAP             NUMBER default 250,

    CONSTRAINT  VOUCHER_PK PRIMARY KEY(ID),
    CONSTRAINT  VOUCHER_SUPPLIER_FK FOREIGN KEY(SUPPLIER_ID) REFERENCES SUPPLIER(ID)
);

CREATE TABLE RATING (
    ID          NUMBER GENERATED BY DEFAULT AS IDENTITY,
    USER_ID     NUMBER,
    PRODUCT_ID  NUMBER,
    RATING      NUMBER,

    CONSTRAINT RATING_PK PRIMARY KEY(ID),
    CONSTRAINT RATING_USER_FK FOREIGN KEY(USER_ID) REFERENCES USERS(ID) ON DELETE SET NULL,
    CONSTRAINT RATING_PRODUCT_FK FOREIGN KEY(PRODUCT_ID) REFERENCES PRODUCT(ID) ON DELETE CASCADE
);

CREATE TABLE REVIEW (
    ID          NUMBER GENERATED BY DEFAULT AS IDENTITY,
    USER_ID     NUMBER,
    PRODUCT_ID  NUMBER,
    MESSAGE     VARCHAR2(1000),

    CREATED_ON          DATE DEFAULT SYSDATE,
    LAST_UPDATED_ON     DATE,

    CONSTRAINT REVIEW_PK PRIMARY KEY(ID),
    CONSTRAINT REVIEW_USER_FK FOREIGN KEY(USER_ID) REFERENCES USERS(ID) ON DELETE SET NULL,
    CONSTRAINT REVIEW_PRODUCT_FK FOREIGN KEY(PRODUCT_ID) REFERENCES PRODUCT(ID) ON DELETE CASCADE
);

CREATE TABLE WISH_LIST (
    USER_ID         NUMBER,
    PRODUCT_ID      NUMBER,

    CONSTRAINT WISH_LIST_PK PRIMARY KEY(USER_ID, PRODUCT_ID),
    CONSTRAINT WISH_LIST_USER_FK FOREIGN KEY(USER_ID) REFERENCES USERS(ID) ON DELETE CASCADE,
    CONSTRAINT WISH_LIST_PRODUCT_FK FOREIGN KEY(PRODUCT_ID) REFERENCES PRODUCT(ID) ON DELETE CASCADE
);

CREATE TABLE NOTIFICATION_TYPE (
    ID              NUMBER GENERATED BY DEFAULT AS IDENTITY,
    NAME            VARCHAR2(100) NOT NULL,
    DESCRIPTION     VARCHAR2(3000),

    CONSTRAINT NOTIFICATION_TYPE_PK PRIMARY KEY(ID)
);

CREATE TABLE NOTIFICATION (
    ID              NUMBER GENERATED BY DEFAULT AS IDENTITY,
    USER_ID         NUMBER,
    TYPE_ID         NUMBER,
    MESSAGE         VARCHAR2(1000),
    SENT_AT         DATE DEFAULT SYSDATE,
    IS_READ         NUMBER DEFAULT 0,
    URL             VARCHAR2(1000),

    CONSTRAINT NOTIFICATION_PK PRIMARY KEY(ID),
    CONSTRAINT NOTIFICATION_USER_FK FOREIGN KEY(USER_ID) REFERENCES USERS(ID) ON DELETE CASCADE,
    CONSTRAINT NOTIFICATION_TYPE_FK FOREIGN KEY(TYPE_ID) REFERENCES NOTIFICATION_TYPE(ID) ON DELETE CASCADE
);

-- PL/SQL PROCEDURE(1), FUNCTIONS(1), TRIGGERS(3)


CREATE OR REPLACE FUNCTION HASH_PASSWORD(PSW IN VARCHAR2) RETURN NUMBER IS
    HASHED_VALUE NUMBER;
BEGIN
    SELECT ORA_HASH(PSW, 2000) INTO HASHED_VALUE FROM DUAL;
    RETURN HASHED_VALUE;
END;
/



CREATE OR REPLACE PROCEDURE ADD_OR_UPDATE_CART_ITEM(USER_ID_VALUE IN NUMBER, PRODUCT_ID_VALUE IN NUMBER, QUANTITY_VALUE IN NUMBER) IS 
	CART_ID_VALUE NUMBER;
BEGIN
	BEGIN
        SELECT ID INTO CART_ID_VALUE
        FROM CART_ITEM CI
        WHERE CI.PRODUCT_ID = PRODUCT_ID_VALUE;

        UPDATE CART_ITEM SET QUANTITY = QUANTITY + QUANTITY_VALUE WHERE ID = CART_ID_VALUE;
    EXCEPTION
        WHEN NO_DATA_FOUND THEN
            INSERT INTO CART_ITEM(USER_ID, PRODUCT_ID, QUANTITY) VALUES(USER_ID_VALUE, PRODUCT_ID_VALUE, QUANTITY_VALUE);
    END;
END;
/

CREATE OR REPLACE TRIGGER USER_ADDED_ORDER_ITEM
AFTER INSERT 
ON ORDER_ITEM
FOR EACH ROW
DECLARE
    SUPPLIER_ID_VALUE NUMBER;
    USER_ID_VALUE NUMBER;
    ADDRESS_VALUE VARCHAR2(1000);
BEGIN
    SELECT SUPPLIER_ID INTO SUPPLIER_ID_VALUE FROM PRODUCT WHERE ID = :NEW.PRODUCT_ID;
    SELECT USER_ID INTO USER_ID_VALUE FROM ORDERS WHERE ID = :NEW.ORDER_ID;
    SELECT ADDRESS INTO ADDRESS_VALUE FROM ORDERS WHERE ID = :NEW.ORDER_ID;

    INSERT INTO SUPPLIER_PENDING_ORDERS(SUPPLIER_ID, USER_ID, PRODUCT_ID, QUANTITY, ADDRESS) VALUES(
        SUPPLIER_ID_VALUE,
        USER_ID_VALUE,
        :NEW.PRODUCT_ID,
        :NEW.QUANTITY,
        ADDRESS_VALUE
    );
END;
/

CREATE OR REPLACE TRIGGER SUPPLIER_SHIPPED_ORDER_ITEM
AFTER DELETE
ON SUPPLIER_PENDING_ORDERS
FOR EACH ROW
BEGIN
    INSERT INTO SWIFT_SEND_WAREHOUSE_ITEM (SUPPLIER_ID, USER_ID, PRODUCT_ID, QUANTITY, ADDRESS) VALUES(
        :OLD.SUPPLIER_ID,
        :OLD.USER_ID,
        :OLD.PRODUCT_ID,
        :OLD.QUANTITY,
        :OLD.ADDRESS
    );

    UPDATE ORDER_ITEM SET STATUS = 'Shipped' WHERE PRODUCT_ID = :OLD.PRODUCT_ID;
END;
/

CREATE OR REPLACE TRIGGER PRODUCT_DELIVERED
AFTER DELETE
ON SWIFT_SEND_WAREHOUSE_ITEM
FOR EACH ROW
BEGIN
    UPDATE ORDER_ITEM SET STATUS = 'Delivered' WHERE PRODUCT_ID = :OLD.PRODUCT_ID;
END;
/

-- *** CHECK ERRORS IN SQL*PLUS ***
-- SHOW ERRORS PROCEDURE ADD_OR_UPDATE_CART_ITEM;

--BEGIN
--	ADD_OR_UPDATE_CART_ITEM(1, 1, 1);
--END;
