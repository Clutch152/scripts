
# Deprecated

Skillport is no longer in use by the US Army for DL points. 

### _*.user.js_ Scripts

Userscripts are taking the way in not only automating course completion, but in making it more user friendly to handle and update scripts.

#### Installation

1. Install the [Tampermonkey](https://chrome.google.com/webstore/detail/dhdgffkkebhmkfjojejmpbldmpobfkfo) extension for Chrome/Edge or [Greasemonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/) extension for Firefox
2. Restart your browser
2. Click on the "Raw" button of the `*.user.js` file in top the right of the code box. 
3. Tampermonkey/Greasemonkey should pick up the fact that it's a `*.user.js` file and prompt you to install. Click "Install"
4. The next time you close a sprint in planning, breathe a sigh of relief

#### Usage

Usage is based on each individual Userscript. Please read directions or description in each one before using it.

### MITM (_Man in the Middle_)
MITM technique involves altering your POST headers. [GotEmCoach](https://github.com/GotEmCoach) has provided a technique that is based off of linux. 

#### Installation

Run a linux shell with `sudo` privileges and paste the following:

```
sudo apt install git
mkdir mitm_docs
cd mitm
wget https://raw.githubusercontent.com/Clutch152/scripts/master/Skillport/mitmproxy_instructions.md
wget https://raw.githubusercontent.com/Clutch152/scripts/master/Skillport/mitmproxy_vimrc
cp ./mitmproxy_vimrc ~/.vimrc
vim mitmproxy_instructions.md
```

#### Usage

After installation you can follow along with the onscreen instructions. Moving of the vimrc is already done. 
