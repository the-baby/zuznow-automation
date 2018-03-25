const { By } = require('selenium-webdriver');

const z = require('./common');
const scenario = z.scenario;
const driver = z.getDriver();

const config = require('config')
const baseUrl = config.baseUrl
const admin = config.creds.regularUser


//create account link should open create account form
driver
.then( _ => scenario('create account link should open create account form') )
.then( _ => z.openPage(baseUrl + '/user/login', 'login page') )
.then( _ => z.waitFor(3))
.then( _ => z.clickById('btn-register') )
.then( _ => z.logStep("registration form opens".yellow) )

//error messages of create account form
driver

.then( _ => scenario('error messages of create account form') )
.then( _ => z.openPage('https://dashboard-beta.conversation.one/user/register', 'register page') )
.then( _ => z.inputById('edit-mail','Name@LastName') )
.then( _ => z.inputById('edit-field-first-name-und-0-value','Name') )
.then( _ => z.inputById('edit-field-last-name-und-0-value','LastName') )
.then( _ => z.clickById('edit-submit') )
.then( _ => z.assertExistsByName('op') )
.then( _ => z.assertExistsByClassName('form-text required error') )
.catch( z.failedScenario )


//multiple errors of create account form
driver
.then( _ => scenario('multiple error messages of create account form') )
.then( _ => z.openPage('https://dashboard-beta.conversation.one/user/register', 'register page') )
.then( _ => z.waitFor(3))
.then( _ => z.clickById('edit-submit') )
.then( _ => z.waitFor(3))
.then( _ => z.assertExistsByClassName('form-text required error') )
.then( _ => z.assertExistsByClassName('text-full form-text required error') )
.then( _ => z.logStep("TODO: check text in error messages?".yellow) )
.catch( z.failedScenario )

//submission of a mail in use should offer the recover password message
driver
.then( _ => scenario('submission of a mail in use should offer the recover password message') )
.then( _ => z.openPage('https://dashboard-beta.conversation.one/user/register', 'register page') )
.then( _ => z.inputById('edit-mail','Tom@zuznow.com') )
.then( _ => z.inputById('edit-field-first-name-und-0-value','Name') )
.then( _ => z.inputById('edit-field-last-name-und-0-value','LastName') )
.then( _ => z.clickById('edit-submit') )
.then( _ => z.waitFor(3))
.then( _ => z.clickByLinkText('Have you forgotten your password?') )
.then( _ => z.logStep("The mail in use is not accepted".yellow) )
.catch(z. failedScenario )

//submission of valid form details should succeed

/*
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



.then( _ => waitFor(5))
.then( _ => clickByClassName('RveJvd snByac') )
.then( _ => waitFor(5))
	
.then( _ => clickByPartialLinkText( 'Your conversational apps are on their way!' ) )
.then( _ => waitFor(4))
	
.then( _ =>
  substep('finding activation link')
  || locate(By.partialLinkText( 'here' ))
     .then( e => 
        substep("navigatin to href of activation link") 
     || driver.get( e.getAttribute("href") )
     )
)

.then( _ => z.clearCookies() )
.then( _ => waitFor(25))
.then( _ => inputById('edit-name', 'test') )
.then( _ => inputById('edit-pass','Aabcd5') )
.then( _ => clickById('edit-submit') )
.then( _ => logStep("TODO: what is checked here?".yellow) )
.catch( failedScenario )


driver
.then( _ => endResult() )
*/

driver
.then( _ => scenario('submission of valid form details should succeed') )
.then( _ => z.openPage('https://dashboard-beta.conversation.one/user/register', 'register page') )
.then( _ => z.inputById('edit-mail','automationlarisa@gmail.com') )
.then( _ => z.inputById('edit-field-first-name-und-0-value','registration') )
.then( _ => z.inputById('edit-field-last-name-und-0-value','test') )
.then( _ => z.inputById('edit-pass-pass1','Aabcd5') )
.then( _ => z.inputById('edit-pass-pass2','Aabcd5') )
.then( _ => z.clickById('edit-submit') )
.then( _ => z.assertExistsByCss('#s2id_industry_select b') )
.catch(z. failedScenario )



