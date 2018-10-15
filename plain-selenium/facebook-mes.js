const config = require('config')
const baseUrl = config.baseUrl
const creds = config.creds.regularUser

const { By } = require('selenium-webdriver');
const z = require('./common');
const scenario = z.scenario;
const driver = z.getDriver();

scenario('Sign-in successfully leads to homepage')
 
.then( _ => z.openPage(baseUrl + '/user/login', 'login page') )
 
.then( _ => z.maximizeWindow() )
 
.then( _ => z.inputById('edit-name', creds.user) )
 
.then( _ => z.inputById('edit-pass', creds.password) )
 
.then( _ => z.clickById('edit-submit') )
 
.then( _ => z.waitFor(5) )
 
.then( _ => z.assertExistsByClassName('menu-item new-site', 'editor') )

.then( _ => z.clickById('closeTopMessageBar') )
 
.catch( z.failedScenario )
 

 
//Feature:Successful creation of a predefined banking app
 
driver
.then( _ => z.scenario('Clicking the new app button opens the Create new app screen') )
//.then( _ => z.openPage(baseUrl + '/userpage'))
.then( _ => z.maximizeWindow() )
.then( _ => z.waitFor(5) )
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


//Feature: Making the app ready for testing in Facebook messenger
scenario('Clicking the Upload Facebook button opens the wizard')
.then( _ => z.clickById('btnPublishFacebook'))
.then( _ => z.clickByLinkText('Deploy Staging rules to Facebook'))
.then( _ => z.clickByCss('#rootwizard-publish-google > div.tab-content > ul:nth-child(8) > li:nth-child(4) > div'))
.then( _ => z.assertExistsByCss('a[href*="https://developers.facebook.com/"]', 'Link to Facebook for developers site') )


scenario('Sign-in successfully opens the Facebook for developers site')
 
.then( _ => z.clickByLinkText('Facebook for Developers') )
.then( _ => z.switchTab(1, 'facebook site'))
.then( _ => z.clickByCss('a[href*="https://www.facebook.com/login/"]'))
//.then( _ => z.clickById('email'))
.then( _ => z.inputById('email', 'larisa@zuznow.com'))
//.then( _ => z.clickById('pass'))
.then( _ => z.inputById('pass', 'Apples32'))
.then( _ => z.clickById('loginbutton'))
.then( _ => z.assertExistsByCss('#devsite_header > div > div > div> div> div> div:nth-child(6)', 'My Apps drop-down menu') )
.catch( z.failedScenario ) 

scenario('Clicking the app link opens the app')
.then( _ => z.clickByCss('#devsite_header > div > div > div> div> div> div:nth-child(6)'))
.then( _ => z.clickByCss('a[href*="/apps/1094095397427022/dashboard/"]'))
.then( _ => z.assertExistsByCss('div#developer_app_body > div > div > div > div >  span') )
.catch( z.failedScenario ) 

scenario('Clicking the messenger settings button opens the corresponding page')
.then(_=> z.goToRelativePath('dashboard','messenger/settings'))
.then( _ => z.assertExistsByCss('#page_id a') )
.catch( z.failedScenario ) 

scenario('It is possible to select a page and generate Access token')
.then( _ => z.clickByCss('#page_id a'))
.then( _ => z.clickByCss('ul[role="menu"] li[class$="MenuItem"]:nth-child(2)'))
.then( _ => z.waitFor(3))
.then( () => z.assertContainsText(By.css('#page_token_ui_identifier div'), "the expected text in the element", 'EAAP'))
.catch( z.failedScenario )

scenario('Adding the access token to dashboard wizard and clicking Next')
.then( _ => z.switchTab(0, 'dashboard'))
.then( _ => z.clickByCss('#rootwizard-publish-google > div.tab-content > ul:nth-child(8) > li:nth-child(4) > div'))   
.then( _ => z.inputById('fd_server_access_token', 'EAAD6UWZBzI4oBADpuZAJwRPR4z8kOPB0FY7fZBln2fbN0jPkvgJjQam0L7w1gQAhUiFPDnKIitHEWVybuU64lal0s1y3QEi09BufU05QV6S1sxUbPZAoASD5gNrDLXIEZB44cKE2hr3RiWZAvu1FopO0ZA22UC8tipU4ZCRk6dzTf8c74niVK2D154k4dQmYqFYZD'))
.then( _ => z.clickByCss('#rootwizard-publish-google > div.tab-content > ul:nth-child(8) > li:nth-child(4) > div'))    
.then( _ => z.assertExistsByCss('input#https-endpoint.form-control') )  
.catch( z.failedScenario )  

scenario('The Edit subscription button opens the corresponding page')  
.then( _ => z.switchTab(1, 'facebook for developers'))
.then(_=> z.goToRelativePath('messenger/settings/','webhooks/'))
.then( _ => z.clickByCss('a[ajaxify*="async/realtime/edit/dialog"]'))
.then( _ => z.waitFor(3))
.then( _ => z.assertExistsByCss('input[name="callback_url"]') )  
.catch( z.failedScenario ) 

scenario('It is possible to enter Callback URL and Verify token in the corresponding page') 
.then( _ => z.switchTab(0, 'dashboard'))
.then( _ => z.waitFor(2))
.then( _ => z.clickByCss('span[onclick*="https-endpoint"]'))
.then( _ => z.waitFor(2))
.then( _ => z.switchTab(1, 'facebook'))
.then( _ => z.waitFor(3))
.then(driver.findElement(By.css('input[name="callback_url"]')).clear())
.then( _ => z.waitFor(2))
.then(driver.findElement(By.css('input[name="callback_url"]')).sendKeys('\uE009v'))
.then( _ => z.switchTab(0, 'dashboard'))
.then( _ => z.waitFor(2))
.then( _ => z.clickByCss('span[onclick*="verify-token"]'))
.then( _ => z.switchTab(1, 'facebook'))
.then( _ => z.waitFor(3))
.then(driver.findElement(By.css('input[name="verify_token"]')).sendKeys('\uE009v'))
.then( _ => z.clickByCss('form[action$="async/webhooks/subscription/edit/"] button[type="submit"]'))
.then( _ => z.assertExistsByCss('a[ajaxify*="async/realtime/edit/dialog"]'))
.catch( z.failedScenario )


//Feature: Messenger (intents testing)
 scenario('Asking about balance without connecting account makes bot prompt to connect account and the Log-In link appear')
.then( _ => z.openPage('https://www.messenger.com'))
.then( _ => z.waitFor(2))
.then( _ => z.clickByCss('button[type="submit"]'))
//.then( _ => z.inputById('email', 'larisa@zuznow.com'))
//.then( _ => z.inputById('pass', 'Apples32'))
//.then( _ => z.clickById('loginbutton'))
.then( _ => z.assertExistsByCss('div.notranslate[contenteditable="true"]') )
.catch( z.failedScenario ) 

 scenario('Asking about balance without connecting account makes bot prompt to connect account and the Log-In link appear')
 .then( _ => z.inputByCss('div.notranslate[contenteditable="true"]', 'What is my balance'))
 .then( _ => z.clickByCss('a[data-tooltip-content^="Press Enter to send"]'))
 .then( () => z.assertContainsText(By.css('div[aria-label="Messages"] a[href="#"]'), "the expected text in the element", 'account linking button'))
