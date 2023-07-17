
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from "axios";


const searchForm = document.querySelector('.js-form');
const gallery = document.querySelector('.js-gallery');
const loadMore = document.querySelector('.js-btn-more')
// const jsSubmitBtn = document.querySelector('.js-submit-btn')
// const jsInput = document.querySelector('.js-input');
const API_KEY = "38304723-3ccc87e605612703ee79a288f";
const BASE_URL = 'https://pixabay.com/api/'

searchForm.addEventListener('submit', onSubmit);
loadMore.addEventListener('click', onClick);


async function onSubmit(e) {
  e.preventDefault();
  
  gallery.innerHTML = '';

  const searchValue = document.querySelector('.js-input').value;
  const url = `${BASE_URL}?key=${API_KEY}&q=${searchValue}&image_type=photo&orientation=horizontal&safesearch=true&page=1&per_page=40`;
  
  try {
    const images = await getImg(url);
    addMarkup(images.hits);
    console.log(images.hits);
    loadMore.hidden = false;
    if (images.totalHits === 0) {
      loadMore.hidden = true;
      Notify.warning('Sorry, there are no images matching your search query. Please try again.');
    }else{Notify.success(`Hooray! We found ${images.totalHits} images.`);}
      } catch (error) {
    console.error(error);
  }
  
}

  async function getImg(url) {
    try {
      const response = await axios.get(url);
      console.log(response.data.totalHits);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Sorry, there are no images matching your search query. Please try again.");
  }
    }
  
  

function addMarkup(images) {
  const markup = images.map(image => 
  `<div class="photo-card">
  <a href="${image.largeImageURL}">
  <img class="image" src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
  </a>
  <div class="info">
    <p class="info-item">
      <b>${image.likes} Likes</b>
    </p>
    <p class="info-item">
      <b>${image.views} Views</b>
    </p>
    <p class="info-item">
      <b>${image.comments} Comments</b>
    </p>
    <p class="info-item">
      <b>${image.downloads} Downloads</b>
    </p>
  </div>
</div>`).join('');
  gallery.insertAdjacentHTML('beforeend', markup);

  const lightbox = new SimpleLightbox('.gallery a');
  lightbox.refresh();
};

let pageNumber = 1;

async function onClick(e) {
  e.preventDefault();
  
  pageNumber += 1;
  console.log(pageNumber);
  const searchValue = document.querySelector('.js-input').value;
  const url = `${BASE_URL}?key=${API_KEY}&q=${searchValue}&image_type=photo&orientation=horizontal&safesearch=true&page=${pageNumber}&per_page=40`;
try {
    const images = await getImg(url);
    addMarkup(images.hits);
  console.log(images.hits);
  if ((pageNumber * 40) >= images.totalHits) {
    loadMore.hidden = true;
    Notify.info("We're sorry, but you've reached the end of search results.")
      };
  }
  catch (error) {
    console.error(error);
  }
     }


    


