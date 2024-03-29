/**
 * HTTP Utils
 * @author Skitsanos.com
 * @version 2.0
 */	
if (!Waml) {alert('waml.core.js missing');}
if (!Waml.Http) {Waml.Http = {};}

if (!Waml.Http.Status) {Waml.Http.Status = {};}

Waml.Http.Status.OK = 200;
Waml.Http.Status.NOT_FOUND = 404;
Waml.Http.Status.SERVER_ERROR = 500;

Waml.Http.open = function(method, url, async, result, fault, postData){
	var xr = new XMLHttpRequest();
	xr.open(method, url, async); 	
	if (method == "POST")
	{
		if (postData !== undefined)
		{
			xr.setRequestHeader("Content-length", postData.length);
		}
		xr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xr.setRequestHeader("Connection", "close");
	}	
	
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
	if (postData !== undefined)
	{
		xr.send(postData);		
	}
	else 
	{
		xr.send(null);
	}
};