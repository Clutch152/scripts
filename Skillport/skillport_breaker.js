TSIE='undefined'

TSIE=Core.context.getResultsMgr().masterBucket.topicStatusItems.elements().data;

for (i=0;i<Core.context.course.lessons.length;i++) {
	for (j=0;j<Core.context.course.lessons[i].topics.length;j++) {
			Core.context.getResultsMgr().adjustsforv(Core.context.course.lessons[i].topics[j].locID, Core.GenericConstants.C)
	}
}

var r=0;
for (i = 0; i < TSIE.length; i++) {
	while(r < 80 || r > 100){
		r=Math.floor((Math.random() * 100));
	}
	var w=TSIE[i];	
	
	if(w.numberOfObjectives > 0){
		w.setScore(r, false);
		r=0;
	}
}

Core.context.getResultsMgr().masterBucket.updateAllLessonScores()
Core.context.getResultsMgr().masterBucket.updateAllLessonStatus()

top.close();
