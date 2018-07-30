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
.then( _ => z.inputById('edit-name', creds.user) )
.then( _ => z.inputById('edit-pass', creds.password) )
.then( _ => z.clickById('edit-submit') )
.then( _ => z.waitFor(3) )
.then( _ => z.assertExists(By.css('#s2id_domain_selection > a > span'), "Editor" ) )
.catch( z.failedScenario )

//Adding predefined intents to the custom app
scenario('Clicking the intent button adds the selected intent to the app')
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
.then( _ => z.scrollToBottom())
.then( _ => z.clickByClassName('btn  button-next'))
.then( _ => z.clickByCss('.preintent[name="Contact"]'))
.then( _ => z.waitFor(50))
.then( _ => driver.switchTo().frame("chatbot-preview"))
.then( _ => z.inputById('input','how can I call you?'))
.then( _ => z.waitFor(20))
.then( _ => z.clickByClassName('submitBtn form-control c1Icon c1Icon-paper-plane'))
.then( _ => z.waitFor(6))
.then( () => z.assertContainsText(By.id('conv-wrap'), "the expected text in the element", 'You can call us at (000) 000-0000') )
.catch( z.failedScenario )

scenario('Clicking the Customize button leads to the Editor')
.then( _ => driver.switchTo().defaultContent())
.then( _ => z.waitFor(6))
.then( _ => z.scrollToBottom())
.then( _ => z.clickByClassName('publish-btn btn editor'))
.then( _ => z.assertExistsById('bigNewIntentBtn'), 'new intent button')                                   
.catch( z.failedScenario )

//OpeningHours intent
scenario('The Opening hours intent is added')
.then( _ => driver.switchTo().defaultContent())

.then( _ => z.clickById ('bigNewIntentBtn'))
.then( _ => z.clickByCss ('.preintent[name="OpeningHours"]'))
.then( _ => z.waitFor(3))
.then( () => z.assertExistsByCss(('.intent_div[name="OpeningHours"] div.samples_div .samples_tr:first-child .sample_content span.sampleSpan'), "the expected text in the element", 'What are your opening hours') )
.then( _ => z.clickById ('btnSave'))
.then( _ => z.waitFor(30))
.catch( z.failedScenario )

scenario('The new sample is added to the OpeningHours intent')
.then( _ => driver.switchTo().defaultContent())
.then( _ => z.inputByCss ('.intent_div[name="OpeningHours"] .samples_div input', 'I need coffee'))
.then( _ => z.clickByCss ('.intent_div[name="OpeningHours"] div.samples_div i[title="Add Sample"]') )
.then( _ => z.waitFor(2))
.then( _ => z.clickById ('btnSave'))
.then( _ => z.waitFor(25))
.then( _ => z.clickById ('btnReset'))
.then( _ => z.waitFor(8))
.then( _ => z.assertContainsText(By.css('.intent_div[name="OpeningHours"] div.samples_div .samples_tr:last-child .sample_content span.sampleSpan'), "the expected text in the element", 'I need coffee') )
.catch( z.failedScenario )

scenario('Clicking the Publish button publishes the app')
.then( _ => z.clickById ('ToProductionButtonNarrowView'))
.then( _ => z.clickById ('btnSaveComments'))
.then( _ => z.waitFor(15))

scenario('Clicking the Delete sample button deletes a sample')
.then( _ => z.clickByCss('.intent_div[name="OpeningHours"] div.samples_div tr.samples_tr:last-child .delete'))
.then( _ => z.clickById ('btnSave'))
.then( _ => z.waitFor(30))
.then( _ => z.clickById ('btnReset'))
.then( _ => z.waitFor(4))
.then( _ => z.assertNoSuchElements(By.css('.intent_div[name="OpeningHours"] div.samples_div .samples_tr:nth-child(12) .sample_content span.sampleSpan'), 'the deleted sample sentence' ) )           
.catch( z.failedScenario )

scenario('The new sample is added to the Contact intent')
.then( _ => z.clickByCss('div[name="OpeningHours"] .fa.fa-angle-double-left'))
.then( _ => z.clickByCss ('.intent-link[name="Contact"]'))
.then( _ => z.inputByCss ('.intent_div[name="Contact"] .samples_div input', 'I need coffee'))
.then( _ => z.clickByCss ('.intent_div[name="Contact"] div.samples_div i[title="Add Sample"]') )
.then( _ => z.waitFor(2))
.then( _ => z.clickById ('btnSave'))
.then( _ => z.waitFor(30))
.then( _ => z.clickById ('btnReset'))
.then( _ => z.waitFor(15))
.then( _ => z.assertContainsText(By.css('.intent_div[name="Contact"] div.samples_div .samples_tr:last-child .sample_content span.sampleSpan'), "the expected text in the element", 'I need coffee') )
.catch( z.failedScenario )

//Regression tool
scenario('Clicking the Test tool button opens the corresponding screen')
.then( _ => z.clickById ('menu_test_tools'))
.then( _ => z.assertExistsById('btnRun'), 'the Run test button')
.catch( z.failedScenario )

scenario('Clicking the Run button starts the test')
.then( _ => z.clickById ('btnRun'))
.then( _ => z.waitFor(60))
.then( () => z.assertContainsText(By.css('#DataTables_Table_0 > tbody > tr > td:nth-child(1)'), "the expected text in the element", 'I need coffee') )
.then( () => z.assertContainsText(By.css('#DataTables_Table_0 > tbody > tr > td:nth-child(2)'), "the expected text in the element", 'OpeningHours') )
.then( () => z.assertContainsText(By.css('#DataTables_Table_0 > tbody > tr > td:nth-child(3)'), "the expected text in the element", 'Contact') )
.catch( z.failedScenario )