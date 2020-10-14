# Good Dog Breed Search Homework Assignment

## Context
We have 2820 unique breeds in our database, and we want to implement a feature that allows users to search among them.  Some breeds are marked as "live," which means that they should be prioritized higher in the search results. Furthermore, some breeders have expressed concerns about purebreds being interleaved with crossbreds and have suggested that we visually separate them into groups in the results.

Without any styling, the end result will likely look similar to the following:

![Example output](img/example_output.png?raw=true "Example output")

For what it's worth, here's a visual reference for how it looks on [gooddog.com](https://www.gooddog.com):

![Search on gooddog.com](img/search_on_gooddog.png?raw=true "Search on gooddog.com")

...but this is just a reference.  Feel free to style it however you want as long as it's usable and accessible!

## Requirements
Your tasks for this assignment are to:
1. Implement basic search logic so only matching breeds are returned for the query
  - A breed "matches" a query if the query is a case-insensitive substring of the breed name:
    - ex) `xolo`, `XOLO`, and `Xolo` should return the breeds:
      - Xoloitzcuintli
      - Xoloitzcuintli / Mexican Hairless
      - Affenpinscher & Xoloitzcuintli / Mexican Hairless
      - Chihuahua & Xoloitzcuintli / Mexican Hairless
      - Jack Russell Terrier & Xoloitzcuintli / Mexican Hairless
      - Australian Kelpie & Xoloitzcuintli / Mexican Hairless
2. Separate breed results into three groups with unique records between them:
  - Purebred: any breed that has `hybrid: false` and `live: true`
  - Crossbred: any breed that has `hybrid: true` and `live: true`
  - Not Live: any breed that has `live: false`
3. Fill in the tests in components/App/test/App.test.jsx to verify the grouping logic of (2)
  - The tests themselves can be restructured and moved to reflect any code changes in the submission, but *the same conditions must be validated*

**NOTE: Don't worry about getting it to work on `NODE_ENV=production`; we'll only be using `yarn start` to manually test submissions.**  However, please add to IMPLEMENTATION_NOTES if you've added that would have to change (e.g., plugins or dependencies) for `NODE_ENV=production`.

## Implementation
We've provided some basic scaffolding for this project:
- A simple Express server with an endpoint at `/api/breeds` to retrieve the data
- A bare-bones Webpack configuration + HMR
  - You can add [react-hot-loader](https://github.com/gaearon/react-hot-loader) or [react-refresh-webpack-plugin](https://github.com/pmmmwh/react-refresh-webpack-plugin) if it'll help your development, but this isn't in the scope of the assignment so we can't answer any questions about integration.  Use at your own risk!
- @testing-library dependencies
  - You can replace these with another testing framework, but the same conditions must be validated.
- A React app entry point
  - The code in components/App/index.jsx is just an example starting point, but you can structure the front-end code however you wish.  Feel free to show us how you'd organize it in a real production project.

To run the app:
- Install [Yarn](https://yarnpkg.com/en/docs/install)
- Run `yarn install` in the base directory
- Run `yarn start` to start the app
- Go to `http://localhost:3000` and start developing!

### Keep It Simple!
- No new dependencies *need* to be added for an acceptable, full-fledged solution; the requirements can be implemented with everything we've provided you.
  - HINT: Think carefully about new depedencies and why they're needed.  Are there any alternatives to use?
- **However, if you decide to add new dependencies, please add some commentary in IMPLEMENTATION_NOTES for the new dependencies, why they were added, what the benefits/costs are, et cetera.**

## Evaluation
We'll be evaluating your submission in the following aspects:
- **Functionality**
  - Does the solution compile?
  - Does the solution work?  Are all requirements fulfilled?
  - Have the tests been filled in?  Are they passing?
- **Clarity**
  - Is the code readily understandable?
  - Are comments left to explain complex logic?  (More comments are generally better for this assignment!)
- **Attention To Detail**
  - Are all reasonable edge cases accounted for?
  - Are there any changes made to benefit all types of user needs?
  - Would the CSS cascade well in a production project? Is it be modularized/encapsulated well?
- **Optimization**
  - How would the solution scale with production data and real user interactions?
  - Are there any further performance improvements that can be made?

*This is a standalone project, but your source code should be written as if it were part of a production-ready project.*  Keep in mind that it's an opportunity to show us how you work under product requirements and how you communicate with our team.

### Ideas For Supplemental Work
- Jazz it up with some images
- Add CSS
  - Use a Webpack loader, styled-components, or even a simple `<link>`
  - Add some notes in IMPLEMENTATION_NOTES on your approach to CSS and how it might scale in a larger project.
- Add pagination or infinite scroll
  - HINT: Think of how this'll affect the grouping and how the UI can be updated to accommodate this
- Add a way to sort ASC/DESC by name within groups

Don't hesitate to send us an email if you come up with another exciting idea that you want to implement.  As long as the main requirements are fulfilled, we're likely to be very amenable to your creativity!

## Tips
- We try to be mindful of the fact that you'll be implementing this in your spare time, so this assignment should take at most four to five hours.
  - But this is also a good opportunity to showcase your ability as a potential Good Dog engineer, so above-and-beyond solutions are more likely to get us excited.  We have a non-comprehensive list of suggestions in the [evaluation section](#Evaluation), and you can reach out to us if you have another idea!

- As you read over the existing code, note any logic that could be improved right out of the gate.  Add comments where improvements could be made, and you can even add your own fixes if you feel so inclined.

- This assignment is intended to be a React exercise, but you won't be penalized if you choose to change up any other parts of the project (e.g., the server or the testing framework).  In fact, it may be to your advantage if your solution would work better with these changes.
  - In any case, make sure that source code you implement is production-ready -- meaning:
    1. It has to work :)
    2. You'd be comfortable deploying it to a real site

- **If there's anything you're unclear on or if you want to make a substantial change to the project as part of your submission, definitely feel free to reach out to us with any questions!**

## Submission
When you're ready to submit your solution, run `yarn zip` in the base directory and send us the .zip file.

Have fun with it and good luck!!!
