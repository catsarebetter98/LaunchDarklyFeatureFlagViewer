$(document).ready(function() { 
	chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
		if (message.featureManagementData) {
			// Pass FEATURE_MANAGEMENT data to popup.js
			chrome.storage.local.set({ 'featureManagementData': message.featureManagementData, 'url': message.url });
		}
	});
})
