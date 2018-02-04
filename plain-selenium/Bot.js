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

.then( _ => z.clickById('closeTopMessageBar') )
 
.catch( z.failedScenario )
 

 
//Successful creation of a predefined banking app
 
driver
.then( _ => z.scenario('Clicking the new app button opens the Create new app screen') )
.then( _ => z.openPage(baseUrl + '/userpage'))
.then( _ => z.maximizeWindow() )
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
	
//.then( _ => z.clickById('btnMoreOptions'))

//.then( _ => z.clickByLinkText('Open Chatbot'))

.then( _ => z.clickById('chatbot_preview'))
                                     
.then( _ => z.switchTab(1, 'popped up conversation window'))  
 
.then( _ => z.assertExistsByClassName('submitBtn', 'the Save button'))

.catch( z.failedScenario ) 


 //Feature: Log In window
 
 scenario('Asking about balance without connecting account makes bot prompt to connect account and the Log-In link appear')
 
.then( _ => z.waitFor(140))
 
.then( _ => z.userSays('What is my balance', 6))

.then( _ => z.assertBotReply('To continue you must link your account.'))

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

.then( _ => z.assertBotReply('Your pincode'))

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

.then( _ => z.assertBotReply('Would you like to hear more?'))

.catch( z.failedScenario )


scenario('Saying yes gives the continuation of the Transactions intent info')

.then( _ => z.userSays('yes', 3))

.then( _ => z.assertExistsByClassName('bubble answer intent_Transactions'))

.then( _ => z.assertBotReply('Do you want hear transactions that go further back?'))

.catch( z.failedScenario )


scenario('Saying no to the continuation of the Transactions intent gives a reprompt')

.then( _ => z.userSays('no', 3))

.then( _ => z.assertBotReply('anything else'))

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

.then( _ => z.assertBotReply('We can provide you information about your bank account, the nearest branch of your bank and ATM.'))

.catch( z.failedScenario )

//ATM intent

scenario('asking What is the closest ATM gives the address about the closest ATM')

.then( _ => z.userSays('where is the closest A.T.M.', 3))

.then( _ => z.waitFor(3) )

.then( _ => z.assertBotReply('Tel Aviv-Yafo'))

//.then( _ => z.assertBotReply('location?'))

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



//Feature: Intents that were disabled at the beginning
//Statement intent

scenario('clicking the intent opens it')

.then( _ => z.switchTab(0, 'editor window'))

.then( _ => z.clickByCss('#intentsMenuDiv > .intent-link[name="Statement"]') )

.then( _ => z.waitFor(2) )

.then( _ => z.assertExistsByClassName('endSessionCheckBox'), "end session checkbox"  )

.catch( z.failedScenario )


scenario('clicking the enable button enables the Statement intent')

.then( _ => z.clickByCss('.intent_div[name="Statement"] a.intentDisable') )

.then( _ => z.clickById('btnSave') )

.then( _ => z.waitFor(100) )

.then( _ => z.assertExistsByCss('#intentsMenuDiv >.intent-link[name="Statement"]:not(.disabled)'), "enabled intent"  )

.then( _ => z.clickById('btnReset') )

.then( _ => z.waitFor(3) )

.catch( z.failedScenario )



scenario('asking to send the statement makes the question about the statement type appear')

.then( _ => z.switchTab(1, 'the Bot screen'))

.then( _ => z.userSays('Send me the statement', 40))

.then( _ => z.assertBotReply('What account do you want the statement for?'))

.catch( z.failedScenario )


scenario('when the user gives statement type, the bot is expected to send it ')

.then( _ => z.userSays('checking account', 12))

.then( _ => z.assertBotReply('ok, the statement was sent to your email'))

.catch( z.failedScenario )


//Support intent

scenario('clicking the intent opens it')

.then( _ => z.switchTab(0, 'popped up log in window'))

.then( _ => z.clickByCss('#intentsMenuDiv > .intent-link[name="CallSupport"]') )

.then( _ => z.waitFor(2) )

.then( _ => z.assertExistsByClassName('endSessionCheckBox'), "end session checkbox"  )

.catch( z.failedScenario )


scenario('clicking the enable button enables the Support intent')

.then( _ => z.clickByCss('.intent_div[name="CallSupport"] a.intentDisable') )

.then( _ => z.clickById('btnSave') )

.then( _ => z.waitFor(40) )

//.then( _ => z.clickByCss('#intentsMenuDiv >.intent-link[name="CallSupport"]') )

.then( _ => z.assertExistsByCss('#intentsMenuDiv >.intent-link[name="CallSupport"]:not(.disabled)'), "enabled intent"  )

.catch( z.failedScenario )


scenario('clicking the Phone button opens it')

.then( _ => z.waitFor(12) )

.then( _ => z.clickByCss('.intent_div[name="CallSupport"] .action-link[action-name="PhoneCall"]') )

.then( _ => z.assertExistsById('updateAction'), "the Update button"  )               

.catch( z.failedScenario )


scenario('It is possible to enter a phone number in the corresponding field')

.then( _ => z.inputByClassName('param_value form-control', '0535301325') )

.then( _ => z.waitFor(2) )

.then( _ => z.clickById('updateAction') )

.then( _ => z.waitFor(2) )

.then( _ => z.clickById('btnSave') )

.then( _ => z.waitFor(5) )

//.then( _ => z.clickByCss('#intentsMenuDiv >.intent-link[name="CallSupport"]') )

.then( _ => z.clickByCss('.action-link[action-name="PhoneCall"]') )

.then( () => z.assertContainsValue(By.className('param_value form-control'), "the expected text in the element", '0535301325') ) 

.catch( z.failedScenario )


scenario('asking about support gives support phone number')

.then( _ => z.switchTab(1, 'the Bot screen'))

.then( _ => z.waitFor(30) )

.then( _ => z.userSays('How can I contact support', 3))

.then( _ => z.assertBotReply('at 0535301325.'))

.then( _ => z.assertBotReply('Would you like to speak with a representative?'))

.catch( z.failedScenario )

driver
.then( _ => z.endResult() )
