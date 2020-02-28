test=document.frames[1].frames[1].frames[1].parent.API_1484_11;
test.dataModelInterface.root.containers.cmi.elements.scaled_passing_score.writeable=true;

r=0;
while(r < 0.8 || r > 1){
  r=Math.floor((Math.random() * 100))/100;
}

test.SetValue("cmi.scaled_passing_score", 0.8);
test.SetValue("cmi.score.scaled", r);
test.SetValue("cmi.completion_status", "completed");
test.SetValue("cmi.success_status", "passed");
test.SetValue("cmi.score.raw", r*100);
test.SetValue("adl.nav.request", "continue");

test.completeUserSession(true);
