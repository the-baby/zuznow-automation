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
    maximizeWindow,
    switchTab,
  
    inputById,
    inputByName,
    inputByClassName,
    inputByXPath,
    inputByCss,
    input,
    
    clickById,
    clickByName,
    clickByClassName,
    clickByCss,
    clickByLinkText,
    clickByPartialLinkText,
    clickByXPath,
    click,
    
    act,
    locate,
    scrollToTop,
    scrollToBottom,

    assertNoSuchElements,
    assertElementHasClass,
    assertContainsValue,
    assertContainsText,
    assertExistsById,
    assertExistsByName,
    assertExistsByClassName,
    assertExistsByLinkText,
    assertExistsByXPath,
    assertExistsByCss,
    assertExists,
    changeValue,
	changeInputById,
	changeInputByCss,
    scenario,
    logStep,
    logAssert,
    substep,
    failedScenario,
    endResult,
	
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

function maximizeWindow() {
    logStep("maximizing window")
    return driver.manage().window().maximize()
}

function switchTab(ix, text) {
    logStep("switching to tab", text || ('index:' + ix));
    return driver.switchTo().window(
      driver.getAllWindowHandles().then(h => h[ix])
    )
}

function scenario(text) {
    return driver.then(() => {
        const number = ++endResult.scenariosCount;
        currentScenario = "#" + number + " - " + text;
        console.log("\n\n Scenario #%s:\n  %s".bold.yellowBG, number, text)
    })
}

function logStep() {
    const args = [].slice.apply(arguments)
    args.unshift("    %s")
    console.log.apply( console, args ) 
}

function logAssert(title, descr) {
    logStep("assertion:".yellow + " " + title, descr.magenta)
}

function substep() {
    const args = [].slice.apply(arguments)
    args.unshift("        ..%s".gray)
    console.log.apply( console, args ) 
}

function failedScenario(e) {
    endResult.failedScenarios.push({ scenario: currentScenario, error: e });
    logStep("SENARIO FAILED".redBG.black + "\n    " + e.stack.replace(/\n/g, "\n    ").red)
}

endResult.scenariosCount  = 0;
endResult.failedScenarios = [];
function endResult() {
    if (endResult.failedScenarios.length) {

        console.log([ 
          "\n\n",
          "  FAILURE  ".redBG.white.bold,
          ("  " + endResult.scenariosCount + " scenarios ran").bold,
          ("  " + endResult.failedScenarios.length + " scenarios failed:").red,
          "    " + endResult.failedScenarios
                    .map( ({scenario, error}) => 
                        scenario.yellowBG.white.bold
                         + "\n      reason: " 
                         + error.message
                            .replace(/\(Session info: .*\n.*/m,"")
                            .replace(/\n/g, "\n      ").red
                    )
                    .join("\n    ")
          ].join("\n")
        )
        process.exit(1)

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
    return input(By.id(id), "by id: " + id, text)
}

/*
function inputById(id, link) {
    input(By.id(id), "by id: " + id, link)
}
*/

function inputByName(name, text) {
    return input(By.name(name), "by name: " + name, text)
}

function inputByClassName(className, text) {
    return input(By.className(className), "by className: " + className, text)

}

function inputByCss(css, text) {
    return input(By.css(css), "by Css: " + css, text)

}


function inputByXPath(xpath, text) {
    return input(By.xpath(xpath), "by XPath: " + xpath, text)
}

function input(locator, descr, text) {
    logStep("writing text to field   " + descr.magenta + ", text: ", text.magenta);
    return act(locator, "clicking element", (e) => e.sendKeys(text) )    
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
    return act(locator, "clicking element", (e) => e.click() )
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
    logStep("assertion:".yellow + " " + descr , ('value should contain text `' + text + '`').magenta);
    driver.findElement(locator)
    .getAttribute('value')
    .then( value => {
        if (value.indexOf(text) == -1)
            return Promise.reject(new Error('element value does not include `' + text + '`'));

        logStep(" - OK!".green)
        return Promise.resolve()
    })
}
function assertContainsText(locator,descr,text) {
    logStep("assertion:".yellow + " " + descr , ('element text should contain text `' + text + '`').magenta);
    driver.findElement(locator)
    .getText()
    //.getAttribute('innerHTML')
    .then( elmText => {
console.log('elmText: ', typeof elmText, elmText)      
        if (elmText.indexOf(text) == -1)
            return Promise.reject(new Error('element text does not include text`' + text + '`'));

        logStep(" - OK!".green)
        return Promise.resolve()
    })
}

function assertNoSuchElements(locator, text) {
    logStep("assertion:".yellow + " no such element " + text.magenta);
    return driver
      .findElements(locator)
      .then(elements => { 
          if (elements.length) 
              return Promise.reject(new Error('found elements that should not exist'));
                
          logStep(" - OK!".green)
          return Promise.resolve()
      })
}



function act(locator, descr, action) {
    let el;
    return locate(locator)
        .then( e => substep(descr) || action(el = e) )
        .catch( _ =>
            substep("not visible." .yellow + " trying scroll into view")
            || driver
                .executeScript("arguments[0].focus()", el)
                .then( _ => driver.sleep(300) )
                .then( _ => substep(descr) || action(el) )
        )
}

function locate(locator) {
    substep("waiting for element to be found in DOM")
    return driver.wait(until.elementLocated(locator),30000) 
        .then( e => substep("waiting for element to be visibile") 
                 || driver.wait(until.elementIsVisible( e ) ) 
        )
}

function changeValue(selector, value)	{
	console.log('test1');
	logStep("changin value by selector: ",selector);
	return driver.findElement(By.css(selector)).sendKeys(Key.chord(Key.CONTROL, "a"),value);
}

function scrollToTop() {
    logStep("scrolling to top");
    return driver
             .executeScript("window.scroll(0,0);")
             .then( _ => driver.sleep(500) );
}

function scrollToBottom() {
    logStep("scrolling to bottom");
    return driver
             .executeScript("window.scroll(0,window.innerHeight);")
             .then( _ => driver.sleep(500) );
}

function scrollTo(height) {
    logStep("scrolling to height: " + height);
    return driver
             .executeScript("window.scroll(0," + height + ");")
             .then( _ => driver.sleep(500) );
}

function changeInputById(id, text) {
    logStep("writing text to field by id: ", id, text);
    driver.findElement(By.id(id)).sendKeys('\uE009a');
    return driver.findElement(By.id(id)).sendKeys(text)
}

function changeInputByCss(css, text) {
	driver.findElement(By.css(css)).sendKeys('\uE009a');
    return driver.findElement(By.css(css)).sendKeys(text)
	}
