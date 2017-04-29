var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();


driver    
.then( _ => driver.get('https://dashboard-beta.zuznow.com/user/register') )
.then( _ => logStep('waiting for mail-account varification e-mail') )

/*
.then( _ => click('edit-mail') )
.then( _ => click( { 
    by: { id: 'edit-mail' },
    timeout: 0 
} ) )
.then( _ => act( { 
    by:      { id: 'edit-mail' },
    timeout: 0,
    action:  'click',
} ) )

*/


.then( _ => typeIn('edit-mail', "the text" ) )


.then( _ => 
    driver.wait(until.elementLocated(By.id( 'edit-mail' ))) 
        .then( e => driver.wait(until.elementIsVisible( e ) ) )
        .then( e => e.click() )
)

function logStep() {
    let args = [].slice.apply(arguments)
    args.unshift("    %s")
    console.log.apply( console, args ) 
}


var sa = require('selenium-actor');
sa.learnPages({
  "google home page"  : {
    url:      "https://www.google.com"
    controls: { 
      "search query"  : By.name("q"),
      "search button" : By.id("btnG"),
    }
  },
  "registration page" : {
    url: "https://dashboard-beta.zuznow.com/user/register",
    controls: { 
      "email"         : By.id("edit-mail"),
      "first name"    : By.id("edit-field-first-name-und-0-value"),
      "last name"     : By.id("edit-field-last-name-und-0-value"),
      "submit"        : By.id("edit-submit")
    }
  }
})

user1 = sa.chromeUser();
//eq user = sa.user({ forBrowser: "chrome" })



user1
  .opens("https://dashboard-beta.zuznow.com/user/register")
  .inputs({ 
    "registration email":       mailUser + '@mailinator.com',
    "registration first name":  "registration",
    "registration last name":   "test",
    "registration mail":        "registration",
    "registration phone":       "05475263525",
    "gender":                   "M"
  })
  .clicks("google search button")
  .waitsFor(sa.url, "search?q=selenium")
  .checks({
    "search button to be present": {
      "btnG" : e => !e.isFound()
    },
    "page title to contain 'search results'" : {
      [sa.title]: title => title.contains('selenium')
    }
  })
 

