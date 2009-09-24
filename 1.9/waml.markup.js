Waml.namespace = Class.extend(AMLNamespace, {});

var waml = new AMLNamespace;
ample.domConfig.setNamespace("http://www.skitsanos.com/ns/waml", waml);

// Define component constructor
var MySuggestBox = function() {

}

 /*
MySuggestBox.prototype = new AMLElement;

// Define component members
MySuggestBox.prototype.value = '0';
MySuggestBox.prototype.setValue = function(sValue) {
	this.value = sValue;
}

MySuggestBox.prototype.$getTagOpen = function() {
	return '<div>value:' + this.value;
};
MySuggestBox.prototype.$getTagClose = function() {
	return '</div>';
};
*/

var label = Class.extend(AMLElement, {
	text: '',

	$getTagOpen: function() {
		return '<div>' + text;
	},

	$getTagClose: function() {
		return '</div>';
	}
});
//waml.setElement('label', label);

//waml.setElement("suggestbox", MySuggestBox);