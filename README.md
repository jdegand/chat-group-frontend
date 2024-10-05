<h1 align="center">Chat Group Frontend</h1>

<div align="center">
   Solution for a challenge from  <a href="https://web.archive.org/web/20231130042247/https://legacy.devchallenges.io/challenges/UgCqszKR7Q7oqb4kRfI0" target="_blank">Devchallenges.io</a>.
</div>

## Table of Contents

- [Overview](#overview)
  - [Built With](#built-with)
- [Features](#features)
- [How to use](#how-to-use)
- [Thoughts](#thoughts)
- [Useful Resources](#useful-resources)

## Overview

![Login on first load](screenshots/chat-group-sign-in.png "shows login on first load")

***

![Register](screenshots/chat-group-register.png)

***

![Group Channels](screenshots/chat-group-channels-view.png)

***

![Channel View](screenshots/chat-group-channel-view.png)

***

![Channels Search](screenshots/chat-group-channels-search.png)

***

![Channels Modal](screenshots/chat-group-channels-modal.png)

***

![New Channel Created](screenshots/chat-group-new-channel-created.png)

***

![New Channel Add Message](screenshots/chat-group-new-channel-add-message.png)

***

![New Channel Message](screenshots/chat-group-new-channel-message-added.png)

***

![User Modal](screenshots/chat-group-channels-user-modal.png)

***

![Profile Pic View](screenshots/chat-group-change-profile-pic-view.png)

***

![Profile picture change staged](screenshots/chat-group-profile-pic-change-staged.png)

***

![Profile picture changed](screenshots/chat-group-profile-pic-changed.png)

***

![Scrollbars](screenshots/chat-group-scrollbars.png "scrollbars if too many messages or users")

***

![Tablet View](screenshots/chat-group-tablet.png "tablet")

***

![Mobile](screenshots/chat-group-mobile.png "mobile")

***

![Mobile Channels](screenshots/chat-group-mobile-channels.png)

***

![Mobile Add New Channel](screenshots/chat-group-mobile-add-new-channel.png)

***

![Mobile Search](screenshots/chat-group-mobile-search.png)

***

![Sidepanel Open](screenshots/chat-group-mobile-sidepanel-open.png)

***

![Mobile Modal](screenshots/chat-group-mobile-modal.png)

***

![Mobile Profile Picture change](screenshots/chat-group-mobile-change-profile-pic.png "margin styling issue on mobile - not centered")

***

![Menu open and viewport changes issue](screenshots/chat-group-panel-open-change-viewport-size.png "if menu open and you change viewport - menu stretches")

***

### Built With

- [React](https://reactjs.org)
- [Axios](https://axios-http.com)
- [Material Design Icons](https://materialdesignicons.com)

## Features

This application/site was created as a submission to a [DevChallenges](https://devchallenges.io/challenges) challenge. The [challenge](https://web.archive.org/web/20231130042247/https://legacy.devchallenges.io/challenges/UgCqszKR7Q7oqb4kRfI0) was to build an application to complete the given user stories. **Note**: The previous design document may be incomplete, as you need to find an archived version of the challenge as all `legacy` challenges have had their documentation removed from DevChallenges.

## How To Use

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository & the companion backend repo
$ git clone https://github.com/jdegand/chat-group-backend.git
$ git clone https://github.com/jdegand/chat-group-frontend.git

# Install dependencies in both repos
$ npm install

# Update .env variables in backend -> match PORT variable for both apps

# Run the both apps (in browser - enable cookies)
$ npm start
```

## Thoughts

- Reused a lot of things from various past projects.  
- CSS is in one file - have to remove unused stuff and better organize
- One of the downsides of reusing code can be bloat ie import styles wholesale but you end up removing markup while refactoring and then unused css is left behind.
- Thought of using separate messages component - one for first load when messages are displayed for either welcome channel or last updated channel and one for when user clicked on any of the available channels - but I was able to reuse same messages component and pass props to determine either scenario
- Logging in the first time, you will get sent to the welcome channel and you will be added to members array displayed on the channel sidebar however sometimes the picture will not display correctly in the userinfo div.  
- Originally, user is assigned a string to a website image for profile picture.  The problem could be network related - ie requests may be rate limited or server may be slow.  Add Lazy loading?
- Could change user flow - where user is allowed to add photo when they first register.  Probably requires backend modification in addition to adding file input to register form.  
- I added the messageId to the channel on the backend versus sending an axios put request.  I originally had the backend send the message Id back to the client which I could use to send a put request to channels/:channelId route.  This could be looked into and refactored if necessary.
- Could use a package to handle the createdAt dates.  TimeAgo might be a good fit.  
- Even with TimeAgo or time format package - a lot of logic may be necessary to have 'yesterday at 2:00pm' date formatting
- The channels on the sidebar should probably be ordered by the date of the last comment.  Or last clicked on channel could become first channel.
- Not a fan of the color scheme of the design.  The input text and input background is not a great contrast.
- Added scrollbars to the channels and members lists.  Only looked into changing the look of the default scrollbar in chrome.  Cross-browser support of scrollbar styling is usually problematic.
- I added most of the svgs directly in the jsx vs importing them and passing them to the jsx.  Performance implications?
- Check for errors when adding user to members array - might not refresh
- Adding cleanup functions to some useEffects broke the app -> need to look more into cleanup best practices etc
- Axios can now use Abort Controllers directly vs using cancelToken implementation.
- emoji picker ? - look for react library
- improve error handling
- look into improving original state value defaults.  Left some with nothing ie useState() vs an empty string or an empty array
- non persist mode - refreshToken expires - you can't perform actions but you arent informed why - useRefreshToken hook not being used?
- file inputs are uncontrolled components in react
- testing - a *ton* of things to test -> *more complicated* than the original code.
- a lot of features are combined.  I had trouble testing local storage because I used context as well.   You have to add context wrapper to your render but I used a hook for the context so that makes that harder and on and on.
- MSW is one recommended way of testing api calls now. However, documentation is scarce.  Even Kent Dodds has no articles on his blog.
- Might need to create in memory database of users, channels, and messages
- Problems with userEvent.type -> need a name property on your input ?
- Removed msw and need look at alteratives or find some good documentation to help.
- Thought about adding cypress to test.  However, the tests will be brittle.  I am not advanced enough in cypress and I have had a hard time finding good examples to follow for authentication.  I would create a user journey where you login with predefined test user and password and create a channel, add messages and change profile picture.
- Cypress session is still in experimental phase but looks to be the new way of doing things.
- Found some profile picture stand-ins on freepik.  

## Useful Resources

- [Mafia vector created by pikisuperstar - www.freepik.com](https://www.freepik.com/vectors/mafia)
- [Cute cat vector created by catalyststuff - www.freepik.com](https://www.freepik.com/vectors/cute-cat)
- [3d avatar psd created by freepik - www.freepik.com](https://www.freepik.com/psd/3d-avatar)
- [Stack Overflow](https://stackoverflow.com/questions/71300460/how-to-stop-useeffect-from-making-so-many-requests-empty-dependencies-dont-wor) - reduce requests & useEffect
- [Stack Overflow](https://stackoverflow.com/questions/34820841/button-with-icon-labelled-with-aria-label-still-an-empty-button-error) - empty buttons & aria-label
- [Stack Overflow](https://stackoverflow.com/questions/7814186/drop-down-menu-that-opens-up-upward-with-pure-css) - dropdown that opens upward
- [Stack Overflow](https://stackoverflow.com/questions/67264632/mongoose-sorting-by-createdat) - mongoose sorting by createdAt
- [Stack Overflow](https://stackoverflow.com/questions/9664325/style-the-scrollbar-with-css-in-google-chrome-webkit) - style scrollbar chrome
- [Stack Abuse](https://stackabuse.com/making-asynchronous-http-requests-in-javascript-with-axios/) - axios & async
- [Stack Overflow](https://stackoverflow.com/questions/1944267/how-to-change-the-button-text-of-input-type-file) - change button text of file input
- [Stack Overflow](https://stackoverflow.com/questions/71709104/req-file-is-undefined-react-js-and-multer) - req.file is undefined
- [PluralSight](https://www.pluralsight.com/guides/how-to-use-a-simple-form-submit-with-files-in-react) - react file upload form
- [Medium](https://medium.com/trabe/controlled-file-input-components-in-react-3f0d42f901b8) - controlled file inputs in react
- [File Stack](https://www.filestack.com/fileschool/react/react-file-upload/) - react file upload
- [Stack Overflow](https://stackoverflow.com/questions/40062477/formdata-append-not-working) - console logging formdata
- [Stack Overflow](https://stackoverflow.com/questions/20549241/how-to-reset-input-type-file) - reset input type file
- [Stack Overflow](https://stackoverflow.com/questions/43922508/clear-and-reset-form-input-fields) - reset input field on submit in react
- [Mastering JS](https://masteringjs.io/tutorials/mongoose/timestamps) - mongoose timestamps
- [Stack Overflow](https://stackoverflow.com/questions/59198952/using-document-queryselector-in-react-should-i-use-refs-instead-how) - querySelector usage in react
- [Stack Overflow](https://stackoverflow.com/questions/39597804/how-i-can-use-refs-to-change-styling-class-in-reactjs) - refs to change styling
- [Blog](https://bobbyhadz.com/blog/javascript-convert-iso-string-to-date-object#:~:text=Use%20the%20Date()%20constructor,will%20return%20a%20Date%20object.) - convert iso string to date object
- [Stack Overflow](https://stackoverflow.com/questions/45016033/how-do-i-test-axios-in-jest) - test axios in jest
- [Blog](https://vhudyma-blog.eu/3-ways-to-mock-axios-in-jest/) - 3 ways to mock axios in jest
- [Blog](https://timdeschryver.dev/blog/making-sure-youre-using-the-correct-query#byrole-provides-a-solution-to) - queries in testing
- [Blog](https://javascript.plainenglish.io/testing-local-storage-with-testing-library-580f74e8805b) - testing local storage with testing library
- [Stack Overflow](https://stackoverflow.com/questions/57034062/why-code-coverage-in-react-app-is-empty-tried-using-npm-run-test-coverage) - test coverage
- [Stack Overflow](https://stackoverflow.com/questions/32911630/how-do-i-deal-with-localstorage-in-jest-tests) - localstorage in jest tests
- [Blog](https://robertmarshall.dev/blog/how-to-mock-local-storage-in-jest-tests/) - mock local storage in jest
- [Blog](https://bholmes.dev/blog/mocking-browser-apis-fetch-localstorage-dates-the-easy-way-with-jest/) - mock localstorage
- [Stack Overflow](https://stackoverflow.com/questions/65728677/test-component-with-context-and-react-hook) - test component with context and react hook
- [Blog](https://www.leighhalliday.com/async-axios-react-testing-library) - async axios react testing library
- [World Wide Technology](https://www.wwt.com/article/using-mock-service-worker-to-improve-jest-unit-tests) - msw to improve jest unit tests
- [Blog](https://javascript.plainenglish.io/full-jwt-based-auth-implementation-for-your-react-apps-using-a-graphql-api-a8b83ad285f5) - full jwt auth with graphql
- [Blog](https://frontend-digest.com/mocking-rest-apis-with-msw-af2353012daa) - mocking rest apis with msw
- [YouTube](https://www.youtube.com/playlist?list=PLIGDNOJWiL182w2gKS5TsDuO6PZkJa0tK) - react testing library playlist
- [Github](https://github.com/testing-library/user-event/issues/533) - user event whole value is not typed
- [YouTube](https://www.youtube.com/watch?v=6jKBLaMUD0Q) - MSW Tutorial
- [MSW Docs](https://mswjs.io/docs/getting-started/integrate/node) - MSW integrate node
