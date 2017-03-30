<h1>INSTRUCTIONS</h1>

<ul>
<li>Open your class in Internet Explorer.</li>
<li>Press the F12 key when your class is fully loaded. This will open the developer tools.</li>
<li>Click on the Console tab of the developer tools window.</li>
<li>Paste the following code in the text box at the bottom of the console tab.</li>
<li>Either manually click on the green Play arrow or hold CTRL and press ENTER.</li>
</ul>

<p><br /></p>

<pre><code>test=scorm_api.parent.API_1484_11;

test.dataModelInterface.root.containers.cmi.elements.scaled_passing_score.writeable=true;
test.SetValue("cmi.scaled_passing_score", 0.8);
test.SetValue("cmi.score.scaled", 0.9);
test.SetValue("cmi.completion_status", "completed");
test.SetValue("cmi.success_status", "passed");
test.SetValue("cmi.score.raw", 90);
test.SetValue("adl.nav.request", "continue");

test.Commit();
test.FrameworkTerminate();
test.completeUserSession(true);</code></pre>
