const { By } = require('selenium-webdriver');
const z = require('./common');
const driver = z.getDriver();

const config = require('config')
const baseUrl = config.baseUrl
const admin = config.creds.regularUser

//Log In functionality testing with an admin user
driver
.then( _ => z.scenario('Log In without password should show an error message') )
.then( _ => z.openPage(baseUrl + '/user/login', 'login page') )
.then( _ => z.maximizeWindow() )
.then( _ => z.inputById('edit-name','Tom@zuznow.com') )
.then( _ => z.clickById('edit-submit') )
.then( _ => z.waitFor(3))
.then( _ => z.assertExists(By.linkText('Have you forgotten your password?'), "recover password link" ) )
.catch( z.failedScenario )

driver
.then( _ => z.scenario('Log in with wrong password should show an error message'))
.then( _ => z.openPage (baseUrl + '/user/login', 'login page') )
.then( _ => z.inputById('edit-name','Tom@zuznow.com'))
.then( _ => z.inputById('edit-pass', 'Computer1'))
.then( _ => z.clickById('edit-submit') )
.then( _ => z.waitFor(3))
.then( _ => z.assertExists(By.linkText('Have you forgotten your password?'), "recover password link" ) )
.catch( z.failedScenario )

driver
.then( _ => z.scenario('Log in with wrong username should show an error message'))
.then( _ => z.openPage (baseUrl + '/user/login', 'login page') )
.then( _ => z.inputById('edit-name','Tim@zuznow.com'))
.then( _ => z.inputById('edit-pass', 'Adminuser1'))
.then( _ => z.clickById('edit-submit') )
.then( _ => z.waitFor(3))
.then( _ => z.assertExists(By.linkText('Have you forgotten your password?'), "recover password link" ) )
.catch( z.failedScenario )

driver
.then( _ => z.scenario('successful log in of admin user with applications should show editor'))
.then( _ => z.clearCookies() )
.then( _ => z.openPage (baseUrl + '/user/login', 'login page') )
.then( _ => z.inputById('edit-name','Tom@zuznow.com'))
.then( _ => z.inputById('edit-pass', 'Adminuser1'))
.then( _ => z.clickById('edit-submit') )
.then( _ => z.assertExists(By.className('menu-item new-site'), "new app point" ) )
.catch( z.failedScenario )

driver
.then( _ => z.scenario('successful log in of users with applications should show editor')) 
.then( _ => z.clearCookies() )
.then( _ => z.openPage (baseUrl + '/user/login', 'login page') )
.then( _ => z.inputById('edit-name','Polly@zuznow.com'))
.then( _ => z.inputById('edit-pass', 'Newuser1'))
.then( _ => z.clickById('edit-submit') )
.then( _ => z.assertExists(By.id('btnMyApps'), "the Editor is open" ) )
.catch( z.failedScenario )

driver
.then( _ => z.scenario('successful log in of non-admin user without applications should show new app screen')) 
.then( _ => z.clearCookies() )
.then( _ => z.openPage (baseUrl + '/user/login', 'login page') )
.then( _ => z.inputById('edit-name','Martin@zuznow.com'))
.then( _ => z.inputById('edit-pass', 'Newuser2'))
.then( _ => z.clickById('edit-submit') )
.then( _ => z.assertExists(By.id('s2id_industry_select'), "new app screen" ) )
.catch( z.failedScenario )

driver
.then( _ => z.endResult() )
