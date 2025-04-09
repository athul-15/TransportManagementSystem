This project is a full-stack web application for managing and booking bus transport. Developed using the MERN stack (MongoDB, Express, React, Node.js), it includes features for user authentication, transport management, seat booking, and viewing booking history. Role-based access is implemented for users and administrators.

---

## Project Management

All development tasks are tracked using the Agile methodology on JIRA.  
**JIRA Board:** [View JIRA Project](https://connect-team-ln26syjt.atlassian.net/jira/software/projects/TBS/boards/34?atlOrigin=eyJpIjoiYTFjZThkMDJiY2Q4NGUxZGI1MTA3YmVmMDY3MmU5OTMiLCJwIjoiaiJ9)

---

## Features

### User Functions
- Register and log in with a secure account
- Search and view available buses by route and date
- Book a seat on available transport
- View and cancel personal bookings

### Admin Functions
- Add new buses and update or remove existing entries
- View all bookings made by users users


---

## Technology Stack

**Frontend:** Built with React.js and styled using Tailwind CSS  
**Backend:** Node.js with Express.js  
**Database:** MongoDB Atlas  
**Authentication:** JSON Web Tokens (JWT)  
**Testing:** Mocha and Chai for backend testing  
**CI/CD:** Automated using GitHub Actions  
**Deployment:** Hosted on AWS EC2

---

## Continuous Integration and Deployment (CI/CD)

- GitHub Actions are used for continuous integration.
- Backend tests are executed automatically on every push to the `main` branch.
- Frontend is built and verified during CI.
- Deployment to AWS EC2 is triggered manually or post-verification.
