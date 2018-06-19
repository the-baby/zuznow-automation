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

scenario('Clicking the FAQ button opens the faq part in the Editor')
.then( _ => z.clickById('btnMoreOptions'))
.then( _ => z.clickByLinkText('FAQ Generator'))
.then( _ => z.assertExistsById('faq_gen_generate'), 'new Generate button')                                   
.catch( z.failedScenario )

scenario('Clicking the Generate button generates the list of questions asked by users')
.then( _ => z.inputById('faq_url', 'https://www.ikea.com/ms/en_US/customer_service/faq/index.html'))
.then( _ => z.inputById('wrap_selector', '.contentModule'))
.then( _ => z.inputById('question_selector', 'h5'))
.then( _ => z.inputById('answer_selector', 'span'))
.then( _ => z.clickById('faq_gen_generate'))
.then( _ => z.waitFor(15))
.then( _ => z.assertExistsByCss('.faqResult:nth-child(2) .question'), 'the questions were added o the list')                                   
.catch( z.failedScenario )

scenario('An error message appears when no intent is selected')
.then( _ => z.clickById('faq_gen_import'))
.then( _ => z.assertExistsByClassName('jGrowl-notification'), 'error message appeared')

scenario('the selected intent is exported to the model')
.then( _ => z.waitFor(10))
.then( _ => z.clickByCss('.faqResult:nth-child(2) .faqChecker input') )
.then( _ => z.waitFor(10))
.then( _ => z.clickById('faq_gen_import'))
.then( _ => z.assertExistsByCss('.faqResult.checked:nth-child(2)'), 'the checkbox is marked')
.then( _ => z.clickById('btnSave'))
.then( _ => z.waitFor(30))
.then( _ => z.clickById('btnMoreOptions'))
.then( _ => z.clickByLinkText('FAQ Generator'))
.then( _ => z.clickById('btnReset'))
.then( _ => z.waitFor(5))
.then( _ => z.assertExistsByName('FAQ'), 'the FAQ folder was added')


scenario('It is possible to use the intent I added')
.then( _ => driver.switchTo().frame("chatbot_simulator"))
.then( _ => z.inputById('input','Do you have a delivery service'))
.then( _ => z.waitFor(3))
.then( _ => z.clickByClassName('submitBtn form-control c1Icon c1Icon-paper-plane'))
.then( _ => z.waitFor(4))
.then( () => z.assertContainsText(By.id('conv-wrap'), "the expected text in the element", 'IKEA offers a flat rate delivery service to your home or business starting at $29.') )
.catch( z.failedScenario )

driver
.then( _ => z.scenario('It is possible to select all intents and import them'))
.then( _ => driver.switchTo().defaultContent())
.then( _ => z.clickById('btnMoreOptions'))
.then( _ => z.clickByLinkText('FAQ Generator'))
.then( _ => z.clickByCss('#faq_gen_header_selectAll>input'))
.then( _ => z.clickById('faq_gen_import'))
.then( _ => z.waitFor(2))
.then( _ => z.assertNoSuchElements(By.css('.faqResult:nth-child(2)'), 'the deleted intent' ) )
.catch( z.failedScenario )

scenario('Clicking Reset button removes all the info')
.then( _ => z.clickById('faq_gen_reset'))
.then( () => z.assertContainsEmptyValue(By.id('faq_url'), "the expected text in the element", '') )
.catch( z.failedScenario )

scenario('Clicking Delete button deletes the app')
.then( _ => z.clickById('btnMyApps', 'configuration button')  )
.then( _ => z.clickById('btnDelete') )
.then( _ => driver.switchTo().alert().accept() ) 
.then( _ => z.waitFor(5))
	
.then( _ => z.assertExistsByCss('.app_settings[style *= "display: none"]'), 'the app is deleted')
.catch(z.failedScenario)



