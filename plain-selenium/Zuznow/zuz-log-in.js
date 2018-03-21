const { By } = require('selenium-webdriver');
const z = require('./common');
const driver = z.getDriver();

//Log In functionality testing with an admin user
driver
.then( _ => z.scenario('Log In without password should show an error message') )
.then( _ => z.openPage('https://dashboard-beta.zuznow.com/user/login', 'login page') )
.then( _ => z.inputById('edit-name','Tom@zuznow.com') )
.then( _ => z.clickById('edit-submit') )
.then( _ => z.assertExists(By.linkText('Have you forgotten your password?'), "recover password link" ) )
.catch( z.failedScenario )

driver
.then( _ => z.scenario('Log in with wrong password should show an error message'))
.then( _ => z.openPage ('https://dashboard-beta.zuznow.com/user/login', 'login page') )
.then( _ => z.inputById('edit-name','Tom@zuznow.com'))
.then( _ => z.inputById('edit-pass', 'Computer1'))
.then( _ => z.clickById('edit-submit') )
.then( _ => z.assertExists(By.linkText('Have you forgotten your password?'), "recover password link" ) )
.catch( z.failedScenario )

driver
.then( _ => z.scenario('Log in with wrong username should show an error message'))
.then( _ => z.openPage ('https://dashboard-beta.zuznow.com/user/login', 'login page') )
.then( _ => z.inputById('edit-name','Tim@zuznow.com'))
.then( _ => z.inputById('edit-pass', 'Adminuser1'))
.then( _ => z.clickById('edit-submit') )
.then( _ => z.assertExists(By.linkText('Have you forgotten your password?'), "recover password link" ) )
.catch( z.failedScenario )

driver
.then( _ => z.scenario('successful log in of user with applications should show homepage'))
.then( _ => z.clearCookies() )
.then( _ => z.openPage ('https://dashboard-beta.zuznow.com/user/login', 'login page') )
.then( _ => z.inputById('edit-name','Tom@zuznow.com'))
.then( _ => z.inputById('edit-pass', 'Adminuser1'))
.then( _ => z.clickById('edit-submit') )
.then( _ => z.assertExists(By.className('menu-item new-site'), "new app point" ) )
.catch( z.failedScenario )

driver
.then( _ => z.scenario('successful log in of users without applications should show new-app screen'))
.then( _ => z.clearCookies() )
.then( _ => z.openPage ('https://dashboard-beta.zuznow.com/user/login', 'login page') )
.then( _ => z.inputById('edit-name','Polly@zuznow.com'))
.then( _ => z.inputById('edit-pass', 'Newuser1'))
.then( _ => z.clickById('edit-submit') )
.then( _ => z.assertExists(By.id('domain'), "enter domain field" ) )
.catch( z.failedScenario )

driver
.then( _ => z.scenario('successful log in of non-admin user with applications should show homepage'))
.then( _ => z.clearCookies() )
.then( _ => z.openPage ('https://dashboard-beta.zuznow.com/user/login', 'login page') )
.then( _ => z.inputById('edit-name','Martin@zuznow.com'))
.then( _ => z.inputById('edit-pass', 'Newuser2'))
.then( _ => z.clickById('edit-submit') )
.then( _ => z.assertExists(By.className('menu-item new-site'), "new app point" ) )
.catch( z.failedScenario )
 
driver
.then( _ => z.endResult() )
