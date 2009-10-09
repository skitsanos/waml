/**
 * @author Skitsanos
 */


function alertHelloWorld(oEvent) {
    alert('Element "' + oEvent.target.tagName + '" was clicked');
}


Waml.Http.open('test.js',
        function(e) {
            console.log(e);
        },
        function(e) {
            console.log(e);
        });