# <h1>Tanya Kuliah </h1>
## Description
TanyaKuliah is a website designed to facilitate communication between high school students and undergraduates, allowing high schoolers to gain insights into the experiences of college life, particularly within a specific major and university, through messaging.
## Table of Contents
- [Tanya Kuliah ](#tanya-kuliah-)
  - [Description](#description)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
    - [Authentication](#authentication)
    - [Home page](#home-page)
    - [College Buddy](#college-buddy)
    - [Group Chat (WIP)](#group-chat-wip)
    - [Dashboard (WIP)](#dashboard-wip)
    - [Info Kuliah (WIP)](#info-kuliah-wip)
  - [Tech stack](#tech-stack)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Screenshots](#screenshots)
## Features
### Authentication
Password are hashed using bcrypt with a session that lasts 1 hour, after that, users need to log back in
### Home page 
Landing page where user can see all available features 
### College Buddy
CollegeBuddy is a dedicated messaging system designed to connect high school students with mentors for consultation about college life.
### Group Chat (WIP)
The Group Chat feature enables dynamic, moderated conversations among high school students and a dedicated mentor. In this feature, one mentor oversees a group, facilitating discussions and providing guidance.
### Dashboard (WIP)
The Dashboard feature provides a comprehensive overview of engagement points for both students and mentors, reflecting their activity and participation in group and private chats.
### Info Kuliah (WIP)
Info Kuliah serves as an informative blog where high school students can read detailed articles about various universities. It provides a comprehensive overview of each institution, giving students a rough idea of what college life is like at their prospective schools.
## Tech stack
1. React : Utilized for server-side rendering to dynamically generate HTML content.
2. Express.js: A fast and minimalist web framework for Node.js, used to handle API calls and route management.
3. PostgreSQL: A powerful, open-source relational database system used for managing and storing blog data.
## Installation 
1. Clone the repository:
   ```bash
   git clone https://github.com/rororyo/TanyaKuliah.git

   cd ./TanyaKuliah
   ```
2. install dependencies for server side and client side:
   - Using 2 terminals ,1 console runs `cd ./client` and 1 more terminal runs `cd ./client`
   - in both terminals run  
      ```bash
      npm install
      ```
3. Modify the `.env` file so it matches your pgadmin options
4. Restore the `tanyaKuliah.sql` db export
5. Run the application: Using 2 terminals 
   ```bash
   Terminal 1 : npm run dev
   Terminal 2 : node ./server.js
   ```
## Usage
1. After running both terminals successfully, you can access the website in your browser with the this link: `http://localhost:5173`
2. Register your account, or you can use the already available admin accounts 
```txt
-- User 1
email : anu@admin.com
password : Ryokeren123
-- User 2
email : ryo@admin.com
password: Ryokeren123
```
3. The only feature that has been worked on is College Buddy, there you can choose users you want to chat and send them a private message.
## Screenshots
Here are some screenshots of the application
![image](https://github.com/rororyo/TanyaKuliah/assets/144687890/40f4e39a-9959-4c14-a588-7aa998b7fcab)
![image](https://github.com/rororyo/TanyaKuliah/assets/144687890/47fdff0b-d5b7-4082-b2ff-354095576d6f)
![image](https://github.com/rororyo/TanyaKuliah/assets/144687890/2e621e2d-6db4-4ba6-b6bc-20b57dd8fedf)

