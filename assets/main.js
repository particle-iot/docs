var app = Sammy('#docs', function() {

  this.get('#/', function() {
    console.log('home!');
  })

  this.get('#/:section', function() {
    Flatdoc.run({
      fetcher: Flatdoc.file('docs/' + this.params['section'] + '.md')
    });
  });
});

(function ($) {
  $(document).ready(
    function(){
      app.run('#/');
    }
  )
})(window.jQuery)