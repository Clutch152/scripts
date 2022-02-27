// ==UserScript==
// @name         MVP Skillport Cheats
// @namespace    http://127.0.0.1/
// @version      3.0
// @description  Updated 022230172022
// @author       TyrantRex
// @match        *://library.skillport.com/*
// ==/UserScript==

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Directions:
 * 1. Take note of the course name
 * 2. Launch it and go to the table of contents
 * 3. Click through each of the items in the Table of Contents.
 *    -- You want that dotted white circle to be half green
 * 4. Press TAB when you get to the test
 * 5. Close the window and launch the course again.
 * 6. Click through any new topics that may have popped up
 * 7. Press TAB at the then refresh by clicking on the test page to finish up
 *
 * It's not perfect but will work as a minimum viable product
 *
 * You'll see two buttons under the "Save & Exit" link. (I was inspired after
 * forking the repository and stealing it from iEatNoodlez_)
 *
 * [>>] Will speed up the videos
 * [>|] Will attempt to actually let you skip the video by setting current
 *      progress right before the end of the video.
 *
 * The second button is experimental. Well, my TIS is coming to an end as well, but
 * this is to pay it forward after picking up the torch from Clutch152 back in 2020
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * As always, use at your own risk. All liabilities are assumed by the user.
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

$(document).ready(function() {
    const btnFF = document.createElement("button");
          btnFF.innerHTML = '>>';
          btnFF.style.top = '50px';
          btnFF.style.right = '40px';
          btnFF.style.zIndex = 100000;
          btnFF.style.position = 'absolute';

    const btnNext = document.createElement("button");
          btnNext.innerHTML = '>|';
          btnNext.style.top = '50px';
          btnNext.style.right = '10px';
          btnNext.style.zIndex = 100000;
          btnNext.style.position = 'absolute';

    function RunExploit() {
        var courseDataArray = Core.context.course.allTopics,
            randomScore = 0;

        for (var x = 0; x < courseDataArray.length; x++) {
            var courseData = courseDataArray[x].resultsMgr.masterBucket,
                courseInfo = courseData.getTopicStatusItems(),
                index = courseData.courseTitle + "_" + courseDataArray[x].id;

            randomScore = Math.floor(Math.random() * (100-80) + 80);

            if (courseInfo.table[index].numberOfObjectives >= 0) {
                courseInfo.table[index].pre = courseInfo.table[index].best = courseInfo.table[index].last = randomScore;
                courseInfo.table[index].masteryStatus = 1;
                courseInfo.table[index].visitStatus = 4;
                courseInfo.table[index].firstAttemptIsPreassess = true;

                randomScore = 0;
            }
        }

        Core.context.course.getResultsMgr().getMasterBucket().updateAllLessonScores();
        Core.context.course.getResultsMgr().getMasterBucket().updateAllLessonStatus();
    }

    function FastFoward() {
        for (let x = 0; x < 1000; x++) {
            setTimeout(function() {document.getElementById("videoPlayer").playbackRate=16;}, 500 * x);
        }
    }

    function Skip() {
        Control.navMgr.getMenuPanel().getSettingsPanel().autoPlayBtn.selected = true;

        var videoData = document.querySelector('video');

        for (let i = 0; i < 1000; i++) {
            setTimeout(function() {
                if(videoData.currentTime) {
                    videoData.currentTime = videoData.duration - 0.5;
                }
            }, 850 * i);
        }
    }

    document.addEventListener("keydown", function(event){
        if (event.code === "Tab") {
            RunExploit();
        }
    });

    btnFF.addEventListener('click', () => {
        FastFoward();
    });

    btnNext.addEventListener('click', () => {
        Skip();
    });

    document.body.appendChild(btnFF);
    document.body.appendChild(btnNext);
})();
