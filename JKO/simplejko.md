# Simple JKO Automation Script

**Contributor**: [@v0rl0x](https://github.com/v0rl0x)  
**Source**: [Issue #85 - Working Script for JKO (Updated 5/13/2024)](https://github.com/Clutch152/scripts/issues/85)

## Overview

This is a lightweight SCORM API-based script designed to automate JKO course completion. It automatically finds the SCORM API within the page hierarchy and marks the current lesson as completed.

## Prerequisites

> **Note**: This script requires access to browser Developer Tools. On government computers, Developer Tools are typically restricted and require administrative (S6) privileges. For best results, execute this script on a **personal device**.

## Instructions

1. **Open Developer Tools**: Right-click on the course page and select "Inspect" (or press `F12` / `Ctrl+Shift+I`).
2. **Navigate to Console**: Select the **Console** tab within Developer Tools.
3. **Paste and Execute**: Copy the script below and paste it into the console, then press `Enter`.

---

## Script

```javascript
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
```

---

## Notes

- **Execution Timing**: This script executes automatically on the `window.onload` event. If the page is already loaded when you paste the script, you may need to refresh the page or manually call `executeSCORMCommands()` in the console.
- **SCORM API Detection**: The script traverses up to 500 parent windows to locate the SCORM API object. If the API is not found within this limit, an error will be logged to the console.
- **Form Submission**: After marking the lesson as complete, the script attempts to locate and submit the course header form element (`#c`) to register the completion.

---

## Alternative: FY26 Automation Script

For a more comprehensive automation solution with progress tracking, auto-retry, and course-wide automation, see the [FY26-JKO.md](./FY26-JKO.md) script.
