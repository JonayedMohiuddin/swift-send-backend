INSERT INTO
    ADMIN (ID, NAME, PASSWORD, EMAIL, IMAGE_URL, ADDRESS)
VALUES
    (
        1,
        'admin',
        'admin',
        'admin@gmail.com',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfGtrAgOIg4722RdOT1PRNtcq0fXIjIzlPqQ&usqp=CAU',
        '432 Park Avenue, Apartment 23B, New York, NY 10022'
    );


INSERT INTO USERS (ID, NAME, PASSWORD, EMAIL, PHONE, DATE_OF_BIRTH, IMAGE_URL, ADDRESS) VALUES (1, 'Jonayed', 'Jonayed', 'abc', 'abc', SYSDATE, 'abc', 'abc');
INSERT INTO CART (ID, USER_ID, CREATED_AT, STATUS) VALUES (1, 1, SYSDATE, 'ACTIVE');

INSERT INTO
    SUPPLIER (ID, NAME, PASSWORD, IMAGE_URL, DESCRIPTION, ADDRESS)
VALUES
    (
        1,
        'Time Square',
        'Time Square',
        'https://static-01.daraz.com.bd/other/shop/9f7211d6f2a08d971a4ecfc72591e4c0.jpeg_120x120q75.jpg_.webp',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget ultricies ultricies, nunc nisl aliquam nunc, vitae aliquam nisl nunc vitae nisl.',
        '123 Main Street, Apartment 1, New York, NY 10022'
    );

INSERT INTO
    SUPPLIER (ID, NAME, PASSWORD, IMAGE_URL, DESCRIPTION, ADDRESS)
VALUES
    (
        2,
        'Fantech',
        'Fantech',
        'https://static-01.daraz.com.bd/other/shop/ae23358ebc2c847e112cde2526862582.png_120x120q75.jpg_.webp',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget ultricies ultricies, nunc nisl aliquam nunc, vitae aliquam nisl nunc vitae nisl.',
        '78 Old Street, Apartment 2, New York, NY 10022'
    );

INSERT INTO
    CATEGORY (ID, NAME, DESCRIPTION, IMAGE_URL)
VALUES
    (
        1,
        'Headphone_and_Headsets', 
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget ultricies ultricies, nunc nisl aliquam nunc, vitae aliquam nisl nunc vitae nisl.',
        'https://static-01.daraz.com.bd/p/47b1d22362ee9e9f8481df8df0ce3a51.jpg'
    );

INSERT INTO
    CATEGORY (ID, NAME, DESCRIPTION, IMAGE_URL)
VALUES
    (
        2,
        'Gaming_Consoles', 
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget ultricies ultricies, nunc nisl aliquam nunc, vitae aliquam nisl nunc vitae nisl.',
        'https://static-01.daraz.com.bd/p/b3c289667758d3ad73f77419b8888881.jpg_400x400q75.jpg_.webp'
    );

INSERT INTO
    PRODUCT (ID, SUPPLIER_ID, CATEGORY_ID, NAME, DESCRIPTION, IMAGE_URL, PRICE, DISCOUNT)
VALUES 
    (
        1,
        1,
        1,
        'Wave 200 TWS True Wireless Earbuds',
        'Extreme Bass Experience. These earbuds give you the best Bass experience ever. JBL is known for creating extreme bass machines, especially for concerts and gigs. Now they bring the bass into your ear with these extreme buds. So with this TWS explore the incredible world full of bass by yourself.',
        'https://static-01.daraz.com.bd/p/2a80b971e9c5781d2b0d25ddc4e44172.png_400x400q75.jpg_.webp',
        4200,
        5
    );

INSERT INTO
    PRODUCT (ID, SUPPLIER_ID, CATEGORY_ID, NAME, DESCRIPTION, IMAGE_URL, PRICE, DISCOUNT)
VALUES 
    (
        2,
        1,
        1,
        'JR-BB1 True Wireless Earbuds Autotuned Last',
        'Series name: Jbuds Series Product name: Jbuds Series BB1 True Wireless Earbuds Model: JR-BB1 Type: in-ear Color: black, white BT version: V5.3 Chip: Jieli AD6973D BT audio decoding: AAC, SBC Supported protocols: HSP, HFP, A2DP, AVRCP Working frequency: 2402-2480MHz Earbud battery capacity: 35mAh Case battery capacity: 450mAh Speaker impedance: 32Ω',
        'https://static-01.daraz.com.bd/p/039d7c51f3ea496bc34f42ea8eaa719d.png_400x400q75.jpg_.webp',
        2499,
        16
    );

INSERT INTO
    PRODUCT (ID, SUPPLIER_ID, CATEGORY_ID, NAME, DESCRIPTION, IMAGE_URL, PRICE, DISCOUNT)
VALUES
    (
        3,
        1,
        1,
        'QKZ DM9 Zinc Alloy HiFi Metal In Ear Earphones with Microphone - Black',
        'QKZ DM9 Zinc Alloy HiFi Metal In Ear Earphones - Black In-Ear Earphone with Microphone Pure pronunciation unit uncompromising tone CNAS, Certificate of quality system Speaker Frequency Response: 8-22K Hz Function: Play / Pause, Answer / Off Noise Canceling, Microphone',
        'https://static-01.daraz.com.bd/p/c70a059ca82d8a40d8e52b94f2bbf85a.jpg_400x400q75.jpg_.webp',
        900,
        60
    );

INSERT INTO
    PRODUCT (ID, SUPPLIER_ID, CATEGORY_ID, NAME, DESCRIPTION, IMAGE_URL, PRICE, DISCOUNT)
VALUES
    (
        4,
        2,
        2,
        'FANTECH GP13 SHOOTER II Gamepad Wired PC Game Controller Joystick Dual Vibration Saturn for Windows PC PS3 Playstation Android Gamepad',
        'Fantech SHOOTER II GP13 is an ergonomic gamepad with unique features such as low-latency, and turbo buttons. Designed for gamers who enjoy fighting platforming, and FPS gaming. Easily simulate multiple button presses, all at your fingertips',
        'https://static-01.daraz.com.bd/p/6195072e77a6b725a2b0eb1f5899dafe.jpg_400x400q75.jpg_.webp',
        2300,
        17
    );