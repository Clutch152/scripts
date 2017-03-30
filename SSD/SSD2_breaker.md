<h1>INSTRUCTIONS</h1>

<ul>
<li>Open your class in Internet Explorer.</li>
<li>Press the F12 key when your class is fully loaded. This will open the developer tools.</li>
<li>Click on the Console tab of the developer tools window.</li>
<li>Paste the following code in the text box at the bottom of the console tab.</li>
<li>Either manually click on the green Play arrow or hold CTRL and press ENTER.</li>
</ul>

<p><br /></p>

<pre><code>if (typeof(cwsObj) != "undefined") {
    cwsObj.getCourseCompleted=function(){return true};
    cwsObj.user.courseScore=100;
    cwsObj.session.finished();
}
else {
    this.location=curTemplate+'.html?passingPage='+totalPages;
}</code></pre>
