const config = require('config')
const baseUrl = config.baseUrl
const creds = config.creds.regularUser

const { By } = require('selenium-webdriver');
const z = require('./common');
const scenario = z.scenario;
const driver = z.getDriver();


driver
scenario('Sign-in successfully leads to the Editor')

.then( _ => z.openPage(baseUrl + '/user/login', 'login page') )

.then( _ => z.maximizeWindow() )

.then( _ => z.inputById('edit-name', creds.user) )

.then( _ => z.inputById('edit-pass', creds.password) )

.then( _ => z.clickById('edit-submit') )                       

.then( _ => z.waitFor(3))

.then( _ => z.assertExists(By.css('#s2id_domain_selection > a > span'), "Editor" ) )

.catch( z.failedScenario )


driver
scenario('Clicking the Users button opens the Users screen')

.then( _ => z.clickById('menu_account') )

.then( _ => z.clickById('menu_users') )

.then( _ => z.assertExistsById('group_selection'), "groups drop-dowmn menu"  )

.then( _ => z.waitFor(3))

.catch( z.failedScenario )


driver
scenario('Clicking the add User button opens the Add Users screen')

.then( _ => z.clickByCss('#node-18 > div > div > div > div > div:nth-child(4) > div > div.panel-heading.portlet-header > div > i.fa.fa-plus') )

.then( _ => z.assertExistsById('new_user_name'), "a field to enter user name"  )

.catch( z.failedScenario )


driver
scenario('Clicking the Save button adds a new user')

.then( _ => z. inputById ('new_user_name', 'ZuzNow'))

.then( _ => z. inputById ('new_user_mail', 'ZuzNow@zuznow.com'))

.then( _ => z. inputById ('new_user_password', 'Zuznow1'))

.then( _ => z. inputById ('new_user_password2', 'Zuznow1'))

.then( _ => z.scrollToBottom())

.then( _ => z.clickById('new_user_admin_all_domains') )

.then( _ => z.clickById('btnSaveNewUser') )

.then( _ => z.waitFor(3))
                     
.then( _ => z.assertExistsById('group_selection'), "the user form closed"  )

.catch( z.failedScenario )


driver
scenario('Clicking the Sign out button leads to the Log In screen')

.then( _ => z.scrollToTop())

.then( _ => z.clickById('menu_account') )

.then( _ => z.clickById('menu_logout') )

.then( _ => z.assertExistsById('edit-name'), "The user name field on the Log in screen"  )

.catch( z.failedScenario )


driver
scenario('Sign-in successfully leads to the Editor')

.then( _ => z.openPage(baseUrl + '/user/login', 'login page') )

.then( _ => z.maximizeWindow() )

.then( _ => z.inputById('edit-name','ZuzNow') )

.then( _ => z.waitFor(1))

.then( _ => z.inputById('edit-pass','Zuznow1') )

.then( _ => z.waitFor(1))
	
.then( _ => z.clickById('edit-submit') )

.then( _ => z.waitFor(3))

.then( _ => z.assertExists(By.id('btnReset'), "Editor" ) )

.catch( z.failedScenario )


/*
driver
scenario('Clicking the User button opens the User menu')

.then( _ => z.openPage(baseUrl + '/editor'))

.then( _ => z.maximizeWindow() )

.then( _ => z.clickByCss('#topbar > div.topbar-main > ul > li:nth-child(3) > a > span') )

.then( _ => z.assertExistsByClassName('btn btn-sm zuz-btn-pink'), "home page"  )

.catch( z.failedScenario )
*/


driver
scenario('The Change password button opens the Change password screen')

.then( _ => z.clickById('menu_account') )

.then( _ => z.clickById('menu_change_password') )

.then( _ => z.waitFor(2))

.then( _ => z.assertExistsById('user-edit-container'), "the change password screen is open"  )

.catch( z.failedScenario )

driver
scenario('Entering wrong current password returns an error message')

.then( _ => z.inputById('edit-field-first-name-und-0-value','ZuzNow') )

.then( _ => z.inputById('edit-field-last-name-und-0-value','Zooz') )

.then( _ => z.inputById('edit-current-pass','Adminuser2') )

.then( _ => z.inputById('edit-pass-pass1','Larisa1') )

.then( _ => z.inputById('edit-pass-pass2','Larisa1') )

.then( _ => z.scrollToBottom())

.then( _ => z.clickById('edit-submit') )  

.then( _ => z.assertExistsByClassName('messages error'), "error message"  )

.catch( z.failedScenario )

driver
scenario('Entering 2 different passwords returns an error message')
 
.then( _ => z.inputById('edit-pass-pass1','Larisa1') )

.then( _ => z.inputById('edit-pass-pass2','Larisa2') )

.then( _ => z.assertExistsByClassName('error'), "the passwords do not match"  )

.catch( z.failedScenario )

driver
scenario('Entering a new invalid password returns error message')

.then( _ => z.inputById('edit-pass-pass1','test') )

.then( _ => z.inputById('edit-pass-pass2','test') )

.then( _ => z.assertExistsByClassName('password-suggestions description'), "password rules"  )

.catch( z.failedScenario )

driver
scenario(' Clicking the Save button saves a valid password')

.then( _ => z.openPage(baseUrl + '/editor'))

.then( _ => z.maximizeWindow() )

.then( _ => z.clickById('menu_account') )

.then( _ => z.clickById('menu_change_password') )

.then( _ => z.inputById('edit-field-first-name-und-0-value','ZuzNow') )

.then( _ => z.inputById('edit-field-last-name-und-0-value','Zooz') )

.then( _ => z.inputById('edit-current-pass','Zuznow1') )

.then( _ => z.inputById('edit-pass-pass1','Larisa1') )

.then( _ => z.inputById('edit-pass-pass2','Larisa1') )

.then( _ => z.scrollToBottom())

.then( _ => z.clickByClassName('form-submit btn btn-success') )  

.then( _ => z.assertExists(By.css('#s2id_domain_selection > a > span'), "Editor" ) )

.catch( z.failedScenario )

driver
scenario('successful log in of admin user with applications should show Editor')

.then( _ => z.clearCookies() )

.then( _ => z.openPage (baseUrl + '/user/login', 'login page') )

.then( _ => z.inputById('edit-name','ZuzNow'))

.then( _ => z.inputById('edit-pass', 'Larisa1'))

.then( _ => z.waitFor(1))
	
.then( _ => z.clickByClassName('form-submit') )

.then( _ => z.assertExists(By.css('#s2id_domain_selection > a > span'), "Editor" ) )

.catch( z.failedScenario )


