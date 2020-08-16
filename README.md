##HelpDocs.js
===========

Open Source Help and API Documentation built on Deployd, Node.js, and MongoDB

It's designed for developers to quickly document projects, and api's while they are developing.

It's a no BS - manual - documentation.

##Features
===========

- Works on a developer machine
- Quick editing, adding of pages
- Supports full HTML - includes an editor
- Uses The Universe CDN for a darkmode bootstrap theme, feel free to replace with your own.

##INSTALL
===========

To install the app, make sure you have the latest brew, and run brew update and brew upgrade.

Install Node.JS (NPM)

Install MongoDB
```shell
$ brew tap mongodb/brew
$ brew install mongodb-community@4.4
```

To Run the MongoDB Service
```shell
$ brew services start mongodb-community@4.4
```

Install the Deployd Command Line tools
```shell
npm install deployd-cli -g
```

Test the install by running
dpd -v

##Start HelpDocs.Js

Either create the app or download HelpDocs.js from git.
```shell
dpd create "HelpDocs.js"
```
Navigate to the folder and run DPD
```shell
cd HelpDocs.js
dpd
```

Deployed will run as long as the terminal stays open.

Deployd should open your version of HelpDocs.js - automatically

Alternativly

Navigate to the folder and run
```shell
Node App.js
```



##Database Backend
===========
Go to http://localhost:port/dashboard to modify your data.

## License
===========
Free to use and modify, post poll requests on any generic updates.
The Universe CDN is subject to The Universe TOS. https://egtuniverse.com/legal
