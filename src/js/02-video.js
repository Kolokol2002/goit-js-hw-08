import Player from '@vimeo/player';
import * as LocalStorage from './local-storage';
import throttle from 'lodash.throttle';
import debounce from 'lodash.debounce';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const currentTimeVideo =
  LocalStorage.get('videoplayer-current-time') === null
    ? 0
    : LocalStorage.get('videoplayer-current-time');

player.setCurrentTime(currentTimeVideo);

const currentVolumeVideo =
  LocalStorage.get('videoplayer-current-volume') === null
    ? 1
    : LocalStorage.get('videoplayer-current-volume');

player.setVolume(currentVolumeVideo);

player.on(
  'timeupdate',
  throttle(data => {
    LocalStorage.save('videoplayer-current-time', data.seconds);
  }, 1000)
);

player.on(
  'volumechange',
  debounce(data => {
    LocalStorage.save('videoplayer-current-volume', data.volume);
    // console.log(data.volume);
  }, 300)
);
