# JKO (Joint Knowledge Online) Automation Scripts

This directory contains automation scripts designed to streamline the completion of JKO courses. Two primary scripts are available, each serving different use cases and levels of automation complexity.

---

## 📋 Available Scripts

### 1. [Simple JKO Script](./simplejko.md) - Manual Lesson Automation
**Status**: ✅ Working (as of May 2024)  
**Contributor**: [@v0rl0x](https://github.com/v0rl0x)

A lightweight, single-lesson automation script that requires manual execution on each lesson page.

### 2. [FY26 JKO Script](./FY26-JKO.md) - Comprehensive Course Automation
**Status**: ✅ Working (FY26 - Most Recent)  
**Contributor**: [@TySP-Dev](https://github.com/TySP-Dev)

An advanced, feature-rich automation system with both manual and fully automated course completion modes.

---

## 🔍 Comparison: Which Script Should You Use?

| Feature | Simple JKO | FY26 JKO (Advanced) |
|---------|------------|---------------------|
| **Automation Level** | Manual (per lesson) | Semi or Fully Automated |
| **Setup Complexity** | Very Simple | Moderate |
| **Progress Tracking** | ❌ None | ✅ Real-time percentage display |
| **Auto-Navigation** | ❌ Manual next lesson | ✅ Automatic progression |
| **Start/Resume Detection** | ❌ Manual | ✅ Automatic button detection |
| **Retry Logic** | ❌ None | ✅ Smart retry with max attempts |
| **Exit Threshold** | ❌ Manual exit | ✅ Auto-exit at configurable % |
| **Course Duration Detection** | ❌ None | ✅ Automatic delay for long courses |
| **Manual Controls** | ❌ None | ✅ Full control API (start/stop/status) |
| **Lesson Completion Verification** | ❌ Basic | ✅ Checkmark detection |
| **Error Handling** | ⚠️ Basic | ✅ Comprehensive with logging |
| **Best For** | Quick single lessons | Full course automation |

---

## 💡 Usage Recommendations

### **Use Simple JKO Script When:**
- ✅ You only need to complete **a few individual lessons**
- ✅ You want **minimal script complexity**
- ✅ You prefer **manual control** over each step
- ✅ You're **testing** or learning how SCORM automation works
- ✅ The course has **unconventional structure** that may break automation

### **Use FY26 JKO Script When:**
- ✅ You need to complete an **entire course** (multiple lessons)
- ✅ You want **hands-off automation**
- ✅ You need **progress monitoring** and status updates
- ✅ The course is **long** (8+ hours) and requires timed delays to avoid detection
- ✅ You want **retry logic** for lessons that fail to complete
- ✅ You need **fine-grained control** via the `JKOAuto` API

---

## 🚀 Quick Start Guide

### For Simple JKO Script:
1. Navigate to a JKO lesson page
2. Open Developer Tools (`F12` or `Ctrl+Shift+I`)
3. Open the **Console** tab
4. Paste the script from [simplejko.md](./simplejko.md)
5. Press `Enter`
6. **Manually navigate** to the next lesson and repeat

### For FY26 JKO Script:
1. Navigate to your JKO course overview page
2. Open Developer Tools (`F12` or `Ctrl+Shift+I`)
3. Open the **Console** tab
4. (Optional) Adjust configuration variables (`progressThreshold`, `hourThreshold`)
5. Paste the automation script from [FY26-JKO.md](./FY26-JKO.md)
6. Press `Enter`
7. The script **automatically handles** Start/Resume, lesson progression, and exit

---

## ⚙️ Advanced Features (FY26 Script Only)

The FY26 script includes an interactive `JKOAuto` control API:

```javascript
// Check current status and progress
JKOAuto.status()

// View detected course duration
JKOAuto.getDuration()

// Change exit threshold (default: 93%)
JKOAuto.setThreshold(95)

// Change hour-based wait threshold (default: 8 hours)
JKOAuto.setHourThreshold(10)

// Change max retry attempts (default: 5)
JKOAuto.setMaxRetries(3)

// Manual controls
JKOAuto.stop()         // Pause automation
JKOAuto.start()        // Resume automation
JKOAuto.clickNext()    // Force next lesson
JKOAuto.clickExit()    // Force exit course
```

---

## 📝 Important Notes

### Test Handling
Both scripts handle JKO tests, but behavior differs:

- **Simple JKO**: After the lesson is marked complete (green checkmark appears), **refresh the page** to restore the "Next Lesson" button.
- **FY26 JKO**: Automatically detects completion status and handles navigation, including test pages.

### Government Computer Restrictions
> **⚠️ Limitation**: Developer Tools are typically disabled on government computers without S6 administrative privileges. For best results, execute these scripts on a **personal device**.

### Course Duration and Detection Avoidance
The **FY26 script** includes intelligent wait logic:
- Automatically detects course duration from the page title (e.g., "Course Name (20 hrs)")
- If the course exceeds the `hourThreshold` (default: 8 hours), the script waits proportionally before starting automation
- This helps avoid triggering time-tracking telemetry that may flag suspicious activity

---

## 📚 Additional Resources

- **SERE Training**: See [SERE_LEVEL_A](./SERE_LEVEL_A/) for specialized SERE course scripts
- **General JKO Tips**: Both scripts rely on SCORM API injection. Ensure the course page is fully loaded before executing.

---

## 🤝 Contributing

If you discover issues with these scripts or develop improvements, please submit an issue or pull request to the repository. Your contributions help keep these tools functional across JKO platform updates.
