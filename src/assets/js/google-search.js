(function() {
  var cx = '000183727275248266505:ju5qrtmgpto';
  var gcse = document.createElement('script');
  gcse.type = 'text/javascript';
  gcse.async = true;
  gcse.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') +
      '//cse.google.com/cse.js?cx=' + cx;
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(gcse, s);

  var placeholder = setInterval(function() {
    var $input = $('input.gsc-input');
    if($input.length > 0) {
      $input.attr('placeholder', 'Search the docs');
      clearInterval(placeholder);
    }
  }, 100);
})();
