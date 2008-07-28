var Waml;if (!Waml) {Waml = {};}
Waml.version = "1.7.29072008";

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

Array.prototype.append = function(arr) 
{
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