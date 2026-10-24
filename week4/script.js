let time = document.getElementById('time');
function updateTime(){
    let now = new Date();
    let hours = now.getHours();
    let minute = now.getMinutes();
    let seconds = now.getSeconds();

     minutes = formatTime(minutes);

    seconds = formatTime(seconds);

 

    time.innerHTML = hours + ":" + minutes + ":" + seconds;

 

    setTimeout(updateTime, 1000);

}

 

function formatTime(i) {

  if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10

  return i;
}