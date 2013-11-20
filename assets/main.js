var Docs = {
  section: "",
  subsection: "docs"
};

var app = Sammy('#docs', function() {

  this.get('#/', function() {
    Docs.section = "start";
  })

  this.get('#/:section', function() {
    if (Docs.section != this.params['section']) {
      Docs.section = this.params['section'];
      Flatdoc.run({
        fetcher: Flatdoc.file('docs/' + Docs.section + '.md')
      });
    }
  });

  this.get('#/:section/:subsection', function() {
    Docs.subsection = this.params['subsection'];

    if (Docs.section != this.params['section']) {
      Docs.section = this.params['section'];
      Flatdoc.run({
        fetcher: Flatdoc.file('docs/' + Docs.section + '.md')
      });
    } else {
      $(document.body).scrollTop($("#" + Docs.subsection).offset().top);
    }
  });
});

(function ($) {
  $(document).ready(
    function(){
      app.run('#/');
    }
  )

  $(document).on('flatdoc:ready', function() {
    $(document.body).scrollTop($("#" + Docs.subsection).offset().top);
  });
})(window.jQuery)