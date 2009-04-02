var Waml;if (!Waml) {Waml = {};}

if (!Waml) {alert('waml.core.js missing');}
if (!Waml.Utils) {Waml.Utils = {};}

Waml.Utils.Timer = function ()
{
	this._startTime = 0;
	this._timerID  = null;
};

Waml.Utils.Timer.prototype.start = function (expr, interval)
{
	this._startTime = new Date();
	this._timerID  = setInterval(expr, interval);
};

Waml.Utils.Timer.prototype.startOnce = function (expr, interval)
{
	this._startTime = new Date();
	this._timerID  = setTimeout(expr, interval);
};

Waml.Utils.Timer.prototype.stop = function()
{
	if(this._timerID) 
	{
      clearTimeout(this._timerID);
      this._timerID  = 0;
    }
};

Waml.Utils.Timer.prototype.reset = function()
{
	this._startTime = null;
};