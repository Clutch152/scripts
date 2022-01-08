// ==UserScript==
// @name         Break SkillPort
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Skillport Bypass
// @author       iEatNoodlez_
// @match        *://*.skillport.com/*
// ==/UserScript==

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *                                                                               *
 * Directions:                                                                   *
 * 1. Install Greasemonkey (Google Chrome) or Tampermonkey (Firefox)             *
 * 2. Click "Raw" in the top right of this box.                                  *
 * 3. Press Button or press "S" once the course has launched and loaded          *
 *    completely.                                                                *
 * 4. Use your mouse to click each of the items in the Table of Contents twice.  *
 *    Green progress circle will fill in with each click.                        *
 * 5. Press Button or "S" when you get to the test to get a passing grade.       *
 *                                                                               *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

(function() {
    const btn = document.createElement('button');
    btn.textContent = 'First and Last Run';
    btn.style.zIndex = 100000;
    btn.style.backgroundColor = '#fff';
    btn.style.position = 'absolute';
    btn.style.top = '50%';
    btn.style.left = '50%';
    btn.style.fontSize = "30px";
    btn.style.cursor = "pointer";
    document.body.appendChild(btn);

    function FirstandLastRun() {
        var a = Core.context.getResultsMgr().masterBucket.getTopicItems().data;
        for (i = 0; i < a.length; i++) {
            var b = a[i];
            if (a[i].numberOfObjectives >= 0) {
                b.pre = b.best = b.last = 100;
                b.masteryStatus = 1;
                b.visitStatus = 4;
                b.firstAttemptIsPreassess = true;
            }
        }
        Core.context.getResultsMgr().masterBucket.updateAllLessonScores();
        Core.context.getResultsMgr().masterBucket.updateAllLessonStatus();
    }

    btn.addEventListener('click', () => {
        maybeSkipMedia();
    });
    document.addEventListener("keypress", ({key}) => {
        if (key === 's') {
            FirstandLastRun();
        }
    });
})();
