var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();
	
function waitFor(sec) { 
	var ready = false;
	logStep("waiting " + sec + " seconds")
	setTimeout( _ => ready = true, sec * 1000 )
	return driver.wait(_ => ready)
}

function inputById(id, text) {
	logStep("writing text to field by id: ", id, text);
	return driver.findElement(By.id(id)).sendKeys(text)
}

function clickById(id) {
	logStep("clicking element by id: " , id);
	return driver.findElement(By.id(id)).click()
}

function findByClassName(className) {
	logStep("finding element by className: " , className);
	return driver.findElement(By.className(className))
}

function inputByClassName(className, text) {
	logStep("writing text to field by class: ", className, text);
	return driver.findElement(By.className(className)).sendKeys(text)
}

function clickByClassName(className) {
	logStep("clicking element by class: " , className);
	return driver.findElement(By.className(className)).click()
}

function inputByName(name, text) {
	logStep("writing text to field by name: ", name, text);
	return driver.findElement(By.name(name)).sendKeys(text)
}

function clickByName(name) {
	logStep("clicking element by name: " , name);
	return driver.findElement(By.name(name)).click()
}

function title(text) {
	console.log("\n\n Scenario:\n  %s", text)
}

function logStep() {
	let args = [].slice.apply(arguments)
	args.unshift("    %s")
	console.log.apply( console, args ) 
}


//Log In functionality testing with an admin user
driver
.then( _ => title('Log In without password') )
.then( _ => driver.get('https://dashboard-beta.zuznow.com/user/login') )
.then( _ => driver.wait(until.elementLocated(By.id('edit-name'))) )
.then( e => driver.wait(until.elementIsVisible( e ) ) )
.then( _ => inputById('edit-name','Tom@zuznow.com') )
.then( _ => clickById('edit-submit'))
.then( _ => driver.findElement(By.linkText('Have you forgotten your password?')) ) 