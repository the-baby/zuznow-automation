const { 
	By, 
	until 
} = require('selenium-webdriver');
const {
	getDriver,
	openPage,
	waitFor,
	inputById,
	inputByName,
	inputByClassName,
	input,
	clickById,
	clickByName,
	clickByLinkText,
    clickByPartialLinkText,
	clickByClassName,
	clickByXPath,
	click,
	locate,
	assertExistsByName,
	assertExistsByClassName,
	scenario,
	logStep, 
	substep,
	failedScenario,
	endResult
} = require('./common');	

const driver = getDriver();
const z = require('./common');


//create account link should open create account form
driver
.then( _ => scenario('create account link should open create account form') )
.then( _ => openPage('https://dashboard-beta.conversation.one/user/login', "new account page") )
.then( _ => waitFor(3))
.then( _ => clickById('btn-register') )
.then( _ => logStep("registration form opens".yellow) )

//error messages of create account form
driver

.then( _ => scenario('error messages of create account form') )
.then( _ => openPage('https://dashboard-beta.conversation.one/user/register', 'register page') )
.then( _ => inputById('edit-mail','Name@LastName') )
.then( _ => inputById('edit-field-first-name-und-0-value','Name') )
.then( _ => inputById('edit-field-last-name-und-0-value','LastName') )
.then( _ => clickById('edit-submit') )
.then( _ => assertExistsByName('op') )
.then( _ => assertExistsByClassName('form-text required error') )
.catch( failedScenario )


//multiple errors of create account form
driver
.then( _ => scenario('multiple error messages of create account form') )
.then( _ => openPage('https://dashboard-beta.conversation.one/user/register', 'register page') )
.then( _ => waitFor(3))
.then( _ => clickById('edit-submit') )
.then( _ => assertExistsByClassName('form-text required error') )
.then( _ => assertExistsByClassName('text-full form-text required error') )
.then( _ => logStep("TODO: check text in error messages?".yellow) )
.catch( failedScenario )

//submission of a mail in use should offer the recover password message
driver
.then( _ => scenario('submission of a mail in use should offer the recover password message') )
.then( _ => openPage('https://dashboard-beta.conversation.one/user/register', 'register page') )
.then( _ => inputById('edit-mail','Tom@zuznow.com') )
.then( _ => inputById('edit-field-first-name-und-0-value','Name') )
.then( _ => inputById('edit-field-last-name-und-0-value','LastName') )
.then( _ => clickById('edit-submit') )
.then( _ => waitFor(3))
.then( _ => clickByLinkText('Have you forgotten your password?') )
.then( _ => logStep("The mail in use is not accepted".yellow) )
.catch( failedScenario )

//submission of valid form details should succeed
var mailUser = "reg-tst-" + Math.random().toString().replace("0.","").substr(0,20)
driver	
.then( _ => scenario('submission of valid form details should succeed') )
.then( _ => openPage('https://dashboard-beta.conversation.one/user/register', 'register page') )
.then( _ => inputById('edit-mail', 'automationlarisa@gmail.com' ) )
.then( _ => inputById('edit-field-first-name-und-0-value','registration') )
.then( _ => inputById('edit-field-last-name-und-0-value','test') )
.then( _ => clickById('edit-submit') )
.then( _ => openPage('https://www.gmail.com', 'gmail home') )
.then( _ => inputById('identifierId', 'automationlarisa') )
.then( _ => waitFor(3))
.then( _ => clickByClassName('RveJvd snByac') )
.then( _ => inputByName('password', 'Apples32') )
.then( _ => waitFor(1))
.then( _ => clickByClassName('RveJvd snByac') )
.then( _ => waitFor(1))
	
.then( _ => clickByPartialLinkText( 'Your conversational apps are on their way!' ) )
.then( _ => waitFor(3))
	
.then( _ =>
  substep('finding activation link')
  || locate(By.partialLinkText( 'here' ))
     .then( e => 
        substep("navigatin to href of activation link") 
     || driver.get( e.getAttribute("href") )
     )
)

.then( _ => z.clearCookies() )
.then( _ => inputById('edit-pass-pass1', 'Aabcd5') )
.then( _ => inputById('edit-pass-pass2','Aabcd5') )
.then( _ => clickById('edit-submit') )
.then( _ => logStep("TODO: what is checked here?".yellow) )
.catch( failedScenario )


driver
.then( _ => endResult() )


