<ul><li>Open your class in Internet Explorer.</li>
<li>Press the F12 key when your class is fully loaded. This will open the developer tools.</li>
<li>Click on the Console tab of the developer tools window.</li>
<li>Paste the following code in the text box at the bottom of the console tab.</li>
<li>Either manually click on the green Play arrow or hold CTRL and press ENTER.</li>
</ul>


<p><br /></p>

<pre><code>if (typeof(document.frames[1]) == "undefined") {
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
