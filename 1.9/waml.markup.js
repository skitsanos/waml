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
    return '<table border="0" cellpadding="0" cellspacing="0" class="x-btn-wrap"><tbody><tr>' +
            '<td class="x-btn-left"><i>&#160;</i></td><td class="x-btn-center"><em unselectable="on"><button class="x-btn-text" type="{1}">'+this.getAttribute('text');
};
Waml.ui.button.prototype.$getTagClose = function() {
    return '</button></em></td><td class="x-btn-right"><i>&#160;</i></td></tr></tbody></table>';
};
Waml.namespace.setElement('button', Waml.ui.button);

Waml.ui.el = function(){};
Waml.ui.el.prototype = new AMLElement;
Waml.ui.el.prototype.$getTagOpen = function(){};
Waml.ui.el.prototype.$getTagClose = function() {};
Waml.namespace.setElement('el', Waml.ui.el);