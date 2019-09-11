var inputElement = document.querySelector(".book-search__input");
var timer;

inputElement.addEventListener("input", function(e) {
  if (timer) {
    clearTimeout(timer);
  }

  if (inputElement.value.length > 2) {

    timer = setTimeout(function() {

      fetch(`https://www.googleapis.com/books/v1/volumes?q=${inputElement.value.toLowerCase()}`)
        .then(response => response.json())
        .then(data => {
          var itemsCount = data.totalItems;

          var paginator = Page(itemsCount);


          document.querySelector("#next").addEventListener("click", function(e) {
            paginator.next();
          });
          document.querySelector("#prev").addEventListener("click", function(e) {
            paginator.prev();
          });

          var html = data.items.map(i => new Book(i.id, i.volumeInfo))
            .map(e => e.render())
            .join("");
          document.querySelector(".book-search_result").innerHTML = html;

        });
    }, 3000);
  }
});

function Page(itemsCount) {
  var current = 0;
  var totalPages = Math.ceil(itemsCount / 10);
  var setPage = function(page) {
    document.querySelector(".book-search__page").innerHTML = `<p>${page + 1}/${totalPages}</p>`;
  };
  var loadPage = function(page) {
    return fetch(`https://www.googleapis.com/books/v1/volumes?q=${inputElement.value.toLowerCase()}&startIndex=${page * 10}`)
      .then(response => response.json())
      .then(data => {
          var html = data.items.map(i => new Book(i.id, i.volumeInfo))
            .map(b => b.render())
            .join("");
          document.querySelector(".book-search_result").innerHTML = html;
        }
      );
  };
  setPage(current);

  return {
    next: function() {
      if (current === totalPages) {
        return;
      }
      current++;

      loadPage(current).then(() => {
        setPage(current);
      });

    },

    prev: function() {
      if (current === 0) {
        return;
      }
      current--;
      loadPage(current).then(() => {
        setPage(current);
      });
    }
  };

}


class Book {
  constructor(id, book) {
    this.id = id;
    this.authors = book.authors;
    this.categories = book.categories;
    this.title = book.title;
    this.description = book.description;
  }

  render() {
    return `<div class="information">
        <div class="information_items">
           <p class="information__chapter">ID:</p>
           <p class="information__tittle"> ${ this.id}</p>
        </div>
        <div class="information_items">
           <p class="information__chapter">Categories:</p>
           <p class="information__tittle"> ${ this.categories}</p>
        </div>
        <div class="information_items">
           <p class="information__chapter">Authors:</p>
           <p class="information__tittle"> ${this.authors }</p>
        </div>
        <div class="information_items">
           <p class="information__chapter">Book:</p>
           <p class="information__tittle"> ${this.title}</p>
        </div>
        <div class="information_items">
           <p class="information__chapter">Description:</p>
           <p class="information__tittle"> ${this.description}</p>
        </div>
        
     
</div>`;
  }
}