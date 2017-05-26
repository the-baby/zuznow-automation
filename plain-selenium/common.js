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
    input,
    
    clickById,
    clickByName,
    clickByClassName,
    clickByLinkText,
    clickByXPath,
    click,
    
    locate, 

    assertExistsById,
    assertExistsByName,
    assertExistsByClassName,
    assertExists,
    
    scenario,
    logStep,
    substep,
    failedScenario,
    endResult
};


function getDriver() {
    driver = new Builder()        .forBrowser('chrome')        .build();
    
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
    endResult.scenariosCount++;
    currentScenario = text;
    console.log("\n\n Scenario:\n  %s".bold.yellowBG, text)
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
          "   - " + endResult.failedScenarios.join("   - ")
        ].join("\n"))
		
    } else {
		
        console.log([ "\n\n",
          "  SUCCESS  ".greenBG.white.bold,
		  "  " + endResult.scenariosCount + " scenarios ran".bold,
          "  " + endResult.scenariosCount + " scenarios Passed :)".green.bold,
		].join("\n"))
		
    } 
    
    return driver.quit()
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

function clickByLinkText(text) {
    return click(By.linkText(text), "by link text: " + text )
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

function assertExistsByName(name) {
    return assertExists(By.name(name), "by name: " + name )
}

function assertExists(locator, descr) {
    logStep("assertion:".yellow + " element is found   " , descr.magenta);
    return driver.findElement(locator)
			.then( _ => logStep(" - OK!".green) )
}



function locate(locator) {
    substep("waiting for element to be found")
    return driver.wait(until.elementLocated(locator)) 
        .then( e => substep("waiting for element to be visibile") 
                 || driver.wait(until.elementIsVisible( e ) ) 
        )
}
