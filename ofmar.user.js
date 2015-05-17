// ==UserScript==
// @name           Manga Reader Offline
// @namespace      zackad's script
// @author         zackad
// @version        0.2.3
// @description    read manga offline from your folder collection
// @include        file:///*/*
// @copyright      2015 zackad
// @require        http://code.jquery.com/jquery-1.10.1.min.js
// ==/UserScript==
$(document).ready(function(){
    var gvar = function(){};
    gvar.__DEBUG__ = 0;     //DEBUG MODE
    
	gvar.style = ''
		+'<style type="text/css">'
		+'a {color:blue; font-weight:bold; text-decoration:none}'
		+'a.current {color:red;}'
        +'img {max-width:90%!important; max-height:900px!important;}'
		+'</style>'
		;
	var container = ''
		+'<div id="container" style="background-color:black; float:center; padding:0px; margin:0px;">'
		+'<center></center>'
		+'</div>'
		;
	var loc_wrp = ''
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
    //var controler = '<a href="javascript:void(0);" id="disable">disable</a>';
    var controler = ''
        //+'<button id="disable" value="Disable">'
        +'<img src="http://puu.sh/hPVpp/7e21ef7286.png"'
        +'id="enable" alt="Read This Folder!">'
        //+'<button id="enable">Read this folder</button>'
        ;
    
	function enable(){		
		if (img.length != 0){
			$('body').children().remove();
			$('head').children().remove();
			$('head').append(gvar.style);
			$('body').append(container)
				.append(loc_wrp)
				.prepend(loc_wrp)
				.css('background-color','black');
			//$('.location-container').append('controler');
		}
		img.each(function(){
			var temp = $(this).attr('href');
			var image = '<img src="' + temp + '"><br>';
			$('#container center').append(image);
		});
		
    }
    //find current location
    function getLoc(){
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
        $('.location-container').append(controler);
    }
    function clog(x){
        if(!gvar.__DEBUG__) return;
        console && console.log && console.log(x);
    }
    function here(){
        return window.location.href;
    }
    function disable(){
        //$('body').load((here());
        clog(here());
    }
	function init(){
		var temp = $('body').children();
		//$('body').children().remove();
        $('body').prepend(container);
		$('body').prepend(loc_wrp);
        $('.container-container').append(controler);
	}
    function lets_roll(){
		init();
		enable();
        getLoc();
        $('#enable').hide();
	}
    init();
    getLoc();
    $('#disable').click(function(){disable()});
    $('#enable').click(lets_roll);
    
    /* Hotkey */
    window.addEventListener('keydown', function(e) {
    var keyCode = e.keyCode;
    var CSA = [e.ctrlKey, e.shiftKey, e.altKey];
    //console.log(keyCode);
    //console.log(String(CSA) + '; '+keyCode);
    
    // caseof : Enter
    if(keyCode == 13 ){
        lets_roll();
    }
    if(keyCode == 220){
        window.location.reload();
    }
}, true);
}
);