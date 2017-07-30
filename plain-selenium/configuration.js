const { By } = require('selenium-webdriver');

const z = require('./common');
const scenario = z.scenario;
const driver = z.getDriver();

driver
.then( _ => z.scenario('Sign-in successfully leads to homepage') )
.then( _ => z.openPage('https://dashboard-beta.conversation.one/user/login', 'login page') )
.then( _ => z.inputById('edit-name','admin') )
.then( _ => z.inputById('edit-pass','vs8Sr7aU') )
.then( _ => z.clickById('edit-submit') )
.then( _ => z.waitFor(3))
.then( _ => z.assertExistsByClassName('menu-item new-site'), "home page"  )
.catch( z.failedScenario )



driver
.then( _ => z.scenario('Clicking the new app button opens the Create new app screen') )
.then( _ => z.openPage('https://dashboard-beta.conversation.one/userpage'))
.then( _ => z.clickByClassName('menu-item new-site'))
.then( _ => z.assertExistsById('org-name', 'company name field') )  
.catch( z.failedScenario )                               

.then( _ => z.scenario('Clicking the next button should open the New app Ready screen') )
.then( _ => z.openPage(' https://dashboard-beta.conversation.one/new'))
.then( _ => z.clickByClassName('btn btn-default dropdown-toggle')) 
.then( _ => z.clickByLinkText('Custom')) 
.then( _ => z.inputById ('org-name', 'test'))
.then( _ => z.clickByClassName ('pager wizard'))
.then( _ => z.waitFor(2))
.then( _ => z. clickById ('btnNext'))
.then( _ => z.waitFor(4))
.then( _ => z.clickById('btnFinish'))


driver
.then( _ => z.scenario(' Clicking the configuration button opens the general part of the Configuration tab') )
.then( _ => z.clickById('btnMyApps', 'configuration button')  )
.then( _ => z.assertExistsByCss('#tab-1 > div.col-lg-8 > div:nth-child(1) > div.portlet-header > div'), 'the general tab')
.catch( z.failedScenario )

/*
//Feature: Staging tab
//Clicking the configuration button opens the general part of the Configuration tab

driver
.then( _ => z.scenario('Clicking the Staging button opens the Staging subtab') )
.then( _ => z.waitFor(2))
.then( _ => z.clickByLinkText('Staging'))
.then( _ => z.assertExistsByCss('#settings-panel-stg > div.portlet-header > div'), 'the staging tab opened')
.catch( z.failedScenario )

//Selecting a certain value from the Log level drop-down menu

.then( _ => z.scenario('It is possible to select a certain value from the Log level drop-down menu ') )
.then( _ => z.openPage('https://dashboard-beta.conversation.one/editor '))
.then( _ => z.clickById('btnMyApps', 'configuration button')  )
.then( _ => z.clickByLinkText('Staging'))
.then( _ => z. clickById ('log_level_stg'))
.then( _ => z. clickByCss ('#log_level_stg > option:nth-child(3)'))
.then( _ => z. clickById('btnSave'))
.then( _ => z. clickByCss ('#btnEdit > i'))
.then( _ => z.clickById('btnMyApps', 'configuration button')  )
.then( _ => z.clickByLinkText('Staging'))
.then( () => z.assertContainsValue(By.css('#log_level_stg'), "the expected text in the element", 'warn') )
.catch(z.failedScenario)
*/

//Feature: Alexa subtab (staging)
//Alexa support and Account linking checkboxes are marked

.then( _ => z.scenario('Alexa support and Account linking checkboxes are marked when we open Alexa tab') )
.then( _ => z.openPage('https://dashboard-beta.conversation.one/editor '))
.then( _ => z.clickById('btnMyApps', 'configuration button')  )
.then( _ => z.clickByLinkText('Staging'))
.then( _ => z.clickByLinkText('Alexa'))
.then( _ => z.assertExistsByCss('#alexa_support_stg:checked'), 'the checkbox is marked')
.then( _ => z.assertExistsByCss('#alexa_account_linking_stg:checked'), 'the checkbox is marked')
.catch(z.failedScenario)

//Clicking the Generate button generates client id and client secret values

.then( _ => z.scenario('Clicking the Generate button generates client id and client secret values') )
.then( _ => z.openPage('https://dashboard-beta.conversation.one/editor '))
.then( _ => z.clickById('btnMyApps', 'configuration button')  )
.then( _ => z.clickByLinkText('Staging'))
.then( _ => z.clickByLinkText('Alexa'))
.then( _ => z.inputById('alexa_redirect_urls_stg', 
'https://layla.amazon.com/api/skill/link/M1QDRNZCTF1O3Q
 https://pitangui.amazon.com/api/skill/link/M1QDRNZCTF1O3Q'))
.then( _ => z.clickById('btnGenerateAlexaLinking_stg', 'Generate button')  )
.then( _ => z.assertContainsValue(By.id('alexa_client_id_stg'), "the expected text in the element", 'alexa')
.then( _ => z.assertContainsValue(By.id('alexa_client_secret_stg'), "the expected text in the element", 'lM01me7zL6')
.catch(z.failedScenario)
