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
.then( _ => z.assertExistsByClassName('menu-item new-site', 'home page') )
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
.then( _ => z.waitFor(5))
.catch( z.failedScenario )

//Feature: Chat bot button and screen
scenario('The corresponding button opens the chat bot menu')
.then( _ => z.clickByClassName('btn btn-default dropdown-toggle'))                           
.then( _ => z.clickByCss('#chatbot_preview')) 
.then( _ => driver.switchTo().window(winHandle))  
//.then( _ => z.assertExistsByClassName('fa fa-play-circle fa-6'),'the Play simulator button' )                