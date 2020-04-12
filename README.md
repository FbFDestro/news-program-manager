# News program manager

This is a project developed with learning purposes for the Database course. For this reason, some technical details such as security were not handled.

The system was developed with Node.Js as backend and initially, Vanilla Javascript for the frontend that has been refactored to a React.js frontend client, together with a PostgreSQL database which was the main focus on this project.

## Installation and execution instructions

1. Download the project repository, that can be done by running:

   > `git clone https://github.com/FbFDestro/news-program-manager.git`

2. Open the project folder and run the script _npm-install-all.sh_

   > `chmod +x npm-install-all.sh`

   > `./npm-install-all.sh`

3. Open the _server_ folder and add a '.env' file with the following environment variables

   > USER=**DATABASE USER**

   > PASS=**DATABASE PASSWORD**

   > BDNAME=**DATABASE NAME**

   > BDINITIALSETUP=**1 TO CREATE DATABASE TABLES AND POPULATE IT WITH INITIAL DATA, 0 OTHERWISE**

   Before running the client and server, a PostgreSQL database needs to be configured.

4. Run the client and server by running the following command on main folder:
   > `npm start`

<img src="https://github.com/FbFDestro/news-program-manager/blob/master/MER.jpg?raw=true" />
