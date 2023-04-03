import { galleryItems } from './gallery-items';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const galleryEl = document.querySelector('.gallery')

const imageMarkup = galleryItems.map(({ preview, original, description }) => `
<li class="gallery__item">
  <a class="gallery__link" href="${original}" title="${description}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`).join('');


galleryEl.insertAdjacentHTML('beforeend', imageMarkup)

const lightbox = new SimpleLightbox('.gallery a', {
    captionSelector: 'self',
    captionDelay: 250,
});
lightbox.on('show.simplelightbox')

galleryEl.addEventListener('click', onOpenModalImg)
function onOpenModalImg(e) {
    if (e.target.classList[0] !== 'gallery__image') {
      return;
    }
    e.preventDefault()
}