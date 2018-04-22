const config = require('config')
const baseUrl = config.baseUrl
const creds = config.creds.regularUser

const { By } = require('selenium-webdriver');
const z = require('./common');
const scenario = z.scenario;
const driver = z.getDriver();


scenario('Sign-in successfully leads to the Editor')
.then( _ => z.openPage(baseUrl + '/user/login', 'login page') )
.then( _ => z.maximizeWindow() )
.then( _ => z.waitFor(3) )
.then( _ => z.inputByCss('#edit-name', creds.user) )
.then( _ => z.waitFor(3) )
.then( _ => z.inputById('edit-pass', creds.password) )
.then( _ => z.clickById('edit-submit') )
.then( _ => z.waitFor(3) )
.then( _ => z.assertExists(By.css('#s2id_domain_selection > a > span'), "Editor" ) )
.catch( z.failedScenario )


scenario('Clicking the Support button opens the support menu')
.then( _ => z.clickByCss('.dropdown_tutorials>a') )
.then( _ => z.assertExists(By.id('menu_manual'), "support menu, docs point" ) )
.then( _ => z.assertExists(By.id('menu_community'), "support menu, community point" ) )
.catch( z.failedScenario )

//Feature: Docs
scenario('Clicking the Docs button opens the Docs screen')
.then( _ => z.clickById('menu_manual') )
.then( _ => z.switchTab(1, 'documentation window'))  
.then( _ => z.assertExists(By.linkText('Building Your First Conversational App'), "link to documentation" ) )

//Feature: Open a support ticket
scenario('Clicking the open a suport ticket button opens the Support ticket form')
.then( _ => z.switchTab(0, 'dashboard window'))  
.then( _ => z.clickByCss('.dropdown_tutorials>a') )
.then( _ => z.clickByLinkText('Open a support ticket') )
.then( _ => driver.switchTo().frame("webWidget"))
.then( _ => z.assertExists(By.css('input[name="name"]'), "support ticket" ) )
.then( _ => z.assertExists(By.name('description'), "support ticket" ) )
.then( _ => z.clickByCss('.src-component-button-ButtonSecondary-button') )
.catch( z.failedScenario )

//Feature: Share your thoughts
scenario('Clicking the Share your thoughts button opens the Share your thoughts form')
.then( _ => driver.switchTo().defaultContent())
.then( _ => z.clickByCss('.dropdown_tutorials>a') )
.then( _ => z.clickByLinkText('Share your thoughts') )
.then( _ => driver.switchTo().frame("webWidget"))
.then( _ => z.assertExists(By.css('input[name="name"]'), "share your thoughts" ) )
.then( _ => z.assertExists(By.name('description'), "share your thoughts" ) )
.catch( z.failedScenario )
