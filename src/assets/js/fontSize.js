window.onload = function() {
    function initrem() {
        var winw = document.getElementById("app").clientWidth<=640?document.getElementById("app").clientWidth:640;
        var rootFontSize = winw / 320 * 14
        document.getElementsByTagName("html")[0].style.fontSize = rootFontSize + "px"
    }
    initrem()
    window.onresize=function(){
    	initrem()
    }

}
