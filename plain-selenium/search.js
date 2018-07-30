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
.then( _ => z.clickByClassName('device device-google-home'))
.then( _ => z.scrollToBottom())
.then( _ => z.clickByClassName('btn  button-next'))
.then( _ => z.waitFor(8))
.then( _ => z.clickById('closeTopMessageBar'))
.then( _ =>z.clickByClassName('publish-btn btn editor'), 'the Customize button')
.then( _ => z.assertExists(By.css('#s2id_domain_selection > a > span'), "Editor" ) )
.catch( z.failedScenario )

//Feature: Find
driver
scenario('Clicking the Search button opens the search window')
.then( _ => z.clickById('btn_search_text_in_sets'))
.then( _ => z.assertExists(By.id('search_text_in_sets_main_input'), "the text input field" ) )
.catch( z.failedScenario )

driver
scenario('Clicking the Find button finds the text in the current set')
.then( _ => z.inputById('search_text_in_sets_main_input', 'Channel'))
.then( _ => z.clickByCss('.search_box_btn_box input'))
.then( _ => z.waitFor(7))
.then( _ => z.assertContainsText(By.css('#search_text_results tr:first-child>td'), "the expected text in the element", 'Channel') )
.catch( z.failedScenario )

//Feature: Match Case 
driver
scenario('The Match case button works as expected')
.then( _ => z.clickByCss('.search-sets-fill-form div.c1Toggle'))
.then( _ => driver.findElement(By.id('search_text_in_sets_main_input')).clear())
.then( _ => z.inputById('search_text_in_sets_main_input', 'channel'))
.then( _ => z.clickByCss('.search_box_btn_box input'))
.then( _ => z.waitFor(7))
.then( _ => z.assertNoSuchElements(By.css('#search_text_results tr:first-child>td'), 'no instances found' ) )

.catch( z.failedScenario )

//Feature: Replace
driver
scenario('The Replace button opens the Replace window')
.then( _ => z.clickByLinkText('Replace'))
.then( _ => z.assertExists(By.id('replace_text_input'), "Replace input field" ) )
.catch( z.failedScenario )

driver
scenario('Clicking the Replace button replaces selected text in the set')
.then( _ => driver.findElement(By.id('search_text_in_sets_main_input')).clear())
.then( _ => z.inputById('search_text_in_sets_main_input', 'return'))
.then( _ => z.inputById('replace_text_input', 'Flower'))
.then( _ => z.waitFor(4)) 
.then( _ => z.clickByCss('.search_box_btn_box input')) 
.then( _ => z.waitFor(3))
.then( _ => z.clickByCss('#search_text_results tr:first-child>td'))
.then( _ => z.clickByClassName('btn btn-square btn_replace'))
.then( _ => z.waitFor(7))
.then( _ => z.assertContainsText(By.css('#search_text_results tr:first-child>td'), "the expected text in the element", 'Line 73') )
.catch( z.failedScenario )

//Feature: Replace all
scenario('Clicking Replace all button replaces all the instances found')
.then( _ => z.clickByCss('.form-control.search-sets'))
.then( _ => z.clickByCss('.form-control.search-sets option[value="All Sets"]'))
.then( _ => driver.findElement(By.id('search_text_in_sets_main_input')).clear())
.then( _ => z.inputById('search_text_in_sets_main_input', 'details'))
.then( _ => driver.findElement(By.id('replace_text_input')).clear())
.then( _ => z.inputById('replace_text_input', 'table'))
.then( _ => z.clickByCss('.search_box_btn_box input'))
.then( _ => z.clickByClassName('btn btn-square btn_replace_all'))
.then( _ => driver.switchTo().alert().accept() ) 
.then( _ => z.waitFor(7))
.then( _ => z.assertNoSuchElements(By.css('#search_text_results tr:first-child>td'), 'no instances found' ) )
.catch( z.failedScenario )
