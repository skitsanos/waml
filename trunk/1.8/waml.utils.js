if (!Waml) {alert('waml.core.js missing');}
if (!Waml.Utils) {Waml.Utils = {};}

Waml.Utils.defined = function(obj) {return typeof obj != 'undefined';};
Waml.Utils.hex2dec = function(hex_str) {return parseInt(hex_str,16);};	
Waml.Utils.dec2hex = function(num) {return num.toString(16);};
Waml.Utils.iif = function (cond, t_stmt, f_stmt) {if(cond){return t_stmt();}else if(f_stmt){return f_stmt();}};
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
	if (!Waml.Http) {alert('waml.http.js missing');}
	Waml.Http.open("GET", url, true, function(req){$(ele).innerHTML = req.responseText;}, function(req){$(ele).innerHTML = req.responseText;});
};
	
Waml.Utils.getElementsByClass = function (searchClass, tag) 
{
   var returnArray = [];
   tag = tag || '*';
   var els = document.getElementsByTagName(tag);
   var pattern = new RegExp('(^|\\s)'+searchClass+'(\\s|$)');
   for (var i = 0; i < els.length; i++) 
   {
      if ( pattern.test(els[i].className) ) 
      {
         returnArray.push(els[i]);
      }
   }
   return returnArray;
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