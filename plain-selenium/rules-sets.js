const { By } = require('selenium-webdriver');

const z = require('./common');
const scenario = z.scenario;
const driver = z.getDriver();

const config = require('config')
const baseUrl = config.baseUrl
const admin = config.creds.admin


driver
.then( _ => z.scenario('Sign-in successfully leads to homepage') )
.then( _ => z.openPage(baseUrl + '/user/login', 'login page') )
.then( _ => z.maximizeWindow() )
.then( _ => z.inputById('edit-name','admin') )
.then( _ => z.inputById('edit-pass','vs8Sr7aU') )
.then( _ => z.clickById('edit-submit') )
.then( _ => z.waitFor(3))
.then( _ => z.assertExistsByClassName('menu-item new-site'), "home page"  )
.catch( z.failedScenario )



driver
.then( _ => z.scenario('Clicking the new app button opens the Create new app screen') )
.then( _ => z.openPage(baseUrl + '/userpage'))
.then( _ => z.maximizeWindow() )
.then( _ => z.clickByClassName('menu-item new-site'))
.then( _ => z.assertExistsById('org-name', 'company name field') )  
.catch( z.failedScenario )                               

.then( _ => z.scenario('Clicking the next button should open the New app Ready screen') )
.then( _ => z.openPage(baseUrl + '/new'))
.then( _ => z.maximizeWindow() )
.then( _ => z.clickByClassName('btn btn-default dropdown-toggle')) 
.then( _ => z.clickByLinkText('Custom')) 
.then( _ => z.inputById ('org-name', 'test'))
.then( _ => z.clickByClassName ('pager wizard'))
.then( _ => z.waitFor(2))
.then( _ => z. clickById ('btnNext'))
.then( _ => z.waitFor(4))
.then( _ => z.clickById('btnFinish'))

//Scenario: Clicking the Sets button opens the rules sets section
driver
.then( _ => z.scenario('Clicking the Sets button opens the rules sets section') )
.then( _ => z.maximizeWindow() )
.then( _ => z. clickById ('btnShowEditInfo'))
.then( _ => z.waitFor(3))
.then( _ => z.assertExistsByCss('#rulesSetTableBody > tr:nth-child(1) > td.setName'), "rules sets section"  )
.catch( z.failedScenario )                          

//Feature: Adding, editing and deleting a rules set

//Scenario: Clicking the Plus button adds a rules set
driver
.then( _ => z.scenario('Clicking the Plus button adds a rules set') )
.then( _ => z. clickById ('btnAddRulesSet'))
.then( _ => driver.switchTo().alert().accept() ) 
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
.then( _ => z.waitFor(3))
.then( _ => z. clickByClassName ('btnSaveSetInfo btn'))
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
.then( _ => z.clickByCss ('#btnDelete > i.fa.fa-trash-o') )
.then( _ => z.waitFor(3))
.then( _ => driver.switchTo().alert().accept() ) 
.then( _ => z.assertExistsByCss('#domains_table > div.panel-heading > span'), 'the user is on My Apps screen')
.catch(z.failedScenario)


