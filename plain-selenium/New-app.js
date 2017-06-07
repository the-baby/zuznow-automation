const { By } = require('selenium-webdriver');
const z = require('./common');
const driver = z.getDriver();

//Feature: Creating a new app with a custom industry

driver
.then( _ => z.openPage('https://dashboard-beta.conversation.one/user/login', 'login page') )
.then( _ => z.inputById('edit-name','admin') )
.then( _ => z.inputById('edit-pass','vs8Sr7aU') )
.then( _ => z.clickById('edit-submit') )
.then( _ => z.waitFor(3))
.then( _ => z.assertExistsByClassName('menu-item new-site'), "home page"  )
.catch( z.failedScenario )



//Successful creation of a default custom app with demo content

.then( _ => z.scenario('Clicking the new app button opens the Create new app screen') )
.then( _ => z.openPage('https://dashboard-beta.conversation.one/userpage'))
.then( _ => z.clickByClassName('menu-item new-site'))
.then( _ => z.assertExistsById('org-name', 'company name field') )  
.catch( z.failedScenario )                               

.then( _ => z.scenario('Clicking the next button should open the New app Ready screen') )
.then( _ => z.openPage(' https://dashboard-beta.conversation.one/new'))
.then( _ => z.clickByClassName('btn btn-default dropdown-toggle')) 
.then( _ => z.clickByLinkText('Custom')) 