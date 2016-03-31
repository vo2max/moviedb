# moviedb

This is a simple web application to query and display a list of matching movies. The data is served via a public 
REST API offered by TMDb.

This project was generated with [yo angular generator](https://github.com/yeoman/generator-angular) version 0.15.1. 

A demo of the application can be seen here: [DEMO](http://www.macdiarmid.us/tmdb/)

## Repository Checkout

Check out the project:

```
 > git clone https://github.com/vo2max/moviedb.git
```

Install the Yeoman toolset:

```
 > npm install --global yo bower grunt-cli
```

In the project directory, install the required packages:

```
 > npm install	
 > bower install
```

## Build / Development

To build the application:

```
 > grunt
```

To preview the application (with livereload):

```
 > grunt serve
 ```

## Testing

NA

## Roadmap

Future enhancements to include:

* Develop unit tests
* Implement querying via $routeParams (/:query)
* Implement pagination via $routeParams (/:page)
