<pre><code>TSIE='undefined'
if (Progress.ResultsMgr == undefined) {
	Core.context.getResultsMgr().setTVSAll(Core.GenericConstants.C)
	TSIE=Core.context.getResultsMgr().masterBucket.topicStatusItems.elements();
}
else {
	Progress.ResultsMgr.getInstance().setTopicVisitStatusAllTopics(Core.GenericConstants.COMPLETED)
	TSIE=Progress.ResultsMgr.getInstance().masterBucket.topicStatusItems.elements();
}
	
var r=0;
while(TSIE.hasMoreElements()){
	while(r < 70 || r > 100){
		r=Math.floor((Math.random() * 100));
	}
	var w=TSIE.nextElement();
		
	if(w.numberOfObjectives > 0){
		w.setScore(r, false);
		r=0;
	}
}

top.close();</code></pre>
