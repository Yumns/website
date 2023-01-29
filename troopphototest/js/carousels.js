function generateAlbum() {
  let innards = ""
  let names = document.getElementById("namesIn").value.split("\n")
  if (document.getElementById("folderIn").value !== "") {
    var path = document.getElementById("folderIn").value + "/"
  } else {
    var path = ""
  }
  let carouselName = document.getElementById("carouselName").value
  console.log(names)
  for (i in names) {
    innards += `<div class="carousel-item">
  <img src="${path}${names[i]}" class="d-block w-100" alt="image from ${path}">
</div>
    `
  }
  console.log(innards)
  document.getElementById("namesIn").value = (`
<div id="${carouselName}" class="carousel slide" data-bs-touch="false" data-bs-ride="true">
  <div class="carousel-inner">
    ${innards}
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#${carouselName}" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#${carouselName}" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
  `).replace('class="carousel-item"', 'class="carousel-item active"').trim()
}
