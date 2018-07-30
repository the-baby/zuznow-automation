const config = require('config')
const baseUrl = config.baseUrl
const creds = config.creds.regularUser

const { By } = require('selenium-webdriver');
const z = require('./common');
const scenario = z.scenario;
const driver = z.getDriver();


driver
.then( _ => z.scenario('Sign-in successfully leads to Editor') )
.then( _ => z.openPage(baseUrl + '/user/login', 'login page') )
.then( _ => z.maximizeWindow() )
.then( _ => z.inputById('edit-name', creds.user) )
.then( _ => z.inputById('edit-pass', creds.password) )
.then( _ => z.clickById('edit-submit') )
.then( _ => z.waitFor(3))
.then( _ => z.assertExists(By.css('#s2id_domain_selection > a > span'), "Editor" ) )
.catch( z.failedScenario )

scenario('Clicking the next button should open the Add sample screen')
.then( _ => z.clickById('menu_new'))
.then( _ => z.waitFor(3) ) 
.then( _ => z.clickByCss('#s2id_industry_select b'))
.then( _ => z.clickByCss('body > div.select2-drop.select2-drop-active > ul > li:nth-child(6)')) 
.then( _ => z.clickById('btnNext')) 
.then( _ => z.inputById ('org-name', 'school'))
.then( _ => z.clickByClassName('btn  button-next'))
.then( _ => z.waitFor(2))
.then( _ => z.clickByClassName('device device-chatbot')) 
.then( _ => z.scrollToBottom())          
.then( _ => z.clickByClassName('btn  button-next'))
.then( _ => z.assertExistsByClassName('form-control newIntentSample first') )  
.catch( z.failedScenario ) 

scenario('Checking that it is possible to add samples to the app')
.then( _ => z.inputByClassName('form-control newIntentSample first', 'How old are you'))
.then( _ => z.scrollToBottom())
.then( _ => z.clickByClassName('btn  button-next'))
.then( _ => z.assertExistsByClassName('form-control newTextResponse first'), 'new text response')
.catch( z.failedScenario )

scenario('Clickingthe Customize button opens the Editor')
.then( _ => z.inputByClassName('form-control newTextResponse first', 'I am 20'))
.then( _ => z.waitFor(3))
.then( _ => z.scrollToBottom())
.then( _ => z.clickByClassName('btn  button-next'))
.then( _ => z.clickById('closeTopMessageBar'))
.then( _ => z.waitFor(3))
.then( _ => z.clickByClassName('publish-btn btn editor'))
.then( _ => z.assertExistsById('btnSave'), 'save button')                 
.catch( z.failedScenario )

//Scenario: Clicking the Sets button opens the rules sets section
driver
.then( _ => z.scenario('Clicking the Sets button opens the rules sets section') )
.then( _ => z.maximizeWindow() )
.then( _ => z. clickById ('btnShowEditInfo'))
.then( _ => z.waitFor(6))
.then( _ => z.assertExistsByCss('#rulesSetTableBody > tr:nth-child(1) > td.setName'), "rules sets section"  )
.catch( z.failedScenario )                          

//Feature: Adding, editing and deleting a rules set

//Scenario: Clicking the Plus button adds a rules set
driver
.then( _ => z.scenario('Clicking the Plus button adds a rules set') )
.then( _ => z. clickById ('btnAddRulesSet'))
.then( _ => z.waitFor(3))
.then( _ => z.assertExistsByCss('#rulesSetTableBody > tr.dd-handle.selected > td.setName'), "rules sets section"  )
.catch( z.failedScenario )


//Scenario: Clicking the Edit button enables the editing of the set name
driver
.then( _ => z.scenario('Clicking the Edit button enables the editing of the set name') )
.then( _ => z. clickByClassName ('btnRenameSet btn'))
.then( _ => z.assertExistsByClassName('setRenameInput'), "rename set field"  )
.catch( z.failedScenario )

//Scenario: It is possible to enter a new name for the Set

driver
.then( _ => z.scenario('It is possible to enter a new name for the Set'))
.then( _ => driver.findElement(By.className('setRenameInput')).clear())
.then( _ => z. inputByClassName ('setRenameInput', 'Test set'))
.then( _ => z.waitFor(5))
.then( _ => z. clickByClassName ('btnSaveSetInfo btn'))
.then( _ => z.waitFor(6))
.then( _ => z. clickById ('btnReset')) 
.then( _ => z.waitFor(3))
.then( _ => z.assertContainsText(By.css('#rulesSetTableBody > tr:nth-child(2) > td.setName'), "the expected text in the element", 'Test set') )
.then( _ => z.waitFor(3))
.catch( z.failedScenario)



//Scenario: Clicking Delete button deletes the set
driver
.then( _ => z.scenario('Clicking Delete button deletes the set') )
.then( _ => z. clickByCss('#rulesSetTableBody > tr.dd-handle.selected > td.setActions > div > button.btnDeleteSet.btn > i'))
.then( _ => driver.switchTo().alert().accept() )
.then( _ => z.waitFor(3))
.then( _ => z.assertNoSuchElements(By.xpath('//*[@id="rulesSetTableBody"]/tr[2]/td[2]'), 'the deleted rules set' ) )  
.catch( z.failedScenario )

//Clicking Delete button deletes the app

.then( _ => z.scenario('Clicking Delete button deletes the app') )
.then( _ => z.clickById('btnMyApps', 'configuration button')  )
.then( _ => z.clickById ('btnDelete') )
.then( _ => z.waitFor(3))
.then( _ => driver.switchTo().alert().accept() ) 
.catch(z.failedScenario)


