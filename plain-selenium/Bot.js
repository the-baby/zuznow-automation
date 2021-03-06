const config = require('config')
const baseUrl = config.baseUrl
const creds = config.creds.regularUser


const { By } = require('selenium-webdriver');
const z = require('./common');
require('./bot-utils').extend(z);
const scenario = z.scenario;
const driver = z.getDriver();

scenario('Sign-in successfully leads to homepage')
 
.then( _ => z.openPage(baseUrl + '/user/login', 'login page') )
 
.then( _ => z.maximizeWindow() )
 
.then( _ => z.inputById('edit-name', creds.user) )
 
.then( _ => z.inputById('edit-pass', creds.password) )
 
.then( _ => z.clickById('edit-submit') )
 
.then( _ => z.waitFor(5) )
 
.then( _ => z.assertExistsByClassName('menu-item new-site', 'editor') )

.then( _ => z.clickById('closeTopMessageBar') )
 
.catch( z.failedScenario )
 

 
//Successful creation of a predefined banking app
 
driver
.then( _ => z.scenario('Clicking the new app button opens the Create new app screen') )
//.then( _ => z.openPage(baseUrl + '/userpage'))
.then( _ => z.maximizeWindow() )
.then( _ => z.waitFor(5) )
.then( _ => z.clickById('menu_new'))
.then( _ => z.assertExistsById('org-name', 'company name field') ) 
.catch( z.failedScenario )                               

.then( _ => z.maximizeWindow() )
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
.then( _ => z.clickByClassName('btn  button-next'))
.then( _ => z.clickByClassName('publish-btn btn editor'))
.catch( z.failedScenario )  
 

 
//Feature: Chat bot button and screen
 
 
 scenario('The corresponding button opens the chat bot menu')
 
.then( _ => z.waitFor(2))
	
.then( _ => z.clickById('btnMoreOptions'))

.then( _ => z.clickByLinkText('Open Chatbot'))

//.then( _ => z.clickById('chatbot_preview'))
                                     
.then( _ => z.switchTab(1, 'popped up conversation window'))  
 
.then( _ => z.assertExistsByClassName('submitBtn', 'the Save button'))

.catch( z.failedScenario ) 


 //Feature: Log In window
 
 scenario('Asking about balance without connecting account makes bot prompt to connect account and the Log-In link appear')
 
.then( _ => z.waitFor(100))
 
.then( _ => z.userSays('What is my balance', 8))

.then( _ => z.assertBotReply('To continue you must link your account.'))

.then( _ => z.assertExistsByCss('.accountLinking span.bubble-content'))

 .then( _ => z.waitFor(2))

.catch( z.failedScenario ) 

 
 scenario('The Log in window opens the log in screen')
 
.then( _ => z.clickByCss('.accountLinking span.bubble-content'))

.then( _ => z.switchTab(2, 'popped up log in window'))

.then( _ => z.assertExistsByClassName('Input__field', 'the input credentials fields'))

.catch( z.failedScenario )
 

scenario('Valid credentials should open a ‘successful account linking’ message')

.then( _ => z.inputById ('bank_fields_101732001', 'demo'))

.then( _ => z.inputById ('bank_fields_101732002', 'go'))

.then( _ => z.inputById ('user_mobile', '0541234456'))
                               
.then( _ => z.inputById ('user_email', 'larisa@zuznow.com'))                    
                                 
.then( _ => z.inputById ('user_pincode', '1234')) 

.then( _ => z.scrollToBottom())
  
.then( _ => z.clickById('login_button'))

.then( _ => z.waitFor(14) )
  
.then( _ => z.switchTab(1, 'bot screen'))

.then( _ => z.assertBotReply('Thank you for linking your account'))

.then( _ => z.assertBotReply('To continue, please provide your pincode.'))

.catch( z.failedScenario )



//Feature: Enabled intents
//Balance intent

 scenario('Entering pincode enables giving the answer to the request')
 
 scenario('Asking about balance gives a proper answer')
 
 .then( _ => z.waitFor(2) )
 
.then( _ => z.userSays('1234', 3))

.then( _ => z.waitFor(2) )

.then( _ => z.assertBotReply(
  'Your pin code has been verified we can now proceed.',
  'Your pin code is correct we can now proceed.',
  'Thanks, your pin code has been verified.',
  'Great! Your pin code is correct.',
  'your pin code has now been verified.'
))

.then( _ => z.assertBotReply('Auto Loan account balance is'))

.then( _ => z.assertBotReply('Would you like to hear more?'))

.catch( z.failedScenario )


scenario('Saying yes gives the continuation of the balance intent info')

.then( _ => z.userSays('yes', 3))

.then( _ => z.assertBotReply('The statement closing balance is'))

.then( _ => z.assertBotReply('to hear'))

.catch( z.failedScenario )


scenario('Saying no to the continuation of the balance intent gives a reprompt')

.then( _ => z.userSays('no', 3))

.then( _ => z.assertBotReply('anything else'))

.catch( z.failedScenario )


scenario('Asking about specific account type gives the info only about this type')

.then( _ => z.userSays('What is my checking account balance', 3))

.then( _ => z.assertBotReply('Checking account available balance is'))

.catch( z.failedScenario )



//Transactions intent

scenario('Asking about transactions gives the answer about my latest transactions')

.then( _ => z.userSays('what are my latest transactions', 3))

.then( _ => z.assertExistsByClassName('bubble answer intent_Transactions'))

.then( _ => z.assertBotReply('to hear'))

.catch( z.failedScenario )


scenario('Saying yes gives the continuation of the Transactions intent info')

.then( _ => z.userSays('yes', 3))

.then( _ => z.assertExistsByClassName('bubble answer intent_Transactions'))

.then( _ => z.assertBotReply('Do you want hear transactions that go further back?',
'Would you like to hear other transactions?',
'Do you want to go back to previous transactions?',
'Did you want access to prior transactions?',
'Did you want to hear any others?'
))

.catch( z.failedScenario )


scenario('Saying no to the continuation of the Transactions intent gives a reprompt')

.then( _ => z.userSays('no', 3))

.then( _ => z.assertBotReply('Sure. Is there anything else I can help you with?',
'No worries. Anything else we can help you with today?',
'No problem. Did you need anymore assistance?',
'Ok. Is there anything else you needed today?',
'Absolutely. Was there something else we can help you with today?'	
))

.catch( z.failedScenario )


//Insights intent
scenario('Asking about Insights gives  a proper answer')

.then( _ => z.userSays('tell me how much I spend', 3))

.then( _ => z.assertExistsByClassName('bubble answer intent_Insights'))

.catch( z.failedScenario )


//Exchange rate intent
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


//StockQuote intent

scenario('asking about stock quote for Amazon gives a corresponding answer and a card is received')

.then( _ => z.userSays('what is the quote for Amazon.com', 3))

.then( _ => z.assertBotReply('the end-of-day price for Amazon.com Inc was'))

.then( _ => z.assertBotReply('AMZN'))

.catch( z.failedScenario )


scenario('asking about stock quote for Apple gives a corresponding answer')

.then( _ => z.userSays('what is the quote for Apple', 3))

.then( _ => z.assertBotReply(' the end-of-day price for Apple Inc was'))

.catch( z.failedScenario )

//Help intent

scenario('asking help gives the general info about the skill')

.then( _ => z.userSays('Help', 3))

.then( _ => z.assertBotReply('bank account'))

.catch( z.failedScenario )



//ATM intent

scenario('asking What is the closest ATM gives the address of the closest ATM and the card with the pic')

.then( _ => z.userSays('where is the closest A.T.M.', 3))

.then( _ => z.waitFor(3) )

.then( _ => z.assertBotReply('Tel Aviv-Yafo'))

.then( _ => z.assertBotReply('Open now:'))

.catch( z.failedScenario )


scenario('saying yes when the bot asks you if you want to get a message with the location gives an error message as my phone number is not valid')

.then( _ => z.userSays('yes', 3))

.then( _ => z.assertBotReply('is not a valid phone number.'))

.catch( z.failedScenario )


scenario('asking What is the closest ATM to Austin street San Francisco gives the address of the ATM close to this street')

.then( _ => z.userSays('What is the closest ATM to Austin street San Francisco', 3))

.then( _ => z.waitFor(3) )

.then( _ => z.assertBotReply('Automated Financial, LLC1356 Van Ness Avenue, San Francisco.'))

.catch( z.failedScenario )


//Branch intent

scenario('asking What is the closest branch gives the address about the closest My Bank branch and sends a card')

.then( _ => z.userSays('where is the closest branch', 3))

.then( _ => z.waitFor(2) )

.then( _ => z.assertBotReply('my bank branch'))

.then( _ => z.assertBotReply('Open now:'))

.catch( z.failedScenario )


scenario('asking What is the closest branch to Austin street San Francisco gives the address of the branch close to this street')

.then( _ => z.userSays('What is the closest branch to Austin street San Francisco', 3))

.then( _ => z.assertBotReply('my bank branch'))

.catch( z.failedScenario )


/*
//Feature: Intents that were disabled at the beginning
//Statement intent

scenario('clicking the intent opens it')

.then( _ => z.switchTab(0, 'editor window'))

.then( _ => z.clickByCss ('.folder-link[name="Account"]'))

.then( _ => z.clickByCss('.intent-link[name="Statement"]') )

.then( _ => z.waitFor(8) )

.then( _ => z.assertExistsByClassName('endSessionCheckBox'), "end session checkbox"  )

.catch( z.failedScenario )


scenario('clicking the enable button enables the Statement intent')

.then( _ => z.clickByCss('.intent_div[name="Statement"] a.intentDisable') )

.then( _ => z.clickById('btnSave') )

.then( _ => z.waitFor(130) )

.then( _ => z.assertExistsByCss('.intent-link[name="Statement"]:not(.disabled)'), "enabled intent"  )

//.then( _ => z.clickById('btnReset') )

.then( _ => z.waitFor(3) )

.catch( z.failedScenario )
*/


scenario('asking to send the statement makes the question about the statement type appear')

//.then( _ => z.switchTab(1, 'the Bot screen'))

.then( _ => z.userSays('Send me the statement', 25))

.then( _ => z.assertBotReply('What account do you want the statement for?'))

.catch( z.failedScenario )


scenario('when the user gives statement type, the bot is expected to send it ')

.then( _ => z.userSays('checking account', 12))

.then( _ => z.assertBotReply('ok, the statement was sent to your email'))

.catch( z.failedScenario )



scenario('asking about support gives support phone number')

//.then( _ => z.switchTab(1, 'the Bot screen'))

//.then( _ => z.waitFor(30) )

.then( _ => z.userSays('How can I contact support', 3))

.then( _ => z.assertBotReply('at +1800-000-000'))

.then( _ => z.assertBotReply('Would you like to speak with a representative?'))

.catch( z.failedScenario )


scenario('It is possible to transfer the given sum from one account to another one')

.then( _ => z.userSays('transfer 500 dollars from Checking account to Credit card account', 3))

.then( _ => z.assertBotReply('You want to transfer 500 USD from your Checking account to your Credit card account. Is this correct?'))

.then( _ => z.userSays('Yes', 3))

.then( _ => z.assertBotReply('Thank you. I have successfully transfered 500 USD from your Checking account to your Credit card account.'))

.catch( z.failedScenario )


scenario('ASking about the routing number gives the number')

.then( _ => z.userSays('what is the routing number', 3))

.then( _ => z.assertBotReply('The routing number is 123456789'))

.catch( z.failedScenario )


scenario('Asking to cancel the credit card cancels it')

.then( _ => z.userSays('I want to cancel my credit card', 3))

.then( _ => z.assertBotReply('example response for I want to cancel my credit card'))

.catch( z.failedScenario )


driver
.then( _ => z.endResult() )
