function highlightImages() {
  const images = document.querySelectorAll('.image-box');
  images.forEach(imgBox => {
    imgBox.classList.toggle('highlight');
  });
}
