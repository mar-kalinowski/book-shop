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

const basketWrapper = document.createElement("div");
basketWrapper.classList.add("basket_wrapper");

const basketImg = document.createElement("img");
basketImg.classList.add("basket_img");
basketImg.src = "./assets/img/basket.jpg";

const basketCounter = document.createElement("span");
basketCounter.classList.add("basket_counter");
basketCounter.innerText = "0";

const basketContent = document.createElement("ul");
basketContent.classList.add("basket_content");

const basketContentHeading = document.createElement("h3");
basketContentHeading.classList.add("basket_content_heading");

const basketContentElement = document.createElement("li");
basketContentElement.classList.add("basket_content_element");

const basketContentSum = document.createElement("div");

basketWrapper.append(basketImg, basketCounter);

header.append(heading, basketWrapper);

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

const orderContent = document.createElement("div");
orderContent.classList.add("order_content");

const orderContentConfirmBtn = document.createElement("button");
orderContentConfirmBtn.classList.add("order_content_confirm_btn");
orderContentConfirmBtn.innerText = "Confirm your order";

orderContentConfirmBtn.addEventListener("click", () => {
  location.href = "./order/order.html";
});

function displayBooks(book) {
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

        const bookDescription = document.createElement("div");
        bookDescription.classList.add("book_description");

        const bookDescriptionText = document.createElement("p");
        bookDescriptionText.classList.add("book_description_text");

        const bookId = document.createElement("p");
        bookId.classList.add("book_id");

        const bookAuthor = document.createElement("p");
        bookAuthor.classList.add("book_author");

        const addToBasketBtn = document.createElement("button");
        addToBasketBtn.classList.add("add_to_basket_btn");
        addToBasketBtn.innerText = "Add to basket";

        const showMoreBtn = document.createElement("button");
        showMoreBtn.classList.add("show_more_btn");
        showMoreBtn.innerText = "Show more";

        const showMoreCloseBtn = document.createElement("button");
        showMoreCloseBtn.classList.add("show_more_close_btn");
        showMoreCloseBtn.innerText = "X";

        const { id, title, price, description, imageLink, author } = book;

        bookAuthor.innerText = author;
        bookTitle.innerText = title;
        bookPrice.innerText = price;
        bookDescriptionText.innerText = description;
        bookId.innerText = id;
        bookImg.src = imageLink;

        bookDescription.append(bookDescriptionText);
        bookDescription.append(showMoreCloseBtn);

        bookElement.append(
          bookImg,
          bookAuthor,
          bookTitle,
          bookPrice,
          bookDescription,
          addToBasketBtn,
          showMoreBtn
        );
        bookList.append(bookElement);

        showMoreBtn.addEventListener("click", () => {
          bookDescription.style.display = "block";
        });
        showMoreCloseBtn.addEventListener("click", () => {
          bookDescription.style.display = "none";
        });
        addToBasketBtn.addEventListener("click", (event) => {
          // event.preventDefault();
          console.log(event.target);

          const orderList = document.createElement("div");
          orderList.classList.add("order_list");
          const orderElement = document.createElement("div");
          orderElement.classList.add("order_element");
          const orderElementImg = document.createElement("img");
          orderElementImg.classList.add("order_element_img");
          const orderElementTitle = document.createElement("h4");
          orderElementTitle.classList.add("order_element_title");
          /* const orderElementAuthor = document.createElement("p");
          orderElementAuthor.classList.add("order_element_author"); */
          const orderElementPrice = document.createElement("p");
          orderElementPrice.classList.add("order_element_price");
          const orderSum = document.createElement("p");
          orderSum.classList.add("order_sum");
          const orderElementRemoveBtn = document.createElement("button");
          orderElementRemoveBtn.classList.add("order_element_remove_btn");

          orderElementImg.innerText = imageLink;
          orderElementTitle.innerText = title;
          orderElementPrice.innerText = price;
          orderElementRemoveBtn.innerText = "X";

          orderElementRemoveBtn.addEventListener("click", () => {
            orderList.innerHTML = "";
          });

          orderElement.append(
            orderElementImg,
            orderElementTitle,
            orderElementPrice,
            orderElementRemoveBtn
          );

          // orderedElements.push(orderElement);
          orderList.append(orderElement);
          orderContent.append(orderList, orderContentConfirmBtn);
          console.log(orderContent);
          basketWrapper.append(orderContent);
          basketWrapper.addEventListener("click", () => {
            orderContent.style.display = "block";
          });
        });
      });
    });

  return book;
}

displayBooks();
