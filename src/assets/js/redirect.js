var lastDevice = localStorage.lastDevice;
if(typeof(Storage) !== "undefined") {
  if(lastDevice) {
    window.location.replace('guide/getting-started/intro/' + lastDevice);
  }
}
