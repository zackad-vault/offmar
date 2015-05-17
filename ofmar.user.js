// ==UserScript==
// @name           Manga Reader Offline
// @namespace      zackad's script
// @author         zackad
// @version        0.2.2
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
				.append(location)
				.prepend(location)
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
		$('body').prepend(location);
        $('.container-container').append(controler);
	}
    init();
    getLoc();
    $('#disable').click(function(){disable()});
    $('#enable').click(function(){
		init();
		enable();
        getLoc();
        $('#enable').hide();
		});
}
);