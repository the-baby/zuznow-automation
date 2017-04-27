const { 
	Builder,
	By,
	until
} = require('selenium-webdriver');
var driver;
require('colors');

module.exports = {
	getDriver,
	waitFor,
	
	inputById,
	inputByName,
	inputByClassName,
	input,
	
	clickById,
	clickByName,
	clickByClassName,
	clickByLinkText,
	clickByXPath,
	click,
	
	locate, 

	findByClassName,
	title,
	logStep,
	substep
};


function getDriver() {
	driver = new Builder()
		.forBrowser('chrome')
		.build();
	return driver
}

function title(text) {
	console.log("\n" + "\n Scenario:\n  %s".bold.yellowBG, text)
}

function logStep() {
	let args = [].slice.apply(arguments)
	args.unshift("    %s")
	console.log.apply( console, args ) 
}

function substep() {
	let args = [].slice.apply(arguments)
	args.unshift("        ..%s".gray)
	console.log.apply( console, args ) 
}

function waitFor(sec) { 
	var ready = false;
	logStep("waiting " + sec + " seconds")
	setTimeout( _ => ready = true, sec * 1000 )
	return driver.wait(_ => ready)
}



function inputById(id, text) {
	input(By.id(id), "id: " + id, text)
}

function inputByName(name, text) {
    return input(By.name(name), "by name: " + name, text)
}

function inputByClassName(className, text) {
    return input(By.className(className), "by className: " + className, text)
}

function input(locator, locatorDescr, text) {
	logStep("writing text to field   " + locatorDescr.magenta + ", text: ", text.magenta);
	return locate(locator)
		.then( e =>  substep("sending input") || e.sendKeys(text) )	
}



function clickById(id) {
	return click(By.id(id), "by id: " + id);
}

function clickByName(name) {
	return click(By.name(name), "by name: " + name);
}

function clickByClassName(className) {
	return click(By.className(className), "by className: " + className);
}

function clickByLinkText(text) {
	return click(By.linkText(text), "by link text: " + text )
}

function clickByXPath(xpath) {
	return click(By.xpath(xpath), "by xpath: " + xpath )
}

function click(locator, locatorDescr) {
	logStep("clicking element   ", locatorDescr.magenta);
	return locate(locator)
		.then( e => substep("clicking") || e.click() )
}



function findByClassName(className) {
	logStep("finding element by className: " , className);
	return driver.findElement(By.className(className))
}

function locate(locator) {
	substep("waiting for element to be found")
	return driver.wait(until.elementLocated(locator)) 
		.then( e => substep("waiting for element to be visibile") || driver.wait(until.elementIsVisible( e ) ) )
}




