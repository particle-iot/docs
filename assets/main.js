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
      $(document.body).scrollTop($("#" + this.subsection).offset().top);
    }
  },

  scroll: function() {
    $(document.body).scrollTop($("#" + Docs.subsection).offset().top);
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
    Docs.scroll();
  });
})(window.jQuery)