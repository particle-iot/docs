var coreState = 0;

function animateCore() {
  var core = $('#core1');
  var button = $('#button1');
  console.log(coreState);
  switch(coreState) {
    case 0:
      core.html('<div class="core-butt"></div><div class="rgb blue"><div class="pattern flashing"></div></div>')
      button.text('Listening for Wi-Fi credentials');
      break;
    case 1:
      core.html('<div class="core-butt"></div><div class="rgb green"><div class="pattern flashing"></div></div>')
      button.text('Connecting to the Wi-Fi network');
      break;
    case 2:
      core.html('<div class="core-butt"></div><div class="rgb cyan"><div class="pattern flashing"></div></div>')
      button.text('Connecting to the Spark Cloud');
      break;
    case 3:
      core.html('<div class="core-butt"></div><div class="rgb magenta"><div class="pattern fast flashing"></div></div>')
      button.text('Updating to newest firmware');
      break;
    case 4:
      core.html('<div class="core-butt"></div><div class="rgb cyan"><div class="pattern breathing"></div></div>')
      button.text('Connected!');
      break;
    case 5:
      core.html('<div class="core-butt"></div><div class="rgb"><div class="pattern"></div></div>')
      button.text('Start over');
      break;
  }
  coreState++;
  if (coreState > 5) {
    coreState = 0;
  }
}