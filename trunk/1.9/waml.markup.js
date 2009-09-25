Waml.namespace = new AMLNamespace;
ample.domConfig.setNamespace("http://www.skitsanos.com/ns/waml", Waml.namespace);

Waml.ui = {};

Waml.ui.label = function() {
};
Waml.ui.label.prototype = new AMLElement;
Waml.ui.label.prototype.value = '';
Waml.ui.label.prototype.$getTagOpen = function() {
	return '<span xtype="waml-label">' + this.getAttribute('text');
};

Waml.ui.label.prototype.$getTagClose = function() {
	return '</span>';
};
Waml.namespace.setElement('label', Waml.ui.label);

Waml.ui.button = function(){};
Waml.ui.button.prototype = new AMLElement;
Waml.ui.button.prototype.$getTagOpen = function(){
    return '<table class="waml-button"><tr><td class="waml-button-tl"></td><td class="waml-button-tc"></td><td class="waml-button-tr"></td></tr><tr><td class="waml-button-ml"></td><td class="waml-button-ml">'+this.getAttribute('text');
};
Waml.ui.button.prototype.$getTagClose = function() {
    return '</td><td class="waml-button-mr"></td></tr><tr><td class="waml-button-bl"></td><td class="waml-button-bc"></td><td class="waml-button-br"></td></tr></table>';
};
Waml.namespace.setElement('button', Waml.ui.button);


//waml twitter bar? http://code.google.com/p/realtime-related-tweets-bar/downloads/list
Waml.ui.el = function(){};
Waml.ui.el.prototype = new AMLElement;
Waml.ui.el.prototype.$getTagOpen = function(){};
Waml.ui.el.prototype.$getTagClose = function() {};
Waml.namespace.setElement('el', Waml.ui.el);