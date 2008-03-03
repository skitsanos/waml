/**
 * @author Evgenios Skitsanos, (evgenios@skitsanos.com)
 * @copyright Skitsanos.com
 */
debug = function(msg){
	if (console){
		console.log(msg);
	}
	if (document.getElementById("debug") == undefined){	
		var dbg = document.createElement("debug");
		dbg.id = "debug";
		document.body.appendChild(dbg);
		dbg.innerHTML = msg;
	}
	$("debug").innerHTML = msg;
	$("debug").style.position = "absolute";
	$("debug").style.color = "#990000";
	$("debug").style.display = "block";
	$("debug").style.width = "400px";
	$("debug").style.border = "dotted 1px #990000";
	$("debug").style.top = "10px";	
	$("debug").style.left = "600px";
};

function $(something) {
	var elm;
	if (typeof(something) == "string") {
		elm = document.getElementById(something);
	} else {
		elm = something;
	}
	if (something instanceof Array) {
		elm = [];
		for (var i=0;i<something.length;i++) { elm.push($(something[i])); }
	}
	if (!elm)
	{
		return false;
	} else {
		return elm;
	}	
}

function $$(something) {
	var e = $(something);
	if (!e) {return false;}
	if (!("value" in e)) {return false;}
	return e.value;
}

function $v(something) {
	var e = $(something);
	if (!e) {return false;}
	if (!("value" in e)) {return false;}
	return e.value;
}

function typeOf(value) {
    var s = typeof value;
    if (s === 'object') {
        if (value) {
            if (typeof value.length === 'number' &&
                    !(value.propertyIsEnumerable('length')) &&
                    typeof value.splice === 'function') {
                s = 'array';
            }
        } else {
            s = 'null';
        }
    }
    return s;
}


/*
 * Extended Strings
 */
String.prototype.reverse = function() {
    var s = "";
    var i = this.length;
    while (i>0) {
        s += this.substring(i-1,i);
        i--;
    }
    return s;
};
String.prototype.trim = function() {
	var result = this.match(/^ *(.*?) *$/);
	return (result ? result[1] : this);
};

String.prototype.ltrim = function() {
   return this.replace(/^\s+/g,"");
};

String.prototype.rtrim = function() {
   return this.replace(/\s+$/g,"");
};

String.prototype.repeat = function(times) {
	var ret = '';
	for (var i=0;i<times;i++) { ret += this; }
	return ret;
};

String.prototype.startsWith = function(str){
	return (this.indexOf(str)===0);
};

String.prototype.endsWith = function(str){
	var reg = new RegExp(str + "$");
	return reg.test(this);
};
String.prototype.mid = function(start, len){
	if (start < 0 || len < 0) return "";
    var iEnd, iLen = String(this).length;
    if (start + len > iLen)
          iEnd = iLen;
    else
          iEnd = start + len;
    return String(this).substring(start,iEnd);
};

String.prototype.htmlEntities = function () {
   return this.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
};

String.prototype.stripTags = function () {
   return this.replace(/<([^>]+)>/g,'');
};

Object.prototype.isArray = function() {return this.constructor == Array;};
Object.prototype.getElementsByClass = function (searchClass, tag) {      
   var returnArray = [];
   tag = tag || '*';
   var els = this.getElementsByTagName(tag);
   var pattern = new RegExp('(^|\\s)'+searchClass+'(\\s|$)');
   for (var i = 0; i < els.length; i++) {
      if ( pattern.test(els[i].className) ) {
         returnArray.push(els[i]);
      }
   }
   return returnArray;
};

window.getInnerWidth = function() {
    if (window.innerWidth) {
        return window.innerWidth;
    } else if (document.body.clientWidth) {
        return document.body.clientWidth;
    } else if (document.documentElement.clientWidth) {
        return document.documentElement.clientWidth;
    }
};

window.getInnerHeight = function() {
    if (window.innerHeight) {
        return window.innerHeight;
    } else if (document.body.clientHeight) {
        return document.body.clientHeight;
    } else if (document.documentElement.clientHeight) {
        return document.documentElement.clientHeight;
    }
};

Number.max = function (a,b) {
    return a<b?b:a;
};

Number.min = function (a,b) {
    return a>b?b:a;
};

Math.mod = function(val,mod) {
    if (val < 0) {
        while(val<0) val += mod;
        return val;
    } else {
        return val%mod;
    }
};

/*
 * Extended Arrays 
 */
Array.prototype.sortNum = function(){return this.sort( function (a,b) { return a-b; } );};

Array.prototype.exists = function (x) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == x) return true;
    }
    return false;
};

Array.prototype.compareArrays = function(arr) {
    if (this.length != arr.length) return false;
    for (var i = 0; i < arr.length; i++) {
        if (this[i].compareArrays) { //likely nested array
            if (!this[i].compareArrays(arr[i])) return false;
            else continue;
        }
        if (this[i] != arr[i]) return false;
    }
    return true;
};

Array.prototype.random = function() {
    return this[Math.floor((Math.random()*this.length))];
};

Array.prototype.filter = function(fnc) {
    var a = new Array();
    for (var i = 0; i < this.length; i++) {
        if (fnc(this[i])) {
            a.push(this[i]);
        }
    }
    return a;
};

Array.prototype.find = function(str) {
	var index = -1;
	for (var i=0;i<this.length;i++){
		if (this[i] == str) { index = i; }
	}	
	return index;
};

Array.prototype.append = function(arr) {
	var a = arr;
	if (!(arr instanceof Array)) { a = [arr]; }
	for (var i=0;i<a.length;i++) { this.push(a[i]); }
};

if (Array.prototype.pop == null)  // IE 5.x fix from Igor Poteryaev.
{
	Array.prototype.pop = function()
	{
    	var UNDEFINED;
		if (this.length === 0) {return UNDEFINED;}
        return this[--this.length];
    };
}

if (Array.prototype.push == null) // IE 5.x fix from Igor Poteryaev.
{
	Array.prototype.push = function()
	{
    	for (var i = 0; i < arguments.length; ++i) {this[this.length] = arguments[i];}
        return this.length;
    };
}		

/*
 * Extended Date
 */
Date.prototype.format = function(formatStr) {
	var result = formatStr;
	result = result.replace(/d/,this.getDate().toString().leadingZero(2));
	result = result.replace(/g/,parseInt(this.getHours(),0) % 12);
	result = result.replace(/G/,this.getHours());
	result = result.replace(/h/,(parseInt(this.getHours(), 0) % 12).toString().leadingZero(2));
	result = result.replace(/H/,this.getHours().toString().leadingZero(2));
	result = result.replace(/i/,this.getMinutes().toString().leadingZero(2));
	result = result.replace(/j/,this.getDate());
	result = result.replace(/m/,(this.getMonth()+1).toString().leadingZero(2));
	result = result.replace(/n/,this.getMonth()+1);
	result = result.replace(/s/,this.getSeconds().toString().leadingZero(2));
	result = result.replace(/U/,this.getTime());
	result = result.replace(/w/,this.getDay());
	result = result.replace(/Y/,this.getFullYear());	
	return result;
};


/**
 * WAML JavaScript Framework
 */

var Waml;if (!Waml) {Waml = {};}
Waml.version = "1.6.03032008";

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
/**
 * HTTP Utils
 */	
if (!Waml.Http) {Waml.Http = {};}

if (!Waml.Http.Status) {Waml.Http.Status = {};}

Waml.Http.Status.OK = 200;
Waml.Http.Status.NOT_FOUND = 404;
Waml.Http.Status.SERVER_ERROR = 500;

Waml.Http.open = function(method, url, async, result, fault, options){
	var xr = new XMLHttpRequest();
	xr.open(method, url, async); 
	if (method == "POST") {xr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");}	
	
	xr.onreadystatechange = function() {
		switch (this.readyState)		
		{
			case XMLHttpRequest.LOADING:
				window.status = "Loading...";
				break;
			case XMLHttpRequest.DONE:
				switch (xr.status)
				{
					case Waml.Http.Status.OK:
						result(xr);					
						break;
					case Waml.Http.Status.NOT_FOUND:
						fault(xr);
						break;
					case Waml.Http.Status.SERVER_ERROR:
						fault(xr);
						break;
					default:
						fault(xr);
						break;
				}				
				break;
		}
	};	
	if (options !== undefined && options.postData !== undefined)
	{
		xr.send(options.postData);
	}
	else {
		xr.send(null);
	}
};
		
/**
 * WAML Events
 */
if (!Waml.Events) {Waml.Events = {};}

Waml.Events.List = [];

Waml.Events._attach = function(element,event,callback) {
		if (element.addEventListener) {
			/* gecko */
			element.addEventListener(event,callback,false);
		} else if (element.attachEvent) {
			/* ie */
			element.attachEvent("on"+event,callback);
		} else {
			/* ??? */
			element["on"+event] = callback;
		}
	};
	
Waml.Events._detach = function(element,event,callback) {
		if (element.removeEventListener) {
			/* gecko */
			element.removeEventListener(event,callback,false);
		} else if (element.detachEvent) {
			/* ie */
			element.detachEvent("on"+event,callback);
		} else {
			/* ??? */
			element["on"+event] = false;
		}
	};
	
Waml.Events.attach = function(elm,event,callback) {
		var element = $(elm);
		Waml.Events.List.push([element,event,callback]);
		Waml.Events._attach(element,event,callback);
	};
	
Waml.Events.detach = function(elm,event,callback) {
		var element = $(elm);
		var index = -1;
		for (var i=0;i<Waml.Events.List.length;i++) {
			var rec = Waml.Events.List[i];
			if (rec[0] == element && rec[1] == event && rec[2] == callback) { index = i; }
		}
		if (index != -1) { Waml.Events.List.splice(index,1); }
		Waml.Events._detach(element,event,callback);
	};

Waml.Events.detachAll = function(elm) {
		var element = $(elm);
		var indexArr = [];
		for (var i=0;i<Waml.Events.List.length;i++) {
			var rec = Waml.Events.List[i];
			if (rec[0] == element) { indexArr.push(i); }
		}
		for (var x=indexArr.length-x;x>=0;x--) {
			var index = indexArr[x];
			var event = Waml.Events.List[index][1];
			var callback = Waml.Events.List[index][2];
			Waml.Events._detach(element,event,callback);
			Waml.Events.List.splice(index,1); 
		}
	};
	


if (!Waml.Utils) {Waml.Utils = {};}

Waml.Utils.defined = function(obj) {return typeof obj != 'undefined';};
Waml.Utils.hex2dec = function(hex_str) {return parseInt(hex_str,16);};	
Waml.Utils.dec2hex = function(num) {return num.toString(16);};
Waml.Utils.iif = function (cond, t_stmt, f_stmt) 
{
    if(cond){
	return t_stmt();
    }else if(f_stmt){
	return f_stmt();
    }
  };
Waml.Utils.color   = function(str) {
		/* returns [col1,col2,col3] in decimal */
		var tmpstr; var tmp;
		
		if (str.match(/#/)) {			
			/* hex */
			if (str.length == 4) {
				tmpstr = "#"+str.charAt(1)+str.charAt(1)+str.charAt(2)+str.charAt(2)+str.charAt(3)+str.charAt(3);
			} else {
				tmpstr = str;
			}
			tmp = tmpstr.match(/#(..)(..)(..)/);
			return [Waml.Utils.hex2dec(tmp[1]),Waml.Utils.hex2dec(tmp[2]),Waml.Utils.hex2dec(tmp[3])];
		} else {
			/* decimal */
			tmp = str.match(/\(([^,]*),([^,]*),([^\)]*)/);
			return [parseInt(tmp[1],0),parseInt(tmp[2],0),parseInt(tmp[3],0)];
		}
	};

Waml.Utils.includeJs = function(url){
	if (Waml.Application.modules.find(url) == -1)
	{
		Waml.Http.open("GET", url, false, function(req){
			eval(req.responseText);		
			Waml.Application.modules.push(url);
		}, function(req){
			alert(req.responseText);
		});
		
		/*
		var s = Waml.Dom.create("script",{});
		s.type = "text/javascript";
		s.src = url;
		Waml.Dom.append([document.getElementsByTagName("head").item(0),s]);
		Waml.Application.modules.push(url);	
		*/		
	}		
};

/**
 * Includes stylesheet
 * @param {String} url
 */
Waml.Utils.includeCss = function(url)
{
	var cssNode = document.getElementById(url);
	if (cssNode===null)
	{
		var html_doc = document.getElementsByTagName('head').item(0);
		var css = document.createElement('link');
		css.setAttribute('type', 'text/css');
		css.setAttribute('href', url);
		css.setAttribute('id', url);
		css.setAttribute('rel', 'stylesheet');
		html_doc.appendChild(css);
	}
};


Waml.Utils.updateContent = function (ele, url)
{
	Waml.Http.open("GET", url, true, function(req){$(ele).innerHTML = req.responseText;}, function(req){$(ele).innerHTML = req.responseText;});
};
	
/**
 * Log error
 * @param {Object} msg
 */
Waml.Utils.LogError = function(msg){
	var errDiv = document.getElementById("waml-error-report");
	if (errDiv !== null)
	{ 
		errDiv.innerHTML = errDiv.innerHTML+msg+'<p />';
	}
	else
	{
		errDiv = document.createElement("div");
		errDiv.style.zIndex = 999999;
		errDiv.id = "waml-error-report";
		errDiv.className = "waml-error";
		errDiv.innerHTML = msg;
		var htmlBody = document.documentElement; 
		htmlBody.appendChild(errDiv);	
	}	
};

Waml.Utils.getElementsByClass = function(searchClass, node, tag)
{
	var classElements = []; 
	if(node === null) {node = document;} 
	if(tag === null) {tag = '*';} 
	
	var els = node.getElementsByTagName(tag); 
	var elsLen = els.length; 
	var pattern = new RegExp("(^|\s)"+searchClass+"(\s|$)"); 
	for (i = 0, j = 0; i < elsLen; i++)
	{ 
	if(pattern.test(els[i].className))
		{
			classElements[j] = els[i]; j++;
		}
	}
return classElements;
};

Waml.Utils.today = new Date();

Waml.Utils.XmlToJson = function(xml)
{
	var result;
		if(xml.childNodes && xml.childNodes.length === 0){
			result = null;
		}
		else if(xml.childNodes && xml.childNodes.length == 1 && xml.childNodes[0].nodeName == "#text") 
		{
			result = xml.childNodes[0].nodeValue;
		}
		else if(xml.childNodes && xml.childNodes.length == 1 && xml.childNodes[0].nodeName == "#cdata-section") 
		{
			result = xml.childNodes[0].nodeValue;
		}		
		else if(xml.documentElement)
		{
			result = {};
			result[xml.documentElement.nodeName] = Waml.Utils.XmlToJson(xml.documentElement);
		}else{
			result = {};
			for(var i=0; i<xml.childNodes.length; i++) {
				if(result[xml.childNodes[i].nodeName]) {
					if(!(result[xml.childNodes[i].nodeName] instanceof Array))
					{
						result[xml.childNodes[i].nodeName] = [result[xml.childNodes[i].nodeName]];}
					result[xml.childNodes[i].nodeName].push(Waml.Utils.XmlToJson(xml.childNodes[i]));
				}else if(xml.childNodes[i].nodeName.indexOf('#') == -1){
					result[xml.childNodes[i].nodeName] = Waml.Utils.XmlToJson(xml.childNodes[i]);}
			}
		}
		
		if(xml.attributes)
		{			
			if (result == undefined)
			{
				result = {};
			}
			for(var j=0; j<xml.attributes.length; j++){
				result['@'+xml.attributes[j].nodeName] = xml.attributes[j].nodeValue;}
		}
		return result;
};

/**
 * Waml.Application
 */
if (!Waml.Application) {Waml.Application = {};}

Waml.Application.home ="/waml";
Waml.Application.modules = [];
Waml.Application.warn    = function(msg){alert(msg);};
Waml.Application.title   = function(msg){window.document.title = msg;};
Waml.Application.debugMode = false;
Waml.Application.params   = function(arg, frame){
	var ret = ""; 
	var qs = ""; 
	var href= "";
	
	if (frame === undefined)
	{
		href = window.location.href;
	}
	else
	{
		href = parent.frames[frame].location.href;
	}	
		
	if (href.indexOf("?") > -1 ){		
		qs = href.substr(href.indexOf("?")).toLowerCase();
		if (qs.startsWith("?"))
		{
			qs = qs.substr(2,qs.length-1);
		}
		var args = qs.split("&");		
		for (var i = 0; i < args.length; i++ ){
			var aParam = args[i].split("=");
			if (aParam[0] == arg){
				ret = aParam[1];
				break;
			}						
		}	
	}			
	return ret; 
};

Waml.Application.init = function (path){	
		//Waml.Utils.includeJs("/xmlhttp.js");
};

Waml.Application.Style = {};
Waml.Application.Style.getCSSRule = function(ruleName, deleteFlag) 
{
   ruleName=ruleName.toLowerCase(); 
   if (document.styleSheets) {      
      for (var i=0; i<document.styleSheets.length; i++) { 
         var styleSheet=document.styleSheets[i];
         var ii=0;                              
         var cssRule=false;                      
         do {                                   
            if (styleSheet.cssRules) {          
               cssRule = styleSheet.cssRules[ii];
            } else {                             
               cssRule = styleSheet.rules[ii];    
            }                                    
            if (cssRule)  {                      
               if (cssRule.selectorText.toLowerCase()==ruleName) { 
                  if (deleteFlag=='delete') {    
                     if (styleSheet.cssRules) {  
                        styleSheet.deleteRule(ii);
                     } else {                     
                        styleSheet.removeRule(ii);
                     }                            
                     return true;                 
                  } else {                        
                     return cssRule;              
                  }                               
               }                                  
            }                                     
            ii++;                                 
         } while (cssRule)                        
      }                                           
   }                                              
   return false;                                  
}                    

Waml.Application.Style.addCSSRule = function(ruleName)
{       
  if (document.styleSheets) {        
    if (!Waml.Application.Style.getCSSRule(ruleName)) {    
      if (document.styleSheets[0].addRule) {       
        document.styleSheets[0].addRule(ruleName, null,0);
      } else {                   
        document.styleSheets[0].insertRule(ruleName+' { }', 0);
      }        
    }           
  }              
  return Waml.Application.Style.getCSSRule(ruleName);   
};

Waml.Application.Style.killCSSRule = function (ruleName) 
{     
  return Waml.Application.Style.getCSSRule(ruleName,'delete');  
}; 

//Now init WAML
//Waml.Application.init();