# LaunchDarkly Feature Flag Viewer

## Purpose
This extension enables Solutions Engineers at LaunchDarkly to customize their demo's. It currently has 2 main modes of operation:
1. Overlay Graphic tied to feature flag - If a custom block is not assigned, the extension will force a purple box overlay on top of whatever web page is loaded. The overlay can be triggered to the configured feature flag
2. Custom Block Hide - When a custom block is configured, any object with the conifgurd ID or CLASS can be hidden with the configured feature flag

## Installation
Ensure developer mode is enabled in the Chrome extensions management:

chrome://extensions/

Clone the repository. Then from the Chrome Extensions management page, click "Load unpacked" and select the root folder of the repository "ld-demo-extension". The extension should now be available in the Chrome extension menu
