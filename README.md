# Matrix Routing Map

Interactive map created using [Create React App](https://github.com/facebook/create-react-app) and TomTom Maps SDK API.

## Hosted on Heroku
Check out the live application [here](https://matrixroutingmap.herokuapp.com/)

## Key Node Packages Used
- react v. 17.0.2
- @tomtom-international/web-sdk-maps v. 6.13
- @tomtom-international/web-sdk-services v.6.13.0

Full TomTom Maps documentation can be found [here](https://developer.tomtom.com/maps-sdk-web-js/documentation), click on the individual objects like "tt", "Map", "LngLat" to learn more about what I used in my project.

## Available Scripts

In the project directory, you can run:

### `npm i`

To install all the packages.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## User Stories
### User Story 1: 
As a user, I want to see my starting position on the map.

```
Given the user has opened the application
When the map loads
Then the user will see their icon with a "This is you!" popup message on the map.
```

### User Story 2:
As a user, I want to change my starting position on the map.

```
Given the initial map location has loaded
When the user clicks and drags their icon
Then their starting position will have adjusted
And the marker will move accordingly.
```

AND

```
Given the initial map location has loaded
When the user updates the latitude and longitude coordinates at the top of the page
And clicks "Search" button
Then the map will reload and the starting position will have changed to the input
```

### User Story 3:
As a user, I want the map to show me the best way to go from point A to point B.

```
Given the user is happy with their starting point on the map
When the user clicks on any other area on the map
Then the application will create the best possible route between the starting point and the new endpoint using matrix routing
```

### User Story 4:
As a user, I want to add multiple endpoints to my trip.

```
Given the user has added at least one endpoint
When the user clicks on another place on their map
Then the application will connect the existing route plotted to include all new endpoints
```
