const config = require('config')
const baseUrl = config.baseUrl
const admin = config.creds.admin

const { By } = require('selenium-webdriver');

const z = require('./common');
const scenario = z.scenario;
const driver = z.getDriver();



//Feature: Creating a new intent and editing its name




scenario('Sign-in successfully leads to Editor')

.then( _ => z.openPage(baseUrl + '/user/login', 'login page') )

.then( _ => z.maximizeWindow() )

.then( _ => z.inputById('edit-name', admin.user) )

.then( _ => z.inputById('edit-pass', admin.password) )

.then( _ => z.clickById('edit-submit') )

.then( _ => z.waitFor(3))

.then( _ => z.assertExistsById('btnSave'), "Editor" ) 

.catch( z.failedScenario )



//Interaction Editor opens after creating a new app

scenario('Clicking the Next button opens the Test your skill screen')

.then( _ => z.openPage(baseUrl + '/new')) 

.then( _ => z.maximizeWindow() )

.then( _ => z.clickByClassName('btn btn-default dropdown-toggle')) 

.then( _ => z.clickByLinkText('Banking'))

.then( _ => z.inputById ('org-name', 'TJX Rewards'))

.then( _ => z.waitFor(2))

.then( _ => z. clickById ('btnNext'))

.then( _ => z.assertExistsByClassName('fa fa-play-circle fa-6'),'the Play simulator button' )

.catch( z.failedScenario )



scenario('Clicking the Customize button opens the Interaction Editor tab')

.then( _ => z. clickById ('btnNext'))

.then( _ => z.clickByXPath ('//*[@id="btnFinish"]/span'))

.then( _ => z.locate(By.id('btnSave')))

.then( _ => z.waitFor(2))

.then( _ => z.assertExistsById('LogButton'), "the Interaction tab is open")

.catch( z.failedScenario )



//Creating a new intent

scenario('Clicking the Add button adds a new intent with a default name')

.then( _ => z.clickByClassName ('new-intent-link'))

.then( _ => z.clickById ('customIntentBtn'))

.then( _ => z.clickById ('btnSave'))

.then( _ => z.waitFor(10))
	
.then( _ => z.clickById ('btnReset'))

.then( _ => z.waitFor(4))

.then( () => z.assertExistsByCss('.intent-link[name="UntitledIntent"]'), 'intent with default name' ) 

.catch( z.failedScenario )


//Editing Intent name


scenario('Clicking the Edit name button allows editing intent name')

.then( _ => z.waitFor(3))

.then( _ => z.clickByCss('.intent-link[name="UntitledIntent"]'))

.then( _ => z.waitFor(4))

.then( _ => z.changeInputByCss('.panel[name="UntitledIntent"] .intent_name','exam'))

.then( _ => z.waitFor(2))

.then( _ => z.clickById ('btnSave'))

.then( _ => z.waitFor(5))

.then( _ => z.clickById ('btnReset'))

.then( _ => z.waitFor(2))

.then( _ => z.assertExistsByCss('.intent-link[name="exam"]'),'intent name modified' )                        

.catch( z.failedScenario )




//Feature: Disabling and deleting intent

//Disabling intent

scenario('Clicking the Disable button disables intent')

.then( _ => z.clickByCss ('.intent-link[name="Balance"]'))

.then( _ => z.clickByCss('.intent_div[name="Balance"] a.intentDisable') )

.then( _ => z.clickById('btnSave') )

.then( _ => z.waitFor(30) )

.then( _ => z.clickById('btnReset') )

.then( _ => z.waitFor(2) )

.then( _ => z.clickByCss('#intentsMenuDiv >.intent-link[name="Balance"]') )

.then( _ => z.assertExistsByCss('#intentsMenuDiv >.intent-link[name="Balance"].disabled'), "end session checkbox"  )

.then( _ => z.clickById('btnReset') )

.catch( z.failedScenario )




//Deleting intent

scenario('Clicking the Delete button deletes intent')

.then( _ => z.waitFor(2))
	
.then( _ => z.clickByCss ('#intentsMenuDiv >.intent-link[name="Balance"]'))

.then( _ => z.clickByCss('.intent_div[name="Balance"] a.deleteIntentButton'))

.then( _ => z.waitFor(2))

.then( _ => z.clickByClassName( 'btn btn-danger'))

.then( _ => z.waitFor(2))

.then( _ => z.clickById ('btnSave'))

.then( _ => z.waitFor(20))

.then( _ => z.clickByClassName ('fa fa-refresh'))

.then( _ => z.assertNoSuchElements(By.css('.intent-link[name="Balance"]'), 'the deleted intent' ) )

.catch( z.failedScenario )




//Feature: Adding, editing and deleting a sample sentence



//Successful adding of a sample sentence

scenario('Clicking the Add button adds a new sample phrase')

.then( _ => z.openPage(baseUrl + '/editor'))

.then( _ => z.maximizeWindow() )

.then( _ => z.clickByCss ('.intent-link[name="exam"]'))

.then( _ => z.inputByCss ('.intent_div[name="exam"] .samples_div input', 'test sample'))

.then( _ => z.clickByCss ('.intent_div[name="exam"] div.samples_div i[title="Add Sample"]') )

.then( _ => z.waitFor(2))

.then( _ => z.clickById ('btnSave'))

.then( _ => z.waitFor(10))

.then( _ => z.clickByClassName ('fa fa-refresh'))

.then( _ => z.waitFor(3))
	
.then( _ => z.clickByCss ('.intent-link[name="exam"]'))

.then( _ => z.waitFor(3))
	
.then( _ => z.assertContainsText(By.css('.intent_div[name="exam"] div.samples_div .samples_tr:last-child .sample_content span.sampleSpan'), "the expected text in the element", 'test sample') )


//.intent_div[name="StockQuote"] div.samples_div .sample_content span
.catch( z.failedScenario )




//Unsuccessful adding of a sample sentence

scenario('An error message should appear when we use invalid characters in a sample sentence')

.then( _ => z.inputByCss ('.intent_div[name="exam"] .samples_div input', 'test sample?'))

.then( _ => z.clickByCss ('.intent_div[name="exam"] div.samples_div i[title="Add Sample"]') )

.then( _ => z.assertExistsByClassName('jGrowl-notification'), 'error message appeared')

.then( _ => z.clickByClassName ('fa fa-refresh'))

.catch( z.failedScenario )



//Edit sample sentence

scenario('Clicking the edit button allows editing a sample sentence')

.then( _ => z.waitFor(3))

.then( _ => z.clickByClassName ('new-intent-link'))

.then( _ => z.clickById ('customIntentBtn'))

.then( _ => z.clickById ('btnSave'))

.then( _ => z.inputByCss ('.intent_div[name="UntitledIntent"] .samples_div input', 'new sample'))

.then( _ => z.clickByCss ('.intent_div[name="UntitledIntent"] div.samples_div i[title="Add Sample"]'))

.then( _ => z.clickById ('btnSave'))

.then( _ => z.waitFor(15))

.then( _ => z.clickByCss('.intent_div[name="UntitledIntent"] div.samples_div .rename:first-child'))

.then( _ => z.waitFor(2))

.then( _ => z.inputByCss ('.intent_div[name="UntitledIntent"] div.samples_div input.newSample', 'another'))

.then( _ => z.waitFor(2))

.then( _ => z.clickByCss('.intent_div[name="UntitledIntent"] div.samples_div .fa-check'))

.then( _ => z.assertContainsText(By.css('.intent_div[name="UntitledIntent"] div.samples_div .samples_tr:first-child .sample_content span.sampleSpan'), "the expected text in the element", 'anothernew sample') )

.catch( z.failedScenario )




//Delete sample sentence


scenario('Clicking delete button deletes a sample sentence')

.then( _ => z.clickByCss('.intent_div[name="UntitledIntent"] div.samples_div .fa-trash-o'))

.then( _ => z.clickById ('btnSave'))

.then( _ => z.waitFor(12))

.then( _ => z.clickByClassName ('fa fa-refresh'))

 .then( _ => z.waitFor(2))

.then( _ => z.clickByCss('.intent-link[name="UntitledIntent"]'))	 

.then( _ => z.assertNoSuchElements(By.css('.intent_div[name="UntitledIntent"] div.samples_div .samples_tr:first-child .sample_content span.sampleSpan'), 'the deleted sample sentence' ) )           

.catch( z.failedScenario )






//Feature: discovery suggestions

// Adding discovery suggestion

scenario('It is possible to add a discovery suggestion is the corresponding field')

.then( _ => z.waitFor(2))

.then( _ => z.inputByCss('.intent_div[name="UntitledIntent"] div.discoveryDiv .form-control.discoveryInput', 'discovery test message'))

.then( _ => z.waitFor(2))
	
.then( _ => z.clickById ('btnSave'))

.then( _ => z.waitFor(15))
	
.then( _ => z.clickByClassName ('fa fa-refresh'))

.then( _ => z.waitFor(2))
	 
.then( _ => z.clickByCss('.intent-link[name="UntitledIntent"]'))

.then( () => z.assertContainsValue(By.css('.intent_div[name="UntitledIntent"] div.discoveryDiv .form-control.discoveryInput'), "the expected text in the element", 'discovery test message') ) 

.catch( z.failedScenario )




//Feature: Adding and deleting entities

//Successful adding of an entity

scenario('Clicking the add entity button allows adding a new entity')

.then( _ => z.clickByClassName ('fa fa-refresh'))

.then( _ => z.waitFor(3))

.then( _ => z.clickByClassName ('new-intent-link'))

.then( _ => z.clickById ('customIntentBtn'))

.then( _ => z.clickById ('btnSave'))

.then( _ => z.waitFor(3))
	
.then( _ => z.changeInputByCss('.panel[name="UntitledIntentA"] .intent_name','Entity'))

.then( _ => z.waitFor(3))

.then( _ => z.clickByCss ('.intent_div[name="Entity"] .fa-angle-right'))

.then( _ => z.inputByCss('.intent_div[name="Entity"] div.entities_div input.form-control', 'class'))

.then( _ => z.waitFor(3))
	
.then( _ => z.clickByCss('.intent_div[name="Entity"] div.entities_div .fa-plus-square'))

.then( _ => z.clickById ('btnSave'))

.then( _ => z.waitFor(5))

.then( _ => z.clickByClassName ('fa fa-refresh'))

.then( _ => z.waitFor(2))
	
.then( _ => z.clickByCss ('.intent-link[name="Entity"]'))

.then( _ => z.clickByCss ('.intent_div[name="Entity"] .fa-angle-right'))

.then( _ => z.assertExistsByCss('.intent_div[name="Entity"] div.entities_div input.form-control'), 'the new entity was added')

.catch( z.failedScenario )
 
 

//adding of an empty entity

scenario('Creating an empty entity should return an error message')

.then( _ => z.clickByCss('.intent_div[name="Entity"] div.entities_div .fa-plus-square'))

.then( _ => z.assertExistsById('jGrowl'), 'error message appeared')

.catch( z.failedScenario )
 

//Deleting entity

scenario('Clicking delete button deletes an entity')


.then( _ => z.clickByCss ('.intent_div[name="Entity"] .fa-trash-o'))

.then( _ => z.clickById ('btnSave'))

.then( _ => z.waitFor(2))
	
.then( _ => z.clickByClassName ('fa fa-refresh'))

.then( _ => z.waitFor(3))
	
.then( _ => z.clickByCss ('.intent-link[name="Entity"]'))

.then( _ => z.clickByCss ('.intent_div[name="Entity"] .fa-angle-right'))

.then( _ => z.assertNoSuchElements(By.css('.intent_div[name="Entity"] div.entities_div input.entityInput'), 'the deleted entity' ) ) 

 .catch( z.failedScenario )
 
 
 
 
 //Feature: Response
 
 //Code adding
 
 scenario('It is possible to enter and save the code in the corresponding response section')
 
.then( _ => z.openPage(baseUrl + '/editor'))

.then( _ => z.clickByClassName ('new-intent-link'))

.then( _ => z.clickById ('customIntentBtn'))

.then( _ => z.clickById ('btnSave'))

.then( _ => z.waitFor(10))
	
.then( _ => z.changeInputByCss('.panel[name="UntitledIntentA"] .intent_name','Code'))

.then( _ => z.clickById ('btnSave'))

.then( _ => z.waitFor(5))
	
.then( _ => z.clickByCss('.panel[name="Code"] a.action-link.newAction'))

.then( _ => z.clickByCss ('.modal-body div#preAction_code.preaction'))  

.then( _ => z.inputByCss ('.actionDiv textarea.form-control', 'return checkTransactions(context, req, res);'))

.then( _ => z.clickById ('updateAction')) 

.then( _ => z.clickById ('btnSave'))
       
.then( _ => z.waitFor(10))
	
.then( _ => z.clickById ('btnReset'))

.then( _ => z.waitFor(2))
	
.then( _ => z.clickByCss ('.intent-link[name="Code"]'))
	
.then( _ => z.clickByCss ('.intent_div[name="Code"]  .action-link[action-name="code"]'))

.then( () => z.assertContainsValue(By.css('.actionDiv textarea.form-control'), "the expected text in the element", 'return checkTransactions(context, req, res);') )

.catch( z.failedScenario )

 
//Text adding and deleting
scenario('It is possible to enter text response in the corresponding field')

.then( _ => z.openPage(baseUrl + '/editor'))

.then( _ => z.waitFor(3))

.then( _ => z.clickByClassName ('new-intent-link'))

.then( _ => z.clickById ('customIntentBtn'))

.then( _ => z.clickById ('btnSave'))

.then( _ => z.waitFor(10))
	
.then( _ => z.changeInputByCss('.panel[name="UntitledIntentA"] .intent_name','Response'))

.then( _ => z.clickById ('btnSave'))

.then( _ => z.waitFor(5))
	
.then( _ => z.clickByCss('.panel[name="Response"] a.action-link.newAction'))

.then( _ => z.clickByCss ('.modal-body div#preAction_code.preaction'))  

.then( _ => z.inputByCss ('.actionDiv textarea.form-control', 'return checkTransactions(context, req, res);'))

.then( _ => z.clickById ('updateAction')) 

.then( _ => z.clickById ('btnSave'))
       
.then( _ => z.waitFor(10))
	
.then( _ => z.clickByCss ('.panel[name="Response"]  .action-link[action-name="text"]'))

.then( _ => z.inputByCss('.modal-content input.textRes_input.form-control', 'text for test')) 

.then( _ => z.clickByCss('#actionsEditor div.modal-body.actionDiv.form-horizontal  i.fa-plus-square')) 
 
.then( () => z.assertContainsValue(By.css('.modal-content .textRes_tr:not(.template) input.textRes_span'), "the expected text in the element", 'text for test') ) 

.catch( z.failedScenario )


scenario('It is possible to delete the text by clicking the corresponding button')

.then( _ => z.clickByCss ('.modal-content .textRes_tr:not(.template) .fa-trash-o'))

.then( _ => z.waitFor(2))

.then( _ => z.clickById ('customModalButton'))

.then( _ => z.waitFor(2))

.then( _ => z.assertNoSuchElements(By.css('.modal-content .textRes_tr:not(.template) input.textRes_span'), 'deleted text' ) )

.then( _ => z.clickById ('updateAction'))

.catch( z.failedScenario )


//Remove text response completely

scenario('It is possible to remove the text response completely')

.then( _ => z.clickByCss ('.panel[name="Response"]  .action-link[action-name="text"]'))

.then( _ => z.clickByCss('#actionsEditor div.modal-body.actionDiv.form-horizontal  i.fa-plus-square'))

.then( _ => z.clickById ('updateAction'))

.then( _ => z.clickByCss ('.panel[name="Response"]  .action-link[action-name="text"]'))

.then( _ => z.clickByCss ('.modal-content .fa-trash'))

.then( _ => z.clickById ('customModalButton')) 

.then( _ => z.assertNoSuchElements(By.css('.panel[name="Response"]  .action-link[action-name="text"]'), 'no tesxt response' ) )          





//Adding of did you mean sentence
scenario('It is possible to enter a did you mean senetence and save it')

.then( _ => z.waitFor(2))

.then( _ => z.inputByCss('.intent_div[name="Response"] div.suggestDiv .form-control.suggestInput', 'what did you mean'))

.then( _ => z.waitFor(2))
	
.then( _ => z.clickById ('btnSave'))

.then( _ => z.waitFor(15))
	
.then( _ => z.clickByClassName ('fa fa-refresh'))

.then( _ => z.waitFor(2))
	 
.then( _ => z.clickByCss('.intent-link[name="Response"]'))

.then( () => z.assertContainsValue(By.css('.intent_div[name="Response"] div.suggestDiv .form-control.suggestInput'), "the expected text in the element", 'what did you mean') ) 

.catch( z.failedScenario )



//Adding of reprompt message
scenario('It is possible to enter a reprompt senetence and save it')

.then( _ => z.waitFor(2))

.then( _ => z.inputByCss('.intent_div[name="Response"] div.repromtDiv .form-control.repromtInput', 'reprompt test message'))

.then( _ => z.waitFor(2))
	
.then( _ => z.clickById ('btnSave'))

.then( _ => z.waitFor(15))
	
.then( _ => z.clickByClassName ('fa fa-refresh'))

.then( _ => z.waitFor(4))
	 
.then( _ => z.clickByCss('.intent-link[name="Response"]'))

.then( () => z.assertContainsValue(By.css('.intent_div[name="Response"] div.suggestDiv .form-control.repromtInput'), "the expected text in the element", 'reprompt test message') ) 

.catch( z.failedScenario )
 
 
 
 
//End session checkbox
scenario('It is possible to check the corresponding box and the mark is saved')

.then( _ => z.clickByCss('.intent-link[name="Response"]'))

.then( _ => z.clickByCss('.intent_div[name="Response"]  input.endSessionCheckBox') )

.then( _ => saveAndRefresh() )

.then( _ => z.waitFor(4))
	
.then( _ => z.clickByCss('.intent-link[name="Response"]'))

.then( _ => z.assertExistsByCss('.intent_div[name="Response"]  input.endSessionCheckBox:checked'), 'the box is checked')

.catch( z.failedScenario )

 
 
//Feature: Edit entities section

//The section contanins the list of entities

scenario('Clicking “Edit entities” button opens the corresponding section')

.then( _ => z.openPage(baseUrl + '/editor'))

.then( _ => z.maximizeWindow() )

.then( _ => z.clickByCss('div.intent-link.entities-link'))

.then( _ => z.assertExistsByCss('div.entity-link[name="LOAN_TYPES"]'), 'the section contains the necessary parts')

.then( _ => z.assertExistsByCss('div.entity-link[name="LIST_OF_TYPES"]'), 'the section contains the necessary parts')

.catch( z.failedScenario )


//Successful adding of a new entity

scenario('it is possible to add and save a new entity')

.then( _ => z.clickByCss('div.entity-link.new-entity-link'))                            

.then( _ => saveAndRefresh() )

.then( _ => z.clickByCss('div.intent-link.entities-link'))

.then( _ => z.clickByCss('div.entity-link[name="UntitledEntity"]'))

.then( _ => z.assertExistsByCss('div.entity-link[name="UntitledEntity"]'), 'the new entity is added')

.catch( z.failedScenario )



//Adding of entity values

scenario('Entity value can be added and saved')

.then( _ => z.waitFor(4))
	
.then( _ => z.inputByCss ('.entity_div[name="UntitledEntity"] textarea.entitiesTextarea', 'test value'))

.then( _ => saveAndRefresh() )

.then( _ => z.clickByCss('div.intent-link.entities-link'))

.then( _ => z.clickByCss('div.entity-link[name="UntitledEntity"]'))

.then( _ => z.assertExistsByCss('.entity_div[name="UntitledEntity"] textarea.entitiesTextarea'), 'test value')

.catch( z.failedScenario )
 
 //Deleting entity
 
 scenario('Clicking delete button deletes an entity')
 
.then( _ => z.clickByCss('div.panel.entity_div[name="UntitledEntity"] div.panel-heading .fa-trash'))

.then( _ => saveAndRefresh() )

.then( _ => z.clickByCss('div.intent-link.entities-link'))

.then( _ => z.assertNoSuchElements(By.css('div.panel.entity_div[name="UntitledEntity"]'), 'the deleted entity' ) ) 

.catch( z.failedScenario )
 
 
 driver
.then( _ => z.endResult() )

//TODO: Find out how to delete entity


function saveAndRefresh() {
    return driver
        .then( _ => z.scrollToTop())
        .then( _ => z.clickById ('btnSave'))
        .then( _ => z.waitFor(2))
        .then( _ => z.clickByClassName ('fa fa-refresh'))
        .then( _ => z.waitFor(2))
}

driver
.then( _ => z.endResult() )