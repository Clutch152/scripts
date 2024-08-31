Submitted by [varl0x](https://github.com/v0rl0x) as [WORKING SCRIPT FOR JKO! MOST UP TO DATE AS OF 5/13/2024!](https://github.com/Clutch152/scripts/issues/85)

Steps: 
Right click, inspect element, select console tab, paste the following code:

> NOTE: Does not work on government computers as you cannot inspect
> element unless you have S6 administrative privileges, use on personal
> device.

    function findAPI(win) {
        var attempts = 0;
        var maxAttempts = 500;
        while ((typeof(win.API_1484_11) == 'undefined') && win.parent && win != win.parent && attempts < maxAttempts) {
            win = win.parent;
            attempts++;
        }
        return win.API_1484_11;
    }
    function getAPI() {
        var API = findAPI(window);
        if (!API && window.opener) {
            API = findAPI(window.opener);
        }
        if (!API) {
            console.error("SCORM API not found.");
            return null;
        }
        return API;
    }
    
    function executeSCORMCommands() {
        var API = getAPI();
        if (API) {
            API.SetValue('cmi.completion_status', 'completed');
            if (document.getElementsByName("courseheader").length > 0) {
                var courseHeader = document.getElementsByName("courseheader")[0];
                if (courseHeader.contentDocument.getElementById("c")) {
                    courseHeader.contentDocument.getElementById("c").submit();
                }
            }
        } else {
            console.error("API object is undefined.");
        }
    }
    
    window.onload = executeSCORMCommands;

