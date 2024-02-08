<div id="top"></div>

<!-- PROJECT LOGO -->
<br />
<div align="center">

![](public/images/swift-send-banner.jpg)

<h2 align="center">Swift-Send</h3>
  <h3 align="center">Revolutionizing E-Commerce </h3>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>

  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

Squirrel is an oracle powered bootstrapped node Website. It is a faithful copy of Rokomari.com. You'll find many features that is in the main site. We tried best of our ability to create something in this short time.

Youtube Demo: https://youtu.be/eeUI5hNmdYo

## ERD

![](assets/swift-send-erd-image.png)

## Built With :heart: and

-   [![React](https://img.shields.io/badge/React-17.0.2-blue.svg)](https://reactjs.org/)
-   [![Node.js](https://img.shields.io/badge/Node.js-14.17.0-green.svg)](https://nodejs.org/)
-   [![Express](https://img.shields.io/badge/Express-4.17.1-yellow.svg)](https://expressjs.com/)
-   [![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.0.0-blueviolet.svg)](https://tailwindcss.com/)
-   [![SQL](https://img.shields.io/badge/SQL-Any-lightgrey.svg)](https://www.w3schools.com/sql/)
-   [![Oracle Database](https://img.shields.io/badge/Oracle%20Database-19c-red.svg)](https://www.oracle.com/database/)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

Follow the step by step installation procedure to install and run this on your machine

### Prerequisites

Make sure you have node and oracle installed in your device.

**`NodeJs`** : Install Node.js from [here](https://nodejs.org/en/download/)

**`Oracle`** : Install Oracle 19c from [here](http://www.oracle.com/index.html) and register for an account of your own

### Installation

#### Getting the repository

1. If Git is not installed on your device, you can download it from the official Git website: `[Download Git](https://git-scm.com/downloads)`
   or Download the zip file of the repo.

2. Go to command prompt/terminal and clone the repo

    ```sh
    git clone https://github.com/TamimEhsan/SQuirreL.git
    ```

3. After installation or download go to the repository and open command prompt.
   Or go to the file location through command prompt

    ```sh
    cd <your-git-path>
    ```

4. Install NPM packages

    ```sh
    npm install
    ```

#### Setting up the database

1. Go to command prompt/terminal and type sqlplus

    ```sh
    sqlplus
    ```

2. Enter credentials

    ```sh
    username: sys as sysdba
    password: <your-database-password>
    ```

3. Create a new user c##swiftsend

    ```
    create user c##swiftsend identified by password;
    grant dba to c##swiftsend;
    ```

4. Find file sql-dump.sql in `sql/sql-dump.sql`

5. Open a database GUI and connect swiftsend with that. If you don't have any GUI applicaton then you can just dump the whole files content in SQL Plus

6. Import data from sql file depending upon the GUI and run the sql.

7. If no errors are shown we are ready to go. If any error is shown please contact us.


#### Setting up the environment variables

create a new file `.env` in the root directory. And the file should have the followings

```sh
DB_USER= YOUR_DB_USER 
DB_PASS= YOUR_DB_PASS
DB_CONNECTSTRING=localhost/orcl
PORT=YOUR_FABOURITE_PORT
APP_SECRET=YOUR_DARKEST_SECRET
```

If you followed the above then the `.env` should look like this

```sh
DB_USER="c##swiftsend" 
DB_PASS="password"
DB_CONNECTSTRING="localhost/jmsdb"
PORT="3000"
APP_SECRET="shhhverysecret"
```

We are finally good to go

#### Run the project

Open command prompt and type

```sh
npm start
```

You should find that the project is working!

<p align="right">(<a href="#top">back to top</a>)</p>

## License

This project is licensed under the [Apache License 2.0](LICENSE).
