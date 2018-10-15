const config = require('config')
const baseUrl = config.baseUrl
const creds = config.creds.regularUser

const { By } = require('selenium-webdriver');
const z = require('./common');
const scenario = z.scenario;
const driver = z.getDriver();

driver
.then( _ => z.scenario('successful log in of non-admin user with applications should show Editor')) 
.then( _ => z.clearCookies() )
.then( _ => z.openPage (baseUrl + '/user/login', 'login page') )
.then( _ => z.inputById('edit-name','Polly@zuznow.com'))
.then( _ => z.inputById('edit-pass', 'Newuser1'))
.then( _ => z.clickById('edit-submit') )
.then( _ => z.assertExists(By.className('menu-item new-site'), "new app point" ) )
.catch( z.failedScenario )

driver
.then( _ => z.scenario('opening the page for testing api')) 
.then( _ => z.openPage ('https://dashboard-beta.conversation.one/postTest') )
.then( _ => z.assertExists(By.id('doPost'), "send request button" ) )
.catch( z.failedScenario )

driver
.then( _ => z.scenario('filling in the api testing fields and getting the expected request result'))
.then( _ => z.inputByName('url','API/rasa_model.php'))
.then( _ => z.inputByName('domain_id','4346'))
.then( _ => z.inputByName('key','6e986ea1-ef84-45af-b222-c11e5d9efc5a'))
.then( _ => z.inputByName('action','status'))
.then( _ => z.clickById('doPost') )
.then( _ => z.waitFor(2) )
.then( _ => z.assertContainsText(By.id('statusCode'), "the expected text in the element", '403') )
.catch( z.failedScenario )



