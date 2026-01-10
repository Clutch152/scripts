# Working JKO Script (FY26)

**Source**: Based on Issue #102 by [@TySP-Dev](https://github.com/TySP-Dev)

## Overview
This script collection provides methods for automating JKO course completion. It has been tested on Chrome. It includes both a **Manual Script** for individual lessons and an **Automated Script** for course-wide progression.

## Instructions
1.  Open your course in a modern browser (Chrome, Edge, Firefox).
2.  Press `Ctrl + Shift + I` (or `F12`) to open the Developer Tools.
3.  Navigate to the **Console** tab.
4.  If prompted, type `allow pasting` to enable script execution.
5.  Paste the desired script and press `Enter`.

---

## 1. Manual Lesson Completion
*This script must be run individually on each lesson page.*

### Usage:
1. Start or resume the lesson.
2. Run the script below in the console.

```javascript
function findAPI() {
    var attempts = 0;
    var maxAttempts = 50;
    
    // Check for JKOAPI iframe in current window
    var checkAPI = setInterval(function() {
        attempts++;
        try {
            // Try parent window first
            if (window.parent && window.parent.JKOAPI && 
                window.parent.JKOAPI.document && 
                window.parent.JKOAPI.document.API_1484_11) {
                clearInterval(checkAPI);
                executeCommands(window.parent.JKOAPI.document.API_1484_11);
                return;
            }
            
            // Try top window
            if (window.top && window.top.JKOAPI && 
                window.top.JKOAPI.document && 
                window.top.JKOAPI.document.API_1484_11) {
                clearInterval(checkAPI);
                executeCommands(window.top.JKOAPI.document.API_1484_11);
                return;
            }
            
            // Try current window
            if (window.JKOAPI && window.JKOAPI.document && 
                window.JKOAPI.document.API_1484_11) {
                clearInterval(checkAPI);
                executeCommands(window.JKOAPI.document.API_1484_11);
                return;
            }
            
            if (attempts >= maxAttempts) {
                clearInterval(checkAPI);
                console.error("SCORM API not found after 5 seconds");
            }
        } catch (e) {
            console.log("Attempt " + attempts + " - Error:", e.message);
            if (attempts >= maxAttempts) {
                clearInterval(checkAPI);
                console.error("Failed to access API:", e);
            }
        }
    }, 100);
}

function executeCommands(API) {
    if (!API) {
        console.error("API is null");
        return;
    }
    
    console.log("✓ SCORM API found!");
    
    try {
        var result = API.SetValue('cmi.completion_status', 'completed');
        console.log("✓ Completion status set, result:", result);
        
        // Try to find and submit the form
        var courseHeader = null;
        if (window.parent) {
            courseHeader = window.parent.document.getElementsByName("courseheader")[0];
        }
        if (!courseHeader && window.top) {
            courseHeader = window.top.document.getElementsByName("courseheader")[0];
        }
        
        if (courseHeader && courseHeader.contentDocument) {
            var form = courseHeader.contentDocument.getElementById("c");
            if (form) {
                form.submit();
                console.log("✓ Form submitted");
            } else {
                console.log("⚠ Form 'c' not found in courseheader");
            }
        } else {
            console.log("⚠ courseheader iframe not accessible");
        }
    } catch (e) {
        console.error("✗ Error executing commands:", e);
    }
}

findAPI();
```

---

## 2. Automated Course Completion
*This script automatically detects "Start" or "Resume" buttons and progresses through the course.*

### Configuration:
You can adjust the following variables at the top of the script:
- `progressThreshold`: The percentage at which the script will exit the course (default: `93`).
- `hourThreshold`: For courses longer than this (in hours), the script will wait to avoid being flagged (default: `8`).

### Script:
```javascript
// ========================================
// JKO Course Automation Script - With Duration-Based Delay
// ========================================

(function() {
    'use strict';
    
    var config = {
        progressThreshold: 93,
        checkInterval: 2000,
        apiWaitTime: 100,
        maxApiAttempts: 50,
        maxRetries: 5,
        hourThreshold: 8  // Wait if course is > 8 hours
    };
    
    var state = {
        isRunning: false,
        currentProgress: 0,
        hasStarted: false,
        currentLessonRetries: 0,
        lastLessonId: null,
        waitTimeRemaining: 0,
        isWaiting: false
    };
    
    function log(message, type) {
        var prefix = type === 'error' ? '❌' : type === 'success' ? '✅' : '🔄';
        console.log(prefix + ' [JKO Auto] ' + message);
    }
    
    // ========================================
    // Extract course duration from title
    // ========================================
    
    function getCourseDuration() {
        try {
            var windows = [window, window.parent, window.top];
            
            for (var w = 0; w < windows.length; w++) {
                try {
                    var win = windows[w];
                    if (!win || !win.document) continue;
                    
                    var titleEl = win.document.getElementById("playerCourseTitle");
                    if (titleEl) {
                        var titleText = titleEl.textContent || titleEl.innerText;
                        
                        // Look for pattern like "(20 hrs)" or "(20hrs)" or "(20 hr)"
                        var match = titleText.match(/\((\d+)\s*hrs?\)/i);
                        if (match) {
                            var hours = parseInt(match[1]);
                            log("Course duration detected: " + hours + " hours", 'info');
                            return hours;
                        }
                    }
                } catch (e) {
                    // Try next window
                }
            }
            
            log("No course duration found in title", 'info');
            return 0;
            
        } catch (e) {
            log("Error detecting course duration: " + e.message, 'error');
            return 0;
        }
    }
    
    // ========================================
    // Calculate and apply wait time
    // ========================================
    
    function calculateWaitTime() {
        var hours = getCourseDuration();
        
        if (hours > config.hourThreshold) {
            var waitMinutes = hours;
            var waitMs = waitMinutes * 60 * 1000;
            
            log("Course is " + hours + " hours (>" + config.hourThreshold + " hrs threshold)", 'info');
            log("⏳ Waiting " + waitMinutes + " minutes before starting automation...", 'success');
            
            state.isWaiting = true;
            state.waitTimeRemaining = waitMinutes;
            
            // Update countdown every minute
            var countdownInterval = setInterval(function() {
                state.waitTimeRemaining--;
                if (state.waitTimeRemaining > 0) {
                    log("⏳ Waiting... " + state.waitTimeRemaining + " minutes remaining", 'info');
                } else {
                    clearInterval(countdownInterval);
                    state.isWaiting = false;
                    log("✅ Wait complete! Starting automation now", 'success');
                }
            }, 60000); // Every minute
            
            return waitMs;
        } else {
            log("Course is " + hours + " hours (<=" + config.hourThreshold + " hrs) - no wait needed", 'info');
            return 0;
        }
    }
    
    // ========================================
    // Get iframe by name from any window level
    // ========================================
    
    function getIframe(name) {
        var windows = [window, window.parent, window.top];
        
        for (var w = 0; w < windows.length; w++) {
            try {
                var win = windows[w];
                if (!win || !win.document) continue;
                
                var iframes = win.document.getElementsByName(name);
                if (iframes.length > 0) {
                    return iframes[0];
                }
            } catch (e) {
                // Ignore cross-origin errors
            }
        }
        return null;
    }
    
    // ========================================
    // Check if element is visible
    // ========================================
    
    function isElementVisible(element) {
        if (!element) return false;
        
        var style = element.style;
        if (style.display === 'none' || style.visibility === 'hidden') {
            return false;
        }
        
        try {
            var computedStyle = element.ownerDocument.defaultView.getComputedStyle(element);
            if (computedStyle.display === 'none' || computedStyle.visibility === 'hidden') {
                return false;
            }
        } catch (e) {
            // Continue if we can't get computed style
        }
        
        if (element.offsetWidth === 0 || element.offsetHeight === 0) {
            return false;
        }
        
        return true;
    }
    
    // ========================================
    // Check if current lesson is completed (has checkmark)
    // ========================================
    
    function isCurrentLessonCompleted() {
        try {
            var iframe = getIframe("coursegenerate");
            if (!iframe || !iframe.contentDocument) {
                return null;
            }
            
            var selectedItems = iframe.contentDocument.querySelectorAll('.menuTabItemSelected');
            
            for (var i = 0; i < selectedItems.length; i++) {
                var selectedItem = selectedItems[i];
                var menuTabItem = selectedItem.closest('.menuTabItem');
                var lessonId = menuTabItem ? menuTabItem.id : null;
                
                if (lessonId && lessonId !== state.lastLessonId) {
                    state.lastLessonId = lessonId;
                    state.currentLessonRetries = 0;
                    log("New lesson detected: " + lessonId, 'info');
                }
                
                var iconContainer = menuTabItem ? 
                    menuTabItem.querySelector('.menuTabItemIconContainer') : 
                    selectedItem.parentElement.querySelector('.menuTabItemIconContainer');
                
                if (iconContainer) {
                    var classes = iconContainer.className;
                    
                    if (classes.indexOf('menuTabLessonIcon_completed') !== -1) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }
            
            return null;
            
        } catch (e) {
            log("Error checking lesson completion: " + e.message, 'error');
            return null;
        }
    }
    
    // ========================================
    // Retry current lesson
    // ========================================
    
    function retryCurrentLesson() {
        try {
            var iframe = getIframe("coursegenerate");
            if (!iframe || !iframe.contentDocument) {
                return false;
            }
            
            var selectedItems = iframe.contentDocument.querySelectorAll('.menuTabItemSelected a');
            
            if (selectedItems.length > 0) {
                var lessonLink = selectedItems[0];
                log("Retrying current lesson...", 'info');
                lessonLink.click();
                return true;
            }
            
        } catch (e) {
            log("Error retrying lesson: " + e.message, 'error');
        }
        return false;
    }
    
    // ========================================
    // Start/Resume Button Detection
    // ========================================
    
    function checkAndClickStartResume() {
        try {
            var iframe = getIframe("courseheader");
            if (!iframe || !iframe.contentDocument) {
                return false;
            }
            
            var resumeButton = iframe.contentDocument.getElementById("two");
            if (resumeButton && isElementVisible(resumeButton)) {
                log("Found visible Resume button - clicking it!", 'success');
                resumeButton.click();
                state.hasStarted = true;
                return true;
            }
            
            var startButton = iframe.contentDocument.getElementById("one");
            if (startButton && isElementVisible(startButton)) {
                log("Found visible Start button - clicking it!", 'success');
                startButton.click();
                state.hasStarted = true;
                return true;
            }
            
            return false;
            
        } catch (e) {
            log("Error checking Start/Resume: " + e.message, 'error');
            return false;
        }
    }
    
    // ========================================
    // Progress Detection
    // ========================================
    
    function getProgress() {
        var iframeNames = ['courseheader', 'coursegenerate', 'text'];
        var windows = [window, window.parent, window.top];
        
        for (var w = 0; w < windows.length; w++) {
            try {
                var win = windows[w];
                if (!win || !win.document) continue;
                
                var progressEl = win.document.getElementById("lp");
                if (progressEl) {
                    var progress = parseInt(progressEl.textContent || progressEl.innerText);
                    if (!isNaN(progress)) {
                        return progress;
                    }
                }
                
                for (var i = 0; i < iframeNames.length; i++) {
                    try {
                        var iframes = win.document.getElementsByName(iframeNames[i]);
                        for (var j = 0; j < iframes.length; j++) {
                            var iframe = iframes[j];
                            if (iframe && iframe.contentDocument) {
                                progressEl = iframe.contentDocument.getElementById("lp");
                                if (progressEl) {
                                    progress = parseInt(progressEl.textContent || progressEl.innerText);
                                    if (!isNaN(progress)) {
                                        return progress;
                                    }
                                }
                            }
                        }
                    } catch (e) {
                        // Cross-origin error
                    }
                }
            } catch (e) {
                // Window access error
            }
        }
        
        return 0;
    }
    
    // ========================================
    // Button Click Functions
    // ========================================
    
    function clickNextLesson() {
        try {
            var iframe = getIframe("courseheader");
            if (iframe && iframe.contentDocument) {
                var nextButton = iframe.contentDocument.getElementById("four");
                if (nextButton && isElementVisible(nextButton)) {
                    log("Clicking Next Lesson button...", 'info');
                    nextButton.click();
                    return true;
                }
            }
        } catch (e) {
            log("Error clicking Next Lesson: " + e.message, 'error');
        }
        return false;
    }
    
    function clickExitCourse() {
        try {
            var iframe = getIframe("courseheader");
            if (iframe && iframe.contentDocument) {
                var exitButtons = iframe.contentDocument.querySelectorAll('a.button[href="javascript:close();"]');
                for (var i = 0; i < exitButtons.length; i++) {
                    if (exitButtons[i].textContent.indexOf("Exit") !== -1) {
                        log("🎉 Progress reached " + state.currentProgress + "% - Clicking Exit Course!", 'success');
                        exitButtons[i].click();
                        return true;
                    }
                }
            }
        } catch (e) {
            log("Error clicking Exit: " + e.message, 'error');
        }
        return false;
    }
    
    // ========================================
    // SCORM API Functions
    // ========================================
    
    function findAPI() {
        try {
            if (window.parent && window.parent.JKOAPI && 
                window.parent.JKOAPI.document && 
                window.parent.JKOAPI.document.API_1484_11) {
                return window.parent.JKOAPI.document.API_1484_11;
            }
            
            if (window.top && window.top.JKOAPI && 
                window.top.JKOAPI.document && 
                window.top.JKOAPI.document.API_1484_11) {
                return window.top.JKOAPI.document.API_1484_11;
            }
            
            if (window.JKOAPI && window.JKOAPI.document && 
                window.JKOAPI.document.API_1484_11) {
                return window.JKOAPI.document.API_1484_11;
            }
        } catch (e) {
            log("Error finding API: " + e.message, 'error');
        }
        return null;
    }
    
    function completeCurrentLesson() {
        var API = findAPI();
        if (API) {
            try {
                API.SetValue('cmi.completion_status', 'completed');
                return true;
            } catch (e) {
                log("Error setting completion: " + e.message, 'error');
            }
        }
        return false;
    }
    
    // ========================================
    // Main Automation Loop
    // ========================================
    
    function automationLoop() {
        if (!state.isRunning) return;
        
        // Check for Start/Resume button if we haven't clicked it yet
        if (!state.hasStarted) {
            if (checkAndClickStartResume()) {
                setTimeout(automationLoop, 3000);
                return;
            }
        }
        
        var currentProgress = getProgress();
        if (currentProgress !== state.currentProgress) {
            state.currentProgress = currentProgress;
            log("Progress: " + currentProgress + "%", 'success');
        }
        
        // Check if we've reached the threshold
        if (currentProgress >= config.progressThreshold) {
            log("🎉 Target progress reached (" + currentProgress + "% >= " + config.progressThreshold + "%)!", 'success');
            state.isRunning = false;
            setTimeout(function() {
                clickExitCourse();
            }, 1000);
            return;
        }
        
        // Complete the lesson via SCORM
        completeCurrentLesson();
        
        // Wait a moment for SCORM to register
        setTimeout(function() {
            // Check if current lesson is completed (has checkmark)
            var isCompleted = isCurrentLessonCompleted();
            
            if (isCompleted === true) {
                // Lesson is completed, move to next
                log("Lesson verified as complete - moving to next", 'success');
                state.currentLessonRetries = 0;
                setTimeout(function() {
                    clickNextLesson();
                }, 500);
            } else if (isCompleted === false) {
                // Lesson is NOT completed
                state.currentLessonRetries++;
                
                if (state.currentLessonRetries >= config.maxRetries) {
                    log("Max retries reached (" + config.maxRetries + ") - forcing next lesson", 'error');
                    state.currentLessonRetries = 0;
                    setTimeout(function() {
                        clickNextLesson();
                    }, 500);
                } else {
                    log("Lesson not complete - retry " + state.currentLessonRetries + "/" + config.maxRetries, 'info');
                    setTimeout(function() {
                        retryCurrentLesson();
                    }, 1000);
                }
            } else {
                // Unknown status - proceed with caution
                log("Cannot verify completion - attempting next anyway", 'error');
                setTimeout(function() {
                    clickNextLesson();
                }, 500);
            }
            
            // Schedule next iteration
            setTimeout(automationLoop, config.checkInterval);
            
        }, 1000);
    }
    
    // ========================================
    // Initialization
    // ========================================
    
    function startAutomation() {
        var attempts = 0;
        
        var checkAPI = setInterval(function() {
            attempts++;
            var API = findAPI();
            
            if (API) {
                clearInterval(checkAPI);
                log("SCORM API found!", 'success');
                log("Will auto-exit at " + config.progressThreshold + "% or higher", 'info');
                
                // Check course duration and calculate wait time
                var waitTime = calculateWaitTime();
                
                if (waitTime > 0) {
                    // Wait before starting
                    setTimeout(function() {
                        log("Wait period complete - starting automation", 'success');
                        checkAndClickStartResume();
                        state.isRunning = true;
                        setTimeout(automationLoop, 2000);
                    }, waitTime);
                } else {
                    // Start immediately
                    checkAndClickStartResume();
                    state.isRunning = true;
                    setTimeout(automationLoop, 2000);
                }
                
            } else if (attempts >= config.maxApiAttempts) {
                clearInterval(checkAPI);
                log("Starting without API", 'error');
                
                // Check wait time even without API
                var waitTime = calculateWaitTime();
                
                if (waitTime > 0) {
                    setTimeout(function() {
                        checkAndClickStartResume();
                        state.isRunning = true;
                        setTimeout(automationLoop, 2000);
                    }, waitTime);
                } else {
                    checkAndClickStartResume();
                    state.isRunning = true;
                    setTimeout(automationLoop, 2000);
                }
            }
        }, config.apiWaitTime);
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', startAutomation);
    } else {
        startAutomation();
    }
    
    // ========================================
    // Manual Controls
    // ========================================
    
    window.JKOAuto = {
        start: function() {
            if (!state.isRunning) {
                log("Manually starting automation", 'info');
                state.isRunning = true;
                automationLoop();
            }
        },
        stop: function() {
            log("Stopping automation", 'info');
            state.isRunning = false;
        },
        status: function() {
            return {
                running: state.isRunning,
                progress: state.currentProgress,
                threshold: config.progressThreshold,
                hasStarted: state.hasStarted,
                currentLessonRetries: state.currentLessonRetries,
                lastLessonId: state.lastLessonId,
                isWaiting: state.isWaiting,
                waitTimeRemaining: state.waitTimeRemaining
            };
        },
        setThreshold: function(value) {
            config.progressThreshold = value;
            log("Progress threshold set to " + value + "%", 'info');
        },
        setMaxRetries: function(value) {
            config.maxRetries = value;
            log("Max retries set to " + value, 'info');
        },
        setHourThreshold: function(value) {
            config.hourThreshold = value;
            log("Hour threshold set to " + value + " hours", 'info');
        },
        getDuration: getCourseDuration,
        clickNext: clickNextLesson,
        clickExit: clickExitCourse,
        clickStartResume: checkAndClickStartResume,
        retryLesson: retryCurrentLesson,
        checkCompletion: isCurrentLessonCompleted,
        getProgress: getProgress,
        testProgress: function() {
            var progress = getProgress();
            console.log("Current progress: " + progress + "%");
            return progress;
        }
    };
    
    log("Automation script loaded. Use window.JKOAuto for manual control", 'success');
    
})();
```

### Manual Controls (while Auto Script is running):
Use the following commands in the console to control the `JKOAuto` object:

- **Check Status**: `JKOAuto.status()`
- **Check Progress**: `JKOAuto.testProgress()`
- **Update Threshold**: `JKOAuto.setThreshold(95)` (Changes exit percentage)
- **Stop Automation**: `JKOAuto.stop()`
- **Start/Resume Automation**: `JKOAuto.start()`
- **Force Next Lesson**: `JKOAuto.clickNext()`
- **Change Retry Limit**: `JKOAuto.setMaxRetries(5)`
- **Change Hour Threshold**: `JKOAuto.setHourThreshold(10)` (Default: 8)
- **Check Detected Hours**: `JKOAuto.getDuration()`

---

**Contributor Credit**: Original script and research provided by [@TySP-Dev](https://github.com/TySP-Dev) (Issue #102).

---
