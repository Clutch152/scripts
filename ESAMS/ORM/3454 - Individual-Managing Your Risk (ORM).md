# 3454 - Individual-Managing Your Risk (ORM)

## Course Completion Script

This script bypasses the ORM training course and triggers SCORM completion, allowing instant course completion with a 100% score.

### How to Use

1. Launch the course through ESAMS/LMS normally
2. Wait for the course to fully load (intro screen appears)
3. Open browser Developer Tools (F12 or Ctrl+Shift+I)
4. Go to the **Console** tab
5. Paste the entire script below and press Enter
6. The AAR (After Action Review) screen should appear with 100% score
7. Close the course window - completion will be recorded

### Requirements

- Course must be launched through the LMS (not opened directly)
- `window.opener.scorm` or `window.parent.esamsRecordCompletion` must be available for completion to record

### What the Script Does

1. **Finds Vue.js app instance** - Searches multiple selectors and walks component tree
2. **Sets all speaker progress to 100%** - Updates `speakerProgress` array and gauge UI
3. **Marks all stages complete** - Sets `completeSpeaker` array to all `true`
4. **Sets score to 100%** - `score = possibleScore` for 100% accuracy
5. **Shows AAR screen** - Triggers the end-of-course debrief view
6. **Calls SCORM completion** - Reports completion status to LMS

### Console Output

- `SUCCESS: Called reportCompletion()` - Completion sent via app method
- `SUCCESS: Manual SCORM completion sent` - Fallback SCORM API used
- `SUCCESS: ESAMS completion sent` - ESAMS-specific completion recorded
- `ERROR: No SCORM API found` - Course not launched through LMS properly

---

## Script

```javascript
(function() {
    // Find Vue instance
    var vm = null;
    var selectors = ['#app', '#root', '.app', '[data-v-app]', 'body > div'];
    for (var i = 0; i < selectors.length && !vm; i++) {
        var el = document.querySelector(selectors[i]);
        if (el && el.__vue__) {
            vm = el.__vue__;
            break;
        }
    }
    if (!vm) {
        var allElements = document.querySelectorAll('*');
        for (var j = 0; j < allElements.length && !vm; j++) {
            if (allElements[j].__vue__) {
                vm = allElements[j].__vue__;
                break;
            }
        }
    }
    if (!vm) { console.log('ERROR: No Vue instance found'); return; }
    
    // Find app component
    var app = vm;
    while (app && !app.speakerList && app.$children && app.$children[0]) {
        app = app.$children[0];
    }
    if (!app || !app.speakerList) { console.log('ERROR: App component not found'); return; }
    
    var lastSpeaker = app.speakerList.length - 1;
    
    // Set all progress to 100%
    for (var i = 0; i < app.speakerProgress.length; i++) {
        app.$set(app.speakerProgress, i, 100);
        if (app.gauges && app.gauges[i]) app.gauges[i].setValue(100);
    }
    for (var i = 0; i < app.completeSpeaker.length; i++) {
        app.$set(app.completeSpeaker, i, true);
    }
    
    app.progress = 100;
    app.possibleScore = app.possibleScore || 16;
    app.score = app.possibleScore;
    app.activeSpeaker = lastSpeaker;
    app.currentSpeaker = lastSpeaker;
    
    // Show AAR
    app.isShowLesson = false;
    app.isShowAar = true;
    
    if (app.timeOut) { clearTimeout(app.timeOut); app.timeOut = null; }
    
    // CRITICAL: Call SCORM completion reporting
    if (typeof app.reportCompletion === 'function') {
        app.reportCompletion();
        console.log('SUCCESS: Called reportCompletion()');
    } else {
        console.log('WARNING: reportCompletion not found, trying manual SCORM...');
        // Manual SCORM fallback
        if (window.opener && window.opener.scorm) {
            window.opener.scorm.set("cmi.completion_status", "completed");
            window.opener.scorm.set("cmi.success_status", "passed");
            window.opener.scorm.set("cmi.score.raw", app.finalScore);
            window.opener.scorm.set("cmi.score.scaled", app.finalScore / 100);
            window.opener.scorm.commit();
            console.log('SUCCESS: Manual SCORM completion sent');
        } else if (window.parent && window.parent.esamsRecordCompletion) {
            window.parent.esamsRecordCompletion(app.finalScore, "/ESAMS_GEN_2/GlobalTraining/Record");
            console.log('SUCCESS: ESAMS completion sent');
        } else {
            console.log('ERROR: No SCORM API found (window.opener.scorm or window.parent.esamsRecordCompletion)');
        }
    }
    
    console.log('Final score:', app.finalScore, '%');
})();
```

---

## Technical Details

| Property | Description |
|----------|-------------|
| **Framework** | Vue.js 2.x |
| **App Mount** | `#app` element |
| **Component Path** | `__vue__.$children[0].$children[0]` |
| **SCORM API** | `window.opener.scorm` |
| **ESAMS API** | `window.parent.esamsRecordCompletion()` |

### Key State Variables

| Variable | Type | Purpose |
|----------|------|---------|
| `speakerList` | Array[5] | List of course stages/speakers |
| `speakerProgress` | Array | Completion % per stage (0-100) |
| `completeSpeaker` | Array | Boolean flags for stage completion |
| `progress` | Number | Overall course progress % |
| `score` | Number | User's raw score |
| `possibleScore` | Number | Maximum possible score |
| `finalScore` | Computed | `Math.round(score/possibleScore * 100)` |
| `isShowAar` | Boolean | Shows After Action Review screen |

---

*Last updated: 2026-01-10*