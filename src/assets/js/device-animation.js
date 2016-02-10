var DeviceAnimation = function(element, deviceType) {
  var deviceSpecs = {
    "Photon": {
      image: "/assets/images/photon-horizontal.svg",
      zoom: 2,
      width: 144,
      height: 77,
      led: {
        x: 93.5,
        y: 38.5,
        radius: 30
      }
    },
    "Core": {
      image: "/assets/images/core-horizontal.svg",
      zoom: 2,
      width: 143,
      height: 77,
      led: {
        x: 104,
        y: 38.5,
        radius: 30
      }
    },
    "Electron": {
      image: "/assets/images/electron-horizontal.svg",
      zoom: 2,
      width: 197,
      height: 77,
      led: {
        x: 127,
        y: 38.5,
        radius: 30
      }
    }
  };

  var device = deviceSpecs[deviceType];
  
  // Create SVG canvas
  var showLight = false;
  var draw = SVG(element).size(device.zoom * device.width, device.zoom * device.height);
  var group = draw.group().scale(device.zoom).translate(0.5, 0.5);

  // Add the device image
  var img = group.image(device.image).size(device.width, device.height).loaded(function() {
    showLight = true;
  });

  // Add the LED with color gradient
  var led = group.circle(device.led.radius).center(device.led.x, device.led.y);

  var light_s1, light_s2;
  var light = group.gradient('radial', function(stop) {
    light_s1 = stop.at(0, "#000", 0);
    light_s2 = stop.at(0.3, "#000", 0);
    stop.at(1, "#000", 0);
  });
  light.radius(0.6);
  led.fill(light);

  // Change the color of the LED gradient
  function colorLed(color, opacity) {
    if(!showLight) {
      return;
    }
    light_s1.update(0, color, opacity);
    light_s2.update(0.3, color, opacity);
  }

  // Delay the next step using the animation callback
  function afterDelay(duration, next) {
    var t = Date.now();
    var delayFn = function() {
      var now = Date.now();
      if(now - t >= duration) {
        next();
      } else {
        requestAnimationFrame(delayFn);
      }
    };
    requestAnimationFrame(delayFn);
  }

  // Turn LED on then off
  function blinkOnce(color, onDuration, offDuration, next) {
    onDuration = onDuration || 100;
    offDuration = offDuration || onDuration;

    colorLed(color, 1);
    afterDelay(onDuration, function() {
    colorLed(color, 0);
    afterDelay(offDuration, next);
    });
  }

  // Turn LED on then off multiple times
  function blinkMultiple(color, times, onDuration, offDuration, next) {
    blinkOnce(color, onDuration, offDuration, function() {
      if(times > 1) {
        blinkMultiple(color, times - 1, onDuration, offDuration, next);
      } else {
        next();
      }
    });
  }

  // Fade LED from full color to transparent
  function breatheOnce(color, duration, next) {
    duration = duration || 2000;

    // Reduce redraws by only changing color every 100ms
    var interval = 100;
    var t = Date.now();
    led.animate(duration, ">").during(function(pos) {
      var now = Date.now();
      var delta = now - t;
      if(delta > interval) {
        t = now - (delta % interval);
        colorLed(color, pos);
      }
    }).loop(1, true).after(next);
  }

  // Fade LED multiple times
  function breatheMultiple(color, times, duration, next) {
    breatheOnce(color, duration, function() {
      if(times > 1) {
        breatheMultiple(color, times - 1, duration, next);
      } else {
        next();
      }
    });
  }

  // Public API

  // Color formats: hex RGB, names
  // http://www.w3.org/TR/css3-color/#svg-color

  // Fade LED and repeat forever
  function breathe(color, duration) {
    breatheOnce(color, duration, function() {
      breathe(color, duration);
    });
  }

  // Blink LED and repeat forever
  function blink(color, onDuration, offDuration) {
    blinkOnce(color, onDuration, offDuration, function() {
      blink(color, onDuration, offDuration);
    });
  }

  // Blink the SOS pattern used when the firmware crashes
  function sos(code, color) {
    code = code || 1;
    color = color || "red";
    var shortDuration = 150;
    var longDuration = 300;
    var offDuration = 100;
    var pauseDuration = 900;

    function blinkSos(next) {
      blinkMultiple(color, 3, shortDuration, offDuration, function() {
      afterDelay(offDuration, function() {
      blinkMultiple(color, 3, longDuration, offDuration, function() {
      afterDelay(offDuration, function() {
      blinkMultiple(color, 3, shortDuration, offDuration, function() {
      afterDelay(pauseDuration, next);
      });
      });
      });
      })
      });
    }

    function blinkSosCodeSos() {
      blinkSos(function() {
      blinkMultiple(color, code, longDuration, longDuration, function() {
      blinkSos(function() {
      afterDelay(3 * pauseDuration, blinkSosCodeSos);
      });
      });
      });
    }

    blinkSosCodeSos();
  }

  // Perform a pattern of blink, breathe, on and off
  // Each argument contains a phrase describing part of the pattern.
  // The pattern is looped forever.
  //
  // Each argument is a string of this format:
  //   action [color] [onDuration] [offDuration] [repetitions]
  //
  // Available actions: blink, breathe, on, off
  //
  // Color format: HTML name, hex code #aabbcc, rgb(1, 2, 3), rgba(1, 3, 4, 0.5)
  //
  // Duration: number followed by ms like 100ms
  //
  // Repetitions: number followed by times like 3 times (default 1 time)
  // 
  // Examples:
  // blink green
  // breathe #00ffff 1000ms
  // blink red 100ms 300ms 3 times
  // on yellow 400ms
  //
  var phraseRegex = /(\w+)(\s+[a-zA-Z#]+[a-zA-Z0-9]+)?(\([^)]*\))?(\s+\d+ms)?(\s+\d+ms)?(\s+\d+ times?)?/;
  function pattern(/* variable arguments */) {
    // Convert variable arguments lists to an array
    var patternPhrases = Array.prototype.slice.call(arguments);

    function performPatternPhrase(i) {
      var phrase = patternPhrases[i];
      var m = phraseRegex.exec(phrase);
      if(phrase && m !== null) {
        var action = m[1];
        var color = [m[2], m[3]].join("");
        var onDuration = parseInt(m[4]) || 0;
        var offDuration = parseInt(m[5]) || 0;
        var times = parseInt(m[6]) || 1;

        var next = function() {
          performPatternPhrase(i + 1);
        };

        switch(action) {
          case "breathe":
            breatheMultiple(color, times, onDuration, next);
            break;
          case "blink":
            blinkMultiple(color, times, onDuration, offDuration, next);
            break;
          case "on":
            colorLed(color, 1);
            afterDelay(onDuration, next);
            break;
          case "off":
            colorLed(null, 0);
            afterDelay(onDuration, next);
            break;
        }
      } else {
        // Prevent infinite loop in case of bad pattern
        if(i != 0) {
          performPatternPhrase(0);
        }
      }
    }

    performPatternPhrase(0);
  }

  return {
    breathe: breathe,
    blink: blink,
    sos: sos,
    pattern: pattern
  };
};

// Apply DeviceAnimation to elements with data-device-animation on page load
$(document).ready(function() {
  $('[data-device-animation]').each(function() {
    var el = $(this);
    var type = el.data("device-type");
    var animation = el.data("device-animation");
    var params = el.data("device-params");

    var deviceAnimation = DeviceAnimation(this, type);
    deviceAnimation[animation].apply(deviceAnimation, params);
  });
});
