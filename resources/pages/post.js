var call = this;

dpd.pages.get({name:call.name}, function (results) {
   cancelIf(results.length > 1, "Pages must be unique.",400);
});

emit('pages:create', call);

