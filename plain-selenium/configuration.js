const { By } = require('selenium-webdriver');

const z = require('./common');
const scenario = z.scenario;
const driver = z.getDriver();

const config = require('config')
const baseUrl = config.baseUrl
const admin = config.creds.admin

driver
.then( _ => z.scenario('Sign-in successfully leads to Editor') )
.then( _ => z.openPage(baseUrl + '/user/login', 'login page') )
.then( _ => z.maximizeWindow() )
.then( _ => z.inputById('edit-name','admin') )
.then( _ => z.inputById('edit-pass','vs8Sr7aU') )
.then( _ => z.clickById('edit-submit') )
.then( _ => z.waitFor(3))
.then( _ => z.assertExists(By.css('#s2id_domain_selection > a > span'), "Editor" ) )
.catch( z.failedScenario )



driver
.then( _ => z.scenario('Clicking the new app button opens the Create new app screen') )
.then( _ => z.openPage(baseUrl + '/userpage'))
.then( _ => z.maximizeWindow() )
.then( _ => z.clickById('menu_new'))
.then( _ => z.assertExistsById('org-name', 'company name field') )  
.catch( z.failedScenario )                               

.then( _ => z.scenario('Clicking the next button should open the New app Ready screen') )
.then( _ => z.openPage(' https://dashboard-beta.conversation.one/new'))
.then( _ => z.maximizeWindow() )
.then( _ => z.clickById('s2id_industry_select'))
.then( _ => z.inputByCss('.select2-input','Education'))
.then( _ => z.clickByCss('li.select2-result.select2-highlighted'))
 .then( _ => z.clickById('btnNext')) 
.then( _ => z.inputById('org-name', 'test'))
.then( _ => z.clickByClassName('btn  button-next'))
.then( _ => z.waitFor(2))
.then( _ => z.inputByCss('input.form-control.newIntentSample.first', 'how can I contact support'))
.then( _ => z.waitFor(4))
.then( _ => z.clickById ('btnNext'))
.then( _ => z.inputByCss ('input.form-control.newTextResponse.first', 'you can call us at 1800'))
.then( _ => z.clickById ('btnNext'))
.then( _ => z.waitFor(8))
//.then( _ => switchTo().frame('chatbot_frame'))
//.then( _ => z.inputById('input', 'how can I contact support'))
//.then( _ => z.clickByClassName ('submitBtn form-control c1Icon c1Icon-paper-plane'))	
.then( _ => z.clickByClassName('publish-btn btn editor'))


driver
.then( _ => z.scenario(' Clicking the configuration button opens the Production part of the Configuration tab') )
.then( _ => z.clickById('btnMyApps', 'configuration button')  )
.then( _ => z.waitFor(2))
//.then( _ => driver.switchTo().alert().accept() ) 
.then( _ => z.waitFor(2))
.then( _ => z.assertExistsById('name'), 'the production tab')
.catch( z.failedScenario )


//Feature: Staging tab
//Clicking the Staging button opens the Staging subtab

driver
.then( _ => z.scenario('Clicking the Staging button opens the Staging subtab') )
.then( _ => z.waitFor(2))
.then( _ => z.clickByLinkText('Staging'))
//.then( _ => driver.switchTo().alert().accept() ) 
.then( _ => z.assertExistsById('name_stg'), 'the staging tab opened')
.catch( z.failedScenario )

//Selecting a certain value from the Log level drop-down menu

.then( _ => z.scenario('It is possible to select a certain value from the Log level drop-down menu ') )
.then( _ => z.openPage('https://dashboard-beta.conversation.one/editor'))
.then( _ => z.maximizeWindow() )
.then( _ => z.clickById('btnMyApps', 'configuration button')  )
.then( _ => z.waitFor(2))
.then( _ => z.clickByLinkText('Staging'))
.then( _ => z. clickById('s2id_log_level_stg'))
.then( _ => z. clickByCss('.select2-result:first-child'))
.then( _ => z. clickById('btnSave'))
.then( _ => z.waitFor(4))
.then( _ => z. clickByCss('#btnEdit > i'))
.then( _ => z.clickById('btnMyApps', 'configuration button')  )
.then( _ => z.clickByLinkText('Staging'))
.then( () => z.assertContainsValue(By.css('#log_level_stg'), "the expected text in the element", 'fatal') )
.catch(z.failedScenario)


//Feature: Alexa subtab (staging)
//Alexa support and Account linking checkboxes are marked

.then( _ => z.scenario('Alexa support and Account linking checkboxes are marked when we open Alexa tab') )
.then( _ => z.openPage(baseUrl + '/editor'))
.then( _ => z.maximizeWindow() )
.then( _ => z.clickById('btnMyApps', 'configuration button')  )
.then( _ => z.waitFor(2))
.then( _ => z.clickByLinkText('Staging'))
.then( _ => z.clickById('memu_btn_alexa_stg'))
.then( _ => z.assertExistsByCss('#alexa_support_stg:checked'), 'the checkbox is marked')
.then( _ => z.assertExistsByCss('#alexa_account_linking_stg:checked'), 'the checkbox is marked')
.catch(z.failedScenario)


//Clicking the Generate button generates client id and client secret values

.then( _ => z.scenario('Clicking the Generate button generates client id and client secret values') )
.then( _ => z.openPage(baseUrl + '/editor'))
.then( _ => z.maximizeWindow() )
.then( _ => z.clickById('btnMyApps', 'configuration button')  )
.then( _ => z.clickByLinkText('Staging'))
.then( _ => z.clickById('memu_btn_alexa_stg'))
.then( _ => z.inputById('alexa_redirect_urls_stg', 'https://layla.amazon.com/api/skill/link/M1QDRNZCTF1O3Q/nhttps://pitangui.amazon.com/api/skill/link/M1QDRNZCTF1O3Q'))
.then( _ => z.scrollToBottom())
.then( _ => z.clickById('btnGenerateAlexaLinking_stg', 'Generate button')  )
.then( _ => z.waitFor(2))
.then( _ => z.assertContainsValue(By.id('alexa_client_id_stg'), "the expected text in the element", 'alexa_'))
//.then( _ => z.assertContainsValue(By.id('alexa_client_secret_stg'), "the expected text in the element", 'lM01me7zL6'))
.catch(z.failedScenario)


//Feature:Google subtab (staging)
//Google support and Account linking checkboxes are marked

.then( _ => z.scenario('Google support and Account linking checkboxes are not marked') )
.then( _ => z.openPage(baseUrl + '/editor'))
.then( _ => z.maximizeWindow() )
.then( _ => z.clickById('btnMyApps', 'configuration button')  )
.then( _ => z.clickByLinkText('Staging'))
.then( _ => z.clickById('memu_btn_google_stg'))
.then( _ => z.assertExistsByCss('#google_support_stg:checked'), 'the checkbox is marked')
.then( _ => z.assertExistsByCss('#google_account_linking_stg:checked'), 'the checkbox is marked')
.catch(z.failedScenario)


//Feature: Production tab

//Selecting a certain value from the Log level drop-down menu

.then( _ => z.scenario('It is possible to select a certain value from the Log level drop-down menu ') )
.then( _ => z.openPage(baseUrl + '/editor'))
.then( _ => z.clickById('btnMyApps', 'configuration button')  )
.then( _ => z.clickByLinkText('Production'))
.then( _ => z. clickById('s2id_log_level'))
.then( _ => z. clickByCss('.select2-result:first-child'))
.then( _ => z.waitFor(1))
.then( _ => z. clickById('btnSave'))
.then( _ => z.waitFor(1))
.then( _ => z. clickByCss ('#btnEdit > i'))
.then( _ => z.clickById('btnMyApps', 'configuration button')  )
.then( _ => z.clickByLinkText('Production'))
.then( () => z.assertContainsValue(By.css('#log_level'), "the expected text in the element", 'fatal') )
.catch(z.failedScenario)

//Feature: Alexa subtab (Production)
//Alexa support and Account linking checkboxes are marked

.then( _ => z.scenario('Alexa support and Account linking checkboxes are marked when we open Alexa tab') )
.then( _ => z.openPage(baseUrl + '/editor'))
.then( _ => z.maximizeWindow() )
.then( _ => z.clickById('btnMyApps', 'configuration button')  )
.then( _ => z.clickByLinkText('Production'))
.then( _ => z.clickById('menu_btn_alexa'))
.then( _ => z.assertExistsByCss('#alexa_support:checked'), 'the checkbox is marked')
.then( _ => z.assertExistsByCss('#alexa_account_linking:checked'), 'the checkbox is marked')
.catch(z.failedScenario)

//Clicking the Generate button generates client id and client secret values
.then( _ => z.scenario('Clicking the Generate button generates client id and client secret values') )
.then( _ => z.openPage(baseUrl + '/editor'))
.then( _ => z.maximizeWindow() )
.then( _ => z.clickById('btnMyApps', 'configuration button')  )
.then( _ => z.clickByLinkText('Production'))
.then( _ => z.clickById('menu_btn_alexa'))
.then( _ => z.inputById('alexa_redirect_urls', 'https://layla.amazon.com/api/skill/link/M1QDRNZCTF1O3Q/nhttps://pitangui.amazon.com/api/skill/link/M1QDRNZCTF1O3Q'))
.then( _ => z.scrollToBottom())
.then( _ => z.clickById('btnGenerateAlexaLinking', 'Generate button')  )
.then( _ => z.waitFor(3))
.then( _ => z.assertContainsValue(By.id('alexa_client_id'), "the expected text in the element", 'alexa'))
//.then( _ => z.assertContainsValue(By.id('alexa_client_secret'), "the expected text in the element", 'lM01me7zL6'))
.catch(z.failedScenario)


//Feature: Google subtab (staging)
//Google support and Account linking checkboxes are marked

.then( _ => z.scenario('Google support and Account linking checkboxes are not marked') )
.then( _ => z.openPage(baseUrl + '/editor'))
.then( _ => z.clickById('btnMyApps', 'configuration button')  )
.then( _ => z.clickByLinkText('Production'))
.then( _ => z.clickById('menu_btn_google'))
.then( _ => z.assertExistsByCss('#google_support:checked'), 'the checkbox is marked')
.then( _ => z.assertExistsByCss('#google_account_linking:checked'), 'the checkbox is marked')
.catch(z.failedScenario)


//Feature: Delete skill
//Clicking Delete button deletes the app

.then( _ => z.scenario('Clicking Delete button deletes the app') )
.then( _ => z.openPage(baseUrl + '/editor'))
.then( _ => z.maximizeWindow() )
.then( _ => z.clickById('btnMyApps', 'configuration button')  )
.then( _ => z.clickById('btnDelete') )
.then( _ => driver.switchTo().alert().accept() ) 
.then( _ => z.waitFor(5))
//.then( _ => z.assertNoSuchElements(By.css('menu_btn_settings:visible'), 'settings' ) )
.catch(z.failedScenario)

driver
.then( _ => z.endResult() )
