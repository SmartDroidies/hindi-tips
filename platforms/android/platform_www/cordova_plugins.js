cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/com.phonegap.plugins.PushPlugin/www/PushNotification.js",
        "id": "com.phonegap.plugins.PushPlugin.PushNotification",
        "pluginId": "com.phonegap.plugins.PushPlugin",
        "clobbers": [
            "PushNotification"
        ]
    },
    {
        "file": "plugins/cordova-plugin-whitelist/whitelist.js",
        "id": "cordova-plugin-whitelist.whitelist",
        "pluginId": "cordova-plugin-whitelist",
        "runs": true
    },
    {
        "file": "plugins/hu.dpal.phonegap.plugins.SpinnerDialog/www/spinner.js",
        "id": "hu.dpal.phonegap.plugins.SpinnerDialog.SpinnerDialog",
        "pluginId": "hu.dpal.phonegap.plugins.SpinnerDialog",
        "merges": [
            "window.plugins.spinnerDialog"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.device/www/device.js",
        "id": "org.apache.cordova.device.device",
        "pluginId": "org.apache.cordova.device",
        "clobbers": [
            "device"
        ]
    },
    {
        "file": "plugins/com.admob.plugin/www/AdmobPlugin.js",
        "id": "com.admob.plugin.AdmobAd",
        "pluginId": "com.admob.plugin",
        "clobbers": [
            "window.admob"
        ]
    },
    {
        "file": "plugins/cordova-plugin-x-socialsharing/www/SocialSharing.js",
        "id": "cordova-plugin-x-socialsharing.SocialSharing",
        "pluginId": "cordova-plugin-x-socialsharing",
        "clobbers": [
            "window.plugins.socialsharing"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.inappbrowser/www/inappbrowser.js",
        "id": "org.apache.cordova.inappbrowser.inappbrowser",
        "pluginId": "org.apache.cordova.inappbrowser",
        "clobbers": [
            "window.open"
        ]
    },
    {
        "file": "plugins/de.appplant.cordova.plugin.email-composer/www/email_composer.js",
        "id": "de.appplant.cordova.plugin.email-composer.EmailComposer",
        "pluginId": "de.appplant.cordova.plugin.email-composer",
        "clobbers": [
            "cordova.plugins.email",
            "plugin.email"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.dialogs/www/notification.js",
        "id": "org.apache.cordova.dialogs.notification",
        "pluginId": "org.apache.cordova.dialogs",
        "merges": [
            "navigator.notification"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.dialogs/www/android/notification.js",
        "id": "org.apache.cordova.dialogs.notification_android",
        "pluginId": "org.apache.cordova.dialogs",
        "merges": [
            "navigator.notification"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "com.phonegap.plugins.PushPlugin": "2.5.0",
    "cordova-plugin-whitelist": "1.0.0",
    "hu.dpal.phonegap.plugins.SpinnerDialog": "1.3.1",
    "org.apache.cordova.device": "0.3.0",
    "com.admob.plugin": "5.0.4",
    "cordova-plugin-x-socialsharing": "5.0.2",
    "org.apache.cordova.inappbrowser": "0.6.0",
    "de.appplant.cordova.plugin.email-composer": "0.8.2",
    "org.apache.cordova.dialogs": "0.3.0"
}
// BOTTOM OF METADATA
});