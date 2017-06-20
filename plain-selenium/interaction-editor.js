const { By } = require('selenium-webdriver');
const z = require('./common');
const driver = z.getDriver();
process.on('exit', () => z.endResult() )

//Feature: Creating a new intent and editing its name

driver
.then( _ => z.scenario('Sign-in successfully leads to homepage') )
.then( _ => z.openPage('https://dashboard-beta.conversation.one/user/login', 'login page') )
.then( _ => z.inputById('edit-name','admin') )
.then( _ => z.inputById('edit-pass','vs8Sr7aU') )
.then( _ => z.clickById('edit-submit') )
.then( _ => z.waitFor(3))
.then( _ => z.assertExistsByClassName('menu-item new-site'), "home page"  )
.catch( z.failedScenario )

//Interaction Editor opens after creating a new app
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
.then( _ => z.locate(By.id('btnSave')))
.then( _ => z.waitFor(2))
.then( _ => z.assertExistsById('accordion_interaction'), "the Interaction tab is open")
.catch( z.failedScenario )

//Creating an empty intent
driver
.then( _ => z.scenario('Creating an empty intent returns an error message') )
.then( _ => z.clickByClassName ('input-group-addon btn'))
.then( _ => z.assertExistsByClassName('jGrowl-notification'), 'error message')
.catch( z.failedScenario )

//Creating a new intent
driver
.then( _ => z.scenario('Clicking the Add button adds a new intent') )
.then( _ => z.inputById ('newIntentInput', 'test'))
.then( _ => z.clickByClassName ('input-group-addon btn'))
.then( _ => z.assertExistsByLinkText('test'), 'the new intent')
.catch( z.failedScenario )

//Editing Intent name
driver
.then( _ => z.scenario('Clicking the Edit name button allows editing intent name') )
.then( _ => z.waitFor(3))
.then( _ => z.clickByXPath ('//*[@id="accordion_interaction"]/div[1]/div[1]/i[1]'))
.then( _ => driver.findElement(By.className('newIntentName')).clear())
.then( _ => z.inputByClassName('newIntentName', 'exam'))
.then( _ => z.waitFor(2))
.then( _ => z.clickByClassName ('fa fa-check'))
.then( _ => z.assertExistsByLinkText('exam'),'intent name modified' )                        
.catch( z.failedScenario )

//TODO: add this function to common

//Cancelling the Editing of Intent name
driver
.then( _ => z.scenario('Clicking the Cancel button cancels editing of intent name') )
.then( _ => z.waitFor(3))
.then( _ => z.clickByXPath ('//*[@id="accordion_interaction"]/div[1]/div[1]/i[1]'))
.then( _ => driver.findElement(By.className('newIntentName')).clear())
.then( _ => z.inputByClassName('newIntentName', 'flower'))
.then( _ => z.waitFor(3))
.then( _ => z.clickByXPath ('//*[@id="accordion_interaction"]/div[1]/div[1]/i[2]'))
.then( _ => z.assertExistsByLinkText('exam'),'intent name not modified' )                        
.catch( z.failedScenario )

//Feature: Adding, editing and deleting a sample sentence

//Successful adding of a sample sentence
driver
.then( _ => z.scenario('Clicking the Add button adds a new sample phrase') )
.then( _ => z.inputByXPath ('//*[@id="accordion_interaction"]/div[1]/div[2]/div/div/div/div[1]/div[1]/input', 'how was the test'))
.then( _ => z.clickByXPath ('//*[@id="accordion_interaction"]/div[1]/div[2]/div/div/div/div[1]/div[1]/i'))
.then( _ => z.assertExistsByXPath('//*[@id="accordion_interaction"]/div[1]/div[2]/div/div/div/div[1]/div[1]/input'), 'the new sample phrase')
.catch( z.failedScenario )

//Unsuccessful adding of a sample sentence
driver
.then( _ => z.scenario('Entering a phrase with invalid characters returns an error message') )
.then( _ => z.inputByXPath ('//*[@id="accordion_interaction"]/div[1]/div[2]/div/div/div/div[1]/div[1]/input', 'how was the test?'))
.then( _ => z.clickByXPath ('//*[@id="accordion_interaction"]/div[1]/div[2]/div/div/div/div[1]/div[1]/i'))
.then( _ => z.assertExistsByClassName('jGrowl-notification'), 'error message appeared')
.catch( z.failedScenario )