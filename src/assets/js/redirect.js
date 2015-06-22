var lastDevice = localStorage.lastDevice;
if(typeof(Storage) !== "undefined") {
  if(lastDevice) {
    window.location.replace('guide/' + lastDevice + '/start');
  }
}
