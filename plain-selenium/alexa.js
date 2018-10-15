const config = require('config')
const baseUrl = config.baseUrl
const creds = config.creds.regularUser

const { By } = require('selenium-webdriver');
const z = require('./common');
const scenario = z.scenario;
const driver = z.getDriver();

driver
driver
.then( _ => z.scenario('successful log in of non-admin user with applications should show Editor')) 
.then( _ => z.clearCookies() )
.then( _ => z.openPage (baseUrl + '/user/login', 'login page') )
.then( _ => z.inputById('edit-name','Martin@zuznow.com'))
.then( _ => z.inputById('edit-pass', 'Newuser2'))
.then( _ => z.clickById('edit-submit') )
.then( _ => z.assertExists(By.className('menu-item new-site'), "new app point" ) )
.catch( z.failedScenario )

driver
.then( _ => z.scenario('Clicking the new app button opens the Create new app screen') )
.then( _ => z.maximizeWindow() )
.then( _ => z.clickById('menu_new'))
.then( _ => z.assertExistsById('org-name', 'company name field') )  
.catch( z.failedScenario )                               

.then( _ => z.maximizeWindow() )
.then( _ => z.waitFor(3))
.then( _ => z.clickByCss('#s2id_industry_select b'))
.then( _ => z.clickByCss('body > div.select2-drop.select2-drop-active > ul > li:nth-child(2)')) 
.then( _ => z.clickById('btnNext')) 
.then( _ => z.inputById('org-name', 'My'))
.then( _ => z.waitFor(4))
.then( _ => z.clickByCss('#organizationTab > div.form-horizontal > div > ul > li:nth-child(1) > a'))                                         
.then( _ => z.clickByClassName('btn  button-next'))
.then( _ => z.waitFor(4))
.then( _ => z.clickByClassName('device device-chatbot'))
.then( _ => z.waitFor(5))
.then( _ => z.scrollToBottom())  
.then( _ => z.clickByClassName('btn  button-next'))
.then( _ => z.scrollToBottom())
.then( _ => z.clickById('closeTopMessageBar'))
.then( _ => z.waitFor(3))
.then( _ => z.clickByClassName('publish-btn btn editor'))
.catch( z.failedScenario )  

driver
.then( _ => z.scenario('Clicking Publish Alexa button opens Amazon Log in window') )
.then( _ => z.waitFor(3))
.then( _ => z.clickByCss('div.btn-group.publish-narrow-screen-group > button'))
.then( _ => z.clickByLinkText('Upload to Alexa'))
//.then( _ => z.clickById('PublishAlexaDropdown'))
.then( _ => z.waitFor(6))
.then( _ => z.clickById('amazonLoginLink'))
.then( _ => z.switchTab(1, 'alexa log in form'))
.then( _ => z.inputById('ap_email', 'MartinZuznow@gmail.com'))
.then( _ => z.inputById('ap_password', 'Zuznow'))
.then( _ => z.clickById('signInSubmit'))
.then( _ => z.clickByName('consentApproved'))

driver
.then( _ => z.scenario('A corresponding message appears after a new alexa skill is built') )
.then( _ => z.switchTab(0, 'dashboard beta'))
.then( _ => z.waitFor(4))
.then( _ => z.assertExistsByLinkText('Amazon Alexa Simulator ', 'the message about testing your new skill') )
.catch( z.failedScenario ) 


