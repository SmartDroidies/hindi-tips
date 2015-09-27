//Device Ready Event
document.addEventListener("deviceready", onDeviceReadyAction, false);
function onDeviceReadyAction() {

	// Manage Ad
	initializeAd();

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


function initializeAd() {

	admob.initAdmob("ca-app-pub-8439744074965483/2098865251","ca-app-pub-8439744074965483/3575598459");
    document.addEventListener(admob.Event.onInterstitialReceive, onInterstitialReceive, false);
    document.addEventListener(admob.Event.onInterstitialFailedReceive,onReceiveFail, false);
    document.addEventListener(admob.Event.onBannerFailedReceive,onReceiveFail, false);

    admob.showBanner(admob.BannerSize.BANNER, admob.Position.BOTTOM_CENTER, null);
  	admob.cacheInterstitial();

}

//Load AdMob Interstitial Ad
function showInterstitial(){
    admob.isInterstitialReady(function(isReady){
        if(isReady){
            admob.showInterstitial();
        }
    });
}

function onInterstitialReceive (message) {
    //alert(message.type + " ,you can show it now");
    //admob.showInterstitial();//show it when received
}

function onReceiveFail (message) {
 	var msg=admob.Error[message.data];
    if(msg==undefined){
       msg=message.data;
    }
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
