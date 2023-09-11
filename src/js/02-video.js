import Player from '@vimeo/player';
import throttle from "lodash.throttle";

const player = new Player('vimeo-player',);
const STORAGE_KEY_TIMELINE = 'videoplayer-current-time';
const savedTimeline = localStorage.getItem(STORAGE_KEY_TIMELINE);

if (savedTimeline) {
  player.setCurrentTime(savedTimeline);
}

player.on('timeupdate', throttle(getTimeupdate, 1000));

function getTimeupdate(e) {
  localStorage.setItem(STORAGE_KEY_TIMELINE, JSON.stringify(e.seconds));
};