const fragment = document.createDocumentFragment();
const wrapper = document.createElement("div");
wrapper.classList.add("wrapper");

const header = document.createElement("header");
header.classList.add("header");

const main = document.createElement("main");
main.classList.add("main");

const heading = document.createElement("div");
heading.classList.add("heading");
heading.innerHTML = "<h1>My book-shop</h1>";
header.append(heading);

wrapper.append(header);
fragment.appendChild(wrapper);

document.body.appendChild(fragment);

const booksWrapper = document.createElement("div");
booksWrapper.classList.add("books_wrapper");

const booksWrapperHeading = document.createElement("h2");
booksWrapperHeading.classList.add("books_wrapper_heading");
booksWrapperHeading.innerText = "Books catalog";

wrapper.append(main);
main.append(booksWrapper);
booksWrapper.append(booksWrapperHeading);

const booksContent = document.createElement("div");
booksContent.classList.add("books_content");
booksWrapper.append(booksContent);

const bookList = document.createElement("ul");
bookList.classList.add("book_list");
booksContent.append(bookList);

function displayBooks() {
  fetch("./books.json") //path to the file with json data
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);

      data.forEach((book) => {
        console.log(book);

        const bookElement = document.createElement("li");
        bookElement.classList.add("book_element");

        const bookTitle = document.createElement("h3");
        bookTitle.classList.add("book_title");

        const bookImg = document.createElement("img");
        bookImg.classList.add("book_img");

        const bookPrice = document.createElement("p");
        bookPrice.classList.add("book_price");

        const bookDescription = document.createElement("p");
        bookDescription.classList.add("book_descrioption");

        const bookId = document.createElement("p");
        bookId.classList.add("book_id");

        const bookAuthor = document.createElement("p");
        bookAuthor.classList.add("book_author");

        const { id, title, price, description, imageLink, author } = book;

        bookAuthor.innerText = author;
        bookTitle.innerText = title;
        bookPrice.innerText = price;
        bookDescription.innerText = description;
        bookId.innerText = id;
        bookImg.src = imageLink;

        bookElement.append(
          bookImg,
          bookAuthor,
          bookTitle,
          bookPrice,
          bookDescription
        );
        bookList.append(bookElement);
      });
    });

  return bookElement;
}

// console.log(bookList);

// bookList.append(bookElement);

displayBooks();
