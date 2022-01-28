//Global variables
serverURL = "";

logToServer = function (consoleMsg) {
    // var xmlHttp = new XMLHttpRequest();
    // xmlHttp.open("GET", serverURL + jsonTxt, true);
    // xmlHttp.send(null);
    document.getElementById("test").innerHTML = consoleMsg;
}

logToServer("Remote logs working");

(function () {
    var oldLog = console.log;
    console.log = function (message) {
        logToServer(message);
        oldLog.apply(console, arguments);
    };
})();

if (window && !window.onerror) {
    window.onerror = function (errorMsg, url, lineNumber, column, errorObj) {
        logToServer(errorMsg);
        logToServer(errorObj);
        return false;
    }
}