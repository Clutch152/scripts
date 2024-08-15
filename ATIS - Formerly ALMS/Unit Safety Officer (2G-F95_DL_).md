# Unit Safety Officer Course

**Made for the course code: 2G-F95_DL_**

# Steps to Execute the SCORM API Code in Browser Console

Follow these steps to execute the provided code in your browser's developer console. This guide assumes you are using Google Chrome.

## Step 1: Open Developer Tools

- **Windows/Linux:** Press `F12` or `Ctrl + Shift + J`
- **Mac:** Press `Cmd + Option + J`

## Step 2: Navigate to the Console Tab

Once the Developer Tools are open, locate the **Console** tab and click on it. This is where you will enter and execute the code.

## Step 3: Paste the Code

Copy the following code snippet:

```javascript
if (typeof API !== 'undefined' && API !== null) {
    // Randomize the score between 80 and 100
    var randomScore = Math.floor(Math.random() * 21) + 80;
    
    // Set the randomized score
    API.LMSSetValue('cmi.core.score.raw', randomScore.toString());
    
    // Set the lesson status to 'passed'
    API.LMSSetValue('cmi.core.lesson_status', 'passed');
    
    // Commit the 'passed' status
    API.LMSCommit('');
    
    // Set the lesson status to 'complete'
    API.LMSSetValue('cmi.core.lesson_status', 'complete');
    
    // Commit the 'complete' status
    API.LMSCommit('');
    
    console.log('Score set to ' + randomScore + ', lesson status set to passed and then to complete.');
} else {
    console.error('SCORM API is not available.');
}
```

Paste the code into the **Console** tab in Developer Tools.

## Step 4: Execute the Code

After pasting the code, press `Enter` to execute it. The browser will set a random score between 80 and 100, update the lesson status to "passed," and then to "complete."

## Step 5: Confirm Success

Check the console output for confirmation messages. The console should display:

```
Score set to [randomScore], lesson status set to passed and then to complete.
```

If the SCORM API was not available, an error message will be displayed instead.

## Troubleshooting

- Ensure that the Developer Tools Console is open in the correct tab where the SCORM course is running.
- If the SCORM API is not available, refresh the page and try again.