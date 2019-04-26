# Guess The Location 
- Deployed on: 
http://guess-the-location.herokuapp.com/

## This app is built with: 
- React
- Axios

## APIs used: 
- Google
    - Google Maps
    - Google Street View

- Nominatim GeoCoder
- Country.io

## How the game works:

- When the URL loads, you should see a loading animation first.
    - While this animation is running, the app is looking for a random street view available location.

- Once the application finds a street view available location, the app will display a street view, and a mini-map of the wolrd on the top-left corner. 

- The aim of the game is to gather clues from the street view to guess where this location is in the world. 

- To make a guess, hover over the mini-map, click on where you think the location belongs, and either press the space bar, or click on the "Submit Your Guess" button at the bottom of the screen. 

- Once you submit your guess, the status bar at the top of the screen will indicate how far away from the target location you are (assuming you didn't guess the correct location on your first try!).

- You can make as many guesses as you want until you pick a location on the mini-map that is within 50km of the target. 

- Once you find the target location, you will be greeted with a modal that displays the name of the target city, and the number of guesses it took until you found the location.

## Future Implementation
- In the future, I would like to implement a score system, where the user is rewarded more points for finding the target with as little guesses as possible.

- In addition, a "round" system would be a nice addition, where the player's points are calculated over a set number of rounds. 

- Leaderboard system implementation is also something I plan on building, where a player can submit their total score, and  to compare their scores against other players.

