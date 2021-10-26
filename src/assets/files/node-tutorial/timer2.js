var counter = 1;

function timerCallback() {
    console.log('testing ' + counter++);
}

setInterval(timerCallback, 1000);
