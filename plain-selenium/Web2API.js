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


scenario('Clicking the Customize button opens the Editor')
.then( _ => z.openPage(baseUrl + '/new')) 
.then( _ => z.maximizeWindow() )
.then( _ => z.clickById('menu_new'))
.then( _ => z.assertExistsById('org-name', 'company name field') )
.then( _ => z.waitFor(3))
.then( _ => z.clickById('closeTopMessageBar'))
.then( _ => z.clickByCss('#s2id_industry_select b'))
.then( _ => z.clickByCss('body > div.select2-drop.select2-drop-active > ul > li:nth-child(6)')) 
.then( _ => z.clickById('btnNext')) 
.then( _ => z.inputById('org-name', 'MyTest'))
.then( _ => z.waitFor(4))
.then( _ => z.clickByClassName('btn  button-next'))
.then( _ => z.waitFor(2))
.then( _ => z.clickByClassName('device device-chatbot'))
.then( _ => z.clickByClassName('btn  button-next'))
.then( _ => z.clickByCss('.preintent[name="Contact"]'))
.then( _ => z.waitFor(20))
.then( _ => z.clickByClassName('publish-btn btn editor'))
.then( _ => z.assertExistsById('bigNewIntentBtn'), 'new intent button')                                   
.catch( z.failedScenario )

scenario('Adding and saving data in the Business Logic tab')
.then( _ => z.clickById('nav-tab-conversational'))
//.then( _ => z.clickByCss('#editbox_conversational  div.view-lines'))



scenario('Adding and saving data in Web2APi tab')