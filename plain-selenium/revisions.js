const config = require('config')
const baseUrl = config.baseUrl
const creds = config.creds.regularUser

const { By } = require('selenium-webdriver');
const z = require('./common');
const scenario = z.scenario;
const driver = z.getDriver();

scenario('Sign-in successfully leads to Editor')

.then( _ => z.openPage(baseUrl + '/user/login', 'login page') )
.then( _ => z.maximizeWindow() )
.then( _ => z.inputById('edit-name', creds.user) )
.then( _ => z.inputById('edit-pass', creds.password) )
.then( _ => z.clickById('edit-submit') )
.then( _ => z.waitFor(10))
.then( _ => z.assertExistsById('btnSave'), "Editor" ) 
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

scenario('Clicking the Add button opens the New intent window')
.then( _ => z.clickById ('bigNewIntentBtn'))
.then( _ => z.waitFor(3))
.then( _ => z.assertExistsByCss('.preintent[name="OpeningHours"]'),'the list of intents' )
.catch( z.failedScenario ) 

scenario('Selecting a certain predefined intent adds it to the list')

.then( _ => z.clickByCss ('.preintent[name="OpeningHours"]'))
.then( _ => z.waitFor(3))
.then( _ => z.clickById('btnSave') )
.then( _ => z.waitFor(40) )
.then( () => z.assertExistsByCss('.intent-link[name="OpeningHours"]'), 'new intent' ) 
.catch( z.failedScenario )

//Feature : Interaction rules revisions
scenario('Clicking the Interaction Rules Revisions button opens the Revisions screen')
.then( _ => z.clickByCss('.revision-group button') )
.then( _ => z.clickByLinkText('Interaction Rules Revisions') )
.then( _ => z.assertExists(By.id('btnRevertInteractionRevision'), "Revisions screen" ) )
.then( _ => z.waitFor(3))
.catch( z.failedScenario )


scenario('Clicking the Revert revision button reverts revision')
.then( _ => z.clickByCss('.revisionsDataTable_tr_selected+tr') )
.then( _ => z.clickById('btnRevertInteractionRevision') )
.then( _ => z.clickByCss('#revertRevisionModal > div > div > div.modal-footer > button') )
.then( _ => z.waitFor(30) )
.then( _ => z.assertNoSuchElements(By.css('.intent-link[name="OpeningHours"]'), 'the intent is missing' ) )
.catch( z.failedScenario )

//Feature: Business logic revisions