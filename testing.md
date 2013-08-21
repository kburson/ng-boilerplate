### Testing (Unit, E2E, Midway)

All Test are located in the `test` folder and Test-Runner for this project is
[Karma](http://karma-runner.github.io/).

TODO: update for local karma under grunt-karma tasks....

```sh
$ karma start # starts watching filechanges and runs trough all test
$ karma run   # if you want to run tests manually (without watch changes)
```

## 4 levels of testing:

In professional software development there are 4 basic levels of testing, although some larger organizations my subdivide
some of these levels, there is still essentially 4 basic levels.

* Manual/Exploratory
* Functional/End-to-End
* Integration
* Unit

These levels are layered on top of one another,
the higher more abstract levels depend on the lower levels.  This is to say that any test at any level can be condifent
that all tests below them have passed and the application functionality has been verified for that level.
Thus, an integration test does not need to worry if a specific module or class has any specific bugs, it can focus on
integrating the various modules into a (semi)-working application.

This 4 layer cake resembles a pyramid as each subsequent layer is smaller, has fewer tests, than the layers below it.
This is because more abstract testing levels will cover more code statements in a single action than lower levels, and
because the abstract layer involve so much more code these tests are generally slower by a magnitude.



## Why midway testing?

http://blogs.burnsidedigital.com/2013/07/setting-up-midway-testing-to-angularjs-app/

>When Unit testing your application it sometimes may get too complicated when you
>want to test an application-level operation (like a page loading or XHR request)
>because you will need to use interceptors and mocks to make requests and
>templating work (basically anything XHR’ish). E2E testing may not also be the
>best option because it may be too high level to capture to test for certain
>features. For example, how do you test a controller on your website that
>performs a XHR request which downloads the user’s session details on every page? …

***

# ngMidwayTester


***

#Protractor:

For more information about protractor please reference the following video presentation from the
[Aug 2013 DFW area AngularJS Meetup](http://codingsmackdown.tv/blog/2013/08/16/an-introduction-to-angularjs-end-to-end-testing-with-protractor/).

## locators

* waitForAngular
* findElement
* findElements

## client side mocking

* addMockModule
* clearMockModules

## Selectors:

### Protractor Locators

#### inherited from webDriver: same as webdriver.By.*

* protractor.By.className('redBtn')
* protractor.By.css('.redBtn')
* protractor.By.id('loginButton')
* protractor.By.linkText('Go Home')
* protractor.By.partialLinkText('Home')
* protractor.By.name('email')
* protractor.By.tagName('h2')
* protractor.By.xpath('xpath')

#### extended by protractor for AngularJS

* protractor.By.binding('{{status}}'
* protractor.By.select("user")
* protractor.By.seletedOption("red")
* protractor.By.input("user")
* protractor.By.repeater("cat in pets")
* protractor.By.repeater("cat in pets").row(1).column("{{cat.name}}")


### Web Element Methods:

| Method | Description |
|--------|-------------|
clear() |If this element is a text entry element, this will clear the value. |
click() | Click this element.|
getAttribute(name) | Get the value of the fiven attribute of the element |
getCssValue(propertyName) |Get the value of a given CSS property |
getLocation() | Where on the page is the top left-hand corner of the rendered element ? |
getSize() | What is the width and height of the rendered element ? |
getTagName() | Ge the tag name of this element. |
getText() | Get the visible (i.e. not hidden by CSS) innerText of this element, including subelements, without any leading or trailing whitespace|
isDisplayed() | Is this element displayed or not? This method avoids the problem of having to parse an element's "style" attribute.|
isEnabled() | Is the leement currently enabled or not? This will generally return true for everything but disabled input elements.|
isSelected() | Determine whether or not this element is selected or not.|
sendKeys(keystoSend) | Use this method to simulate typiung into an element, whicy may set its value.|


## Migrating Existing Test Scripts from ngScenario to Protractor

because most examples on the web today are for ngScenario e2e tests under Karma I have copied this table of conversions
from the ngScenario style of test statements to the new Protractor style .

| ng-scenario | protractor |
|-------------|------------|
|brower().navigateTo(url) | ptor.get(url) |
|browser().location().url() | ptor.getCurrentUrl() |
|binding(name) | ptor.findElement(protractor.By.binding('{{status}}')).getText() |
|input(name).enter(value) | ptor.findElement(protractor.By.input("user")).click()|
|input(name).check() | ptor.findElement(protractor.By.input("user")).click()|
|input(name).select(value) | see select below |
|input(name).val() |ptor.findElement(protractor.By.input("user")).getText() |
|repeater(selector, label).count() | ptor.findElements(protractor.By.repeater("cat in pets")).length() |
|repeater(selector, label).row(index)| ptor.findElements(protractor.By.repeater("cat in pets")).row(index)|
|repeater(selector, label).column(binding) | ptor.findElements(protractor.By.repeater("cat in pets")).row(index).column(binding)|
|select(name).option(value) | ptor.findElement(protractor.By.id('selectId').click(); <br/>ptor.findElement(protractor.By.css('option [value="0"]').click()|
|select(name).options(value1, value2...) | ptor.findElement(protractor.By.id('selectId').click() <br/>ptor.findElement(protractor.By.id('selectId').click() <br/>ptor.findElement(protractor.By.css('option [value="0"]').click() <br/>ptor.findElement(protractor.By.css('option [value="2"]').click() <br/>ptor.findElement(protractor.By.css('option [value="4"]').click()|
|element(selector, label) | see WebElement methods mentioned earlier |



***