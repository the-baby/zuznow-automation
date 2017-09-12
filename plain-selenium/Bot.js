const config = require('config')
const baseUrl = config.baseUrl
const admin = config.creds.admin

const { By } = require('selenium-webdriver');
const z = require('./common');
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
 
.then( _ => z. clickByCss ('#tab1 > div.form-horizontal > div:nth-child(2) > div.col-md-6 > div > ul > li.active > a'))
 
.then( _ => z.clickByClassName ('pager wizard'))
 
.then( _ => z.waitFor(2))
 
.then(_ => z.clickByCss('#tab3 > div.form-horizontal > div > div:nth-child(6) > label.selection-btn-primary > img'))
 
//.then( _ => z.assertElementHasClass(By.css('#tab3 > div.form-horizontal > div > div:nth-child(6) > label.selection-btn-primary > img'), "the checkbox is marked", "checkmark draw"))
 
.then( _ => z. clickById ('btnNext'))
 
.then( _ => z.assertExistsByClassName('fa fa-play-circle fa-6'),'the Play simulator button' )
 
.catch( z.failedScenario )
 


scenario('Clicking the Customize button opens the Interaction Editor tab')
 
.then( _ => z.clickByXPath ('//*[@id="btnFinish"]/span'))
 
.then( _ => z.waitFor(60))
 
.catch( z.failedScenario )
 

 
//Feature: Chat bot button and screen
 
scenario('The corresponding button opens the chat bot menu')
 
.then( _ => z.clickByCss('#toggle_simulator'))                               

.then( _ => z.switchTab(1, 'popped up conversation window'))  
 
.then( _ => z.locate(By.css('#conv_input > div'), 'chat frame'))
 
.then( _ => z.assertExistsByCss('#conv_input > div > span:nth-child(2) > button', 'the clear history button'))

.catch( z.failedScenario ) 

 //Feature: Log In window
 
 scenario('Asking about balance makes the Log in window link appear')
 
.then( _ => z.inputById ('input', 'What is my balance'))

//.then( _ => 

.then( _ => z.assertExistsByLinkText('Open log-in window'))

.catch( z.failedScenario ) 

 
 scenario('The Log in window opens the log in screen')
 
.then( _ => z.clickByLinkText('Open log-in window'))

.then( _ => z.switchTab(2, 'popped up log in window'))

.then( _ => z.assertExistsByClassName('Input__field'))

.catch( z.failedScenario )
 

scenario('Valid credentials should open a ‘successful account linking’ message')

.then( _ => z.inputById ('bank_fields_101732001', 'demo'))

.then( _ => z.inputById ('bank_fields_101732002', 'go'))

 .then( _ => z.inputByCss ('#pincode_fields > div:nth-child(2) > div > div > div', '0541234456'))                      
                                 
.then( _ => z.inputById ('user_pincode', '1234')) 

 .then( _ => z.clickById('login_button'))
 
 
 
 
 

