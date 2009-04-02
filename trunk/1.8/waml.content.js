if (!Waml) { alert('waml.core.js missing'); }
if (!Waml.Content) { Waml.Content = {}; }

/*
feed.value.items[].link             -- Link of current item
feed.value.items[].title            -- Title of current item
feed.value.items[].description      -- description of current item
*/

Waml.Content.fetchFeed = function(url, onLoadCallback) {
	var request = "http://pipes.yahoo.com/pipes/pmH1s2ix3RGgXTQyrbQIDg/run?&_render=json&_callback="+onLoadCallback +"&feed=" + url;
	var newScript = document.createElement('script');
	newScript.type = 'text/javascript';
	newScript.src = request;
	document.getElementsByTagName("head")[0].appendChild(newScript);
};