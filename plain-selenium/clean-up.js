const { By } = require('selenium-webdriver');

const z = require('./common');
const scenario = z.scenario;
const driver = z.getDriver();

const config = require('config')
const baseUrl = config.baseUrl
const admin = config.creds.admin

driver
.then( _ => z.scenario('Sign-in successfully leads to the Editor') )
.then( _ => z.openPage(baseUrl + '/user/login', 'login page') )
.then( _ => z.maximizeWindow() )
.then( _ => z.inputById('edit-name','admin') )
.then( _ => z.inputById('edit-pass','vs8Sr7aU') )
.then( _ => z.clickById('edit-submit') )
.then( _ => z.waitFor(3))
.then( _ => z.assertExists(By.css('#s2id_domain_selection > a > span'), "Editor" ) )
.catch( z.failedScenario )

driver
.then( _ => z.scenario('Clicking the Users button opens the users tab') )
.then( _ => z.clickById('menu_account') )
.then( _ => z.clickById('menu_users') )
.then( _ => z.clickById('user_selection') )
.then( _ => z.clickByCss('#user_selection > option:nth-child(5)') )
.then( _ => z.clickById('btnDeleteUser') ) 
.then( _ => driver.switchTo().alert().accept() )
.catch( z.failedScenario )


