const { By } = require('selenium-webdriver');

const z = require('./common');
const scenario = z.scenario;
const driver = z.getDriver();


driver
scenario('Sign-in successfully leads to homepage')

.then( _ => z.openPage('https://dashboard-beta.conversation.one/user/login', 'login page') )

.then( _ => z.maximizeWindow() )

.then( _ => z.inputById('edit-name','Tom@zuznow.com') )

.then( _ => z.inputById('edit-pass','Adminuser1') )

.then( _ => z.clickById('edit-submit') )

.then( _ => z.waitFor(3))

.then( _ => z.assertExistsByClassName('menu-item editor'), "Editor"  )

.catch( z.failedScenario )



driver
scenario('Clicking the User button opens the User menu')

.then( _ => z.openPage('https://dashboard-beta.conversation.one/editor'))

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

.then( _ => z.inputById('edit-field-first-name-und-0-value','Tom') )

.then( _ => z.inputById('edit-field-last-name-und-0-value','Arnold') )

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

.then( _ => z.openPage('https://dashboard-beta.conversation.one/editor'))

.then( _ => z.maximizeWindow() )

.then( _ => z.clickByCss('#topbar > div.topbar-main > ul > li:nth-child(3) > a > span') )

.then( _ => z.clickByLinkText('Change Password') )

.then( _ => z.inputById('edit-field-first-name-und-0-value','Tom') )

.then( _ => z.inputById('edit-field-last-name-und-0-value','Arnold') )

.then( _ => z.inputById('edit-current-pass','Adminuser1') )

.then( _ => z.inputById('edit-pass-pass1','Larisa1') )

.then( _ => z.inputById('edit-pass-pass2','Larisa1') )

.then( _ => z.clickByClassName('form-submit btn btn-success') )  

.then( _ => z.assertExistsById('failed_to_load_traffic'), "the homepage screen opens"  )

.catch( z.failedScenario )

driver
scenario('successful log in of admin user with applications should show homepage')

.then( _ => z.clearCookies() )

.then( _ => z.openPage ('https://dashboard-beta.conversation.one/user/login', 'login page') )

.then( _ => z.inputById('edit-name','Tom@zuznow.com'))

.then( _ => z.inputById('edit-pass', 'Larisa1'))

.then( _ => z.clickById('edit-submit') )

.then( _ => z.assertExists(By.className('menu-item editor'), "Editor" ) )

.catch( z.failedScenario )



