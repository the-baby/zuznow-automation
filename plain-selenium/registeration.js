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

//create account link should open create account form
driver
.then( _ => title('create account link should open create account form') )
.then( _ => logStep("opening zuznow new account page") )
.then( _ => driver.get('https://dashboard-beta.zuznow.com/new') )
.then( _ => waitFor(3) )
.then( _ => clickById('btn-register') )
.then( _ => waitFor(3) )

//error messages of create account form
driver
.then( _ => title('error messages of create account form') )
.then( _ => driver.get('https://dashboard-beta.zuznow.com/user/register') )
.then( _ => driver.wait(until.elementLocated(By.id('edit-mail'))) )
.then( _ => inputById('edit-mail','Name@LastName') )
.then( _ => inputById('edit-field-first-name-und-0-value','Name') )
.then( _ => inputById('edit-field-last-name-und-0-value','LastName') )
.then( _ => clickById('edit-submit') )
.then( _ => driver.findElement(By.name('op')) )
.then( _ => findByClassName('form-text required error') )
.then( _ => waitFor(2) )
.then( _ => logStep('going to register page' ) )

//multiple errors of create account form
driver
.then( _ => title('error messages of create account form') )
.then( _ => driver.get('https://dashboard-beta.zuznow.com/user/register') )
.then( _ => waitFor(3) )
.then( _ => clickById('edit-submit') )
.then( _ => findByClassName('messages error') ) 
.then( _ => findByClassName('form-text required error') )
.then( _ => findByClassName('text-full form-text required error') )
.then( _ => findByClassName('text-full form-text required error') )               
.then( _ => waitFor(2) )	
	
	
//I should write what is written in the error message


//submission of a mail in use should offer the recover password message
driver
.then( _ => title('submission of a mail in use should offer the recover password message') )
.then( _ => driver.get('https://dashboard-beta.zuznow.com/user/register') )
.then( _ => waitFor(3) )
.then( _ => inputById('edit-mail','larisa@zuznow.com') )
.then( _ => inputById('edit-field-first-name-und-0-value','Larisa') )
.then( _ => inputById('edit-field-last-name-und-0-value','El-Netanany') )
.then( _ => clickById('edit-submit') )
.then( _ => waitFor(3) )
.then( _ => logStep('clicking "have you forgotten password" link' ) )
.then( _ => driver.findElement(By.linkText('Have you forgotten your password?')).click ()  ) 
.then( _ => waitFor(2) )
         

//I should write what is written in the error message
//And about the red frame

//submission of valid form details should succeed
driver	
.then( _ => title('submission of valid form details should succeed') )
.then( _ => logStep('opening zuznow registration') )
.then( _ => driver.get('https://dashboard-beta.zuznow.com/user/register') )
.then( _ => waitFor(3) )
.then( _ => inputById('edit-mail','registration-test@mailinator.com' ) )
.then( _ => inputById('edit-field-first-name-und-0-value','registration') )
.then( _ => inputById('edit-field-last-name-und-0-value','test') )
.then( _ => clickById('edit-submit') )
.then( _ => logStep('going to mailinator') )
.then( _ => driver.get('https://www.mailinator.com/inbox2.jsp?public_to=registration-test#/#public_maildirdiv') )
.then( _ => logStep('waiting for mail-account varification e-mail') )

.then( _ => driver.wait(until.elementLocated(By.className( 'innermail ng-binding' ))) )
.then( e => driver.wait(until.elementIsVisible( e ) ) )
.then( _ => driver.findElement(By.className('innermail ng-binding')).click() )

.then( _ => logStep('cliking mail link') )
.then( _ => clickByClassName('innermail ng-binding') )
.then( _ => logStep('opening mail') )
.then( _ => driver.switchTo().frame(driver.findElement(By.id('publicshowmaildivcontent'))) )
.then( _ => waitFor(3) )
.then( _ => driver.findElement(By.xpath('/html/body/a[1]')) )
.then( e => driver.get(e.getAttribute("href")) )
.then( _ => waitFor(3) )
.then( _ => clickByClassName('password-field') )
.then( _ => inputByClassName('password-field', 'Aabcd5') )
.then( _ => inputByClassName('password-confirm form-text required','Aabcd5') )
.then( _ => logStep('waiting for element to be visible : edit-mail') )
.then( _ => driver.findElement(By.id('edit-submit')) )
.then( e => driver.wait(until.elementIsVisible(e)) )
.then( _ => clickById('edit-submit') )
