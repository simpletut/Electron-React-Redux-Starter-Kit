# Open Source Electron React Redux Starter Kit

<p align="center">
    <img src="http://git-assets.react-starter-kit.com/logo.png">  
</p>

[![GitHub](https://img.shields.io/github/license/simpletut/Electron-React-Redux-Starter-Kit.svg)](https://github.com/simpletut/Electron-React-Redux-Starter-Kit/blob/master/LICENSE)


### What is Electron

The Electron Framework enables us to build cross platform desktop applications with the same technologies used for web development such as HTML, CSS, and JavaScript. 

Electron was created by GitHub and used to develop some of the most popular apps in the world including Skype, Visual Studio Code, Atom, and Slack.

The best part? Both MacOS and Windows are supported!

### Project summary

This is an Electron Boilerplate with a React Redux implementation.

Rather than shipping a blank template, I have created a 'Notes' application to provide a foundation to build upon and demonstrate how to accomplish some of the most challenging aspects of building an Electron application.

In addition, this app is pre-configured to handle scss, images and run Windows/Mac builds out the box.

### Screenshot

<p align="center">
    <img src="http://git-assets.react-starter-kit.com/electron-react-redux/Simple_Notes.png">  
</p>


### Electron & React Redux

It is important to understand how Electron works with React. 

Building a Electron application is fairly straight forward. All we need to do is build our React App, transpile the code using Webpack and then load our bundle into our Electron.

It is best practice to keep Electron and React code sperate, this will make it easier if in the future we decide to deploy the same code as a web application. 

However, there are some situations that will require us to pass information between React and Electron. In order to achieve this, we will send and listen for events on both sides of our application.

Please see the diagram below:

<p align="center">
    <img src="http://git-assets.react-starter-kit.com/electron-react-redux/Electron-React-diagram.png">  
</p>


As we are using Redux, the best place for us to put this code is within our action creators.

Simply put, when we dispatch an action on the frontend, we send an event to Electron from within our action creator. Once this event is received on Electron and has carried out some action, we send a response back to our Redux action creator which is listening for. The response data is then fed into the reducer to update the store.

As this is fairly complex, I recommend examining the existing code within this project for reference and an example.

Electron implementation: ‘./index.js’
Redux implementation: ‘./src/actions/index.js’


### Tech Stack:

* Electron
* Electron Builder
* React 
* Redux
* NeDB
* Redux Thunk
* React Router V4
* Babel
* Webpack
* SASS

### Top Features:

* CKEditor - WYSIWYG editor 
* Multiple Layouts – Create unlimited layouts for pages/routes
* Toastr - Simple javascript toast notifications
* 100% FREE & Open Source

## Table of Contents

- [What is Electron](#what-is-electron)
- [Project summary](#project-summary)
- [Screenshot](#screenshot)
- [Electron & React Redux](#electron--react-redux)
- [Tech Stack](#tech-stack)
- [Top Features](#top-features)
- [Table of Contents](#table-of-contents)
- [Getting Started](#getting-started)
- [Project architecture](#project-architecture)
- [Software](#software)
- [Useful links](#useful-links)
- [Installation](#installation)
- [Download & Install Dependencies on your machine](#download--install-dependencies-on-your-machine)
- [Run a Build](#run-a-build)
- [Lunch/Run the Electron](#lunchrun-the-electron)
- [NeDB Database](#nedb-database)
- [Package Application (Mac & Windows)](#package-application-mac--windows))
- [Electron autoUpdater](#electron-autoupdater)
- [General usage](#general-usage)
- [Custom App icons](#custom-app-icons)
- [Custom App Menus](#custom-app-menus)
- [Create new screens](#create-new-screens)
- [Custom Layouts](#custom-layouts)
- [Styles](#styles)
- [CSS](#css)
- [12 Col Grid Boiler template](#12-col-grid-boiler-template)
- [Looking for something similar](#looking-for-something-similar)
- [Acknowledgements](#acknowledgements)
- [License](#license)



## Getting Started

This repository contains the source code for the Electron React Redux Starter Kit. This documentation will cover the installation on your dev environment, distribution, project architecture and working with the app in general.

## Project architecture

```
├── src
│   ├──actions
│   |  ├── index.js
│   |  └── types.js
│   ├──assets
│   |  ├── graphics
│   |  ├── scss
│   |  └── static_assets
│   ├── components
│   |  ├── header.js
|   |  └── sidebar.js
│   ├── layouts
|   |   └── mainLayout.js
│   ├── reducers
│   |   ├── notesReducer
|   |   |   └── index.js
|   |   └── index.js
│   ├── renderer
|   |   └── index.html
│   ├── screens
|   |   └── notes.js
│   ├── app.js
│   └── client.js
├── .gitignore
├── index.js
├── LICENSE
├── package.json
├── README.md
└── webpack.js
```

## Software 

Before proceeding, please ensure you have the following software installed on your computer.

* Node
* Yarn (optional but recommended)
* Git command line tools

### Useful links

* Download Git CLT - Windows: https://git-scm.com/download/windows Mac: https://git-scm.com/download/mac
* Download Node - https://nodejs.org/en/
* Download Yarn CLT - https://yarnpkg.com/lang/en/docs/install/
* Download VSCode - https://code.visualstudio.com/

## Installation

Please fork a copy of this repository. Forking a repository allows you to freely experiment with changes without affecting the original project. Alternatively download or clone the master branch.

### Download & Install Dependencies on your machine 

1)	Clone the repo to your machine 

```
git clone <CloneURL>
```

2)	Within terminal or cmd ensure you have navigated inside the cloned directory and install the dependencies

```
cd <new-dir> 
yarn install OR npm install
```

### Run a Build

Before we can lunch the project, we need to run a build

```
yarn run webpack:watch OR npm run webpack:watch
```

### Lunch/Run the Electron

Now we have a build, we need to run the Electron and launch our App.

The build command above is configured to watch for project changes and recompile whenever changes are detected.

As it is not possible to run an additional command without stopping the existing one, please launch a new terminal or cmd window before proceeding.

The following command will run Electron and lunch our App within a Dev env

```
yarn run electron:dev OR npm run electron:dev 
```

Your Electron Application should now launch promptly.


### NeDB Database

Whilst you may choose to use a different solution, we are using NeDB to store user data in this application. NeDB is a Lightweight JavaScript Database. For more information, please see:

Link: https://github.com/louischatriot/nedb


### Package Application (Mac & Windows)

We are using 'Electron Builder' to package our Application for both Windows and Mac.

Whenever you are ready please run the following Command from your terminal or cmd

```
yarn run dist
```

Once complete the system will output a 'dist' folder with your packaged app.

Please note that you must have installed project dependencies and run a build before attempting to package your app.

Useful links:

* [Customize App Icons](#custom-app-icons)


### Electron autoUpdater

As we are using the 'Electron Builder' to package our app, we can easily incorporate the 'autoUpdater' module into our application.

https://electronjs.org/docs/api/auto-updater

This will enable us to configure our app to check for and install updates automatically.


## General usage 


### Custom App icons

Create custom icons for both Windows & Mac. Follow the dimensions provided below:

Mac: 512 x 512
Windows: 256 x 256

Replace the existing Icons in the following directories:

Mac: 'src/assets/static_assets/mac/icon.png'
Windows: 'src/assets/static_assets/win/icon.png'

Once replaced, your new icons will be used during the next build.


### Custom App Menus

To customize the App Menu open './index.js' and edit the 'menuTemplate' array.

Please note that we are conditionally showing the developer tools (if running on dev) and pushing an additional submenu for Mac.


### Create new screens

1)	Create a file in the following directory ‘src/screens' 

To help maintain consistency please use the same naming conventions as the other files. (camel casing) 

2)	Build your new page. For example:

```
import React from 'react';

class NewPage extends React.Component {
    render(){
        return(
            <div>

            </div>
        )
    }
}

export default NewPage;

```

3)	Open ‘src/app.js’ and import your new Page Component 

```
import NewPage from './pages/newPage';
```

4)	Add your new route to the App class

```
<Route path="/new-page" render={props => (
    <MainLayout>
        <NewPage {...props} />
    </MainLayout>
)} />

```

5) Open ‘src/components/sidebar.js’ and add an additional list item & link to the Sidebar class

```
<li>   
    <NavLink activeClassName="active" to="/new-page" alt="Notes">
        <-Insert Some Font Icon Here Or Text-Link->
    </NavLink>
</li>
```

Please note: We are using 'Font Awesome' within this project. (Font Icons)

Link: https://fontawesome.com


6) Ensure all files are saved, return to your app and reload the window.

Please note: To reload select 'Developer -> Reload' (Mac Cmd+R or equivalent windows shortcut)


### Custom Layouts 

You can create a custom layout for any page/route.

1)	Create a new layout file within ‘src/layouts’
2)	Ensure you have a constructer at the top of your class

```
constructor(props) {
    super(props)
}

```

3)	Place the following code within your layout, wherever you want to render your routes

```
{this.props.children}
```

4)	Open ‘src/app.js’ and import your new layout 

```
import LayoutComponent from './layouts/ layoutComponent;
```

5)	Within your 'App' class, create your new route and wrap the route with your layout Component 

```
<Route path="/some-route" render={props => (
    <LayoutComponent>
        <Notes {...props} />
    </LayoutComponent>
)} />
```

## Styles

We are using SCSS (CSS pre-processor/bracketed version of SASS) to enable us to write cleaner and more reusable css code.

Our main 'styles.scss' is compiled upon each save, once the project has been started from your terminal/cmd. Whilst the resulting 'styles.css' is the only 'css' called from within the project, the 'scss' version simply contains imports to the partial files created within folders.

## CSS

In order to ensure the integrity of the project and long-term maintainability, we recommend the following rules:

- REM CSS measurement units:

We are using rem's to style our app. Whilst you should not use any other measurement unit, it is correct to use ‘px’ for certain properties. For example, you should still use 'px' for setting a border or the width of a media query to ensure more accurate break points.

The root font size is set to '10px'. This means the calculation required to implement rem’s is simple: (target font size / 10 OR 18 / 10 = 1.8rem).

#### 'config.js' 

Please utilize our configuration partial file wherever possible. This contains global variables for generic/brand colours, keyframes, mixins and more! For consistency please reference these instead of redefining where possible (or add to this file).

## 12 Col Grid Boiler template
 
We are using a 12 Column Grid that works as follows:
 
The grid has 12 columns
 
Each columns width is a % value that can be calculated using the following:

```
Target Columns (Example '6')
Minus Number of Total Columns (12)
Times 100 = 50%
```

Example HTML mark-up for a 2-column layout:

```
<div class="grid">
 
  <div class="column column_6_12">
    Half
  </div>
  
  <div class="column column_6_12">
    Half
  </div>
 
<div>
```
 
Each column has a ‘20px’ gutter/ Each column has 10px padding on either side.

The grid should not be used within areas that require custom mark-up (such as your header/footer) to avoid having to override default styling. This will ensure the integrity of the code. Please DO NOT apply any styling to the grid directly. These should be global classes which are not overridden (ensures you will not break styling in other places).

To centre your content, simply apply a 'max-width' to the parent wrapper '.grid'. You can either set this globally within the '_css_grid.scss' partial file or target it specifically via a custom parent class.


## Looking for something similar

[Open Source Universal User Registration System – NodeJS React Apollo GraphQL JWT MongoDB](https://github.com/simpletut/Universal-React-Apollo-Registration)

[Open Source Universal React Redux Boilerplate](https://github.com/simpletut/React-Starter-Kit)

## Acknowledgements

This software was developed by Ashley Bibizadeh.

## License

The Electron React Redux Starter Kit is open source software licensed as MIT.