import Player from '@vimeo/player';
import throttle from "lodash.throttle";

const player = new Player('vimeo-player',);
const savedTimeline = localStorage.getItem('videoplayer-current-time');

if (savedTimeline) {
  player.setCurrentTime(savedTimeline);
}

player.on('timeupdate', throttle(getTimeupdate, 1000));

function getTimeupdate(e) {
  localStorage.setItem('videoplayer-current-time', JSON.stringify(e.seconds));
};