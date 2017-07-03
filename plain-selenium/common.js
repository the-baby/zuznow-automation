const { 
    Builder,
    By,
    until
} = require('selenium-webdriver');
var driver;

var currentScenario = "unnamed scenario";
require('colors');

module.exports = {
    getDriver,
    waitFor,
    
	clearCookies, 
    openPage,
	
    inputById,
    inputByName,
    inputByClassName,
	inputByXPath,
    input,
    
    clickById,
    clickByName,
    clickByClassName,
    clickByCss,
    clickByLinkText,
    clickByPartialLinkText,
    clickByXPath,
    click,
    
    locate, 

    assertElementHasClass,
    assertContainsValue,
    assertExistsById,
    assertExistsByName,
    assertExistsByClassName,
	assertExistsByLinkText,
	assertExistsByXPath,
    assertExistsByCss,
    assertExists,
    
    scenario,
    logStep,
    substep,
    failedScenario,
    endResult
};


function getDriver() {
    driver = new Builder()        
        .forBrowser('chrome')
        .build();

    process.once('beforeExit', endResult );
    console.log("\n\n" + "  Starting Tests  ".greenBG.white.bold )
	
    return driver
}

function clearCookies() {
    logStep("clearing all cookies");
    return driver.manage().deleteAllCookies()
}

function openPage(url, title) {
	logStep("opening page: ", (title || url).magenta);
	return driver.get(url)
}

function scenario(text) {
    const number = ++endResult.scenariosCount;
    currentScenario = "#" + number + " - " + text;
    console.log("\n\n Scenario #%s:\n  %s".bold.yellowBG, number, text)
}

function logStep() {
    const args = [].slice.apply(arguments)
    args.unshift("    %s")
    console.log.apply( console, args ) 
}

function substep() {
    const args = [].slice.apply(arguments)
    args.unshift("        ..%s".gray)
    console.log.apply( console, args ) 
}

function failedScenario(e) {
    endResult.failedScenarios.push(currentScenario);
    logStep("SENARIO FAILED".redBG.black + "\n    " + e.stack.replace(/\n/g, "\n    ").red)
}

endResult.scenariosCount  = 0;
endResult.failedScenarios = [];
function endResult() {
    if (endResult.failedScenarios.length) {
        
		console.log([ "\n\n",
          "  FAILURE  ".redBG.white.bold,
		  ("  " + endResult.scenariosCount + " scenarios ran").bold,
          ("  " + endResult.failedScenarios.length + " scenarios failed:").red,
          "    " + endResult.failedScenarios.join("\n    ")
        ].join("\n"))
		
    } else {
		
        console.log([ "\n\n",
          "  SUCCESS  ".greenBG.white.bold,
		  "  " + endResult.scenariosCount + " scenarios ran".bold,
          "  " + endResult.scenariosCount + " scenarios Passed :)".green.bold,
		].join("\n"))
		
    } 
    
    if (!~process.argv.indexOf('su'))
        return driver.quit().catch(e => {})
}


function waitFor(sec) { 
    var ready = false;
    logStep("waiting " + sec.toString().magenta + " seconds")
    setTimeout( _ => ready = true, sec * 1000 )
    return driver.wait(_ => ready)
}



function inputById(id, text) {
    input(By.id(id), "by id: " + id, text)
}

function inputByName(name, text) {
    return input(By.name(name), "by name: " + name, text)
}

function inputByClassName(className, text) {
    return input(By.className(className), "by className: " + className, text)

}


function inputByXPath(xpath, text) {
    return input(By.xpath(xpath), "by XPath: " + xpath, text)
}
function input(locator, descr, text) {
    logStep("writing text to field   " + descr.magenta + ", text: ", text.magenta);
    return locate(locator)
        .then( e =>  substep("sending input") || e.sendKeys(text) )    
}
            
       
function clickById(id) {
    return click(By.id(id), "by id: " + id);
}

function clickByName(name) {
    return click(By.name(name), "by name: " + name);
}

function clickByClassName(className) {
    return click(By.className(className), "by className: " + className);
}

function clickByCss(selector) {
    return click(By.css(selector), "by css: " + selector);
}

function clickByLinkText(text) {
    return click(By.linkText(text), "by link text: " + text )
}

function clickByPartialLinkText(text) {
    return click(By.partialLinkText(text), "by partial link text: " + text )
}

function clickByXPath(xpath) {
    return click(By.xpath(xpath), "by xpath: " + xpath )
}

function click(locator, descr) {
    logStep("clicking element   ", descr.magenta);
    return locate(locator)
        .then( e => substep("clicking") || e.click() )
}



function assertExistsById(id) {
    return assertExists(By.id(id), "by id: " + id )
}

function assertExistsByClassName(className) {
    return assertExists(By.className(className), "by className: " + className )
}

function assertExistsByLinkText(linkText) {
    return assertExists(By.linkText(linkText), "by link-text: " + linkText )
}	
	
function assertExistsByName(name) {
    return assertExists(By.name(name), "by name: " + name )
}

function assertExistsByXPath(xpath) {
    return assertExists(By.xpath(xpath), "by xpath: " + xpath )
}

function assertExistsByCss(selector) {
    return assertExists(By.css(selector), "by css: " + selector)
}

function assertExists(locator, descr) {
    logStep("assertion:".yellow + " element is found   " , descr.magenta);
    return driver.findElement(locator)
			.then( _ => logStep(" - OK!".green) )
}

function assertElementHasClass(locator, descr, className) {
    logStep("assertion:".yellow + " " + descr , ('should have class `' + className + '`').magenta);
    driver.findElement(locator)
    .getAttribute('class')
    .then( cssclass => {
        if (cssclass.indexOf(className) == -1)
            return Promise.reject(new Error('element does not have class `' + className+ '`'));

        logStep(" - OK!".green)
        return Promise.resolve()
    })
}


function assertContainsValue(locator, descr, text) {
    logStep("assertion:".yellow + " " + descr , ('should contain text `' + text + '`').magenta);
    driver.findElement(locator)
    .getAttribute('value')
    .then( value => {
        if (value.indexOf(text) == -1)
            return Promise.reject(new Error('element does include value`' + text + '`'));

        logStep(" - OK!".green)
        return Promise.resolve()
    })
}




function locate(locator) {
    substep("waiting for element to be found")
    return driver.wait(until.elementLocated(locator)) 
        .then( e => substep("waiting for element to be visibile") 
                 || driver.wait(until.elementIsVisible( e ) ) 
        )
}



