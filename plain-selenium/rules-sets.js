const { By } = require('selenium-webdriver');

const z = require('./common');
const scenario = z.scenario;
const driver = z.getDriver();

driver
.then( _ => z.scenario('Sign-in successfully leads to homepage') )
.then( _ => z.openPage('https://dashboard-beta.conversation.one/user/login', 'login page') )
.then( _ => driver.manage().window().maximize())
.then( _ => z.inputById('edit-name','admin') )
.then( _ => z.inputById('edit-pass','vs8Sr7aU') )
.then( _ => z.clickById('edit-submit') )
.then( _ => z.waitFor(3))
.then( _ => z.assertExistsByClassName('menu-item new-site'), "home page"  )
.catch( z.failedScenario )



driver
.then( _ => z.scenario('Clicking the new app button opens the Create new app screen') )
.then( _ => z.openPage('https://dashboard-beta.conversation.one/userpage'))
.then( _ => driver.manage().window().maximize())
.then( _ => z.clickByClassName('menu-item new-site'))
.then( _ => z.assertExistsById('org-name', 'company name field') )  
.catch( z.failedScenario )                               

.then( _ => z.scenario('Clicking the next button should open the New app Ready screen') )
.then( _ => z.openPage(' https://dashboard-beta.conversation.one/new'))
.then( _ => driver.manage().window().maximize())
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
.then( _ => driver.manage().window().maximize())
.then( _ => z. clickById ('btnShowEditInfo'))
.then( _ => z. clickById ('btnSave'))
.then( _ => z.assertExistsByCss('#rulesSetTableBody > tr:nth-child(1) > td.setName'), "rules sets section"  )
.catch( z.failedScenario )                          

//Feature: Adding, editing and deleting a rules set

//Scenario: Clicking the Plus button adds a rules set
driver
.then( _ => z.scenario('Clicking the Plus button adds a rules set') )
.then( _ => z. clickById ('btnAddRulesSet'))
.then( _ => z.waitFor(3))
.then( _ => z. clickById ('btnReset'))
.then( _ => z.waitFor(3))
.then( _ => z.assertExistsByCss('#rulesSetTableBody > tr.dd-handle.selected > td.setName'), "rules sets section"  )
.catch( z.failedScenario )



