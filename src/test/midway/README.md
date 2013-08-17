# What is Midway Testing:

#### DISABLED

Currently midway testing is disabled until the ngMidwayTester.js library is updated to work with angular 1.2


### [YearOfMoo](http://www.yearofmoo.com/2013/01/full-spectrum-testing-with-angularjs-and-karma.html)

* Application/Code-level testing
* Can access all parts of an application
* Can interact directly with the web application code
* Not really effective for stubbing & mocks
* Easily breaks since it relies on application code to operate (but this may be good to catch code-level errors)
* Not possible to test anything inside of your index.html file
* Fast, but slow for XHR requests