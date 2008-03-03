/**
 * Waml.Dom
 */
if (!Waml.Dom) {Waml.Dom = {}};
Waml.Dom.create = function(tagName,styleObj,className) {	
		var elm = document.createElement(tagName);
		if (styleObj) {
			for (prop in styleObj) { elm.style[prop] = styleObj[prop]; }
		}
		if (className) { elm.className = className; }
		return elm;
	};
Waml.Dom.createNS = function(ns,tagName) 
{
    var elm;
    	
	if (document.createElementNS) 
	{
		elm = document.createElementNS(ns,tagName);
	}
	else
	{
		elm = document.createElement(tagName);
		elm.setAttribute("xmlns",ns);
	}
	return elm;
};	

Waml.Dom.append = function() {
		for (var i=0;i<arguments.length;i++) {
			var arr = arguments[i];
			if (!(arr instanceof Array)) { continue; }
			if (arr.length < 2) { continue; }
			var parent = $(arr[0]);
			for (var j=1;j<arr.length;j++) {
				parent.appendChild($(arr[j]));
			}
		}
	};	
Waml.Dom.hide = function(element) {
		if (arguments.length > 1) {
			for (var i=0;i<arguments.length;i++) { Waml.Dom.hide(arguments[i]); }
			return;
		}
		if (element instanceof Array) {
			for (var i=0;i<element.length;i++) { Waml.Dom.hide(element[i]); }
			return;
		}
		var elm = $(element);
		/* ie input hack */
		var inputs_ = elm.getElementsByTagName("input");
		var inputs = [];
		for (var i=0;i<inputs_.length;i++) { inputs.push(inputs_[i]); }
		if (elm.tagName.toLowerCase() == "input") { inputs.push(elm); }
		for (var i=0;i<inputs.length;i++) {
			var inp = inputs[i];
			if (inp.type == "radio" || inp.type == "checkbox") {
				if (!inp.__checked) { inp.__checked = (inp.checked ? "1" : "0"); }
			}
		} 
		/* */
		elm.style.display = "none";
	};	
Waml.Dom.show = function(element) {
		if (arguments.length > 1) {
			for (var i=0;i<arguments.length;i++) { Waml.Dom.show(arguments[i]); }
			return;
		}
		if (element instanceof Array) {
			for (var i=0;i<element.length;i++) { Waml.Dom.show(element[i]); }
			return;
		}
		var elm = $(element);
		elm.style.display = "";
		/* ie input hack */
		var inputs_ = elm.getElementsByTagName("input");
		var inputs = [];
		for (var i=0;i<inputs_.length;i++) { inputs.push(inputs_[i]); }
		if (elm.tagName.toLowerCase() == "input") { inputs.push(elm); }
		for (var i=0;i<inputs.length;i++) {
			var inp = inputs[i];
			if (inp.type == "radio" || inp.type == "checkbox") {
				if (inp["__checked"] && inp.__checked === "1") { inp.checked = true; }
				if (inp["__checked"] && inp.__checked === "0") { inp.checked = false; }
				inp.__checked = false;
			}
		} 
		/* */
	};
Waml.Dom.clear = function(element) {
		var elm = $(element);
		while (elm.firstChild) { elm.removeChild(elm.firstChild); }
	};	
Waml.Dom.unlink = function(element) {
		var elm = $(element);
		if (!elm) { return; }
		if (!elm.parentNode) { return; }
		elm.parentNode.removeChild(elm);
	};	
Waml.Dom.isChild - function(child,parent) {
		var c_elm = $(child);
		var p_elm = $(parent);
		/* walk up from the child. if we find parent element, return true */
		var node = c_elm.parentNode;
		do {
			if (node == p_elm) { return true; }
			node = node.parentNode;
		} while (node != document.body && node != document);
		return false;
	};	
Waml.Dom.text = function(text) {
		var elm = document.createTextNode(text);
		return elm;
	};
Waml.Dom.toSafeXML = function(str) {
		if (typeof(str) != "string") { return str; }
		return str.replace(/&/g,"&amp;").replace(/>/g,"&gt;").replace(/</g,"&lt;");
	};	
Waml.Dom.fromSafeXML = function(str) {
		return str.replace(/&amp;/g,"&").replace(/&gt;/g,">").replace(/&lt;/g,"<");
	};
Waml.Dom.applyStyle = function(something,obj) {
		var elm = $(something);
		if (!elm) {return;}
		for (var p in obj) { elm.style[p] = obj[p]; }
	};	
Waml.Dom.isClass = function(something,className) {
		var elm = $(something);
		if (!elm) { return false; }
		if (className == "*") { return true; }
		if (className == "") { return false; }
		if (!elm.className) { return false; }
		var arr = elm.className.split(" ");
		var index = arr.find(className);
		return (index != -1);
	};	
Waml.Dom.addClass = function(something,className) {
		var elm = $(something);
		if (!elm) { return; }
		if (Waml.Dom.isClass(elm,className)) { return; }
		var arr = elm.className.split(" ");
		arr.push(className);
		if (arr[0] == "") { arr.splice(0,1); }
		elm.className = arr.join(" ");
	};	
Waml.Dom.removeClass = function(something,className) {
		var elm = $(something);
		if (!elm) { return; }
		if (!Waml.Dom.isClass(elm,className)) { return; } /* cannot remove non-existing class */
		if (className == "*") { elm.className = ""; } /* should not occur */
		var arr = elm.className.split(" ");
		var index = arr.find(className);
		if (index == -1) { return; } /* should NOT occur! */
		arr.splice(index,1);
		elm.className = arr.join(" ");
	};
	
Waml.Dom.toggle = function(el)
{
	if ( el.style.display != 'none' ) 
	{
		el.style.display = 'none';
	}
	else 
	{
		el.style.display = '';
	}
}