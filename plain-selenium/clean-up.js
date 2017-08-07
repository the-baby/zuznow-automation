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
.then( _ => z.scenario('Clicking the Users button opens the users tab') )
.then( _ => z.clickByCss('#main-menu > li.menu-230 > a') )
.then( _ => z.clickById('user_selection') )
.then( _ => z.clickByCss('#user_selection > option:nth-child(5)') )
.then( _ => z.clickById('btnDeleteUser') ) 
.then( _ => driver.switchTo().alert().accept() )
.catch( z.failedScenario )