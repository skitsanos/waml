/**
 * @author Skitsanos
 */


function alertHelloWorld(oEvent) {
    alert('Element "' + oEvent.target.tagName + '" was clicked');
}


Waml.Http.open('data.xml', null,
        function(e) {
            console.log('result');
            console.log(e);
        },
        function(xr, ex) {
            console.log('fault');
            console.log(ex);
        });