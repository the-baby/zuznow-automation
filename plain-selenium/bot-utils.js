exports.extend = z => {
    const { By } = require('selenium-webdriver');

    return Object.assign(z, {
      userSays,
      assertBotReply
    })
    
    function assertBotReply(...replies) {
        z.logAssert('Account link successfull', 'bot replies "' + replies + '"')
        return z.locate(By.id('conv-wrap'))
          .then(e => z.substep('retrieving conversation text') || e.getAttribute("innerText"))
          .then(text =>
              z.substep('validating expected bot reply') ||
              text
                .trim()
                .split(/[\n\r]+/)
                .some( line =>
                  replies.some(reply =>
                    reply instanceof RegExp
                      ? line => line.match(reply)
                      : line => line.includes(reply)
                  )
                )
              ? z.logStep(" - OK!".green)
              : Promise.reject(new Error('conversation does not contain expected reply'))
          )
    }
   
    function userSays(text, waitFor) {
        return z.inputById('input', text)
            .then( () => z.clickByClassName('submitBtn') )
            .then( () => z.waitFor(waitFor || 2))
    }    
}


//driver.switchTo().frame("frame1");