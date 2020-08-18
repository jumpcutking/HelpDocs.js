var _r = {};
var _e = {};
var onPage = "";
var defaultSettings;

function loadSettings() {
  $("#title").text(defaultSettings.title);
  $("#brandlogo").attr("src", defaultSettings.logo);
}

$(function() {


  $("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
  });


  dpd.settings.get({name: "default"}).then(function(data) {
      defaultSettings = data[0].value;
      loadSettings();
    }, function(err) {
      // do something with the error
      console.log(err.errors.message); // display the error message
    });

  $("body").on("click","#save", function () {
    //set the settings

    tinymce.triggerSave();
    //nicEditors.findEditor("html").saveContent();

    dpd.pages.get({name: $("#name").val()}, function(results, error) {
      if (results.length < 1) {
        //brand new post
        _r = results;
        _e = error;
        dpd.pages.post({name: $("#name").val(), title: $("#title").val(),parent: $("#parent").val(), html: $("#html").val()}, function (response, error) {
          if(error) {
            displayMessage(JSON.stringify(error));
          } else {
            var now = new Date();
            displayMessage("Saved! " + now.toString());
            loadHelpDoc($("#name").val());
          }
        });

      } else {

        dpd.pages.put(results[0].id,{name: $("#name").val(), title: $("#title").val(),parent: $("#parent").val(), html: $("#html").val()}, function (response, error) {
          if(error) {
            displayMessage(JSON.stringify(error));
            loadHelpDoc($("#name").val());
          } else {
            var now = new Date();
            displayMessage("Saved! " + now.toString());
            loadHelpDoc($("#name").val());
          }
        });

      }

    });

  });

  $("body").on("click","#pull", function () {
    EditPage($("#name").val());
  });

  $("body").on("click",".action", function() {
    loadHelpDoc($(this).data("page"));
  });
  $("body").on("click","#showtoolkit", function() {
    $('#showtoolkit').css('display','none');$('#toolkit').css('display','block');
  });
  $("body").on("click","#hidetoolkit", function () {
    $('#showtoolkit').css('display','block');$('#toolkit').css('display','none');
  });

  $("body").on("click","#clear", function () {
    $("#name").val("");
    $("#parent").val("");
    $("#title").val("");
    tinyMCE.activeEditor.setContent("");
    tinyMCE.saveContent();
  });

  loadNavigation();
  loadHelpDoc("home");

  //listen to docs
  dpd.on('pages:create', function() {
      loadNavigation();
  });

  dpd.on('pages:update', function(post) {
    _r = post;
    if (onPage == post.id) {
      loadHelpDoc(page);
      loadNavigation();
    }
  });



});

function loadHelpDoc(page) {
  dpd.pages.get({name: page}, function(results, error) {
    _r = results;
    _e = error;
    $("#page").html("<header><h1>" + results[0].title + "</h1></header>" + results[0].html);
    $("#name").val(results[0].name);
    $(".on").removeClass("on");
    $('*[data-page="' + results[0].name + '"]').addClass("on");
    onPage = results[0].id;

    $("#name").val(results[0].name);
    $("#parent").val(results[0].parent);
    $("#title").val(results[0].title);
    tinyMCE.activeEditor.setContent(results[0].html);
    tinyMCE.saveContent();
    
  });
}

function loadNavigation() {
  $("#menu").html("");
  dpd.pages.get({parent: "", $sort:{parent:-1}}, function(results, error) {
    for (var i=0;i<results.length;i++) {
      //var ele = $("a").addClass("action").data("page",results[i].name).html(results[i].name);
      var title = results[i].title;
      if (title == "") {title = results[i].name;}
      $("#menu").append("<div class='list-group-item list-group-item-action bg-black text-white'><a class='action' href='#" + results[i].name + "' data-page='" + results[i].name + "'>" + title+ "</a><span data-parent='"  + results[i].name + "'></span></div>");
      _loadRecursiveNavigation(results[i].name,1);
    }
  });
}

function displayMessage($msg) {
    if ($("#message").is(":visible")) {
    } else {
      $("#message").show();
    }

    $("#message").html($msg);
    setTimeout('$("#message").hide()',10000);
}

function EditPage(page) {
  dpd.pages.get({name: page}, function(results, error) {
      if (!results) {
        displayMessage(JSON.stringify(error));
      } else {
        _r = results;
        _e = error;
        $("#name").val(results[0].name);
        $("#parent").val(results[0].parent);
        $("#title").val(results[0].title);
        tinyMCE.activeEditor.setContent(results[0].html);
        tinyMCE.saveContent();
        //nicEditors.findEditor("html").setContent(results[0].html);
        //nicEditors.findEditor("html").saveContent();
      }
    });
}

function _loadRecursiveNavigation(page,level) {
  dpd.pages.get({parent: page, $sort:{parent:-1}}, function(results, error) {
    for (var i=0;i<results.length;i++) {
      //var ele = $("a").addClass("action").data("page",results[i].name).html(results[i].name);
      var title = results[i].title;
      if (title == undefined) {title = results[i].name;}
      $('*[data-parent="' + results[i].parent + '"]').append("<div class='list-group-item list-group-item-action bg-black text-white'><a class='action' href='#" + results[i].name + "' data-page='" + results[i].name + "'>" + title + "</a><span data-parent='"  + results[i].name + "'></span></div>");
      _loadRecursiveNavigation(results[i].name,level + 1);
    }
  });
}
