if (document.readyState == "interactive"){
    window.addEventListener('load', function () {
        // Access FEATURE_MANAGEMENT and dispatch it to content script
        var featureManagementData = window.FEATURE_MANAGEMENT;
        console.log(window.location.href)
        document.dispatchEvent(new CustomEvent('_feature_management_data', {
            'detail': {
                'featureManagementData': featureManagementData,
                'url': window.location.href,
            }
        }));
    });
}
