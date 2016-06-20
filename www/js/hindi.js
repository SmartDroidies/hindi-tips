var testDevice = '9ff99ad5ec042ed6';
var analyticsId = 'UA-71910213-8';
var GCMSenderId = '541588285718'; 

var interDisplayed = 5;

// select the right Ad Id according to platform 
var admobid = {};
if( /(android)/i.test(navigator.userAgent) ) { // for android & amazon-fireos 
  platform = 'Android';
  admobid = {
    banner: 'ca-app-pub-8439744074965483/2098865251', 
    interstitial: 'ca-app-pub-8439744074965483/3575598459'
  };
}


//Device Ready Event
document.addEventListener("deviceready", onDeviceReadyAction, false);
function onDeviceReadyAction() {

	// Manage Ad
	initializeAd();

    //Initialize for Google Cloud Messaging
    initializeGCM();

    //Handle Menu 
    $( "#menu-cntrl" ).click(function() {
        if($("#menu").is(":visible")) {
            hideMenu();
        } else {
            $("#menu").show(200);
        }
    });

    //Handle Setting 
    $( "#setting-cntrl" ).click(function() {
        if($("#setting").is(":visible")) {
            hideMenu();
        } else {
            $("#setting").show(200);
        }
    });
}

function hideMenu() {
    $("#menu").hide(100);
    $("#setting").hide(100);
}


/* Ad initialization & display */
function initializeAd() {
  createBanner();
  prepareInter();
}

function createBanner() {
  var testFlag = isTestDevice();

  if(AdMob) AdMob.createBanner( {
    adId: admobid.banner, 
    position: AdMob.AD_POSITION.BOTTOM_CENTER, 
    autoShow: true, 
    isTesting: testFlag  
  } );
}

function prepareInter() {
  var testFlag = isTestDevice();
  if(AdMob) AdMob.prepareInterstitial( {adId:admobid.interstitial, autoShow:false, isTesting: testFlag} );
}

function isTestDevice() {
    var flgTestDevice = false;
    var deviceUUID = device.uuid;
    if(deviceUUID == testDevice) {
      //console.log("Test Device : " + device.uuid);
      flgTestDevice = true;
    }
    return flgTestDevice;
}

//Load AdMob Interstitial Ad
function showInterstitial() {
  if(interDisplayed > 2) {
    if(AdMob) {
      AdMob.showInterstitial();
      interDisplayed = 0;
    } 
  } else {
    interDisplayed = interDisplayed + 1;
    //console.log("Interstitial Displayed : " + interDisplayed);
  }    
}


function onInterstitialReceive (message) {
    //alert(message.type + " ,you can show it now");
    //admob.showInterstitial();//show it when received
    //setTimeout(showInterstitial, 10 * 1000);
}

function onReceiveFail (message) {
  var msg=admob.Error[message.data];
    if(msg==undefined){
       msg=message.data;
    }
    //console.log("load fail: " + message.type + "  " + msg);
} 


//Exit Implementation
document.addEventListener("backbutton", function() {
    if ( $('.ui-page-active').attr('id') == 'home') {
        exitAppPopup();
    } else {
        history.back();             
    }
}, false);

function exitAppPopup() {
    navigator.notification.confirm(
          'Exit Hindi Tips'
        , function(button) {
              if (button == 2) {
                  navigator.app.exitApp();
              } 
          }
        , 'Exit'
        , 'No,Yes'
    );  
    return false;
}

//Share the app link with user
function shareApp() {
    window.plugins.socialsharing.share('Try this great Hindi App - ', 'Hindi Tips', null, 'https://play.google.com/store/apps/details?id=com.smart.droidies.hindi.tips');

    hideMenu();
}

//Provide Feedback
function feedback() {
    window.plugin.email.open({
        to:      ['tips2stayhealthy@gmail.com'],
        subject: 'Feedback on Hindi Tips',
        body:    '',
        isHtml:  true
    });
    hideMenu();
}

//Rate App
function rateus() {
    var version = device.platform;
    hideMenu();
    if(version == "Android") {
        var url = "market://details?id=com.smart.droidies.hindi.tips";
        window.open(url,"_system");     
    } else {
        //var url = "https://play.google.com/store/apps/details?id=com.smart.droid.telugu.tips"
    }   
}

//Initialize Google Clould Messaging
function initializeGCM() {
  
  window.GCMPush.register(successHandlerGCM, errorHandlerGCM, {
       "senderId" : GCMSenderId,
      "jsCallback" : "onNotification"
  });

}

//Success Handler for GCM Resgistration
function successHandlerGCM(result) {
  console.log("GCM Successfully Registered. Token: " + result.gcm);
}

//Failure Handler for GCM Resgistration
function errorHandlerGCM(error) {
  console.log("GCM Registration Error: " + error);
}

//GCM Notification Recieved
function onNotification(id) {
  //console.log("Event Received: " + id); 
  if(!isNaN(id)) {
      //console.log("Go to recipie : " + id);
      var landingPath = "#/article/" + id;
      window.location = landingPath;
  }  
}