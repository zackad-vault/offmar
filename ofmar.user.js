// ==UserScript==
// @name           Manga Reader Offline
// @namespace      zackad's script
// @author         zackad
// @version        0.2.6
// @description    read manga offline from your folder collection
// @include        file:///*/*
// @exclude        file:///*.png
// @exclude        file:///*.jpg
// @exclude        file:///*.jpeg
// @exclude        file:///*.JPG
// @exclude        file:///*.JPEG
// @exclude        file:///*.PNG
// @exclude        file:///*.gif
// @exclude        file:///*.GIF
// @copyright      2015 zackad
// @require        http://code.jquery.com/jquery-1.10.1.min.js
// ==/UserScript==
$(document).ready(function(){
    var gvar = function(){};
    gvar.__DEBUG__ = 0;     //DEBUG MODE
    
	gvar.style = ''
		+'<style type="text/css">'
        +'.location-container {background-color:#ddd; padding:5px 10px; font-size:20px; border-radius:10px;}'
		+'.location-container a {color:blue; font-weight:bold; text-decoration:none;}'
		+'.location-container a.current {color:red;}'
        +'img {max-width:95%; max-height:900px;}'
        +'body {max-width:100%!important;}'
        +'#container {padding:0px; margin:0px;}'
        +'.black {background-color: black;}'
        +'.grey {background-color: grey;}'
        +'.white {background-color: white;}'
		+'</style>'
		;
	var container = ''
		+'<div id="container">'
		+'<center></center>'
		+'</div>'
		;
	var loc_wrp = ''
		+'<div class="location-container">'
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
    
	function enable(){		
		if (img.length != 0){
			$('body').children().remove();
			$('head').children().remove();
			$('head').append(gvar.style);
			$('body').append(container)
				.append(loc_wrp)
				.prepend(loc_wrp)
				.addClass('black').removeClass('white grey');
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
                loc.a = '<a href="file:///' + loc.temp + '" class="current">' + loc.current[i] +' / </a>';
                //title
                $('head').append('<title>'+loc.current[i]+'</title>');
            } else {
                loc.a = '<a href="file:///' + loc.temp + '">' + loc.current[i] +' / </a>';
            }
            clog(loc.a);
            $('.location-container').append(loc.a);
            clog(loc.temp);
        }
    }
    function clog(x){
        if(!gvar.__DEBUG__) return;
        console && console.log && console.log(x);
    }
    function here(){
        return window.location.href;
    }
	function init(){
		$('head').append(gvar.style);
        $('body').prepend(container).addClass('white').removeClass('grey black');
		$('body').prepend(loc_wrp);
		$('h1, .up').remove();
	}
    function lets_roll(){
		if (img.length == 0) return;
        init();
		enable();
        getLoc();
        resize();
	}
	function fit_width(){
	   $('img').css('max-width','100%').css('max-height','1000%');
	   clog('fit width');
	}
	function full_size(){
	   $('img').css('max-width','1000%').css('max-height','10000%');
	   clog('full_size');
	}
	function resize(){
    $('img').click(function(){
        clog('clicked');
        if($(this).attr('style')){
            $(this).removeAttr('style');
        }else {
            $(this).css('max-width','1000%').css('max-height','10000%');
        }
    });
    }
    function change_bg(){
        var background = $('body, #container');
        var color = background.attr('class');
        clog(color);
        switch (color){
            case 'black': background.addClass('grey').removeClass('black white'); break;
            case 'grey': background.addClass('white').removeClass('black grey'); break;
            case 'white': background.addClass('black').removeClass('grey white'); break;
        }
        clog('ch bg');
    }
/*
 * Natural Sort algorithm for Javascript - Version 0.8 - Released under MIT license
 * Author: Jim Palmer (based on chunking idea from Dave Koelle)
 */
function naturalSort (a, b) {
    var re = /(^([+\-]?(?:\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?)?$|^0x[\da-fA-F]+$|\d+)/g,
        sre = /^\s+|\s+$/g,   // trim pre-post whitespace
        snre = /\s+/g,        // normalize all whitespace to single ' ' character
        dre = /(^([\w ]+,?[\w ]+)?[\w ]+,?[\w ]+\d+:\d+(:\d+)?[\w ]?|^\d{1,4}[\/\-]\d{1,4}[\/\-]\d{1,4}|^\w+, \w+ \d+, \d{4})/,
        hre = /^0x[0-9a-f]+$/i,
        ore = /^0/,
        i = function(s) {
            return (naturalSort.insensitive && ('' + s).toLowerCase() || '' + s).replace(sre, '');
        },
        // convert all to strings strip whitespace
        x = i(a) || '',
        y = i(b) || '',
        // chunk/tokenize
        xN = x.replace(re, '\0$1\0').replace(/\0$/,'').replace(/^\0/,'').split('\0'),
        yN = y.replace(re, '\0$1\0').replace(/\0$/,'').replace(/^\0/,'').split('\0'),
        // numeric, hex or date detection
        xD = parseInt(x.match(hre), 16) || (xN.length !== 1 && Date.parse(x)),
        yD = parseInt(y.match(hre), 16) || xD && y.match(dre) && Date.parse(y) || null,
        normChunk = function(s, l) {
            // normalize spaces; find floats not starting with '0', string or 0 if not defined (Clint Priest)
            return (!s.match(ore) || l == 1) && parseFloat(s) || s.replace(snre, ' ').replace(sre, '') || 0;
        },
        oFxNcL, oFyNcL;
    // first try and sort Hex codes or Dates
    if (yD) {
        if ( xD < yD ) { return -1; }
        else if ( xD > yD ) { return 1; }
    }
    // natural sorting through split numeric strings and default strings
    for(var cLoc=0, xNl = xN.length, yNl = yN.length, numS=Math.max(xNl, yNl); cLoc < numS; cLoc++) {
        oFxNcL = normChunk(xN[cLoc], xNl);
        oFyNcL = normChunk(yN[cLoc], yNl);
        // handle numeric vs string comparison - number < string - (Kyle Adams)
        if (isNaN(oFxNcL) !== isNaN(oFyNcL)) { return (isNaN(oFxNcL)) ? 1 : -1; }
        // rely on string comparison if different types - i.e. '02' < 2 != '02' < '2'
        else if (typeof oFxNcL !== typeof oFyNcL) {
            oFxNcL += '';
            oFyNcL += '';
        }
        if (oFxNcL < oFyNcL) { return -1; }
        if (oFxNcL > oFyNcL) { return 1; }
    }
    return 0;
}
    init();
    getLoc();

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
    // caseof : \ 'backslash'
    if(keyCode == 220){
        if(img.length == 0) return;
        window.location.reload();
    }
    // caseof : ]
    if(keyCode == 221){
        if(img.length == 0) return;
        fit_width();
    }
    // caseof : [
    if(keyCode == 219){
        full_size();
    }
    // caseof : ;
    if(keyCode == 59 || keyCode == 186){
        change_bg();
    }
}, true);
}
);