var inputElement = document.querySelector(".book-search__input");
var timer;
inputElement.addEventListener("input", function(e) {
  if (timer) {
    clearTimeout(timer);
  }

  if (inputElement.value.length > 2) {

    timer = setTimeout(function() {
      console.log(inputElement.value);

      fetch("https://www.googleapis.com/books/v1/volumes?q=search+terms")
        .then(response => response.json())
        .then(data => {
          console.log(data.items);
          var m = data.items.filter(e => e.volumeInfo.authors.some(au => au.toLowerCase().includes(inputElement.value.toLowerCase())));

          var html = m.map(e => {
            return `<div class="information">
        <div class="information_items">
           <p class="information__chapter">ID:</p>
           <p class="information__tittle"> ${e.id}</p>
        </div>
        <div class="information_items">
           <p class="information__chapter">Categories:</p>
           <p class="information__tittle"> ${e.volumeInfo.categories}</p>
        </div>
        <div class="information_items">
           <p class="information__chapter">Authors:</p>
           <p class="information__tittle"> ${e.volumeInfo.authors}</p>
        </div>
        <div class="information_items">
           <p class="information__chapter">Book:</p>
           <p class="information__tittle"> ${e.volumeInfo.title}</p>
        </div>
        <div class="information_items">
           <p class="information__chapter">Description:</p>
           <p class="information__tittle"> ${e.volumeInfo.description}</p>
        </div>
        
     
</div>`;
          }).join("");

          document.querySelector(".book-search_result").innerHTML = html;
          inputElement.value = ''


        });

    }, 3000);

  }


});