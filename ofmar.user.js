// ==UserScript==
// @name           Manga Reader Offline
// @namespace      zackad's script
// @author         zackad
// @version        0.1
// @description    read manga offline from your folder collection
// @include        file:///*/*
// @copyright      2015 zackad
// @require        http://code.jquery.com/jquery-1.10.1.min.js
// ==/UserScript==
$(document).ready(function(){
    var gvar = function(){};
    gvar.__DEBUG__ = 1;     //DEBUG MODE
    gvar.style = ''
        +'<style type="text/css">'
        +'a {color:blue; font-weight:bold; text-decoration:none}'
        +'a.current {color:red;}'
        +'</style>'
        ;
    var container = ''
        +'<div id="container" style="background-color:black; float:center; padding:0px; margin:0px;">'
        +'<center></center>'
        +'</div>'
        ;
    var location = ''
        +'<div class="location-container" style="background-color:#999; padding:5px 10px; font-size:24px;">'
        +'</div>'
        ;
    var imgSelector = ''
        +'a[href$=".jpg"],'
        +'a[href$=".jpeg"],'
        +'a[href$=".png"],'
        +'a[href$=".PNG"],'
        +'a[href$=".JPG"],'
        +'a[href$=".JPEG"],'
        +'a[href$=".gif"]';
    var img = $(imgSelector);
    //console.log(img);
    
    if (img.length != 0){
        $('body').children().remove();
        $('head').children().remove();
        $('head').append(gvar.style);
        $('body').append(container)
            .append(location)
            .prepend(location)
            .css('background-color','black');
    }
    img.each(function(){
        var temp = $(this).attr('href');
        //console.log(temp);
        var image = '<img src="' + temp + '"><br>';
        $('#container center').append(image);
    });
    //find current location
    var loc = function(){};
    loc.current = window.location.href;
    loc.current = decodeURI(loc.current);
    loc.current = loc.current.split('/');
    loc.i = loc.current.length;
    loc.temp = '';
    for (var i=3; i < loc.current.length-1; i++){
        loc.temp += loc.current[i]+ '/';
        if (i == loc.i-2){
            loc.a = '<a href="' + loc.temp + '" class="current">' + loc.current[i] +' || </a>';
        } else {
            loc.a = '<a href="' + loc.temp + '">' + loc.current[i] +' || </a>';
        }
        clog(loc.a);
        $('.location-container').append(loc.a);
        clog(loc.temp);
    }
    clog(loc.current);
    clog(loc.current[4]);
    
    function clog(x){
        if(!gvar.__DEBUG__) return;
        console && console.log && console.log(x);
    }
}
);