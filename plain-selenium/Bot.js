const config = require('config')
const baseUrl = config.baseUrl
const admin = config.creds.admin

const { By } = require('selenium-webdriver');
const z = require('./common');
require('./bot-utils').extend(z);
const scenario = z.scenario;
const driver = z.getDriver();

scenario('Sign-in successfully leads to homepage')
 
.then( _ => z.openPage(baseUrl + '/user/login', 'login page') )
 
.then( _ => z.maximizeWindow() )
 
.then( _ => z.inputById('edit-name', admin.user) )
 
.then( _ => z.inputById('edit-pass', admin.password) )
 
.then( _ => z.clickById('edit-submit') )
 
.then( _ => z.waitFor(3) )
 
.then( _ => z.assertExistsByClassName('menu-item new-site', 'editor') )
 
.catch( z.failedScenario )
 

 
//Successful creation of a predefined banking app
 
scenario('The bot icon is marked by default')
 
.then( _ => z.openPage(baseUrl + '/new'))
 
.then( _ => z.maximizeWindow() ) 
 
.then( _ => z.clickByClassName('btn btn-default dropdown-toggle')) 
 
.then( _ => z.clickByLinkText('Banking'))
 
.then( _ => z.inputById ('org-name', 'My'))
 
.then( _ => z.waitFor(3))
 
.then( _ => z. clickByCss ('#tab1 > div.form-horizontal > div:nth-child(2) > div > ul > li:nth-child(1) > a'))
 
.then( _ => z.clickByClassName ('btn btn-success btn-square next button-next full-width'))
 
.then( _ => z.waitFor(2))
 
.then( _ => z.assertElementHasClass(By.css('#tab3 > div.form-horizontal > div > div:nth-child(6) > label.selection-btn-primary.check > div > div'), "the checkbox is marked", "checkmark draw"))
 
.then( _ => z. clickById ('btnNext'))
 
.then( _ => z.assertExistsByClassName('fa fa-play-circle fa-6', 'the Play simulator button' ))
 
.catch( z.failedScenario )
 


scenario('Clicking the Customize button opens the Interaction Editor tab')
 
.then( _ => z.clickByXPath ('//*[@id="btnFinish"]/span'))
 
.catch( z.failedScenario )
 

 
//Feature: Chat bot button and screen
 
scenario('The corresponding button opens the chat bot menu')

.then( _ => z.waitFor(2)) 
 
.then( _ => z.clickByCss('#toggle_simulator'))

.then( _ => z.waitFor(2))

.then( _ => z.clickById('chatbot_preview'))

.then( _ => z.waitFor(2))                                          

.then( _ => z.switchTab(1, 'popped up conversation window'))  
 
.then( _ => z.locate(By.css('#conv_input > div'), 'chat frame'))
 
.then( _ => z.assertExistsByClassName('submitBtn form-control btn btn-primary', 'the Save button'))

.catch( z.failedScenario ) 


 //Feature: Log In window
 
 .then( _ => z.waitFor(40))
 
 scenario('Asking about balance without connecting account makes bot prompt to connect account and the Log-In link appear')
 
.then( _ => z.userSays('What is my balance', 3))

.then( _ => z.assertBotReply('To continue you must link your account'))

.then( _ => z.assertExistsByLinkText('Open log-in window'))

 .then( _ => z.waitFor(2))

.catch( z.failedScenario ) 

 
 scenario('The Log in window opens the log in screen')
 
.then( _ => z.clickByLinkText('Open log-in window'))

.then( _ => z.switchTab(2, 'popped up log in window'))

.then( _ => z.assertExistsByClassName('Input__field', 'the input credentials fields'))

.catch( z.failedScenario )
 

scenario('Valid credentials should open a ‘successful account linking’ message')

.then( _ => z.inputById ('bank_fields_101732001', 'demo'))

.then( _ => z.inputById ('bank_fields_101732002', 'go'))

.then( _ => z.inputById ('user_mobile', '0541234456'))                      
                                 
.then( _ => z.inputById ('user_pincode', '1234')) 

.then( _ => z.scrollToBottom())
  
.then( _ => z.clickById('login_button'))

.then( _ => z.waitFor(7) )
  
.then( _ => z.switchTab(1, 'bot screen'))

.then( _ => z.assertBotReply('Thank you for linking your account'))

.catch( z.failedScenario )


 scenario('A pincode should be entered to give requests')
 
.then( _ => z.userSays('What is my balance', 3))
 
.then( _ => z.assertBotReply('To continue, please provide your pincode.'))

.catch( z.failedScenario )

//Feature: Enabled intents
//Balance intent

 scenario('Entering pincode enables giving the answer to the request')
 
 scenario('Asking about balance gives a proper answer')
 
.then( _ => z.userSays('1234', 3))

.then( _ => z.assertBotReply('Thank you . Your pincode is correct.'))

.then( _ => z.assertBotReply('Auto Loan account balance is'))

.then( _ => z.assertBotReply('Would you like to hear more?'))

.catch( z.failedScenario )


scenario('Saying yes gives the continuation of the balance intent info')

.then( _ => z.userSays('yes', 3))

.then( _ => z.assertBotReply('Roth IRA account balance is'))

.then( _ => z.assertBotReply('Would you like to hear more?'))

.catch( z.failedScenario )


scenario('Saying no to the continuation of the balance intent gives a reprompt')

.then( _ => z.userSays('no', 3))

.then( _ => z.assertBotReply('Sure. Is there anything else I can help you with?'))

.catch( z.failedScenario )


scenario('Asking about specific account type gives the info only about this type')

.then( _ => z.userSays('What is my checking account balance', 3))

.then( _ => z.assertBotReply('Checking account available balance is'))

.catch( z.failedScenario )

/*
scenario('Waiting for some time makes discovery suggestion')

.then( _ => z.waitFor(3))
	 
.then( _ => z.assertBotReply('You can ask me anything, for example'))

.catch( z.failedScenario )
*/

scenario('Asking about transactions gives the answer about my latest transactions')

.then( _ => z.userSays('what are my latest transactions', 3))

.then( _ => z.assertBotReply('you have recieved'))

.then( _ => z.assertBotReply('you have spent'))

.then( _ => z.assertBotReply('Would you like to hear more?'))

.catch( z.failedScenario )


scenario('Saying yes gives the continuation of the Transactions intent info')

.then( _ => z.userSays('yes', 3))

.then( _ => z.assertBotReply('you have spent'))

.then( _ => z.assertBotReply('Would you like to hear more?'))

.catch( z.failedScenario )


scenario('Saying no to the continuation of the Transactions intent gives a reprompt')

.then( _ => z.userSays('no', 3))

.then( _ => z.assertBotReply('Sure. Is there anything else I can help you with?'))

.catch( z.failedScenario )


scenario('Asking about Insights gives  a proper answer')

.then( _ => z.userSays('tell me how much I spend', 3))

.then( _ => z.assertBotReply('You have spent total of'))

.then( _ => z.assertBotReply('and received total of'))

.catch( z.failedScenario )


scenario('Asking about the Exchange rate of Euro gives a proper answer and the card is received')

.then( _ => z.userSays('What is the exchange rate of Euro', 3))

.then( _ => z.assertBotReply('1 United States Dollar equals'))

.then( _ => z.assertBotReply('USD/EUR'))

.catch( z.failedScenario )


scenario('Asking about the Exchange rate of Albanian Lek to Armenian Dram gives a proper answer')

.then( _ => z.userSays('What is the exchange rate of Albanian Lek to Armenian Dram', 3))

.then( _ => z.assertBotReply('1 Albanian Lek equals'))

.then( _ => z.assertBotReply('Armenian Dram'))

.catch( z.failedScenario )




