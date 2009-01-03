if (!Waml) { alert('waml.core.js missing'); }
if (!Waml.Xml) { Waml.Xml = {}; }

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
