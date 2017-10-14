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
 
scenario('Clicking the Bot icon marks it')
 
.then( _ => z.openPage(baseUrl + '/new'))
 
.then( _ => z.maximizeWindow() ) 
 
.then( _ => z.clickByClassName('btn btn-default dropdown-toggle')) 
 
.then( _ => z.clickByLinkText('Banking'))
 
.then( _ => z.inputById ('org-name', 'My'))
 
.then( _ => z.waitFor(3))
 
.then( _ => z. clickByCss ('#tab1 > div.form-horizontal > div:nth-child(2) > div > ul > li:nth-child(1) > a'))
 
.then( _ => z.clickByClassName ('btn btn-success btn-square next button-next full-width'))
 
.then( _ => z.waitFor(2))
 
.then(_ => z.clickByCss('#tab3 > div.form-horizontal > div > div:nth-child(6) > label.selection-btn-primary > img'))
 
.then( _ => z.assertElementHasClass(By.css('#tab3 > div.form-horizontal > div > div:nth-child(6) > label.selection-btn-primary.check > div > div'), "the checkbox is marked", "checkmark draw"))
 
.then( _ => z. clickById ('btnNext'))
 
.then( _ => z.assertExistsByClassName('fa fa-play-circle fa-6', 'the Play simulator button' ))
 
.catch( z.failedScenario )
 


scenario('Clicking the Customize button opens the Interaction Editor tab')
 
.then( _ => z.clickByXPath ('//*[@id="btnFinish"]/span'))
 
.catch( z.failedScenario )
 

 
//Feature: Chat bot button and screen
 
scenario('The corresponding button opens the chat bot menu')
 
.then( _ => z.clickByCss('#toggle_simulator'))                               

.then( _ => z.switchTab(1, 'popped up conversation window'))  
 
.then( _ => z.locate(By.css('#conv_input > div'), 'chat frame'))
 
.then( _ => z.assertExistsByClassName('submitBtn form-control btn btn-primary', 'the Save button'))

.catch( z.failedScenario ) 

 //Feature: Log In window
 
 .then( _ => z.waitFor(30))
 
 scenario('Asking about balance without connecting account makes bot prompt to connect account and the Log-In link appear')
 
.then( _ => z.userSays('What is my balance', 3))

.then( _ => z.assertBotReply('To continue you must link your account'))

.then( _ => z.assertExistsByLinkText('Open log-in window'))

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

/*
 scenario('A pincode should be entered to give requests')
 
.then( _ => z.inputById ('input', 'What is my balance'))

.then( _ => z.clickByClassName('submitBtn form-control btn btn-primary')) 

.then( _ => z.waitFor(2) )

//.then( () => z.assertContainsText(By.css('#conv-wrap > div:nth-child(10) > span'), "the bot requires pincode", 'To continue, please provide your pincode.') ) 

.catch( z.failedScenario )


 scenario('Entering pincode enables iving the answer to the request')
 
.then( _ => z.inputById ('input', '1234'))

.then( _ => z.clickByClassName('submitBtn form-control btn btn-primary')) 

.then( _ => z.waitFor(1) )

.then( () => z.assertContainsText(By.css('#conv-wrap > div:nth-child(11) > span > p:nth-child(3)'), "the bot approved the pincode", 'Thank you . Your pincode is correct.Auto Loan account balance is.') ) 

.catch( z.failedScenario )
*/  



