const { By } = require('selenium-webdriver');

const z = require('./common');
const scenario = z.scenario;
const driver = z.getDriver();



//Feature: Creating a new intent and editing its name




scenario('Sign-in successfully leads to homepage')

.then( _ => z.openPage('https://dashboard-beta.conversation.one/user/login', 'login page') )

.then( _ => z.inputById('edit-name','admin') )

.then( _ => z.inputById('edit-pass','vs8Sr7aU') )

.then( _ => z.clickById('edit-submit') )

.then( _ => z.waitFor(3))

.then( _ => z.assertExistsByClassName('menu-item new-site'), "home page"  )

.catch( z.failedScenario )



//Interaction Editor opens after creating a new app

scenario('Clicking the Next button opens the Test your skill screen')

.then( _ => z.openPage(' https://dashboard-beta.conversation.one/new')) 

.then( _ => z.clickByClassName('btn btn-default dropdown-toggle')) 

.then( _ => z.clickByLinkText('Banking'))

.then( _ => z.inputById ('org-name', 'TJX Rewards'))

.then( _ => z.clickByClassName ('pager wizard'))

.then( _ => z.waitFor(2))

.then( _ => z. clickById ('btnNext'))

.then( _ => z.assertExistsById('simulator'),'the Play simulator button' )

.catch( z.failedScenario )



scenario('Clicking the Customize button opens the Interaction Editor tab')

.then( _ => z.clickByXPath ('//*[@id="btnFinish"]/span'))

.then( _ => z.locate(By.id('btnSave')))

.then( _ => z.waitFor(2))

.then( _ => z.assertExistsById('accordion_interaction'), "the Interaction tab is open")

.catch( z.failedScenario )







//Creating an empty intent

scenario('Creating an empty intent returns an error message')

.then( _ => z.clickByClassName ('input-group-addon btn'))

.then( _ => z.assertExistsByClassName('jGrowl-notification'), 'error message')

.catch( z.failedScenario )



//Creating a new intent

scenario('Clicking the Add button adds a new intent')

.then( _ => z.inputById ('newIntentInput', 'test'))

.then( _ => z.clickByClassName ('input-group-addon btn'))

.then( _ => z.clickById ('btnSave'))

.then( _ => z.clickByClassName ('fa fa-refresh'))

.then( _ => z.assertExistsByLinkText('test'), 'the new intent')

.catch( z.failedScenario )



//Editing Intent name


scenario('Clicking the Edit name button allows editing intent name')

.then( _ => z.waitFor(3))

.then( _ => z.clickByXPath ('//*[@id="accordion_interaction"]/div[1]/div[1]/i[1]'))

.then( _ => driver.findElement(By.className('newIntentName')).clear())

.then( _ => z.inputByClassName('newIntentName', 'exam'))

.then( _ => z.waitFor(2))

.then( _ => z.clickByClassName ('fa fa-check'))

.then( _ => z.clickById ('btnSave'))

.then( _ => z.clickByClassName ('fa fa-refresh'))

.then( _ => z.assertExistsByLinkText('exam'),'intent name modified' )                        

.catch( z.failedScenario )



//TODO: add this function to common



//Cancelling the Editing of Intent name

scenario('Clicking the Cancel button cancels editing of intent name')

.then( _ => z.openPage('https://dashboard-beta.conversation.one/editor'))
	
.then( _ => z.clickByCss('#accordion_interaction > div:nth-child(1) > div.panel-heading > i.fa.fa-pencil'))

.then( _ => driver.findElement(By.css('#accordion_interaction > div:nth-child(1) > div.panel-heading > input')).clear())

.then( _ => z.inputByClassName('newIntentName', 'flower'))

.then( _ => z.waitFor(3))

.then( _ => z.clickByCss ('#accordion_interaction > div:nth-child(1)  i.fa.fa-times'))

.then( _ => z.waitFor(3))
	
.then( _ => z.assertExistsByLinkText('exam'),'intent name not modified' )                        

.catch( z.failedScenario )



//Feature: Disabling and deleting intent

//Disabling intent

scenario('Clicking the Disable button disables intent')

.then( _ => z.openPage('https://dashboard-beta.conversation.one/editor'))

.then( _ => z.clickByCss ('#accordion_interaction > div:nth-child(1) > div.panel-heading > a.intentDisable.fa.fa-toggle-on.pull-right'))

.then( _ => z.clickById ('btnSave'))

.then( _ => z.clickByClassName ('fa fa-refresh'))

.then( _ => z.waitFor(3) )

.then( _ => z.assertExistsByCss(' #accordion_interaction > div:nth-child(1) > div.panel-heading > span', 'intent name not modified' ))

.catch( z.failedScenario )

//Deleting intent

scenario('Clicking the Delete button deletes intent')

.then( _ => z.assertExistsByCss(' #accordion_interaction > div:nth-child(1) > div.panel-heading > span', 'intent name not modified' ))

.then( _ => z.clickByCss ('#accordion_interaction > div:nth-child(1) > .panel-heading > .deleteIntentButton'))

.then( _ => z.waitFor(2))

.then( _ => z.clickByClassName( 'btn btn-danger'))

.then( _ => z.waitFor(2))

.then( _ => z.clickById ('btnSave'))

.then( _ => z.clickByClassName ('fa fa-refresh'))

.then( _ => z.assertNoSuchElements(By.className('exam'), 'the deleted intent' ) )

.catch( z.failedScenario )


//Feature: Adding, editing and deleting a sample sentence



//Successful adding of a sample sentence

scenario('Clicking the Add button adds a new sample phrase')

.then( _ => z.openPage('https://dashboard-beta.conversation.one/editor'))

.then( _ => z.inputById ('newIntentInput', 'sample'))

.then( _ => z.clickByClassName ('input-group-addon btn'))

.then( _ => z.clickById ('btnSave'))

.then( _ => z.waitFor(3))

.then( _ => z.inputByCss ('#collapsesample > div > div > div > div.col-md-4.samples_div > div.input-icon.right > input', 'new sample sentence'))

.then( _ => z.clickByCss ('#collapsesample > div > div > div > div.col-md-4.samples_div > div.input-icon.right > i'))

.then( _ => z.clickById ('btnSave'))

.then( _ => z.waitFor(3))

.then( _ => z.clickByClassName ('fa fa-refresh'))

.then( _ => z.assertExistsByCss('#collapsesample td.sample_content'), 'the new sample phrase')

.catch( z.failedScenario )




//Unsuccessful adding of a sample sentence

scenario('Clicking the Add button adds a new sample phrase')

.then( _ => z.openPage('https://dashboard-beta.conversation.one/editor'))

.then( _ => z.inputById ('newIntentInput', 'larisa'))

.then( _ => z.clickByClassName ('input-group-addon btn'))

.then( _ => z.clickById ('btnSave'))

.then( _ => z.waitFor(3))

.then( _ => z.scenario('Entering a phrase with invalid characters returns an error message') )

.then( _ => z.inputByCss ('#collapselarisa> div > div > div > div.col-md-4.samples_div > div.input-icon.right > input', 'new sample sentence?'))

.then( _ => z.clickByCss ('#collapselarisa > div > div > div > div.col-md-4.samples_div > div.input-icon.right > i'))

.then( _ => z.assertExistsByClassName('jGrowl-notification'), 'error message appeared')

.then( _ => driver.findElement(By.css('#collapselarisa > div > div > div > div.col-md-4.samples_div > div.input-icon.right > input')).clear())

.catch( z.failedScenario )






//Edit sample sentence

scenario('Clicking the edit button allows editing a sample sentence')

.then( _ => z.inputByCss ('#collapselarisa > div > div > div > div.col-md-4.samples_div > div.input-icon.right > input', 'new sample sentence'))

.then( _ => z.clickByCss ('#collapselarisa > div > div > div > div.col-md-4.samples_div > div.input-icon.right > i'))

.then( _ => z.clickById ('btnSave'))

.then( _ => z.waitFor(3))

.then( _ => z.clickByCss('#collapselarisa > div > div > div > div.col-md-4.samples_div > table > tbody > tr > td:nth-child(2) > a.rename > i'))

.then( _ => z.assertExistsByCss('#collapselarisa > div > div > div > div.col-md-4.samples_div > table > tbody > tr > td.sample_content > span.renameSpan > input'), 'the field became editable')

.catch( z.failedScenario )




//*

//Delete sample sentence


scenario('Clicking delete button deletes a sample sentence')

.then( _ => z.inputById ('newIntentInput', 'delete'))

.then( _ => z.clickByClassName ('input-group-addon btn'))

.then( _ => z.clickById ('btnSave'))

.then( _ => z.waitFor(3))

.then( _ => z.clickByCss('#accordion_interaction > div:nth-child(1) > div.panel-heading > a.deleteIntentButton > i'))

.then( _ => z.assertExistsByCss('#deleteIntentModal > div > div > div.modal-body'), 'the confirmation message appeared')

.then( _ => z.clickByClassName(' btn btn-danger'))             

 .catch( z.failedScenario )

//TODO:how to check that the sample sentence was deleted

// */


// /*
//Feature: discovery suggestions

// Adding discovery suggestion

scenario('It is possible to add a discovery suggestion is the corresponding field')

.then( _ => z.openPage('https://dashboard-beta.conversation.one/editor'))

.then( _ => z.inputById ('newIntentInput', 'discovery'))

.then( _ => z.clickByClassName ('input-group-addon btn'))

.then( _ => z.clickById ('btnSave'))

.then( _ => z.inputByCss('#collapsediscovery > div > div > div > div.col-md-4.samples_div > div.form-group.discoveryDiv > input', 'what is my mark'))

.then( _ => z.clickById ('btnSave'))

.then( () => z.assertContainsValue(By.css('#collapsediscovery > div > div > div > div.col-md-4.samples_div > div.form-group.discoveryDiv > input'), "the expected text in the element", 'what is my mark') ) 

.catch( z.failedScenario )




//Feature: Adding and deleting entities

//Successful adding of an entity

scenario('Clicking the add entity button allows adding a new entity')

.then( _ => z.openPage('https://dashboard-beta.conversation.one/editor'))

.then( _ => z.inputById ('newIntentInput', 'NewEntity'))

.then( _ => z.clickByClassName ('input-group-addon btn'))

.then( _ => z.clickById ('btnSave'))

.then( _ => z.waitFor(3))

.then( _ => z.inputByCss('#collapseNewEntity > div > div > div > div.col-md-4.entities_div.param_div > div.input-icon.right > input', 'class'))

.then( _ => z.clickByCss('#collapseNewEntity > div > div > div > div.col-md-4.entities_div.param_div > div.input-icon.right > i'))

.then( _ => z.waitFor(2))

.then( _ => z.clickById ('btnSave'))

.then( _ => z.clickByClassName ('fa fa-refresh'))

.then( _ => z.assertExistsByCss('#collapseNewEntity > div > div > div > div.col-md-4.entities_div.param_div > table.table.table-striped.table-bordered.table-hover.entities-table > tbody > tr > td.entity_name > input'), 'the new entity was added')

 .catch( z.failedScenario )
 
 

//adding of an empty entity

scenario('Creating an empty entity should return an error message')

.then( _ => z.openPage('https://dashboard-beta.conversation.one/editor'))

.then( _ => z.clickByCss('#collapseNewEntity > div > div > div > div.col-md-4.entities_div.param_div > div.input-icon.right > i'))

.then( _ => z.assertExistsById('jGrowl'), 'error message appeared')

 .catch( z.failedScenario )
 

//Deleting entity

scenario('Clicking delete button deletes an entity')

.then( _ => z.openPage('https://dashboard-beta.conversation.one/editor'))

.then( _ => z.inputByCss('#collapseNewEntity > div > div > div > div.col-md-4.entities_div.param_div > div.input-icon.right > input', 'DeleteEntity'))

.then( _ => z.clickByCss('#collapseNewEntity > div > div > div > div.col-md-4.entities_div.param_div > div.input-icon.right > i'))

.then( _ => z.clickById ('btnSave'))

.then( _ => z.clickByCss('#collapseNewEntity > div > div > div > div.col-md-4.entities_div.param_div > table.table.table-striped.table-bordered.table-hover.entities-table > tbody > tr > td:nth-child(3) > a > i'))

.then( _ => z.assertExistsByCss('#collapseNewEntity > div > div > div > div.col-md-4.entities_div.param_div > table.table.table-striped.table-bordered.table-hover.entities-table'))

 .catch( z.failedScenario )
 
 
 
 
 
 //Feature: Parameters
 
//Adding of a new key
scenario('It is possible to enter a key in the corresponding field')

.then( _ => z.openPage('https://dashboard-beta.conversation.one/editor'))

.then( _ => z.inputById ('newIntentInput', 'osher'))

.then( _ => z.clickByClassName ('input-group-addon btn'))

.then( _ => z.inputByCss('#collapseosher > div > div > div > div.col-md-4.entities_div.param_div > div.form-inline > input', 'house'))

.then( () => z.assertContainsValue(By.css('#collapseosher > div > div > div > div.col-md-4.entities_div.param_div > div.form-inline > input', 'house'), "the expected text in the element", 'house') ) 

.catch( z.failedScenario )

//Successful adding of a new value and saving the parameter

scenario('It is possible to enter a value in the corresponding field')

.then( _ => z.inputByCss('#collapseosher > div > div > div > div.col-md-4.entities_div.param_div > div.form-inline > div > input', 'number'))
 
.then( _ => z.clickByCss('#collapseosher > div > div > div > div.col-md-4.entities_div.param_div > div.form-inline > div > i' ))

.then( _ => z.clickById ('btnSave'))

.then( _ => z.waitFor(2))

.then( _ => z.clickByClassName ('fa fa-refresh'))

.then( _ => z.waitFor(2))
	
.then( _ => z.assertExistsByCss('#collapseosher > div > div > div > div.col-md-4.entities_div.param_div > table.table.table-striped.table-bordered.table-hover.param-table > tbody > tr > td.param_value > span'), 'the key and value fields are present' ) 

.catch( z.failedScenario )


//Adding of invalid key
scenario('Adding invalid key should return an error message')

.then( _ => z.inputByCss('#collapseosher > div > div > div > div.col-md-4.entities_div.param_div > div.form-inline > input', '123'))

.then( _ => z.inputByCss('#collapseosher > div > div > div > div.col-md-4.entities_div.param_div > div.form-inline > div > input', 'tulip'))

.then( _ => z.clickByCss('#collapseosher > div > div > div > div.col-md-4.entities_div.param_div > div.form-inline > div > i' ))

.then (_ => z.assertExistsByClassName ('jGrowl-notification'), 'error message appeared')

.catch( z.failedScenario )


//Adding of an empty parameter
scenario('Trying to enter an empty parameter should return an error message')

.then( _ => driver.findElement(By.css('#collapseosher > div > div > div > div.col-md-4.entities_div.param_div > div.form-inline > input')).clear())

.then( _ => driver.findElement(By.css('#collapseosher > div > div > div > div.col-md-4.entities_div.param_div > div.form-inline > div > input')).clear())

.then( _ => z.inputByCss('#collapseosher > div > div > div > div.col-md-4.entities_div.param_div > div.form-inline > input', ''))

.then( _ => z.inputByCss('#collapseosher > div > div > div > div.col-md-4.entities_div.param_div > div.form-inline > div > input', 'tulip'))

.then( _ => z.clickByCss('#collapseosher > div > div > div > div.col-md-4.entities_div.param_div > div.form-inline > div > i' ))

.then (_ => z.assertExistsByClassName ('jGrowl-notification'), 'error message appeared')

.catch( z.failedScenario )
 
 
 
 //Feature: Response section

//Enter text response message
scenario('It is possible to enter a text response message in the corresponding field')

.then( _ => z.openPage('https://dashboard-beta.conversation.one/editor'))

.then( _ => z.inputById ('newIntentInput', 'Response'))

.then( _ => z.clickByClassName ('input-group-addon btn'))

.then( _ => z.clickById ('btnSave'))

.then( _ => z.waitFor(2))

.then( _ => z.inputByCss('#collapseResponse > div > div > div > div.col-md-4.response_div > div:nth-child(3) > input', 'new message'))

.then( _ => z.waitFor(2))
	
.then( _ => z.clickByCss('#btnSave'))

.then( _ => z.waitFor(2))

.then( _ => z.clickByClassName ('fa fa-refresh'))

.then( _ => z.waitFor(2))
	
.then( () => z.assertContainsValue(By.css('#collapseResponse > div > div > div > div.col-md-4.response_div > div:nth-child(3) > input'), "the expected text in the element", 'new message') ) 

.catch( z.failedScenario )

//TODO: Find out how to scroll the page up


/*
//Enter code response 
scenario('It is possible to enter code response in the corresponding field')

.then( _ => z.clickByCss('#collapseResponse > div > div > div > div.col-md-4.response_div > div:nth-child(2) > div > select'))

.then( _ => z.clickByCss(''))

//TODO: how to select an item from the drop-down list

// */

//*
//End session checkbox
scenario('It is possible to check the corresponding box and the mark is saved')

.then( _ => z.clickByCss('#collapseResponse > div > div > div > div.col-md-4.response_div > div:nth-child(4) > label > input'))

.then( _ => z.clickByCss ('#btnSave'))

.then( _ => z.waitFor(3))
	
.then( _ => z.clickByClassName ('fa fa-refresh'))

.then( _ => z.waitFor(3))
	
.then( _ => z.assertExistsByCss('#accordion_interaction > div:nth-child(1) > div.panel-collapse.collapse.in > div > div > div > div.col-md-4.response_div > div:nth-child(4) > label > input:checked'), 'the box is checked')

.catch( z.failedScenario )

//TODO: Find out how to scroll the page up



//Adding reprompt text
scenario('It is possible to check the corresponding box and the mark is saved')

.then( _ => z.inputByCss ('#collapseResponse > div > div > div > div.col-md-4.response_div > div:nth-child(5) > input', 'How can I help you'))

.then( _ => z.clickByCss ('#btnSave'))

.then( _ => z.waitFor(2))
	
.then( _ => z.clickByClassName ('fa fa-refresh'))

.then( _ => z.waitFor(2))

.then( () => z.assertContainsValue(By.css('#collapseResponse > div > div > div > div.col-md-4.response_div > div:nth-child(5) > input'), "the expected text in the element", 'How can I help you') )

.catch( z.failedScenario )

//TODO: Find out how to scroll the page up
 
//Feature: Manage entities section

//The section contanins the list of entities
scenario('Clicking “Manage entities” button opens the corresponding section')

.then( _ => z.openPage('https://dashboard-beta.conversation.one/editor'))

.then( _ => z.clickByCss('#editbox_interaction_gui > div.panel.panel-grey.manageEntities > div.panel-heading > a > i'))

.then( _ => z.assertExistsByCss('#collapseEntities > div > form > div > div > div.col-md-4.entityTypeDiv > table > tbody > tr:nth-child(2) > td.entityName'), 'the list of entities is present')

.catch( z.failedScenario )


//Successful adding of a new entity
scenario('Clicking Create button creates a new entity')

.then( _ => z.inputByCss('#collapseEntities > div > form > div > div > div.col-md-4.entityTypeDiv > div > input', 'zuznow'))

.then( _ => z.clickByCss('#collapseEntities > div > form > div > div > div.col-md-4.entityTypeDiv > div > i'))

.then( _ => z.assertExistsByCss('#collapseEntities > div > form > div > div > div.col-md-4.entityTypeDiv > table > tbody > tr:nth-child(5) > td.entityName'), 'the new entity is added')

.catch( z.failedScenario )

//TODO: Find out how to scroll the page up


//Adding of an empty entity
scenario('An error message should appear when trying to create an empty entity')

.then( _ => z.openPage('https://dashboard-beta.conversation.one/editor'))

.then( _ => z.clickByCss('#editbox_interaction_gui > div.panel.panel-grey.manageEntities > div.panel-heading > a > i'))

.then( _ => z.clickByCss('#collapseEntities > div > form > div > div > div.col-md-4.entityTypeDiv > div > i'))

.then( _ => z.assertExistsByClassName('jGrowl-notification'), 'error message appeared')

.catch( z.failedScenario )
// */

//TODO: Find out how to delete entity
