# SERE 100.2 Level A Training Automation Guide

## Introduction
This documentation outlines methods for accelerating the completion of SERE 100.2 Level A training through JKO, focusing on JavaScript manipulation techniques.

> **Disclaimer**: This guide is intended for educational purposes only. The results and consequences you gain are purely your own.

## Context and Rationale
Despite efforts to reduce redundant online training within the DoD, many time-consuming modules remain. Some senior military leaders have even [admitted](https://www.military.com/daily-news/2022/09/13/dont-do-it-senior-leaders-say-soldiers-should-stop-taking-mandatory-online-classes.html) to bypassing such training as they deem it unproductive. This guide aims to provide you with the skills to automate such tasks responsibly, making your online training experience more efficient.

> "Give a Man a Fish, and You Feed Him for a Day. Teach a Man To Fish, and You Feed Him for a Lifetime."
---
#### Onto the narrative!
---
- First one has to understand that JKO is serving you the javascript commands in order for you to locally run the code and only afterwards, once the appropriate checks have been done, will your system reach back out to the JKO servers to fetch the next page of information.
    - *But how did you find this out?*
        1. If you open your developer console, here I am using Edge, which is funny enough based on a Chromium fork since Microsoft forgot how to build/make browsers lmao.
        2. Next you will need to see what kind of network traffic is being traded between yourself and the JKO servers. So click the network tab and attempt the first few windows and you'll see that we are trading information. Most notable of which are the .js file types.
        3. Investigating these trades shows that we are serving out the adayana.js commands out to the servers. This file is inherently given to us as a sort of menu of options we can issue back to the webserver so we can interact with it.

- This serves us very as well as it not only cuts down on the amount of computation that has to be done on the DoD infrastructure, but also allows us to inject our own commands as if we were already doing this legit (which we are ;)).
- We will not be able to issue these commands through any DoD owned system as the adminsitrative lockdowns prevent interaction with the developer tools of the browser. And baring any binding of an exising session through burpsuite (web injection tool) we really shouldn't be messing around on gov computers; so do it at home! 
- I will also not be trying to detail how to attempt a 1000m headshot by just invoking the final course complete command as I believe from [this](https://github.com/Clutch152/scripts/issues/75) post that there are likely several checks implemented to thwart our attempt to **not** waste time.
- So as it stands we will have to craft our own little script per section that we want to blow past through.
- Lets investigate that adayana.js file!
    1. We can open it up from going into the sources tab and then doing a ctrl+f or looking into the pageContentFrame tree.
    2. There is a whole set of options available which we can invoke from the console tab.
    3. But first you may ask, how do I issue these commands? What is the structure? 
        - As this higher level overview, the objective isn't to make you wizards out of the gate but to help the largest population set be interested and motivated to ask the "why!"
    4. Take a look at how the program initiates itself! 
    ```javascript
    !function(root, factory) {
    if ("function" == typeof define && define.amd)
        define([], factory);
    else if (root.adayana = factory(),
    "complete" === window.document.readyState) {
        var event = document.createEvent("Event");
        event.initEvent("deviceready", !0, !0),
        window.document.dispatchEvent(event)
    }
    ```
    5. This is basically telling us that if the program isn't already binding the program main function to the global root, then it attaches the factory function to root.adayana, assuming root refers to the global object (usually window in browsers). You may then be able to access the functions via window.adayana or just adayana depending on the context.
    6. Now that we know the general structure we can then begin investigating which functions we actually want to interact with. The obvious choices here will be the functions controlling the locking and unlocking of functionality of the so called "training."
    7. During my experimentation I was put into a rogue unlocker corner given my brute force handling of the parameters, I advise you all to research the relationships between the different values and their expected output and behavior.

```javascript
function executeCommands(){
    var frame = document.getElementById('pageROFLMAOFrame').contentWindow //TODO: This portion is a little more abstract given an understanding between where the adayana commands are being referenced and where more global objects are being executed/referenced. For the sake of brevity you can think of "frames" as parts of a town. Some are industrial while others are like a downtown. Think of the frame where adayana is executing as that industrial area, seperate from the downtown trendy area where the buttons (and we) live. You will need to reference elements outside of the downtown area we are living in = the frames of the webpage (you can see this within the html structure). Replace "pageROFLMAOFrame" with the actual answer:"pageContentFrame"
    frame.adayana.locked = false
    frame.adayana.isComplete = true
    frame.adayana.navLock.complete=true
    frame.adayana.navLock.unlock()
    document.getElementById("ayy_lmao").click()//TODO: Find the element ID of the Next button, you can do this by using your inspect element tool and dragging it over to the revealed next button. Once you do this, you will be transported to the html location where it is referenced. You will see that the Next button has an id within its html structure Hint: n**_***t
    //This command will execute the function of the physical mouse click onto the object
}
// Loop to execute the commands n times with a 2-second delay between each
for (let i = 0; i < 0; i++) {//TODO: You will need to tune your for loop based on how many screens you want to bypass
    setTimeout(executeCommands, i * 5000);  // i * 5000 will result in a 5-second delay between each loop so that the server has enough time to fulfill the request etc.
}
//document.getElementById('c').submit(); //Once you have passed through all the pages within the section, you can uncomment this command and issue it within the console in order to go to the next section so you can also put this into your automation step with an appropriate wait time so that the site doesn't crash on you

```