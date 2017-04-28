const { 
	By, 
	until 
} = require('selenium-webdriver');
const {
	getDriver,
	waitFor,
	inputById,
	inputByName,
	inputByClassName,
	input,
	clickById,
	clickByName,
	clickByLinkText,
	clickByClassName,
	clickByXPath,
	click,
	locate, 
	assertExistsByClassName,
	scenario,
	logStep, 
	substep,
	failedScenario,
	endResult
} = require('./common');	

const driver = getDriver();


//create account link should open create account form
driver
.then( _ => scenario('create account link should open create account form') )
.then( _ => logStep("opening zuznow new account page") )
.then( _ => driver.get('https://dashboard-beta.zuznow.com/new') )
.then( _ => clickById('btn-register') )

//error messages of create account form
driver
.then( _ => scenario('error messages of create account form') )
.then( _ => driver.get('https://dashboard-beta.zuznow.com/user/register') )
.then( _ => driver.wait(until.elementLocated(By.id('edit-mail'))) )
.then( e => driver.wait(until.elementIsVisible( e ) ) )
.then( _ => inputById('edit-mail','Name@LastName') )
.then( _ => inputById('edit-field-first-name-und-0-value','Name') )
.then( _ => inputById('edit-field-last-name-und-0-value','LastName') )
.then( _ => clickById('edit-submit') )
.then( _ => driver.findElement(By.name('op')) )
.then( _ => logStep('expect error messages are displayed') )
.then( _ => assertExistsByClassName('form-text required error') )
.catch( failedScenario )


//multiple errors of create account form
driver
.then( _ => scenario('error messages of create account form') )
.then( _ => driver.get('https://dashboard-beta.zuznow.com/user/register') )
.then( _ => clickById('edit-submit') )

.then( _ => logStep(' - assertions - expect error messages are displayed') )
.then( _ => assertExistsByClassName('messages error') ) 
.then( _ => assertExistsByClassName('form-text required error') )
.then( _ => assertExistsByClassName('text-full form-text required error') )
.catch( failedScenario )
//TODO:I should write what is written in the error message

//submission of a mail in use should offer the recover password message
driver
.then( _ => scenario('submission of a mail in use should offer the recover password message') )
.then( _ => driver.get('https://dashboard-beta.zuznow.com/user/register') )
.then( _ => inputById('edit-mail','larisa@zuznow.com') )
.then( _ => inputById('edit-field-first-name-und-0-value','Larisa') )
.then( _ => inputById('edit-field-last-name-und-0-value','El-Netanany') )
.then( _ => clickById('edit-submit') )
.then( _ => clickByLinkText('Have you forgotten your password?') )
.catch( failedScenario )
//I should write what is written in the error message
//And about the red frame

//submission of valid form details should succeed
var mailUser = "reg-tst-" + Math.random().toString().replace("0.","").substr(0,25)
driver	
.then( _ => scenario('submission of valid form details should succeed') )
.then( _ => 
    logStep('opening zuznow registration') 
 || driver.get('https://dashboard-beta.zuznow.com/user/register') 
 )
.then( _ => inputById('edit-mail', mailUser + '@mailinator.com' ) )
.then( _ => inputById('edit-field-first-name-und-0-value','registration') )
.then( _ => inputById('edit-field-last-name-und-0-value','test') )
.then( _ => clickById('edit-submit') )
.then( _ => 
	logStep('opening inbox of: ' + mailUser.cyan )
 || driver.get('https://www.mailinator.com/inbox2.jsp?public_to=' + mailUser + '#/#public_maildirdiv') 
 )
.then( _ => clickByClassName('innermail ng-binding') )
.then( _ => 
	logStep('focusing on mail body IFrame')  
 || locate(By.id('publicshowmaildivcontent') )
     .then( e => substep("switching") || driver.switchTo().frame(e) )
)
.then( _ => 
	logStep("navigating to URL from mail ", "/html/body/a[1]".magenta)
 || locate(By.xpath("/html/body/a[1]"))
	 .then( e => 
		 substep("navigatin to href") 
	  || driver.get( e.getAttribute("href") ) 
	 )
)
.then( _ => inputById('edit-pass-pass1', 'Aabcd5') )
.then( _ => inputById('edit-pass-pass2','Aabcd5') )
.then( _ => clickById('edit-submit') )
.catch( failedScenario )


driver
.then( _ => endResult() )


