# PlanYourLife
This is a repository to hold our source files for our group project for EECS 393 (Software Engineering). 

Link to Google API Info
https://developers.google.com/calendar/overview

Link to our SRS Document
https://docs.google.com/document/d/1RDNZM5eShtjVDoR9rvlogNUy1CO4kI2B6eduJAYLWy4/edit?usp=sharing

The Base project files are now in the repo. In order to run the project, you will need to install a few things. First, make sure you have node installed from online. Then, install angular from the terminal: 

npm install -g @angular/cli

npm install @angular/material

npm install @angular/cdk

npm install date

You will also need to install express. Again, from the command line, enter the following:

npm install express

You will probably need to modify your system variables as well. Under your path, add the following: 
C:\Users\[YourName]\Appdata\Roaming\npm

You can check that you have everything installed by running npm -v and node -v. Start the project by running the following command in the plan-your-life directory: 

ng serve --open

Run the server program by running the following command in a separate terminal. You will also need to be in the plan-your-life directory for this. 

node server.js

