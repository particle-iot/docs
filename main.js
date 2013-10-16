(function ($) {
  $(document).ready(
    function(){
      $('.header a').on('click', function(event) {
        event.preventDefault();
        var href = $(this).attr('href');
        href = href.replace('#', '');
        Flatdoc.run({
          fetcher: Flatdoc.file('docs/' + href + '.md')
        });
      })
    }
  )
})(window.jQuery)