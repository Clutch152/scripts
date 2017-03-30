<h1>Instructions</h1>

<h2>THIS ONLY WORKS ON A FEW CLASSES!!!</h2>

<ol>
  <li>Follow the previous instructions</li>
  <li>In the class, click "Exit" to close the class</li>
    <ol>
    <li>At this point it will NOT show as complete yet</li>
  </ol>
  <li>REOPEN the same class and then click "Exit" again to close the class.</li>
  <ol>
    <li>The class will now show as completed!!!</li>
  </ol>
</ol>

<p></br></p>

<pre><code>Progress.ResultsMgr.getInstance().setTopicVisitStatusAllTopics(Core.GenericConstants.COMPLETED)  
var h=Progress.ResultsMgr.getInstance().masterBucket.topicStatusItems.elements();  
var r=0;  
while(h.hasMoreElements()){  
    while(r &lt; 70 || r &gt; 100){  
        r=Math.floor((Math.random() * 100));  
    }  
    var w=h.nextElement();  

    if(w.numberOfObjectives &gt; 0){  
        w.setScore(r, false);  
        r=0;  
    }  
}  

top.close();
</code></pre>

