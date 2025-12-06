//This will complete everything but the last question.

function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + value + expires + "; path=/";
}

var cookieValue = "ShowTextOn=1&userMode=dod&courseMode=kc&name=&lesson_00_params=visited:[0]complete:[0]questions:[0]&lesson_01_params=visited:[1,1,1,1]complete:[0,1,0,1]questions:[0,0,0,0]&lesson_02_params=visited:[1,1,0,0,0,0,0]complete:[1,1,0,0,0,0,0]questions:[2,0,0,0,0,0,0]&lesson_03_params=visited:[1,1,1,1,1,1,1,1,1]complete:[1,1,1,1,1,1,1,1,1]questions:[1,0,0,0,0,1,1,1,0]&lesson_04_params=visited:[1,1,0,0,0,0,0,0,0,0,1]complete:[1,1,0,0,0,0,0,0,0,0,1]questions:[3,0,0,0,0,0,0,0,0,0,0]&lesson_05_params=visited:[1,1,0,0,0,0,0,0,0,1]complete:[1,1,0,0,0,0,0,0,0,1]questions:[3,0,0,0,0,0,0,0,0,0]&lesson_06_params=visited:[1,1,1,1,1,1,1,1]complete:[1,1,1,1,1,1,1,1]questions:[1,0,0,0,0,2,2,0]&lesson_07_params=visited:[1,1,1,1,1,1,1,1]complete:[1,1,1,1,1,1,1,1]questions:[0,0,0,0,0,1,1,0]&lesson_08_params=visited:[1,1,0,0,0,0,0,0,0,1]complete:[1,1,0,0,0,0,0,0,0,1]questions:[2,0,0,0,0,0,0,0,0,0]&lesson_09_params=visited:[1,1,0,0,0,0,0,0,0]complete:[1,1,0,0,0,0,0,0,0]questions:[1,0,0,0,0,0,0,0,0]&lesson_10_params=visited:[1,1,0,0,0,0,0]complete:[1,1,0,0,0,0,0]questions:[1,0,0,0,0,0,0]&lesson_11_params=visited:[1,1,0,0,0,0,0,1]complete:[1,1,0,0,0,0,0,1]questions:[1,0,0,0,0,0,0,0]&lesson_12_params=visited:[1,1,0,0,0,0,0]complete:[1,1,0,0,0,0,0]questions:[2,0,0,0,0,0,0]&lesson_13_params=visited:[0,0,0,0,0,0,0,0]complete:[0,0,0,0,0,0,0,0]questions:[0,0,0,0,0,0,0,0]&lesson_14_params=visited:[1,1,0,0,0,0,0]complete:[1,1,0,0,0,0,0]questions:[1,0,0,0,0,0,0]&lesson_15_params=visited:[1,1,1,1,1,1,1,1,1,1,1]complete:[1,1,1,1,1,1,1,1,1,1,1]questions:[2,0,0,0,0,1,1,1,0,0,0]&lesson_16_params=visited:[1,1,0,0,0,0,0,0,0]complete:[1,1,0,0,0,0,0,0,0]questions:[2,0,0,0,0,0,0,0,0]&lesson_17_params=visited:[1,1,0,0,0,0,0,0]complete:[1,1,0,0,0,0,0,0]questions:[1,0,0,0,0,0,0,0]&lesson_18_params=visited:[0,0,0,0]complete:[0,0,0,0]questions:[0,0,0,0]&LastVisitedModule=lesson_12&disa-cac-2023-fy22CurrentPageNum=2&disa-cac-2023-fy22CurrentBranchPageNum=0&MainMenuOpen=1&randomQuestions=false&";

setCookie("disa-cac-2023-fy22", cookieValue, 365);
location.reload();
