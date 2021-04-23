# my-first-vue-quiz
A simple quiz game created by me using the Vue for the first time.


This is my first attempt at using the Vue framework. It took me three evenings(without prior knowledge about Vue.js) to code this simple quiz application.

The application retrieves required data from https://documenter.getpostman.com/view/5986005/S1ERxxk4 endpoint via API(If the API goes down the application won't function as desired, in such case a local file can be set up to mimic the API(TODO)).

To run the app:

*Clone the repo
*Run npm install
*Run npm run serve
*Head to http://localhost:8080/ to check out the app


About the app:

I was trying to create a SPA and to some extent that did work out OK(There are some cavieats in relation how the routing and redirects are performed).

The app consists of three main pages - Landing Page, Questions Page and Results Page.
All of the pages except the Questions age are more or less self contained. For the Questions Page I created a custom component which is used to spit out all available answers to the quiz questions. The same custom component is then used to emit back events to the parent component whenever an answer is selected.
The routing between the pages was done using vue-router.
To pass data between the comopnents I did set up a gobal store. I did this mainly because I wanted to keep the urls clean and not pass required data via url parameters. By doing so I couldn't use the vue-router history(unfortunately, and this is a known issue with the app as the questions views won't be added to the history).
I also implemented a custom loader, to make the navigation experience a bit more enjoyable.
For the backend API calls I used axios package.
There also is a custom error checking implemented(I mean really basic :) which won't let to proceed furter without required fields or answers filled in)
The landing page was implemented using form, but as the redirects were done programmatically, I did disable the default form behaviour to avoid funkiness.
The possible answers to the quiz questions were created using v-for: directive by iterating over all posible answers clickable buttons were created. To decide which answer is selected I was emiting id of the selected answer and then comparing it with all answer ids and applying desired selected button styling for selected one. Only one match should be found in the subsets of answers, therefore there are no option to select more than one answer at the time(this will work given that there are no duplicate ids in the answer data).
To know which question currently the user is on I used the index of all questions and every time when the next button is clicked I increment the current position index. Then I used that index to retrieve the question needed and passed it in as a prop into the quoestionComponent which then re-rendered the possible answers and the question.
The progress bar was using the same data(length of all questions and the current question index) to display the progress of the user.
To style the app I used Bootstrap grids and other components with a tiny bit of own custom styles applied. The responsiveness of the app was also achieved by using the Bootstrap layouts.
Every time when the loader is displayed in the app that means that there is a backen call in progress. The first backend call is uesd to retrieve all available quizes and then all questions are retrieved for the selected quiz. Then once the user steps through the questions a backend call is made each time to retrieve answers and to check the correct answers. In my opinion this is not ideal in terms of traffic created.

And that's it,
those were the main points I wanted to explain.

And yes - Vue is cool ! :D




