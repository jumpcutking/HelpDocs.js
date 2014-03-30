var call = this;
call.name = call.name.toLowerCase();
call.parent = call.parent.toLowerCase();

if (!call.parent) {
    var parentPage = {};
    dpd.pages.get({name:call.parent}, function (results) {
        parentPage = results;
    });
    
    cancelIf(!parentPage, "Parents must be a previous page.");
}