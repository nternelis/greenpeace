For this assignment I used the jQuery library because it’s light and easy to use.

Every answer in this quiz has a data attribute (data-category) that corresponds to the category it belongs, the results have also a corresponding data attribute (data-result) and they are hidden. When the user selects an answer a class is assigned to it (.selected), also another class is added to the parent question (.answered). Each time I check whether the sum of answered questions is equal to the total number of questions so as to know when the user has answered all the questions. When that happens I add a class to the parent list of questions to signify that the quiz has ended and it’s time to calculate the result (and the user cannot alter the answers unless he reloads the page). Then I store in an array the names/numbers of the categories with their corresponding occurrences. Then I sort this array in ascending order. The element in the last position has the number of the category with the most occurrences. I use this to find the corresponding result by the data attribute I mentioned earlier hence I show it.

The case of a tie (two or more categories having the same number of occurrences) does not affect the result since the category that has moved in last position of the array, after the sorting, is the one shown.

For the animation I made a function to find whether or not an element with a specific class is in the viewport and if it is I add class to it (making a CSS animation). The function runs on document load and document scroll.

Last but not least the quiz is fully responsive, it doesn’t have a limit for questions nor answers, the answers can be shuffled, no need to be in a specific order, the administrator/creator  of this quiz only has to add corresponding data attributes to answers and results.

File structure:
Root folder:
- index.html : the main html
-ReadMe.txt : explanations read me file
-default.gif : a loader gif
Css folder :
-formating.css : basic css rest formatting
- modules.css: the main css for the quiz
- responsive.css: the responsive css (media queries)
Js folder:
- jquery-1.11.3.min.js : the jQuery library
- common.js : the main js for the quiz

