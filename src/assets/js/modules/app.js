requirejs.config({
  paths: {
    jquery: "//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min",
    lodash: "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.9.3/lodash"
  }
});
// Start the main app logic.
requirejs(['core/navigation', 'utils/storage', 'core/progress', 'core/state', 'jquery', 'lodash'],
function (nav, storage, progress, state, $, _) {
  progress.show();
});
