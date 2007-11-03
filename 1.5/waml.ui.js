/**
 * @author Evgenios Skitsanos
 */
if (!Waml.UI) {Waml.UI = {};}

Waml.UI.button = function(id, text, type){
	var el = document.createElement("button");
	el.id = id;
	if (type !== undefined)
	{
		el.type = type;
	}
	document.write(el.innerHTML);
};