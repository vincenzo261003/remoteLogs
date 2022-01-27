//Global variables
serverURL = "";

logToServer = function (consoleMsg) {
    let jsonTxt = customStringify(consoleMsg);
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", serverURL + jsonTxt, true);
    xmlHttp.send(null);
}

logToServer("Remote logs working");

(function () {
    var oldLog = console.log;
    console.log = function (message) {
        console.log("App started");
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

function customStringify(inp) {
    return JSON.stringify(inp, function (key, value) {
        if (typeof value === 'object' && value !== null) {
            if (cache.indexOf(value) !== -1) {
                console.log("circular dep found!!");
                return;
            }
            cache.push(value);
        }
        return value;
    });
}