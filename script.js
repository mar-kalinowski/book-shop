// Constants
const config = {
  basketItems: [],
  basketCounter: document.createElement("span"),
  updateBasketContent: updateBasketContent,
  orderContent: document.createElement("ul"),
  basketWrapper: document.createElement("div"),
};

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
config.basketWrapper.classList.add("basket_wrapper");

const basketImg = document.createElement("img");
basketImg.classList.add("basket_img");
basketImg.src = "./assets/img/basket.jpg";

config.basketCounter.classList.add("basket_counter");
config.basketCounter.innerText = config.basketItems.length;

// config.basketContent.classList.add("basket_content");..

const basketContentHeading = document.createElement("h3");
basketContentHeading.classList.add("basket_content_heading");

const basketContentElement = document.createElement("li");
basketContentElement.classList.add("basket_content_element");

const basketContentSum = document.createElement("div");

config.basketWrapper.append(basketImg, config.basketCounter);

header.append(heading, config.basketWrapper);

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

config.orderContent.classList.add("order_content");

const orderContentConfirmBtn = document.createElement("button");
orderContentConfirmBtn.classList.add("order_content_confirm_btn", "btn");
orderContentConfirmBtn.innerText = "Confirm your order";

orderContentConfirmBtn.addEventListener("click", () => {
  location.href = "./order/order.html";
});

function displayBooks(config) {
  fetch("./books.json") //path to the file with json data
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // console.log(data);

      data.forEach((book, index) => {
        // console.log(book);

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
        addToBasketBtn.classList.add("add_to_basket_btn", "btn");
        addToBasketBtn.innerText = "Add to basket";

        const showMoreBtn = document.createElement("button");
        showMoreBtn.classList.add("show_more_btn", "btn");
        showMoreBtn.innerText = "Show more";

        const showMoreCloseBtn = document.createElement("button");
        showMoreCloseBtn.classList.add("show_more_close_btn", "btn");
        showMoreCloseBtn.innerText = "x";

        const { id, title, price, description, imageLink, author } = book;

        bookAuthor.innerText = `Author: ${author}`;
        bookTitle.innerText = `Title: ${title}`;
        bookPrice.innerText = `${price} PLN`;
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
          //  console.log(event.target.parentElement, data[index]);
          console.log(data[index]);
          console.log(this);

          config.updateBasketContent(book);

          config.basketWrapper.addEventListener("click", () => {
            config.orderContent.style.display = "block";
          });
        });
      });
    });
}

displayBooks(config);

function updateBasketContent(book) {
  console.log(this.basketItems);
  if (book) {
    config.basketItems.push(book);
  }
  config.basketCounter.innerHTML = config.basketItems.length;

  this.orderContent.innerHTML = "";

  let totalSum = 0;

  for (let item of this.basketItems) {
    const orderList = document.createElement("div");
    orderList.classList.add("order_list");
    const orderElement = document.createElement("div");
    orderElement.classList.add("order_element");
    const orderElementImg = document.createElement("img");
    orderElementImg.classList.add("order_element_img");
    const orderElementTitle = document.createElement("h4");
    orderElementTitle.classList.add("order_element_title");
    const orderElementPrice = document.createElement("p");
    orderElementPrice.classList.add("order_element_price");
    const orderElementRemoveBtn = document.createElement("button");
    orderElementRemoveBtn.classList.add("order_element_remove_btn", "btn");

    const { imageLink, title, price } = item;

    totalSum += price;

    orderElementImg.src = imageLink;
    orderElementTitle.innerText = title;
    orderElementPrice.innerText = `${price} PLN`;
    orderElementRemoveBtn.innerText = "X";

    orderElementRemoveBtn.addEventListener("click", () => {
      const index = this.basketItems.indexOf(item);
      this.basketItems.splice(index, 1);
      this.updateBasketContent();
    });

    orderElement.append(
      orderElementImg,
      orderElementTitle,
      orderElementPrice,
      orderElementRemoveBtn
    );

    orderList.append(orderElement);
    this.orderContent.append(orderList, orderContentConfirmBtn);
    this.orderContent.style.display = "flex";
    this.basketWrapper.append(this.orderContent);
  }

  if (this.basketItems.length > 0) {
    const orderSum = document.createElement("p");
    orderSum.classList.add("order_sum");
    // orderSum.innerText = "Total sum: " + totalSum;
    orderSum.innerText = `Total sum: ${totalSum} PLN`;
    this.orderContent.append(orderSum);
  }
}
