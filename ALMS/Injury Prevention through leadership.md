<h1>INSTRUCTIONS</h1>

<h2>TEST ONLY!!!!!!</h2>

<ul>
<li>Open your class in Internet Explorer.</li>
<li>Press the F12 key when your class is fully loaded. This will open the developer tools.</li>
<li>Click on the Console tab of the developer tools window.</li>
<li>Paste the following code in the text box at the bottom of the console tab</li>
<li>Either manually click on the green Play arrow or hold CTRL and press ENTER.</li>
</ul>

<pre><code>function tester() {
  LMSSetValue("cmi.completion_status", "completed");
  LMSSetValue("cmi.success_status", "passed");
  LMSSetValue("cmi.exit", "normal");
  LMSSetValue("adl.nav.request", "exitAll");
  LMSSetValue("cmi.scaled_passing_score", 0.8);
  LMSSetValue("cmi.score.scaled", 0.9);
  LMSSetValue("cmi.score.raw", 90);

  LMSCommit();

  top.close();
}

tester();</code></pre>
