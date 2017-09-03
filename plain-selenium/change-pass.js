const { By } = require('selenium-webdriver');

const z = require('./common');
const scenario = z.scenario;
const driver = z.getDriver();

const config = require('config')
const baseUrl = config.baseUrl
const admin = config.creds.admin


driver
scenario('Sign-in successfully leads to homepage')

.then( _ => z.openPage(baseUrl + '/user/login', 'login page') )

.then( _ => z.maximizeWindow() )

.then( _ => z.inputById('edit-name','Admin') )

.then( _ => z.inputById('edit-pass','vs8Sr7aU') )

.then( _ => z.clickById('edit-submit') )                       


.then( _ => z.waitFor(3))

.then( _ => z.assertExistsByClassName('menu-item editor'), "Editor"  )

.catch( z.failedScenario )


driver
scenario('Clicking the Users button opens the Users screen')

.then( _ => z.clickByClassName('menu-item users') )

.then( _ => z.assertExistsById('user_selection'), "users drop-down menu"  )

.catch( z.failedScenario )


driver
scenario('Clicking the add User button opens the Add Users screen')

.then( _ => z.clickByCss('#node-18 > div > div > div > div > div:nth-child(3) > div > div.panel-heading.portlet-header > div > i.fa.fa-plus') )

.then( _ => z.assertExistsById('new_user_name'), "a field to enter user name"  )

.catch( z.failedScenario )


driver
scenario('Clicking the Save button adds a new user')

.then( _ => z. inputById ('new_user_name', 'ZuzNow'))

.then( _ => z. inputById ('new_user_mail', 'ZuzNow@zuznow.com'))

.then( _ => z. inputById ('new_user_password', 'Zuznow1'))

.then( _ => z. inputById ('new_user_password2', 'Zuznow1'))

.then( _ => z.clickById('btnSaveNewUser') )
                     
.then( _ => z.assertExistsById('newIntentInput'), "a new intent field"  )

.catch( z.failedScenario )


driver
scenario('Clicking the Sign out button leads to the Log In screen')

.then( _ => z.clickByCss('#topbar > div.topbar-main > ul > li.dropdown.open > a > span') )

.then( _ => z.clickByLinkText('Sign Out') )

.then( _ => z.assertExistsById('edit-name'), "The user name field on the Log in screen"  )

.catch( z.failedScenario )


driver
scenario('Sign-in successfully leads to homepage')

.then( _ => z.openPage(baseUrl + '/user/login', 'login page') )

.then( _ => z.maximizeWindow() )

.then( _ => z.inputById('edit-name','ZuzNow') )

.then( _ => z.inputById('edit-pass','Zuznow1') )

.then( _ => z.waitFor(3))

.then( _ => z.assertExistsByClassName('menu-item editor'), "Editor"  )

.catch( z.failedScenario )



driver
scenario('Clicking the User button opens the User menu')

.then( _ => z.openPage(baseUrl + '/editor'))

.then( _ => z.maximizeWindow() )

.then( _ => z.clickByCss('#topbar > div.topbar-main > ul > li:nth-child(3) > a > span') )

.then( _ => z.assertExistsByClassName('btn btn-sm zuz-btn-pink'), "home page"  )

.catch( z.failedScenario )





driver
scenario('The Change password button opens the Change password screen')

.then( _ => z.clickByLinkText('Change Password') )

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

.then( _ => z.clickByCss('#topbar > div.topbar-main > ul > li:nth-child(3) > a > span') )

.then( _ => z.clickByLinkText('Change Password') )

.then( _ => z.inputById('edit-field-first-name-und-0-value','ZuzNow') )

.then( _ => z.inputById('edit-field-last-name-und-0-value','Zooz') )

.then( _ => z.inputById('edit-current-pass','Zuznow1') )

.then( _ => z.inputById('edit-pass-pass1','Larisa1') )

.then( _ => z.inputById('edit-pass-pass2','Larisa1') )

.then( _ => z.clickByClassName('form-submit btn btn-success') )  

.then( _ => z.assertExistsById('failed_to_load_traffic'), "the homepage screen opens"  )

.catch( z.failedScenario )

driver
scenario('successful log in of admin user with applications should show homepage')

.then( _ => z.clearCookies() )

.then( _ => z.openPage (baseUrl + '/user/login', 'login page') )

.then( _ => z.inputById('edit-name','ZuzNow'))

.then( _ => z.inputById('edit-pass', 'Larisa1'))

.then( _ => z.clickById('edit-submit') )

.then( _ => z.assertExists(By.className('menu-item editor'), "Editor" ) )

.catch( z.failedScenario )



