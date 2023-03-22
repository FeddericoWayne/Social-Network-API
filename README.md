# Social Network API <img src="https://img.shields.io/badge/license-MIT-yellow?style=plastic">

  ## <a id="Description">Description</a> 

  This is an API for a social network that utilizes mongoDB as its database. With the help of mongoose and node express, it allows users to perform various CRUD operations on the following mongoose models: User, Thoughts (which includes a reaction subdocument).

  To start the API server, install required npm packages and then type "npm start" on the terminal.

  Users will be able to:

   * Create a new user by entering username and email in the body of the request
   * Retrieve data from all the existing users
   * Retrieve data from a single user by specifying the user's unique user ID, with the user's posted thoughts and friends details both populated by mongoose
   * Update a user's info by the user's unique user ID
   * Delete a user by the user's unique user ID, which would also delete all the thoughts and reactions the user has created from the database and remove the deleted user's user ID from other users' 'friends' array

   * Add another user as a friend (which would add the new friend's user ID to the user's 'friends' array)
   * Remove a friend from the user's current friend list (removing the friend's user ID from the user's 'friends' array)

   * Create a new thought by entering 'thoughtText', 'username', and 'userId in the body of the request
   * Retrieve all existing thoughts
   * Retrieve a single thought by using the thought's unique ID
   * Update a single thought by using the thought's unique ID and entering the new 'thoughtText' as the request body
   * Delete a single thought by using the thought's unique ID, which would also remove the thought's ID from the author's 'thoughts' array
   * Post a reaction to a thought by using the thought's ID and entering the 'reactionBody' and 'username' in the request body
   * Delete a reaction to a thought by using the thought's ID and the reaction's 'reactionID'

  Once a GET request for user/thought is sent successfully, the API will return queried data; once a user/friend/thought/reaction POST request is sent successfully, the API will return a message to notify the user that a new user/friend/thought/reaction has been created/added; once a user/thought PUT request is sent successfully, the API will return a message notifying the user accordingly; once a user/friend/thought/reaction DELETE request is sent successfully, the API will return a message notifying the user that the user/friend/thought/reaction has been removed/deleted.

  If the user attemps to create a new user that already exists in the database, the API will send a duplicate data alert. If at any point the mongoDB User/ Thought collection is empty when queried, the user will get a message that says no data is found. If at any point the user enters a user ID/ thought ID/ reaction ID that doesn't exist in the database, the user will be alerted accordingly. If the user tries to add himself as a friend or add the same person as a friend multiple times, the API will return a message that alerts the user that such request isn't allowed. 

  
  The URL of the demo video: 

  The URL of the Github repo is: https://github.com/FeddericoWayne/Social-Network-API

  API CRUD operation screenshots:

  User GET request for all users:
  <img src="./assets/images/login-screenshot.png">

  User GET request for a single user:
  <img src="./assets/images/Dashboard-screenshot.png">

  User POST request for new user creation:
  <img src="./assets/images/Homepage-screenshot.png">

  User POST request to update user info:
  <img src="./assets/images/newpost-screenshot.png">

  user DELETE request to remove user and user's associated thoughts:
  <img src="./assets/images/Comment-screenshot.png">

  Friends POST request to add friend to User:
  <img src="./assets/images/edit-comment-screenshot.png">

  Friends DELETE request to remove friend from User:
  <img src="./assets/images/edit-comment-screenshot.png">

  Thoughts GET request to retrieve all thoughts:
  <img src="./assets/images/edit-comment-screenshot.png">

  Thoughts GET request to a single thought:
  <img src="./assets/images/edit-comment-screenshot.png">

  Thoughts POST request to create new thought:
  <img src="./assets/images/edit-comment-screenshot.png">

  Thoughts PUT request to update a thought:
  <img src="./assets/images/edit-comment-screenshot.png">

  Thoughts DELETE request to remove a thought:
  <img src="./assets/images/edit-comment-screenshot.png">

  Reactions POST request to create a reaction to a thought:
  <img src="./assets/images/edit-comment-screenshot.png">

  Reactions DELETE request to remove a reaction to a thought:
  <img src="./assets/images/edit-comment-screenshot.png">

***

  ## Table of Content

  ### [Description](#Description)
  ### [Installation](#Installation)
  ### [Usage](#Usage)
  ### [License](#License)
  ### [Contributing](#Contributing)
  ### [Tests](#Tests)
  ### [Questions](#Questions)

***

  ## <a id="Installation">Installation</a>

  No installation is needed. Follow the instructions in the Description section of this README to perform CRUD operations on the user/friend/thought/reaction of this social network API.

***

  ## <a id="Usage">Usage</a>

  This is a social network API for users to share their thoughts, add other users' as friends, and react to other users' thoughts.

***

  ## <a id="License">License</a>
  
  This App is covered under the MIT license.

  
***

  ## <a id="Contributing">Contributing</a>

  Please refer to the Question section of this README for my contact information if you'd like to contribute to this project!

***

  ## <a id="Tests">Tests</a>

  N/A
  

***

  ## <a id="Questions">Questions</a>

  For more info on my work, please check out my GitHub page at: https://github.com/feddericowayne
  
  Should you have any further questions regarding this App, please don't hesitate to reach out to me via email at: <a href="mailto:jackiew1120@hotmail.com">jackiew1120@hotmail.com</a>

  
