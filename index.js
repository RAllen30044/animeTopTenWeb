const figures = [
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];
const addToList = (list) => {
  const selectionItem = document.getElementsByClassName("selection");
  const selectionH6 = document.createElement("h6");
  selectionH6.setAttribute("class", "add-to-list");
  selectionItem[selectionItem.length - 1].appendChild(selectionH6);
  document.getElementsByClassName("add-to-list")[
    selectionItem.length - 1
  ].innerHTML = `+ Add to ${list}`;
};

const favorites = () => {
  addToList("Top Ten");
  removeFromList("Favorites");
};

 const removeFromList = (list) => {
  const selectionItem = document.getElementsByClassName("selection");
  const selectionH6 = document.createElement("h6");
  selectionH6.setAttribute("class", "remove-from-list");
  selectionItem[selectionItem.length - 1].appendChild(selectionH6);
  const removeItem = document.getElementsByClassName("remove-from-list");
  removeItem[removeItem.length-1].innerHTML = `- Remove from ${list}`;
 };

const createCatagory = (char) => {
  const listNavItem = document.getElementsByClassName("list-nav");
  const charH6 = document.createElement("h3");
  charH6.setAttribute("id", `select${char}`);
  listNavItem[0].appendChild(charH6);
  document.getElementById(`select${char}`).innerHTML = `${char}`.toUpperCase();

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
  animeWrapperContainerDiv.setAttribute("class", "anime-wrapper-container");
  categoryItem[0].appendChild(animeWrapperContainerDiv);
  contentWrapper(name, type, pic);
 addToList("Favorites");
};

const favoritesList = (name, type, pic) => {
  const animeListItem = document.getElementsByClassName(`animeList-item`);
  const animeWrapperContainerDiv = document.createElement("div");
  animeWrapperContainerDiv.setAttribute("class", "anime-wrapper-container");
  animeListItem[1].appendChild(animeWrapperContainerDiv);
  contentWrapper(name, type, pic);

  addToList("Top Ten");
   removeFromList("Favorites");
};

const topTenList = (name, type, pic) => {
  const animeListItem = document.getElementsByClassName(`animeList-item`);
  const animeWrapperContainerDiv = document.createElement("div");
  animeWrapperContainerDiv.setAttribute("class", "anime-wrapper-container");
  animeListItem[2].appendChild(animeWrapperContainerDiv);
  contentWrapper(name, type, pic);

 removeFromList("Top Ten");
};
let infoArray =[];
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
  // infoArray.sort((a, b) => a.name.localeCompare(b.name));
  for(let info of infoArray){
    if (info.pic) {
     favoritesList(info.name, info.type, info.pic);
   }
  }
  for(let info of infoArray){
    if (info.pic) {
     topTenList(info.name, info.type, info.pic);
   }
  }

}


seperations(figures);



