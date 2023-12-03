chrome.storage.local.clear(function() {
    console.log('Storage cleared');
});

$(document).ready(function() { 
    function injectScript(file, node) {
        var th = document.getElementsByTagName(node)[0];
        var s = document.createElement('script');
        s.setAttribute('type', 'text/javascript');
        s.setAttribute('src', file);
        th.appendChild(s);
    }
    injectScript( chrome.extension.getURL('/js/script.js'), 'body');
    document.addEventListener('_feature_management_data', featureManagementDataListener);
})

function injectScriptJsListener() {
    // Inject script after the page has fully loaded
    var script = document.createElement('script');
    script.src = chrome.extension.getURL('js/script.js');
    (document.head || document.documentElement).appendChild(script);
    script.onload = function () {
        script.remove();
    };
}

function featureManagementDataListener(e) {
    console.log(e.detail)
    // Send FEATURE_MANAGEMENT data to background script
    chrome.runtime.sendMessage({ featureManagementData: e.detail.featureManagementData, url: e.detail.url });
}
