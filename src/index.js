
import SlimSelect from 'slim-select'
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from "axios";


const searchForm = document.querySelector('.js-form');
const gallery = document.querySelector('.js-gallery');
const API_KEY = "38304723-3ccc87e605612703ee79a288f";
const BASE_URL = 'https://pixabay.com/api/'

searchForm.addEventListener('submit', onSubmit);

async function onSubmit(e) {
  e.preventDefault();

  const searchValue = document.querySelector('.js-input').value;
  const url = `${BASE_URL}?key=${API_KEY}&q=${searchValue}&image_type=photo&orientation=horizontal&safesearch=true`;
  
  try {
    const images = await getImg(url);
    addMarkup(images);
  } catch (error) {
    console.error(error);
  }
}

  async function getImg(url) {
  try{const response = await axios.get(url);
    return response.data.hits;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch images");
  }
    }
  
  

function addMarkup(images) {
const markup = images.map(image => `<div class="photo-card">
  <img src="${image.webformatURL}" alt="" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
    </p>
    <p class="info-item">
      <b>Views</b>
    </p>
    <p class="info-item">
      <b>Comments</b>
    </p>
    <p class="info-item">
      <b>Downloads</b>
    </p>
  </div>
</div>`).join('');
  gallery.innerHTML = markup;
};





    


