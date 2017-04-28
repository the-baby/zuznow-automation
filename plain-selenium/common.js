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
    scenarioFailed,
    report
};


function getDriver() {
    driver = new Builder()
        .forBrowser('chrome')
        .build();
    
    return driver
}

function scenario(text) {
    report.scenariosCount++;
    currentScenario = text;
    console.log("\r\n\r\n Scenario:\r\n  %s".bold.yellowBG, text)
}

function logStep() {
    let args = [].slice.apply(arguments)
    args.unshift("    %s")
    console.log.apply( console, args ) 
}

function substep() {
    let args = [].slice.apply(arguments)
    args.unshift("        ..%s".gray)
    console.log.apply( console, args ) 
}

function scenarioFailed(e) {
    report.failedScenarios.push(currentScenario);
    logStep("SENARIO FAILED".redBG.black + "\n    " + e.message.replace(/\n/g, "\n    ").red)
}

report.scenariosCount  = 0;
report.failedScenarios = [];
function report() {
    if (report.failedScenarios.length) {
        
		console.log([ "\n\n",
          "  FAILURE  ".redBG.white.bold,
		  "  " + report.scenariosCount + " scenarios ran".bold,
          ("  " + report.failedScenarios.length + " scenarios failed:").red,
          "   - " + report.failedScenarios.join("   - ")
        ].join("\n"))
		
    } else {
		
        console.log([ "\n\n",
          "  SUCCESS  ".greenBG.white.bold,
		  "  " + report.scenariosCount + " scenarios ran".bold,
          "  " + report.scenariosCount + " scenarios Passed :)".green.bold,
		].join("\n"))
		
    } 
    
    return driver.quit()
}


function waitFor(sec) { 
    var ready = false;
    logStep("waiting " + sec + " seconds")
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
    logStep("assertinng that element is found   " , descr.magenta);
    return driver.findElement(locator)
}



function locate(locator) {
    substep("waiting for element to be found")
    return driver.wait(until.elementLocated(locator)) 
        .then( e => substep("waiting for element to be visibile") 
                 || driver.wait(until.elementIsVisible( e ) ) 
        )
}
