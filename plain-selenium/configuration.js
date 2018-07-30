const config = require('config')
const baseUrl = config.baseUrl
const creds = config.creds.regularUser

const { By } = require('selenium-webdriver');
const z = require('./common');
const scenario = z.scenario;
const driver = z.getDriver();

driver
.then( _ => z.scenario('Sign-in successfully leads to Editor') )
.then( _ => z.openPage(baseUrl + '/user/login', 'login page') )
.then( _ => z.maximizeWindow() )
.then( _ => z.inputById('edit-name', creds.user) )
.then( _ => z.inputById('edit-pass', creds.password) )
.then( _ => z.clickById('edit-submit') )
.then( _ => z.waitFor(3))
.then( _ => z.assertExists(By.css('#s2id_domain_selection > a > span'), "Editor" ) )
.catch( z.failedScenario )

driver
scenario('Checking that it is possible to add other assistants to the app')
.then( _ => z.openPage(baseUrl + '/new')) 
.then( _ => z.maximizeWindow() )
.then( _ => z.clickById('menu_new'))
.then( _ => z.assertExistsById('org-name', 'company name field') )
.then( _ => z.waitFor(3))
.then( _ => z.clickByCss('#s2id_industry_select b'))
.then( _ => z.clickByCss('body > div.select2-drop.select2-drop-active > ul > li:nth-child(2)')) 
.then( _ => z.clickById('btnNext')) 
.then( _ => z.inputById('org-name', 'My'))
.then( _ => z.waitFor(4))
.then( _ => z.clickByCss('#organizationTab > div.form-horizontal > div > ul > li:nth-child(1) > a'))                                         
.then( _ => z.clickByClassName('btn  button-next'))
.then( _ => z.waitFor(2))
.then( _ => z.clickByClassName('device device-chatbot'))
.then( _ => z.clickByClassName('device device-amazon-alexa'))
.then( _ => z.clickByClassName('device device-google-home'))
//.then( _ => z.clickByClassName('device device-brain'))
.then( _ => z.scrollToBottom())
.then( _ => z.clickByClassName('btn  button-next'))
.then( _ => z.waitFor(8))
.then( _ => z.clickById('closeTopMessageBar'))
.then( _ =>z.clickByClassName('publish-btn btn editor'), 'the Customize button')
.then( _ => z.assertExists(By.css('#s2id_domain_selection > a > span'), "Editor" ) )
.catch( z.failedScenario )


driver
.then( _ => z.scenario(' Clicking the configuration button opens the Production part of the Configuration tab') )
.then( _ => z.clickById('btnMyApps', 'configuration button')  )
.then( _ => z.waitFor(2))
//.then( _ => driver.switchTo().alert().accept() ) 
.then( _ => z.waitFor(2))
.then( _ => z.assertExistsById('name'), 'the production tab')
.catch( z.failedScenario )

//Feature:Permissions
driver
.then( _ => z.scenario('The user selected from the permissions drop-down menu is saved') )
.then( _ => z.scrollToBottom())
.then( _ => z.clickByCss('.c1Icon.c1Icon-user-plus'))
//.then( _ => z.clickById('s2id_user0'))
.then( _ => z.clickByCss('#s2id_autogen1>a'))
.then( _ => z.clickByCss('body > div.select2-drop.select2-drop-active > ul > li:nth-child(5)'))
.then( _ => z.scrollToTop())
.then( _ => z.clickById('btnSave'))
.then( _ => z.clickById('btnEdit'))
.then( _ => z.waitFor(4))
.then( _ => z.clickById('btnMyApps', 'configuration button')  )
.then( _ => z.scrollToBottom())
.then( _ => z.waitFor(3))
.then( _ => z.assertContainsText(By.css('tr.permission:last-child .user'), "the expected text in the element", 'Martin@zuznow.com') )
.catch( z.failedScenario )

driver
.then( _ => z.scenario('The user selected from the permissions drop-down menu is present after making changes in the configuration') )
.then( _ => z.scrollToTop())
.then( _ => z.clickByCss('#tab-3link>a'))
.then( _ => z. clickById('s2id_log_level_stg'))
.then( _ => z. clickByCss('.select2-result:first-child'))
.then( _ => z. clickById('btnSave'))
.then( _ => z.waitFor(4))
.then( _ => z. clickByCss('#btnEdit > i'))
.then( _ => z.waitFor(4))
.then( _ => z.clickById('btnMyApps', 'configuration button')  )
.then( _ => z.scrollToBottom())
.then( _ => z.waitFor(3))
.then( _ => z.assertContainsText(By.css('#users_permission_table .permission .user label[username="Martin@zuznow.com"]'), "the expected text in the element", 'Martin@zuznow.com') )
.catch( z.failedScenario )


//Feature: Staging tab
//Clicking the Staging button opens the Staging subtab

driver
.then( _ => z.scenario('Clicking the Staging button opens the Staging subtab') )
.then( _ => z.waitFor(2))
.then( _ => z.scrollToTop())
.then( _ => z.clickByCss('#tab-3link>a'))
//.then( _ => driver.switchTo().alert().accept() ) 
.then( _ => z.assertExistsById('name_stg'), 'the staging tab opened')
.catch( z.failedScenario )


//JSON config
.then ( _ => z.scenario('The data added in the JSON configuration field is saved') )
.then( _ => z.inputById('env_config_stg', '{"bar": "foo with plus+is it there"}'))
.then( _ => z. clickById('btnSave'))
.then( _ => z. clickByCss('#btnEdit > i'))
.then( _ => z.waitFor(3))
.then( _ => z.clickById('btnMyApps', 'configuration button')  )
.then( _ => z.waitFor(5))
.then( _ => z.clickByCss('#tab-3link>a'))
.then( _ => z.waitFor(4))
.then( () => z.assertContainsValue(By.id('env_config_stg'), "the expected text in the element", '{"bar": "foo with plus+is it there"}') ) 
.catch( z.failedScenario )

/* new scenario that is not checked yet
.then ( _ => z.scenario('The add intent button adds an intent') )
.then( _ => z.clickById ('bigNewIntentBtn'))
.then( _ => z.waitFor(3))
.then( _ => z.inputByClassName('form-control newIntentSample first', 'TestConfig'))
.then( _ => z.clickById ('btn btn-default nextButton'))
.then( _ => z.clickByCss('.panel[name="Code"] a.action-link.newAction'))
.then( _ => z.inputByCss ('.actionDiv textarea.form-control', 'let envConfig = sdk.getEnvironmentConfiguration(); if(envConfig){ res.say(\'envConfig >>>\' + JSON.stringify(envConfig)); }else { res.say(\'envConfig >>> not found\'); }'))

.then( _ => z.clickById ('updateAction')) 
.then( _ => z.clickById ('btnSave'))
.then( _ => z.waitFor(10))

.then ( _ => z.scenario('The ChatBot gives a corresponding answer to my sample') )
.then( _ => driver.switchTo().frame("chatbot_simulator"))
.then( _ => z.inputById('input','TestConfig'))
.then( _ => z.waitFor(4))
.then( _ => z.clickByClassName('submitBtn form-control c1Icon c1Icon-paper-plane'))
.then( _ => z.waitFor(4))
.then( () => z.assertContainsText(By.id('conv-wrap'), "the expected text in the element", 'envConfig >>>{"bar":"foo with plus + is it there"}') )
.catch( z.failedScenario )
*/
             

//Selecting a certain value from the Log level drop-down menu

.then( _ => z.scenario('It is possible to select a certain value from the Log level drop-down menu ') )
//.then( _ => driver.switchTo().defaultContent())
//.then( _ => z.clickById('btnMyApps', 'configuration button')  )
//.then( _ => z.clickByCss('#tab-3link>a'))
.then( _ => z. clickById('s2id_log_level_stg'))
.then( _ => z. clickByCss('.select2-result:first-child'))
.then( _ => z. clickById('btnSave'))
.then( _ => z.waitFor(4))
.then( _ => z. clickByCss('#btnEdit > i'))
.then( _ => z.clickById('btnMyApps', 'configuration button')  )
.then( _ => z.clickByCss('#tab-3link>a'))
.then( () => z.assertContainsValue(By.css('#log_level_stg'), "the expected text in the element", 'fatal') )
.catch(z.failedScenario)


//Adding a language
.then( _ => z.scenario('It is possible to add languages to the app') )
.then( _ => z.inputByCss('#s2id_languages_stg input.select2-input', 'de'))
.then( _ => z.waitFor(2))
.then( _ => z.clickByCss('.select2-results .select2-match'))
.then( _ => z. clickById('btnSave'))
.then( _ => z.waitFor(3))
.then( _ => z. clickByCss('#btnEdit > i'))
.then( _ => z.waitFor(2))
.then( _ => z.assertExistsByCss('.lang[lang="de"]'), 'German language')

.then( _ => z.scenario('The interaction editor part can be adited in the language that was added') )
.then( _ => z.clickByCss('.lang[lang="de"]'), 'German language')
.then( _ => z.clickByCss ('.folder-link[name="Account"]'))
.then( _ => z.clickByCss ('.intent-link[name="Balance"]'))
.then( _ => z.assertExistsByCss('.intent_div[name="Balance"] a.intentDisable'), 'Disable intent button')
.catch(z.failedScenario)

//Feature: Alexa subtab (staging)
//Alexa support and Account linking checkboxes are marked
.then( _ => z.scenario('Alexa support and Account linking checkboxes are marked by default') )
.then( _ => z.clickById('btnMyApps', 'configuration button')  )
.then( _ => z.clickByCss('#tab-3link>a'))
.then( _ => z.scenario('Alexa support and Account linking checkboxes are marked when we open Alexa tab') )
.then( _ => z.clickById('menu_btn_alexa_stg'))
.then( _ => z.waitFor(2))
.then( _ => z.assertExistsByClassName('toggle alexa_support_stgOn'), 'the checkbox is marked')
.then( _ => z.assertExistsByClassName('toggle alexa_account_linking_stgOn'), 'the checkbox is marked')
.catch(z.failedScenario)


//Clicking the Generate button generates client id and client secret values

.then( _ => z.scenario('Clicking the Generate button generates client id and client secret values') )
.then( _ => z.openPage(baseUrl + '/editor'))
.then( _ => z.maximizeWindow() )
.then( _ => z.clickById('btnMyApps', 'configuration button')  )
.then( _ => z.clickByCss('#tab-3link>a'))
.then( _ => z.clickById('menu_btn_alexa_stg'))
.then( _ => z.inputById('alexa_redirect_urls_stg', 'https://layla.amazon.com/api/skill/link/M1QDRNZCTF1O3Q/nhttps://pitangui.amazon.com/api/skill/link/M1QDRNZCTF1O3Q'))
.then( _ => z.scrollToBottom())
.then( _ => z.clickById('btnGenerateAlexaLinking_stg', 'Generate button')  )
.then( _ => z.waitFor(4))
.then( _ => z.assertContainsValue(By.id('alexa_client_id_stg'), "the expected text in the element", 'alexa_'))
//.then( _ => z.assertContainsValue(By.id('alexa_client_secret_stg'), "the expected text in the element", 'lM01me7zL6'))
.catch(z.failedScenario)


//Feature:Google subtab (staging)
//Google support and Account linking checkboxes are marked

.then( _ => z.scenario('Google support and Account linking checkboxes are marked') )
.then( _ => z.clickById('menu_btn_google_stg'))
.then( _ => z.waitFor(5))
.then( _ => z.assertExistsByClassName('toggle google_support_stgOn'), 'the checkbox is marked')
.then( _ => z.assertExistsByClassName('toggle google_account_linking_stgOn'), 'the checkbox is marked')
.catch(z.failedScenario)


//Feature: Production tab

//Selecting a certain value from the Log level drop-down menu

.then( _ => z.scenario('It is possible to select a certain value from the Log level drop-down menu ') )
.then( _ => z.openPage(baseUrl + '/editor'))
.then( _ => z.clickById('btnMyApps', 'configuration button')  )
.then( _ => z. clickById('menu_btn_settings'))
.then( _ => z. clickById('s2id_log_level'))
.then( _ => z. clickByCss('.select2-result:first-child'))
.then( _ => z.waitFor(1))
.then( _ => z. clickById('btnSave'))
.then( _ => z.waitFor(1))
.then( _ => z. clickByCss ('#btnEdit > i'))
.then( _ => z.clickById('btnMyApps', 'configuration button')  )
.then( () => z.assertContainsValue(By.css('#log_level'), "the expected text in the element", 'fatal') )
.catch(z.failedScenario)


//Feature: Alexa subtab (Production)
//Alexa support and Account linking checkboxes are marked

.then( _ => z.scenario('Alexa support and Account linking checkboxes are marked when we open Alexa tab') )
.then( _ => z.clickById('menu_btn_alexa'))
.then( _ => z.waitFor(3))
.then( _ => z.assertExistsByClassName('alexa_supportOn'), 'the checkbox is marked')
.then( _ => z.assertExistsByClassName('alexa_account_linkingOn'), 'the checkbox is marked')
.catch(z.failedScenario)


//Clicking the Generate button generates client id and client secret values
.then( _ => z.scenario('Clicking the Generate button generates client id and client secret values') )
.then( _ => z.inputById('alexa_redirect_urls', 'https://layla.amazon.com/api/skill/link/M1QDRNZCTF1O3Q/nhttps://pitangui.amazon.com/api/skill/link/M1QDRNZCTF1O3Q'))
.then( _ => z.scrollToBottom())
.then( _ => z.clickById('btnGenerateAlexaLinking', 'Generate button')  )
.then( _ => z.waitFor(4))
.then( _ => z.assertContainsValue(By.id('alexa_client_id'), "the expected text in the element", 'alexa_'))
//.then( _ => z.assertContainsValue(By.id('alexa_client_secret'), "the expected text in the element", 'lM01me7zL6'))
.catch(z.failedScenario)


//Feature: Google subtab (production)
//Google support and Account linking checkboxes are marked

.then( _ => z.scenario('Google support and Account linking checkboxes are marked') )
.then( _ => z.clickById('menu_btn_google'))
.then( _ => z.waitFor(3))
.then( _ => z.assertExistsByClassName('google_supportOn'), 'the checkbox is marked')
.then( _ => z.assertExistsByClassName('google_account_linkingOn'), 'the checkbox is marked')
.catch(z.failedScenario)


//Feature:Brain (production)
.then( _ => z.scenario('Brain checkbox is marked') )
.then( _ => z.openPage(baseUrl + '/editor'))
.then( _ => z.clickById('btnMyApps', 'configuration button')  )
.then( _ => z.waitFor(3))
.then( _ => z.clickById('menu_btn_brain'))
.then( _ => z.assertExistsByClassName('brain_supportOn'), 'the checkbox is marked')
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
	
.then( _ => z.assertExistsByCss('.app_settings[style *= "display: none"]'), 'the app is deleted')
.catch(z.failedScenario)

driver
.then( _ => z.endResult() )

