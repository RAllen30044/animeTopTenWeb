const figures = [
  // 0,
  // 1,
  // 2,
  // 3,
  // 4,
  // 5,
  // 6,
  // 7,
  // 8,
  // 9,
  // "a",
  // "b",
  "c",
  // "d",
  //"e",
  // "f",
  // "g",
  // "h",
  //  "i",
  // "j",
  // "k",
  // "l",
  // "m",
  // "n",
  // "o",
  // "p",
  // "q",
  // "r",
  // "s",
  // "t",
  // "u",
  // "v",
  // "w",
  // "x",
  // "y",
  //  "z",
];

const contentCounter = (type) => {
  const animeList = document.getElementsByClassName(`animeList`);
  const favoritesList = document.getElementsByClassName("favorites");
  let count = 0;
  let favCount = 0;
  const originalCounter = document.createElement("h4");
  const favCounter = document.createElement("h4");
  originalCounter.setAttribute("class", "counter");
  favCounter.setAttribute("class", "counter");
  animeList[0].appendChild(originalCounter);
  favoritesList[0].appendChild(favCounter);
  const counterItem = document.getElementsByClassName("counter");
  const myType = document.getElementsByClassName("type");
  const types = Array.from(myType);
  types.forEach((element) => {
   
    if (element.dataset.type.toLowerCase() === `${type}`.toLowerCase()) {
      count++;
    }
  });

  counterItem[0].innerHTML = `The ${type} count is ${count} on this list`;
  counterItem[1].innerHTML = `The ${type} count is ${favCount} on this list`;
};

const addToList = () => {
  const selectionItem = document.getElementsByClassName("selection");
  const selectionH6 = document.createElement("h6");
  selectionH6.setAttribute("class", `clickMe`);
selectionItem[selectionItem.length - 1].appendChild(selectionH6);
  const addItem = document.getElementsByClassName(`clickMe`);
  addItem[addItem.length - 1].innerHTML = `Click to Add `;
};

const sortData = (direction, array) => {
  if (direction === "desc") {
    array.sort((a, b) => {
      if (a.dataset.card.toUpperCase() > b.dataset.card.toUpperCase())
        return -1;
      if (a.dataset.card.toUpperCase() < b.dataset.card.toUpperCase()) return 1;
      return 0;
    });
  } else {
    array.sort((a, b) => {
      if (a.dataset.card.toUpperCase() > b.dataset.card.toUpperCase()) return 1;
      if (a.dataset.card.toUpperCase() < b.dataset.card.toUpperCase())
        return -1;
      return 0;
    });
  }
};

const toggle = (arrayList, toList) => {
  const btn = document.getElementsByClassName("btn");
const sortBtn = Array.from(btn);
sortBtn.forEach((button) => {
    button.addEventListener("click", () => {
      sortData(button.dataset.sort, arrayList);
      if (arrayList) {
        arrayList.forEach((item) => toList.append(item));
      }
    });
  });
};
const append = (id, array, originArray, container, text) => {
  const deleted = originArray.splice(id, 1);
  array.push(deleted[0]);
  array.forEach((element) => {
    container.append(element);
    element.childNodes[1].childNodes[0].innerHTML = `${text}`;
  });
};

const clickAction = () => {
  const button = document.getElementsByClassName(`clickMe`);
  const animeListItems = document.getElementsByClassName(
    "anime-wrapper-container"
  );
  const newArray = Array.from(button);
  const favoritesListArray = [];
  const originalListArray = Array.from(animeListItems);
  let originalListCount = 0;
  let favoritesListCount = 0;
  const originalList = document.getElementById("original-list");
  const favorites = document.getElementById("favorites");
  const counter = document.getElementsByClassName("counter");
  const countingArray = Array.from(counter);
  

  newArray.forEach((element) => {
    const types =
      element.parentElement.parentElement.firstChild.firstChild.firstChild
        .childNodes[1].childNodes[1];
if (types.dataset.type.toLowerCase() === "tv") {
      originalListCount++;
    }
 element.addEventListener("click", (event) => {
      const targetTypes =
        event.target.parentElement.parentElement.firstChild.firstChild
          .firstChild.childNodes[1].childNodes[1];
     const originindex = originalListArray.indexOf(
        event.target.parentElement.parentElement
      );
      const favoritesIndex = favoritesListArray.indexOf(
        event.target.parentElement.parentElement
      );
      if (
        element.parentElement.parentElement.parentElement.parentElement.id ===
          "original-list" ||
        element.parentElement.parentElement.parentElement.id === "original-list"
      ) {
        append(
          originindex,
          favoritesListArray,
          originalListArray,
          favorites,
          "Click to Remove"
        );
        if (targetTypes.dataset.type.toLowerCase() === "tv") {
          originalListCount--;
          favoritesListCount++;
         countingArray[0].innerHTML = `The TV count is ${originalListCount} on this list`;
         countingArray[1].innerHTML = `The TV count is ${favoritesListCount} on this list`;
        }
      } else {
        append(
          favoritesIndex,
          originalListArray,
          favoritesListArray,
          originalList,
          "Click to Add"
        );
        if (targetTypes.dataset.type.toLowerCase() === "tv") {
          originalListCount++;
          favoritesListCount--;
     countingArray[0].innerHTML = `The TV count is ${originalListCount} on this list`;
         countingArray[1].innerHTML = `The TV count is ${favoritesListCount} on this list`;
        }
      }
    });
  });
  toggle(originalListArray, originalList);
  toggle(favoritesListArray, favorites);
};

const createCatagoryItem = (char) => {
  const listItem = document.getElementsByClassName("animeList-item");
  const categoryDiv = document.createElement("div");
  categoryDiv.setAttribute("class", `${char} category`);
  listItem[0].appendChild(categoryDiv);
  const categoryItem = document.getElementsByClassName(`${char}`);
  const categoryH3 = document.createElement("h3");

  categoryH3.setAttribute("id", `${char}`);

  categoryItem[categoryItem.length - 1].appendChild(categoryH3);
  document.getElementById(`${char}`).innerHTML = `${char}`.toUpperCase();
};

const createCatagory = (char) => {
  const listNavItem = document.getElementsByClassName("list-nav");
  const charH6 = document.createElement("h3");
  charH6.setAttribute("id", `select${char}`);
  charH6.setAttribute("class", `selectedCategory`);

  charH6.setAttribute("data-category", `${char}`);

  listNavItem[0].appendChild(charH6);
  document.getElementById(`select${char}`).innerHTML = `${char}`.toUpperCase();
  createCatagoryItem(char);
};
const scrollToCategory = () => {
  const selectedCategory = document.getElementsByClassName("selectedCategory");
  for (const category of selectedCategory) {
    category.addEventListener("click", () => {
      let categoryData = category.getAttribute("data-category");
      document.getElementById(categoryData).scrollIntoView();
    });
  }
};

const contentWrapper = (name, type, pic) => {
  const animeWrapperContainerItem = document.getElementsByClassName(
    "anime-wrapper-container"
  );
  const contentWrapWrapperDiv = document.createElement("div");
  contentWrapWrapperDiv.setAttribute("class", `content-wrap-wrapper`);
  animeWrapperContainerItem[animeWrapperContainerItem.length - 1].appendChild(
    contentWrapWrapperDiv
  );
  const contentWrapWrapperContainerItem = document.getElementsByClassName(
    "content-wrap-wrapper"
  );

  const contentWrapperDiv = document.createElement("div");
  contentWrapperDiv.setAttribute("class", "content-wrapper");
  contentWrapWrapperContainerItem[
    contentWrapWrapperContainerItem.length - 1
  ].appendChild(contentWrapperDiv);
  const contentWrapperItem = document.getElementsByClassName("content-wrapper");
  const animeWrapperDiv = document.createElement("div");
  animeWrapperDiv.setAttribute("class", "anime-wrapper");
  contentWrapperItem[contentWrapperItem.length - 1].appendChild(
    animeWrapperDiv
  );
  const animeWrapperItem = document.getElementsByClassName("anime-wrapper");
  const animeWrapperImg = document.createElement("img");
  animeWrapperImg.setAttribute("src", `${pic}`);
  animeWrapperImg.setAttribute("alt", `${name}`);
  animeWrapperItem[animeWrapperItem.length - 1].appendChild(animeWrapperImg);
  const textWrapperDiv = document.createElement("div");
  textWrapperDiv.setAttribute("class", "text-wrapper");
  animeWrapperItem[animeWrapperItem.length - 1].appendChild(textWrapperDiv);
const textWrapperItem = document.getElementsByClassName("text-wrapper");
  const textWrapperH4 = document.createElement("h4");
  textWrapperH4.setAttribute("class", `animeName`);
textWrapperItem[textWrapperItem.length - 1].appendChild(textWrapperH4);
  const textWrapperH5 = document.createElement("h5");
  textWrapperH5.setAttribute("class", `type`);
  textWrapperH5.setAttribute("data-type", `${type}`);
textWrapperItem[textWrapperItem.length - 1].appendChild(textWrapperH5);
  document.getElementsByClassName(`animeName`)[
    textWrapperItem.length - 1
  ].innerHTML = `Name: ${name}`;
  document.getElementsByClassName("type")[
    textWrapperItem.length - 1
  ].innerHTML = `Type: ` + `${type}`.toUpperCase();
  const selectionDiv = document.createElement("div");
  selectionDiv.setAttribute("class", "selection");
  animeWrapperContainerItem[animeWrapperContainerItem.length - 1].appendChild(
    selectionDiv
  );
};

const animeList = (category, name, type, pic) => {
  const categoryItem = document.getElementsByClassName(`${category}`);
  const animeWrapperContainerDiv = document.createElement("div");
  animeWrapperContainerDiv.setAttribute("class", `anime-wrapper-container `);
animeWrapperContainerDiv.setAttribute("data-original", `${name}`);
animeWrapperContainerDiv.setAttribute("data-card", `${name}`);
  categoryItem[0].appendChild(animeWrapperContainerDiv);
  contentWrapper(name, type, pic);
  addToList();
};

let infoArray = [];

const seperations = async (array) => {
  for (let char of array) {
    createCatagory(char);
    let anime = await fetch(
      `https://cdn.animenewsnetwork.com/encyclopedia/api.xml?anime=~${char}`
    );
    let response = await anime.text();
    let parser = new DOMParser();
    let data = parser.parseFromString(response, "text/xml");
    for (const iterator of data.getElementsByTagName("anime")) {
      info = {
        name: iterator.getAttribute("name"),
        type: iterator.getAttribute("type"),
        pic: iterator.getElementsByTagName("info")[0].getAttribute("src"),
      };
 infoArray.push(info);
if (info.pic) {
        animeList(char, info.name, info.type, info.pic);
      }
    }
  }
  contentCounter("TV");

 clickAction();
};

seperations(figures);
