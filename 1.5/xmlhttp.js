/**
 * @author Sergey Ilinsky (http://www.ilinsky.com)
 */
(function () {

	// Save reference to earlier defined object implementation (if any)
	var xXMLHttpRequest	= window.XMLHttpRequest;

	// Constructor
	function XMLHttpRequest() {
		this.object	= xXMLHttpRequest ? new xXMLHttpRequest : new window.ActiveXObject('Microsoft.XMLHTTP');
	}

	// BUGFIX: Firefox with Firebug installed would break pages if not executed
	if (xXMLHttpRequest && xXMLHttpRequest.wrapped)
		XMLHttpRequest.wrapped	= xXMLHttpRequest.wrapped;

	// Constants
	XMLHttpRequest.UNSENT	= 0;
	XMLHttpRequest.OPEN		= 1;
	XMLHttpRequest.SENT		= 2;
	XMLHttpRequest.LOADING	= 3;
	XMLHttpRequest.DONE		= 4;

	// Public Properties
	XMLHttpRequest.prototype.readyState		= XMLHttpRequest.UNSENT;
	XMLHttpRequest.prototype.responseText	= "";
	XMLHttpRequest.prototype.responseXML	= null;
	XMLHttpRequest.prototype.status			= 0;
	XMLHttpRequest.prototype.statusText		= "";

	// Class-level Events Handlers
	XMLHttpRequest.onreadystatechange	= null;
	XMLHttpRequest.onopen				= null;
	XMLHttpRequest.onsend				= null;
	XMLHttpRequest.onabort				= null;

	// Instance-level Events Handlers
	XMLHttpRequest.prototype.onreadystatechange	= null;

	// Public Methods
	XMLHttpRequest.prototype.open = function(sMethod, sUrl, bAsync, sUser, sPassword) {

		// Store parameters
		this.method		= sMethod;
		this.url		= sUrl;
		this.async		= bAsync;

		// Set the onreadystatechange handler
		var self	= this,
			nState	= this.readyState;

		this.object.onreadystatechange	= function() {
			// Synchronize states
					self.readyState		= self.object.readyState;
			try {	self.responseText	= self.object.responseText;	} catch (e) {}
			try {	self.responseXML	= self.object.responseXML;	} catch (e) {}
			try {	self.status			= self.object.status;		} catch (e) {}
			try {	self.statusText		= self.object.statusText;	} catch (e) {}

			// BUGFIX: Firefox fires unneccesary DONE when aborting
			if (self.aborted) {
				self.readyState	= self.constructor.UNSENT;
				delete self.aborted;
				return;
			}

			// BUGFIX: Internet Explorer cache issue
			// TODO

			//
			if (self.readyState == self.constructor.DONE) {
				// BUGFIX: Remove onreadystatechange (Internet Explorer memory leak)
				self.object.onreadystatechange	= new Function;

				// BUGFIX: Annoying <parsererror /> in invalid XML responses
				if (self.responseXML && self.responseXML.documentElement.tagName == "parsererror")
					self.responseXML	= null;
			}

			// BUGFIX: Gecko misses readystatechange calls in synchronous requests (this is executed when firebug is enabled)
			if (!self.async && self.constructor.wrapped) {
				self.readyState	= self.constructor.OPEN;
				while (++self.readyState < self.constructor.DONE)
					fReadyStateChange(self);
			}

			// BUGFIX: Some browsers (Internet Explorer, Gecko) fire OPEN readystate twice
			if (nState != self.readyState)
				fReadyStateChange(self);

			nState	= self.readyState;
		}

		// Add method sniffer
		if (this.constructor.onopen)
			this.constructor.onopen.apply(this, arguments);

		this.object.open(sMethod, sUrl, bAsync, sUser, sPassword);

		// BUGFIX: Gecko misses readystatechange calls in synchronous requests
		if (!this.async && window.navigator.userAgent.match(/Gecko\//)) {
			this.readyState	= this.constructor.OPEN;

			fReadyStateChange(this);
		}
	};
	
	XMLHttpRequest.prototype.send = function(vData) {
		// Add method sniffer
		if (this.constructor.onsend)
			this.constructor.onsend.apply(this, arguments);

		this.object.send(vData);

		// BUGFIX: Gecko misses readystatechange events
		if (!this.async && !this.constructor.wrapped) {
			while (this.readyState++ < this.constructor.DONE)
				fReadyStateChange(this);
		}
	};
	
	XMLHttpRequest.prototype.abort	= function() {
		// Add method sniffer
		if (this.constructor.onabort)
			this.constructor.onabort.apply(this, arguments);

		// BUGFIX: Firefox fires unneccesary DONE when aborting
		if (this.readyState > this.constructor.UNSENT)
			this.aborted	= true;

		this.object.abort();
	};
	
	XMLHttpRequest.prototype.getAllResponseHeaders	= function() {
		return this.object.getAllResponseHeaders();
	};
	
	XMLHttpRequest.prototype.getResponseHeader	= function(sName) {
		return this.object.getResponseHeader(sName);
	};
	XMLHttpRequest.prototype.setRequestHeader	= function(sName, sValue) {
		return this.object.setRequestHeader(sName, sValue);
	};
	XMLHttpRequest.prototype.toString	= function() {
		return "[object XMLHttpRequest]";
	};
	XMLHttpRequest.toString	= function() {
		return "[XMLHttpRequest]";
	};

	// Helper function
	function fReadyStateChange(self) {
		// Execute onreadystatechange
		if (self.onreadystatechange)
			self.onreadystatechange.apply(self);

		// Sniffing code
		if (self.constructor.onreadystatechange)
			self.constructor.onreadystatechange.apply(self);
	};

	// Internet Explorer 5.0 (missing apply)
	if (!Function.prototype.apply) {
		Function.prototype.apply	= function(self, oArguments) {
			if (!oArguments)
				oArguments	= [];
			self.__func	= this;
			self.__func(oArguments[0], oArguments[1], oArguments[2], oArguments[3], oArguments[4]);
			delete self.__func;
		};
	}

	// Register new object with window
	window.XMLHttpRequest	= XMLHttpRequest;
})();
