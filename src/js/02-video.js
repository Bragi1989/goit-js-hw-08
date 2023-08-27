import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

// Отримання елементу iframe для плеєра
const iframe = document.getElementById('vimeo-player');

// Ініціалізація плеєра
const player = new Player(iframe);

// Отримання часу відтворення та оновлення у локальному сховищі через throttle
player.on('timeupdate', throttle(async (event) => {
  const currentTime = await player.getCurrentTime();
  localStorage.setItem('videoplayer-current-time', currentTime.toString());
}, 1000));

// Під час перезавантаження сторінки відновлення відтворення зі збереженої позиції
window.addEventListener('DOMContentLoaded', async () => {
  const savedTime = localStorage.getItem('videoplayer-current-time');
  if (savedTime) {
    await player.setCurrentTime(parseFloat(savedTime));
  }
});
