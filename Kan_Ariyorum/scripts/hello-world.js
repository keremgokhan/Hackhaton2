// JavaScript Document

// Wait for PhoneGap to load
document.addEventListener("deviceready", onDeviceReady, false);
var global = {};
var pages=['#tabstrip-home','#tabstrip-uiinteraction','#tabstrip-geolocation'];
var swipeIndex=0;
// PhoneGap is ready
function onDeviceReady() {
    getLocation();
    navigator.splashscreen.hide();

    if(window.localStorage.getItem('DonorId') != null)
    {
        $('#buttons').attr('style','display:none');
        app.navigate( "mainMenu.html#welcomeScreen","slide:right");
    }
    
    $('#tabstrip-home').kendoTouch({
            filter:">div",
            enableSwipe: true,
            swipe: swipe
        });
    
}

function getLocation() {
    navigator.geolocation.getCurrentPosition(onGeolocationSuccess, onGeolocationError);
}

//=======================Say Hello (Page 1) Operations=======================//
function sayHello() {
    var sayHelloInputElem = document.getElementById('helloWorldInput');
    var sayHelloTextElem = document.getElementById('helloWorldText');
    var inputText = document.getElementById('txtName');

    sayHelloTextElem.innerHTML = 'Hello, ' + inputText.value + '!';
    sayHelloTextElem.style.display = 'block';
    sayHelloInputElem.style.display = 'none';
}

function sayHelloReset() {
    var sayHelloInputElem = document.getElementById('helloWorldInput');
    var sayHelloTextElem = document.getElementById('helloWorldText');
    var inputText = document.getElementById('txtName');

    inputText.value = '';
    sayHelloTextElem.style.display = 'none';
    sayHelloInputElem.style.display = 'block';
}

//=======================Geolocation Operations=======================//
// onGeolocationSuccess Geolocation
function onGeolocationSuccess(position) {
    // Use Google API to get the location data for the current coordinates
    var geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    geocoder.geocode({ "latLng": latlng }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            if ((results.length > 1) && results[1]) {
                $("#myLocation").html(results[1].formatted_address);
            }
        }
    });

    // Use Google API to get a map of the current location
    // http://maps.googleapis.com/maps/api/staticmap?size=280x300&maptype=hybrid&zoom=16&markers=size:mid%7Ccolor:red%7C42.375022,-71.273729&sensor=true
    var googleApis_map_Url = 'http://maps.googleapis.com/maps/api/staticmap?size=300x300&maptype=hybrid&zoom=16&sensor=true&markers=size:mid%7Ccolor:red%7C' + latlng;
    var mapImg = '<img src="' + googleApis_map_Url + '" />';
    $("#map_canvas").html(mapImg);
}

// onGeolocationError Callback receives a PositionError object
function onGeolocationError(error) {
    $("#myLocation").html("<span class='err'>" + error.message + "</span>");
}

function openFacebookRegister(rad)
{
    alert('Not implemented!');
    /*global.radius = rad;
    app.navigate('MapMode.html#map','slide:right');*/
    
}

function openMap(rad)
{
    global.radius = rad;
    app.navigate('MapMode.html#map','slide:right');
    
}
function swipe(e){
    if(e.direction=="left" && swipeIndex<2)
    {
        var page =pages[++swipeIndex];
        app.navigate(page,'slide:left');
    }
    else if(e.direction=="right" && swipeIndex>0)
    {
                var page =pages[--swipeIndex];
        app.navigate(page,'slide:right');
    }
}
