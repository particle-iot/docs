var Docs = {
  section: "start",
  subsection: "docs",

  loadSection: function(section) {
    this.subsection = "docs";

    if (this.section != section) {
      this.section = section;
      Flatdoc.run({
        fetcher: Flatdoc.file('docs/' + this.section + '.md')
      });
    }
  },

  loadSubsection: function(section, subsection) {
    this.subsection = subsection;

    if (this.section != section) {
      this.section = section;
      Flatdoc.run({
        fetcher: Flatdoc.file('docs/' + this.section + '.md')
      });
    } else {
      Docs.scrollSmooth();
    }
  },

  waitThenScroll: function() {
    waitForAllImagesToLoad("img", function() {
      $(document.body).scrollTop($("#" + Docs.subsection).offset().top);
    });
  },

  scrollSmooth: function() {
    $('body, html').animate({
      scrollTop: $("#" + Docs.subsection).offset().top
    }, 500);
  }
};

var app = Sammy('#docs', function() {

  this.get('#/', function() {
  })

  this.get('#/:section', function() {
    Docs.loadSection(this.params['section']);
  });

  this.get('#/:section/:subsection', function() {
    Docs.loadSubsection(this.params['section'], this.params['subsection']);
  });
});

(function ($) {
  $(document).ready(
    function(){
      app.run('#/');
    }
  )

  $(document).on('flatdoc:ready', function() {
    Docs.waitThenScroll();
  });
})(window.jQuery)

var waitForAllImagesToLoad = function(selector, callback) {
  var numNodes = $(selector).length;
  var numLoaded = 0;
  var checkDone = function() {
    if (numLoaded >= numNodes) {
      callback(true);
    }
  };

  $(selector)
    .one('load', function() { numLoaded++; checkDone(); })
    .each(function() { if (this.complete) { $(this).load(); }});
}