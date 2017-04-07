var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();
	
	function waitFor(sec) { 
	var ready = false;
	setTimeout( _ => ready = true, sec * 1000 )
	return driver.wait(_ => ready)
}
//create account link should open create account form
driver
.get('https://dashboard-beta.zuznow.com/new')
.then( _ => waitFor(3) )
.then( _ => driver.findElement(By.id('btn-register')).click() )
.then( _ => waitFor(3) )


//error messages of create account form
driver
.then( _ => driver.findElement(By.id('edit-mail')).sendKeys('Name@LastName') )
.then( _ => driver.findElement(By.id('edit-field-first-name-und-0-value')).sendKeys('Name') )
.then( _ => driver.findElement(By.id('edit-field-last-name-und-0-value')).sendKeys('LastName') )
.then(_ => driver.findElement(By.id('edit-submit')).click() )
.then(_ => driver.findElement(By.name('op')) )
.then(_ => driver.findElement(By.className('form-text required error')) )
.then( _ => waitFor(2) )


//multiple errors of create account form
driver
.get('https://dashboard-beta.zuznow.com/user/register')
.then( _ => waitFor(3) )
.then( _ => driver.findElement(By.id('edit-submit')).click() )
.then(_ => driver.findElement(By.className('messages error'))) 
.then(_ => driver.findElement(By.className(' form-text required error')) )
.then(_ => driver.findElement(By.className(' text-full form-text required error')) )
.then(_ => driver.findElement(By.className(' text-full form-text required error')) )               
.then( _ => waitFor(2) )	
	
	
//I should write what is written in the error message


//submission of a mail in use should offer the recover password message
driver
.get('https://dashboard-beta.zuznow.com/user/register')
.then( _ => waitFor(3) )
.then( _ => driver.findElement(By.id('edit-mail')).sendKeys('larisa@zuznow.com') )
.then( _ => driver.findElement(By.id('edit-field-first-name-und-0-value')).sendKeys('Larisa') )
.then( _ => driver.findElement(By.id('edit-field-last-name-und-0-value')).sendKeys('El-Netanany') )
.then(_ => driver.findElement(By.id('edit-submit')).click() )
.then( _ => waitFor(3) )
.then(_ => driver.findElement(By.linkText('Have you forgotten your password?')).click ()  ) 
.then( _ => waitFor(2) )
         

//I should write what is written in the error message
//And about the red frame

//submission of valid form details should succeed
driver
.get('https://www.mailinator.com')
.then( _ => waitFor(3) )
.then( _ => driver.findElement(By.className('btn btn-dark')).sendKeys('registration-test') )
.then( _ => driver.findElement(By.className('btn btn-dark')).click() )	
.then( _ => waitFor(2) )
	
driver	
.get('https://dashboard-beta.zuznow.com/user/register')
.then( _ => waitFor(3) )
.then( _ => driver.findElement(By.id('edit-mail')).sendKeys('registration-test@mailinator.com') )
.then( _ => driver.findElement(By.id('edit-field-first-name-und-0-value')).sendKeys('registration') )
.then( _ => driver.findElement(By.id('edit-field-last-name-und-0-value')).sendKeys('test') )
.then(_ => driver.findElement(By.id('edit-submit')).click() )
.then(_ => driver.get('https://www.mailinator.com/inbox2.jsp?public_to=registration-test#/#public_maildirdiv') )
.then( _ => waitFor(12) )
.then(_ => driver.findElement(By.className('innermail ng-binding')).click() )
.then( _ => waitFor(3) )
.then( _=>driver.switchTo().frame(driver.findElement(By.id('publicshowmaildivcontent'))))
	
var linkToOpen= driver.findElement(By.xpath('/html/body/a[1]')).getAttribute("href")
driver.get(linkToOpen)
.then( _ => waitFor(3) )
//Focusing on password field should expose instructions box
driver
.then(_ => driver.findElement(By.className('password-field')).click() )
//Filling in password should hide requirements that are met



//Submitting valid password 
.then(_ => driver.findElement(By.className('password-field')).sendKeys('Aabcd5') )
.then(_ => driver.findElement(By.className('password-confirm form-text required')).sendKeys('Aabcd5') )
.then(_ => driver.findElement(By.id('edit-submit')).click() )
	
	


//.then(_ => driver.wait(until.elementLocated(By.id('edit-mail'),)) )
//driver.wait(until.elementLocated(By.id('btn-register')), 5 * 1000).then(function(elm) {
 //   elm.sendKeys(username);
//});
 
 //driver.find_elements_by_xpath('//div[contains(text(), "' + text + '")]')