const config = require('config')
const baseUrl = config.baseUrl
const creds = config.creds.regularUser

const { By } = require('selenium-webdriver');
const z = require('./common');
const scenario = z.scenario;
const driver = z.getDriver();

//Feature: Creating a new app with a custom industry

scenario('Sign-in successfully leads to the Editor')
.then( _ => z.openPage(baseUrl + '/user/login', 'login page') )
.then( _ => z.maximizeWindow() )
.then( _ => z.inputById('edit-name', creds.user) )
.then( _ => z.inputById('edit-pass', creds.password) )
.then( _ => z.clickById('edit-submit') )
.then( _ => z.waitFor(3) )
.then( _ => z.assertExists(By.css('#s2id_domain_selection > a > span'), "Editor" ) )
.catch( z.failedScenario )

//Successful creation of a default custom app with new intent 
scenario('Clicking the new app button opens the Create new app screen')
.then( _ => z.openPage(baseUrl + '/userpage'))
.then( _ => z.maximizeWindow() )
.then( _ => z.clickById('menu_new'))
.then( _ => z.assertExistsById('org-name', 'company name field') )  
.catch( z.failedScenario )                               

scenario('Clicking the next button should open the Add sample screen')
.then( _ => z.waitFor(3) ) 
.then( _ => z.clickById('closeTopMessageBar'))
.then( _ => z.clickByCss('#s2id_industry_select b'))
.then( _ => z.clickByCss('body > div.select2-drop.select2-drop-active > ul > li:nth-child(6)')) 
.then( _ => z.clickById('btnNext')) 
.then( _ => z.inputById ('org-name', 'school'))
.then( _ => z.clickByClassName('btn  button-next'))
.then( _ => z.waitFor(2))
.then( _ => z.clickByClassName('device device-chatbot'))           
.then( _ => z.clickByClassName('btn  button-next'))
.then( _ => z.assertExistsByClassName('form-control newIntentSample first') )  
.catch( z.failedScenario ) 

scenario('Checking that it is possible to add samples to the app')
.then( _ => z.inputByClassName('form-control newIntentSample first', 'How old are you'))
.then( _ => z.clickByClassName('btn  button-next'))
.then( _ => z.assertExistsByClassName('form-control newTextResponse first'), 'new text response')
.catch( z.failedScenario )

scenario('Checking that it is possible to add text responses to the app')
.then( _ => z.inputByClassName('form-control newTextResponse first', 'I am 20'))
.then( _ => z.clickByClassName('btn  button-next'))
.then( _ => z.waitFor(8))
.then( _ => z.assertExistsByClassName('publish-btn btn editor'), 'the Customize button')
.catch( z.failedScenario )

scenario('It is possible to check the app using the Bot')
.then( _ => driver.switchTo().frame("chatbot-preview"))
.then( _ => z.waitFor(6))
.then( _ => z.inputById('input','How old are you'))
.then( _ => z.waitFor(6))
.then( _ => z.clickByClassName('submitBtn form-control c1Icon c1Icon-paper-plane'))
.then( _ => z.waitFor(4))
.then( () => z.assertContainsText(By.id('conv-wrap'), "the expected text in the element", 'I am 20') ) 
.then( _ => z.waitFor(6))
.catch( z.failedScenario )

scenario('Clicking the Customize button leads to the Editor')
.then( _ => driver.switchTo().defaultContent())
.then( _ => z.clickByClassName('publish-btn btn editor'))
.then( _ => z.assertExistsById('bigNewIntentBtn'), 'new intent button')                                   
.catch( z.failedScenario )


//The next button is unavailable when one of the parameters is missing
scenario('The next button is unavailable when one of the parameters is missing')
.then( _ => z.openPage(baseUrl + '/new'))
.then( _ => z.maximizeWindow() )
.then( _ => z.assertElementHasClass(By.id('btnNext'), "`next` button is disabled", "disabled"))
.catch( z.failedScenario )


//Adding other voice assistants to the app
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
.then( _ => z.clickByClassName('device device-facebook-messenger'))


.then( _ => z.clickByClassName('btn  button-next'))
.then( _ => z.assertExistsByClassName('publish-btn btn publish-google-home'),'google publish button' )
.then( _ => z.assertExistsByClassName('publish-btn btn publish-amazon-alexa'),'alexa publish button' )
.then( _ => z.assertExistsByClassName('publish-btn btn publish-facebook-messenger'),'facebook publish button' )
.catch( z.failedScenario )

//Publishing apps
scenario('Clicking the Publish button opens the wizard')
.then( _ => z.clickByClassName('publish-btn btn publish-google-home'))
.then( _ => z.assertExistsByLinkText('https://console.actions.google.com/'),'google wizard' )
.catch( z.failedScenario )

//Adding predefined intents to the custom app
scenario('Clicking the intent button adds the selected intent to the app')
.then( _ => z.openPage(baseUrl + '/new')) 
.then( _ => z.maximizeWindow() )
.then( _ => z.clickById('menu_new'))
.then( _ => z.assertExistsById('org-name', 'company name field') )
.then( _ => z.waitFor(3))
.then( _ => z.clickByCss('#s2id_industry_select b'))
.then( _ => z.clickByCss('body > div.select2-drop.select2-drop-active > ul > li:nth-child(6)')) 
.then( _ => z.clickById('btnNext')) 
.then( _ => z.inputById('org-name', 'MyTest'))
.then( _ => z.waitFor(4))
.then( _ => z.clickByClassName('btn  button-next'))
.then( _ => z.waitFor(2))
.then( _ => z.clickByClassName('device device-chatbot'))
.then( _ => z.clickByClassName('btn  button-next'))
.then( _ => z.clickByCss('.preintent[name="Chatter"]'))
.then( _ => z.clickByCss('.preintent.grouped[name="AreYouReal"]'))
.then( _ => z.waitFor(12))
.then( _ => driver.switchTo().frame("chatbot-preview"))
.then( _ => z.waitFor(12))
.then( _ => z.inputById('input','Are you real'))
.then( _ => z.waitFor(4))
.then( _ => z.clickByClassName('submitBtn form-control c1Icon c1Icon-paper-plane'))
.then( _ => z.waitFor(4))
.then( () => z.assertContainsText(By.id('conv-wrap'), "the expected text in the element", 'real') )
.catch( z.failedScenario )

//Adding different response types to the custom app
scenario('It is possible to add code response to the app')
.then( _ => driver.switchTo().defaultContent())
.then( _ => z.openPage(baseUrl + '/new')) 
.then( _ => z.maximizeWindow() )
.then( _ => z.clickById('menu_new'))
.then( _ => z.assertExistsById('org-name', 'company name field') )
.then( _ => z.waitFor(3))
.then( _ => z.clickByCss('#s2id_industry_select b'))
.then( _ => z.clickByCss('body > div.select2-drop.select2-drop-active > ul > li:nth-child(5)')) 
.then( _ => z.clickById('btnNext')) 
.then( _ => z.inputById('org-name', 'MyDrink'))
.then( _ => z.waitFor(4))
.then( _ => z.clickByClassName('btn  button-next'))
.then( _ => z.waitFor(2))
.then( _ => z.clickByClassName('device device-chatbot'))
.then( _ => z.clickByClassName('btn  button-next'))
.then( _ => z.inputByClassName('form-control newIntentSample first', 'Where can I buy food'))
.then( _ => z.clickByClassName('btn  button-next'))
.then( _ => z.clickById('preAction_code'))
.then( _ => z.inputByClassName('textRes_textarea form-control', "res.say('In the shop');")) 
.then( _ => z.clickByClassName('btn  button-next'))
.then( _ => z.waitFor(14))
.then( _ => driver.switchTo().frame("chatbot-preview"))
.then( _ => z.waitFor(14))
.then( _ => z.inputById('input','Where can I buy food'))
.then( _ => z.waitFor(4))
.then( _ => z.clickByClassName('submitBtn form-control c1Icon c1Icon-paper-plane'))
.then( _ => z.waitFor(4))
.then( () => z.assertContainsText(By.id('conv-wrap'), "the expected text in the element", 'In the shop') )                  

.catch( z.failedScenario )










