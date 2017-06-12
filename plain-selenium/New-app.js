const { By } = require('selenium-webdriver');
const z = require('./common');
const driver = z.getDriver();

//Feature: Creating a new app with a custom industry

driver
.then( _ => z.openPage('https://dashboard-beta.conversation.one/user/login', 'login page') )
.then( _ => z.inputById('edit-name','admin') )
.then( _ => z.inputById('edit-pass','vs8Sr7aU') )
.then( _ => z.clickById('edit-submit') )
.then( _ => z.waitFor(3))
.then( _ => z.assertExistsByClassName('menu-item new-site'), "home page"  )
.catch( z.failedScenario )



//Successful creation of a default custom app with demo content

.then( _ => z.scenario('Clicking the new app button opens the Create new app screen') )
.then( _ => z.openPage('https://dashboard-beta.conversation.one/userpage'))
.then( _ => z.clickByClassName('menu-item new-site'))
.then( _ => z.assertExistsById('org-name', 'company name field') )  
.catch( z.failedScenario )                               

.then( _ => z.scenario('Clicking the next button should open the New app Ready screen') )
.then( _ => z.openPage(' https://dashboard-beta.conversation.one/new'))
.then( _ => z.clickByClassName('btn btn-default dropdown-toggle')) 
.then( _ => z.clickByLinkText('Custom')) 
.then( _ => z.inputById ('org-name', 'test'))
.then( _ => z.clickByClassName ('pager wizard'))
.then( _ => z.waitFor(2))
.then( _ => z. clickById ('btnNext'))
.then( _ => z.waitFor(4))
.then( _ => z.assertExistsById('btnFinish'), "Alexa skill is ready"  )
.catch( z.failedScenario )

.then( _ => z.scenario('Checking that demo content is present in the custom app') )
.then( _ => z.openPage(' https://dashboard-beta.conversation.one/new')) 
.then( _ => z.clickByClassName('btn btn-default dropdown-toggle')) 
.then( _ => z.clickByLinkText('Custom')) 
.then( _ => z.inputById ('org-name', 'test'))
.then( _ => z.clickByClassName ('pager wizard'))
.then( _ => z.waitFor(2))
.then( _ => z. clickById ('btnNext'))
.then( _ => z.waitFor(3))
.then( _ => z.assertExistsById('btnFinish'), "Alexa skill is ready"  )
.then( _ => z.clickByXPath ('//*[@id="btnFinish"]/span'))
//.then( _ => z.assertExistsById('collapseCON1Launch'), 'intent from the demo content')
//TO DO: find a way to locate intent
.catch( z.failedScenario )

//The next button is unavailable when one of the parameters is missing
.then( _ => z.scenario('The user remains on the same screen after clicking the Next button') )
.then( _ => z.openPage(' https://dashboard-beta.conversation.one/new'))
.then( _ => z.clickByClassName('btn btn-default dropdown-toggle')) 
.then( _ => z.clickByLinkText('Custom'))
.then( _ => z.assertExistsById('btnNext'))

//TO DO : find a way to deal with a disabled button

//Adding other voice assistants to the app
.then( _ => z.scenario('Checking that it is possible to add other assistants to the app') )
.then( _ => z.openPage(' https://dashboard-beta.conversation.one/new')) 
.then( _ => z.clickByClassName('btn btn-default dropdown-toggle')) 
.then( _ => z.clickByLinkText('Custom')) 
.then( _ => z.inputById ('org-name', 'test'))
.then( _ => z.clickByClassName ('pager wizard'))
.then( _ => z.waitFor(2))
.then( _ => z.clickByClassName('comingSoon'))
.then( _ => z.assertExistsByClassName('checkmark draw'),'the assistant is selected' )
.catch( z.failedScenario )

//Customization of a new custom app with demo content
.then( _ => z.scenario('Clicking the Customize button opens the Editor Interaction tab') )
.then( _ => z.openPage(' https://dashboard-beta.conversation.one/new')) 
.then( _ => z.clickByClassName('btn btn-default dropdown-toggle')) 
.then( _ => z.clickByLinkText('Custom')) 
.then( _ => z.inputById ('org-name', 'test'))
.then( _ => z.clickByClassName ('pager wizard'))
.then( _ => z.waitFor(2))
.then( _ => z. clickById ('btnNext'))
.then( _ => z.waitFor(3))
.then( _ => z.clickByXPath ('//*[@id="btnFinish"]/span'))
.then( _ => z.waitFor(3))
.then( _ => z.assertExistsById('editbox_interaction_gui_intent_template'))
.catch( z.failedScenario )



 
