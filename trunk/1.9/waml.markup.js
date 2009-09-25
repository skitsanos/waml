Waml.namespace = new AMLNamespace;
ample.domConfig.setNamespace("http://www.skitsanos.com/ns/waml", Waml.namespace);

Waml.ui = {};

Waml.ui.label = function() {
};
Waml.ui.label.prototype = new AMLElement;
Waml.ui.label.prototype.value = '';
Waml.ui.label.prototype.$getTagOpen = function() {
	return '<span xtype="waml-label">' + this.value;
};

Waml.ui.label.prototype.$getTagClose = function() {
	return '</span>';
};
Waml.namespace.setElement('label', Waml.ui.label);