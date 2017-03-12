Progress.ResultsMgr.getInstance().setTopicVisitStatusAllTopics(Core.GenericConstants.COMPLETED)
var h=Progress.ResultsMgr.getInstance().masterBucket.topicStatusItems.elements();
var r=0;
while(h.hasMoreElements()){
	while(r < 70 || r > 100){
		r=Math.floor((Math.random() * 100));
	}
	var w=h.nextElement();
		
	if(w.numberOfObjectives > 0){
		w.setScore(r, false);
		r=0;
	}
}
