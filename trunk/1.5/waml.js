/**
 * @author Evgenios Skitsanos, (evgenios@skitsanos.com)
 * @copyright S.C. Web Atarim S.R.L.
 * @version 1.5
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


/*
 * Extended Strings
 */
String.prototype.trim = function() {
	var result = this.match(/^(\s*|\n*)*(.*?)(\W*)$/);
	return (result ? result[1] : this);
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

/*
 * Extended Arrays 
 */
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

/*
 * Extended Date
 */
Date.prototype.addWeek = function(){
	var oneWeekInMilliseconds = 1000*60*60*24*7;
    return new Date(this.getTime() + oneWeekInMilliseconds);
};

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
Waml.version = "1.5.11032007";

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
		else if(xml.childNodes && xml.childNodes.length == 1 && xml.childNodes[0].nodeName == "#text") {
			result = xml.childNodes[0].nodeValue;
		}else if(xml.documentElement){
			result = {};
			result[xml.documentElement.nodeName] = foo.Utils.convertXMLToJSON(xml.documentElement);
		}else{
			result = {};
			for(var i=0; i<xml.childNodes.length; i++) {
				if(result[xml.childNodes[i].nodeName]) {
					if(!(result[xml.childNodes[i].nodeName] instanceof Array))
					{
						result[xml.childNodes[i].nodeName] = [result[xml.childNodes[i].nodeName]];}
					result[xml.childNodes[i].nodeName].push(foo.Utils.convertXMLToJSON(xml.childNodes[i]));
				}else if(xml.childNodes[i].nodeName.indexOf('#') == -1){
					result[xml.childNodes[i].nodeName] = foo.Utils.convertXMLToJSON(xml.childNodes[i]);}
			}
		}
		
		if(xml.attributes)
		{			
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
Waml.Application.params  = function(arg, frame){
	var ret = ""; var qs = ""; var href= "";	
	if (frame === undefined)
	{href = window.location.href;}
	else
	{href = parent.frames[frame].location.href;}	
		
	if (href.indexOf("?") > -1 ){		
		qs = href.substr(href.indexOf("?")).toLowerCase();
		if (qs.startsWith("?")){
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

Waml.Application.init = function (){	
		Waml.Utils.includeJs(Waml.Application.home+"/xmlhttp.js");
};

//Now init WAML
Waml.Application.init();