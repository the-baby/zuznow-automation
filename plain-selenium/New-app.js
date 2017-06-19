const { By } = require('selenium-webdriver');
const z = require('./common');
const driver = z.getDriver();
process.on('exit', () => z.endResult() )

//Feature: Creating a new app with a custom industry

driver
.then( _ => z.scenario('Sign-in successfully leads to homepage') )
.then( _ => z.openPage('https://dashboard-beta.conversation.one/user/login', 'login page') )
.then( _ => z.inputById('edit-name','admin') )
.then( _ => z.inputById('edit-pass','vs8Sr7aU') )
.then( _ => z.clickById('edit-submit') )
.then( _ => z.waitFor(3))
.then( _ => z.assertExistsByClassName('menu-item new-site'), "home page"  )
.catch( z.failedScenario )



//Successful creation of a default custom app with demo content
driver
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

driver
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
.then( _ => z.locate(By.id('btnSave')))
.then( _ => z.assertExistsByLinkText('CalcIntent'), 'intent from the demo content')
.catch( z.failedScenario )


//The next button is unavailable when one of the parameters is missing
driver
.then( _ => z.scenario('The next button is unavailable when one of the parameters is missing') )
.then( _ => z.openPage(' https://dashboard-beta.conversation.one/new'))
.then( _ => z.clickByClassName('btn btn-default dropdown-toggle')) 
.then( _ => z.clickByLinkText('Custom'))
.then( _ => z.assertElementHasClass(By.id('btnNext'), "`next` button is disabled", "disabled"))
.catch( z.failedScenario )


//Adding other voice assistants to the app
driver
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
driver
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
.then( _ => z.assertExistsById('editbox_interaction_gui_intent_template'), "the Interaction tab is open")
.catch( z.failedScenario )

//Successful creation of a custom app without demo content 
driver
.then( _ => z.scenario('Clicking the Customize button opens the Editor Interaction tab') )
.then( _ => z.openPage(' https://dashboard-beta.conversation.one/new')) 
.then( _ => z.clickByClassName('btn btn-default dropdown-toggle')) 
.then( _ => z.clickByLinkText('Custom')) 
.then( _ => z.waitFor(3))
.then( _ => z.clickByClassName('glyphicon glyphicon-ok'))
.then( _ => z.inputById ('org-name', 'test'))
.then( _ => z.clickByClassName ('pager wizard'))
.then( _ => z.waitFor(2))
.then( _ => z. clickById ('btnNext'))
.then( _ => z.waitFor(3))
.then( _ => z.clickByXPath ('//*[@id="btnFinish"]/span'))
.then( _ => z.waitFor(3))
.then( _ => z.assertExistsByClassName('endSessionCheckBox'), "the Interaction tab is open")
.catch( z.failedScenario )

//Feature: Creating a new app with a predefined bank industry

//Successful creation of a predefined banking app
driver
.then( _ => z.scenario('Clicking the Next button opens the Test your skill screen') )
.then( _ => z.openPage(' https://dashboard-beta.conversation.one/new')) 
.then( _ => z.clickByClassName('btn btn-default dropdown-toggle')) 
.then( _ => z.clickByLinkText('Banking'))
.then( _ => z.inputById ('org-name', 'TJX Rewards'))
.then( _ => z.clickByClassName ('pager wizard'))
.then( _ => z.waitFor(2))
.then( _ => z. clickById ('btnNext'))
.then( _ => z.assertExistsById('simulator'),'the Play simulator button' )
.catch( z.failedScenario )

.then( _ => z.scenario('Clicking the Customize button opens the Interaction Editor tab') )
.then( _ => z.clickByXPath ('//*[@id="btnFinish"]/span'))
.then( _ => z.waitFor(7))
.then( _ => z.assertExistsById('accordion_interaction'), "the Interaction tab is open")
.catch( z.failedScenario )

//Publishing of a new predefined banking app
driver
.then( _ => z.scenario('Clicking the Publish button opens the Publish Skill Wizard') )
.then( _ => z.openPage(' https://dashboard-beta.conversation.one/new')) 
.then( _ => z.clickByClassName('btn btn-default dropdown-toggle')) 
.then( _ => z.clickByLinkText('Banking'))
.then( _ => z.inputById ('org-name', 'Golden 1 Credit Union'))
.then( _ => z.clickByClassName ('pager wizard'))
.then( _ => z.waitFor(2))
.then( _ => z. clickById ('btnNext'))
.then( _ => z.clickByClassName ('btn btn-success btn-square btn-create finish'))
.then( _ => z.waitFor(8))
.then( _ => z.assertExistsByLinkText('developer.amazon.com'), "the wizard is open")
.catch( z.failedScenario )

