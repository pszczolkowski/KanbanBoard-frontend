# KanbanBoard frontend

KanbanBoard web-page client application


## How to run
1. Make sure you have installed following components:
    * NodeJS Package Manager (http://blog.npmjs.org/post/85484771375/how-to-install-npm)
    * Bower (http://bower.io/)
    * Grunt (http://gruntjs.com/installing-grunt)
    * Ruby with Compass (http://compass-style.org/install/)
2. Go to project directory containing `package.json` file and run the following command: `npm install`
3. Run `bower install` command
4. Run `grunt serve` command. It will launch web server and application will be available at `http://localhost:9000`.
5. Before using application, make sure you have launched backend application (https://github.com/pszczolkowski/KanbanBoard-backend)

IMPORTANT: if backend application is running another url than `http://localhost:8080` you have to set valid url in `app.config.js` file.
