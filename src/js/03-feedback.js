import throttle from 'lodash.throttle';
import * as LocalStorage from './local-storage';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const feedBackFormEl = document.querySelector('.feedback-form');
const [emailEl, messageEl] = feedBackFormEl.children;

const jsonGet = LocalStorage.get('feedback-form-state');
const { email, message } = jsonGet
  ? JSON.parse(jsonGet)
  : { email: '', message: '' };

emailEl.children[0].value = email;
messageEl.children[0].value = message;

feedBackFormEl.addEventListener('input', throttle(onSave, 500));
feedBackFormEl.addEventListener('submit', onSend);

const obj = { email: email, message: message };

function onSave(e) {
  const valueEL = e.target.value;
  const nameEL = e.target.name;

  if ('message' !== nameEL && 'email' !== nameEL) {
    return;
  }

  obj[nameEL] = valueEL;
  LocalStorage.save('feedback-form-state', JSON.stringify(obj));
}

function onSend(e) {
  e.preventDefault();
  if ('' === emailEl.children[0].value || '' === messageEl.children[0].value) {
    Notify.failure('Two fields must be filled😞');
    return;
  }

  Notify.success('Message send👌');
  console.log(JSON.parse(LocalStorage.get('feedback-form-state')));

  emailEl.children[0].value = '';
  messageEl.children[0].value = '';

  LocalStorage.remove('feedback-form-state');
}
