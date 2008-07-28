/**
 * WAML Events
 */
if (!Waml) {alert('waml.core.js missing');}
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