/**
*	Waml.Browser
*	Browser utilities
*	@author Skitsanos.com
*	@version 2.0
*/
if (!Waml) {alert('waml.core.js missing');}
if (!Waml.Browser) {Waml.Browser = {};}

Waml.Browser.is_safari   = function(){return navigator.userAgent.toLowerCase().indexOf('safari') != -1;};	
Waml.Browser.is_konq     = function(){return navigator.userAgent.toLowerCase().indexOf('konqueror')!= -1;};		
Waml.Browser.is_khtml    = function(){return Waml.Browser.is_safari || Waml.Browser.is_konq;};	
Waml.Browser.is_ie       = function(){return navigator.userAgent.toLowerCase().indexOf("msie") != -1;};
Waml.Browser.is_ie7      = function(){return navigator.userAgent.match(/msie 7/i);};
Waml.Browser.is_mozilla  = function(){return navigator.userAgent.toLowerCase().indexOf("gecko") != -1;};
Waml.Browser.is_opera    = function(){return navigator.userAgent.match(/Opera/);};
Waml.Browser.is_webkit   = function(){return (navigator.userAgent.match(/AppleWebKit/));};
Waml.Browser.is_mac      = function(){return (navigator.platform.toString().match(/mac/i));};


Waml.Browser.getViewport = function(){
		if (Waml.Browser.is_opera() || (Waml.Browser.is_ie() && !Waml.Browser.is_ie7())) {
			return [document.body.clientWidth,document.body.clientHeight];
		} else {
			return [document.documentElement.clientWidth,document.documentElement.clientHeight];
		}
	};
	
Waml.Browser.getScroll = function() {
		var l; var t;
		if (Waml.Browser.is_webkit() || Waml.Browser.is_ie) {
			l = document.body.scrollLeft;
			t = document.body.scrollTop;
		} else {
			l = document.documentElement.scrollLeft;
			t = document.documentElement.scrollTop;
		}
		return [l,t];
	};
Waml.Browser.getFreeSpace = function(x,y) {
		var scroll = Waml.Browser.getScroll();
		var port = Waml.Browser.getViewport();
		var spaceLeft = x - scroll[0];
		var spaceRight = port[0] - x + scroll[0];
		var spaceTop = y - scroll[1];
		var spaceBottom = port[1] - y + scroll[1];
		
		var left = (spaceLeft > spaceRight);
		var top = (spaceTop > spaceBottom);
		
		return [left,top];		
	};
	
Waml.Browser.Cookies = {};
Waml.Browser.Cookies.allowed = function()
{
	setCookie('checkCookie', 'test', 1);
	if (getCookie('checkCookie')) 
	{
      deleteCookie('checkCookie');
      return true;
	}
	
	return false;
};
Waml.Browser.Cookies.getCookie = function(name)
{
	var start = document.cookie.indexOf( name + "=" );
	var len = start + name.length + 1;
	if ( ( !start ) && ( name != document.cookie.substring( 0, name.length ) ) ) 
	{
    	return null;
	}
	if ( start == -1 ) return null;
	var end = document.cookie.indexOf( ';', len );
	if ( end == -1 ) end = document.cookie.length;
	return unescape(document.cookie.substring( len, end ));
};
Waml.Browser.Cookies.setCookie = function(name, value, expires, options)
{
	if (options===undefined) { options = {}; }
	if ( expires ) 
	{
      var expires_date = new Date();
      expires_date.setDate(expires_date.getDate() + expires)
	}
	document.cookie = name+'='+escape( value ) +
      ( ( expires ) ? ';expires='+expires_date.toGMTString() : '' ) + 
      ( ( options.path ) ? ';path=' + options.path : '' ) +
      ( ( options.domain ) ? ';domain=' + options.domain : '' ) +
      ( ( options.secure ) ? ';secure' : '' );
};

Waml.Browser.params = function()
{
	var _url = document.URL.toString();
	_url = _url.replace("#", "");
	if (_url.indexOf("?") > 0)
	{	
		var _urlParams = _url.split("?")[1].split("&");
		var _retParams = {};
		
		for (var i=0; i<_urlParams.length;i++)
		{
			var _paramPair = _urlParams[i].split("=");
			_retParams[_paramPair[0].toString()] = _paramPair[1].toString();
		}
		
		return _retParams;
	}
	else
	{
		return undefined;
	}	
};