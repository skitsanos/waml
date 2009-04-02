if (!Waml) { alert('waml.core.js missing'); }
if (!Waml.Dom) { alert('waml.dom.js missing'); }
if (!Waml.Xml) { Waml.Xml = {}; }

Waml.Xml.createElement = function(name, data) {
    var el = Waml.Dom.create(name);
    if (data != undefined) {
        el.appendChild(Waml.Dom.text(data));
    }
    return el;
};


Waml.Xml.transform = function(_xml, _xsl, _id) {
    //Gecko
    if (window.XSLTProcessor) {
        var xsltProcessor = new XSLTProcessor();
        xsltProcessor.importStylesheet(_xsl);
        var fragment = xsltProcessor.transformToFragment(_xml, document);
        var target = document.getElementById(_id);

        target.innerHTML = '';
        target.appendChild(fragment);
    }
    //Internet Explorer
    else if (window.ActiveXObject) {
        var target = document.getElementById(_id);
        target.innerHTML = _xml.transformNode(_xsl);
    }
}
