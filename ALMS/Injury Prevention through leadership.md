function tester() {
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

tester();