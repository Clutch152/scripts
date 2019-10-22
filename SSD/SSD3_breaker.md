<ul><li>Open your class in Internet Explorer.</li>
<li>Press the F12 key when your class is fully loaded. This will open the developer tools.</li>
<li>Click on the Console tab of the developer tools window.</li>
<li>Paste the following code in the text box at the bottom of the console tab.</li>
<li>Either manually click on the green Play arrow or hold CTRL and press ENTER.</li>
</ul>
If this no longer works then try the one located https://github.com/Clutch152/scripts/blob/f60cee5508f73a6405f4ecee5f580ac47a069c23/SSD/SSD3_breaker.md

<p><br /></p>

<pre>
<code>if (typeof(document.frames[1]) == "undefined") {
  SCOSetValue("cmi.completion_status", "complete");
  SCOSetValue("cmi.success_status", "passed");
  SCOSetValue("cmi.exit", "normal");
  SCOSetValue("adl.nav.request", "continue");
  SCOCommit();
  SCOFinish();
  top.close();
 }
 else {
  test=document.frames[1];
  r=0; 
  while(r < 0.8 || r > 1){
    r=Math.floor((Math.random() * 100)) / 100;
  }
 
  test.LMSSetValue("cmi.scaled_passing_score", 0.8);
  test.LMSSetValue("cmi.score.scaled", r);
  test.LMSSetValue("cmi.completion_status", "completed");
  test.LMSSetValue("cmi.success_status", "passed");
  test.LMSSetValue("cmi.score.raw", r*100);
  test.LMSSetValue("adl.nav.request", "continue");
  top.close();
 }
  </code>
</pre>
<b>20190227 - For the actual Test</b><br />
Open your class in Internet Explorer.<br />
Press the F12 key when your test is fully loaded (it should say submit). This will open the developer tools.<br />
Click on the Console tab of the developer tools window.<br />
Paste the following code in the text box at the bottom of the console tab.<br />
Either manually click on the green Play arrow or hold CTRL and press ENTER.<br />
<pre>
  <code>score=0;
while(score < 80 || score > 100){
	score=Math.floor(Math.random()*1000)
}
cwsObj.getCourseCompleted=function(){return true};
cwsObj.user.courseScore=score;
cwsObj.session.finished();
  </code>
</pre>
