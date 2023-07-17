// import SimpleLightbox from 'simplelightbox';
// export function addMarkup(images) {
//   const markup = images.map(image => 
//   `<div class="photo-card">
//   <a href="${image.largeImageURL}">
//   <img class="image" src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
//   </a>
//   <div class="info">
//     <p class="info-item">
//       <b>${image.likes} Likes</b>
//     </p>
//     <p class="info-item">
//       <b>${image.views} Views</b>
//     </p>
//     <p class="info-item">
//       <b>${image.comments} Comments</b>
//     </p>
//     <p class="info-item">
//       <b>${image.downloads} Downloads</b>
//     </p>
//   </div>
// </div>`).join('');
//   gallery.insertAdjacentHTML('beforeend', markup);

//   const lightbox = new SimpleLightbox('.gallery a');
//   lightbox.refresh();
// };