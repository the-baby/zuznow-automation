const { By } = require('selenium-webdriver');
const z = require('./common');
const driver = z.getDriver();


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

//Edit sample sentence
driver
.then( _ => z.scenario('Clicking the edit button allows editing a sample sentence') )
.then( _ => z.clickByXPath('//*[@id="editbox_interaction_gui"]/div[3]/div[1]/div[2]/div/div/div/div[1]/table/tbody/tr/td[2]/a[1]/i'))
.then( _ => z.assertExistsByXPath('//*[@id="accordion_interaction"]/div[1]/div[2]/div/div/div/div[1]/table/tbody/tr/td[1]/span[2]/input'), 'the field became editable')
.catch( z.failedScenario )

/*
//Cancel editing of a sample sentence
driver
.then( _ => z.scenario('Clicking cancel editing button cancels editing of a sample sentence') )
.then( _ => z.clickByXPath('//*[@id="editbox_interaction_gui"]/div[3]/div[1]/div[2]/div/div/div/div[1]/table/tbody/tr/td[2]/a[1]/i'))
.then( _ => driver.findElement(By.xpath('//*[@id="accordion_interaction"]/div[1]/div[2]/div/div/div/div[1]/table/tbody/tr/td[1]/span[2]/input')).clear())
.then( _ => z.inputByXPath ('//*[@id="accordion_interaction"]/div[1]/div[2]/div/div/div/div[1]/table/tbody/tr/td[1]/span[2]/input', 'Was the test hard'))
.then( _ => z.clickByXPath('//*[@id="editbox_interaction_gui"]/div[3]/div[1]/div[2]/div/div/div/div[1]/table/tbody/tr/td[1]/span[2]/i[2]'))
.then( _ => z.assertExistsByXPath('//*[@id="editbox_interaction_gui"]/div[3]/div[1]/div[2]/div/div/div/div[1]/table/tbody/tr/td[1]/span'), 'the phrase remained the same')
.catch( z.failedScenario )
//TODO: how to check that the text remained the same

*/

//Delete sample sentence
/*
driver
.then( _ => z.scenario('Clicking delete button deletes a sample sentence') )
.then( _ => z.clickByXPath('//*[@id="accordion_interaction"]/div[1]/div[2]/div/div/div/div[1]/table/tbody/tr/td[2]/a[2]/i'))
.then( _ => z.assertExistsByXPath('//*[@id="accordion_interaction"]/div[1]/div[2]/div/div/div/div[1]/div[1]/input'), 'the intent was deleted')
*/
//TODO:how to check that the intent was deleted

/*
//Adding discovery suggestion
driver
.then( _ => z.scenario('Clicking the Add button adds a new discovery suggestion') )
.then( _ => z.inputByXPath ('//*[@id="accordion_interaction"]/div[1]/div[2]/div/div/div/div[1]/div[2]/input', 'what is my balance'))
.then( _ => z.clickById ('btnSave'))
.then( _ => z.assertExistsByXPath('//*[@id="editbox_interaction_gui"]/div[3]/div[1]/div[2]/div/div/div/div[1]/div[2]/input'), 'new discovery')
.catch( z.failedScenario )
//TODO: how to check that new text was added
*/

//Feature: Adding and deleting entities
driver
.then( _ => z.scenario('Clicking the add entity button allows edding a new entity') )
.then( _ => z.clickByXPath('//*[@id="accordion_interaction"]/div[1]/div[2]/div/div/div/div[2]/div[1]/input', 'class'))
.then( _ => z.clickByXPath('//*[@id="accordion_interaction"]/div[1]/div[2]/div/div/div/div[2]/div[1]/i'))

