var coreState = 0;

function animateCore() {
  console.log(coreState);
  switch(coreState) {
    case 0:
      $('#core1').find('.rgb').addClass('blue');
      $('#core1').find('.pattern').addClass('flashing');
      break;
    case 1:
      $('#core1').find('.rgb').removeClass('blue');
      $('#core1').find('.rgb').addClass('green');
      break;
    case 2:
      $('#core1').find('.rgb').removeClass('green');
      $('#core1').find('.rgb').addClass('cyan');
      break;
  }
  coreState++;
  if (coreState > 2) {
    coreState = 0;
  }
}