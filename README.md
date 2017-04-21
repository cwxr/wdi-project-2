# wdi-project-2

## Project Name
![INS Hub](http://i.imgur.com/9tbKxJa.png)

### Description
INS Hub is a web application built for Insurance agents to manage their client's database with built-in email reminder function for their expiring policies.

### User Story
The insurance industry is very service oriented and extremely competitive in Singapore. 
Most of the Insurance Agents that handle general insurance policies (e.g: Car/Travel/Home etc.) 
do not maintain a proper system to keep themselves updated of their client's policy renewal dates.
Due to their busy schedules, they tend to miss out on updating their clients and result in loss of business and client's trust.

### Solution
Develop a robust web application for client database management with a reminder function that send scheduled email reminders to
the respective Agents when their client policy is almost due.

### Actual Product
[INS Hub](https://inshubsg.herokuapp.com)

### Design & Workflow
1) Agents must register with a Email, Name and Password.
2) Agents can have a secure login.
3) Agents can create new clients and their policies link to them. 
4) Able to view, update or delete existing clients and policies.

### Entity Relationship Diagram
![ERD](http://i.imgur.com/wKksrcw.jpg)

### Process Thoughts
![Process](http://i.imgur.com/ZZD3bc3.jpg)

### Notable Findings
![Email Sender](http://i.imgur.com/YwiX4rI.png)
The email sender will require a scheduler and also the main nodemailer for it to be functional.
The challenges i faced while trying to implement this was the scheduler initially only works on localhost and i managed to change the timezone via the heroku and so it matches our local timezone.

### Wishlist
If i had more time i would like to do the following for my project to make it better:
1) Allow the Agent to upload his own database via a .csv file for bulk upload.
2) Add in a search bar for searching of clients / policies.
3) Add in a sales marketing module for Agents to select groups of clients to send promo msgs.


### Language & Application
- HTML & CSS
- Node.js
- mLab
- Heroku
- Bootstrap

### Acknowledgement
Thanks to my instructor and TA for their guidance for me to complete this project!
Special Thanks to all my classmates who helped me along the way.. You guys are the best!
- Prima
- Yisheng
- Sharona
- Ian
- Maria
- Shirong
- Darrell
- Raymond
- Ariff
- Tom

### References
- Node Mailer - https://nodemailer.com
- Scheduler - https://bunkat.github.io/later

