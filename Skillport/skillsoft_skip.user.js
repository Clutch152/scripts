/*
 * MIT License
 *
 * Copyright (c) 2021 Ruya Gong
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
*/

/*
 * INSTRUCTIONS
 *
 * 1. Install Greasemonkey (Firefox) or Tampermonkey (Google Chrome)
 * 2. Click Raw in the top left of this code box
 * 3. Install user script (should be a popup)
 * 4. Use the "Skip Video" button or press key "s" to skip the training video/audio.
 *
 * Copyright (c) 2021 Ruya Gong
 *
*/
 
// ==UserScript==
// @name         Skip skillsoft
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Skip training videos on Skillsoft
// @author       Ruya Gong
// @match        https://*.skillport.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const btn = document.createElement('button');
    btn.textContent = 'Skip Video';
    btn.style.zIndex = 100000;
    btn.style.backgroundColor = '#fff';
    btn.style.position = 'absolute';
    btn.style.top = '50%';
    btn.style.left = '50%';
    btn.style.fontSize = "30px";
    btn.style.cursor = "pointer";

    document.body.appendChild(btn);

    function maybeSkipMedia() {
        const mediaList = document.querySelectorAll('video,audio');
        for (const media of mediaList) {
            if (media && Number.isFinite(media.duration)) {
                media.currentTime = media.duration;
            }
        }
    }

    btn.addEventListener('click', () => {
        maybeSkipMedia();
    });
    document.addEventListener("keypress", ({key}) => {
        if (key === 's') {
            maybeSkipMedia();
        }
    });
})();
