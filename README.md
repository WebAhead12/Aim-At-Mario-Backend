# Aim-At-Mario-Backend# Aim-At-Mario-Backend

## DB Schema
![](https://i.imgur.com/B16dZ7R.png)

## Server Routes
- "/" -> gets you the first page which you login on it
- POST "/register" -> creates the user in db
- POST "/login" -> logs in the user
- POST "/:user/stats" updates the user's stats in the db
- GET "/:user/stats" -> gets the user's stats from the db
- GET "/:user" 
