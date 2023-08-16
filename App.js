const loadSavedNewsBtn = document.querySelector("#loadSaved");
const loadNewNewsBtn = document.querySelector("#loadNew");
const dashboard = document.getElementById("dashboard");
const savedNews = document.getElementById("savedNews");
const newNews = document.getElementById("newNews");
let newsText = document.getElementById("news");
const savedNewss = document.getElementById("savedNewsText");
const selectFilter = document.getElementById("newsCategory");
const Key = "k9r15XB6nHXWebziCvGglFlcp632wpLtkB3VF1L4RzXP6A7K";
//this is fetch section
fetch(`https://api.currentsapi.services/v1/latest-news?apiKey=${Key}`)
  .then((response) => response.json())
  .then((json) => {
    renderNews(json);
  })
  .catch((error) => {
    console.log(error, "this is errorr");
  });

selectFilter.addEventListener("change", function () {
  let selectedCategory = selectFilter.value;
  fetch(
    `https://api.currentsapi.services/v1/latest-news?category=${selectedCategory}&apiKey=${Key}`
  )
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      renderCategoryNews(json);
    });
});

//this below section is function which show fetching data

function renderNews(json) {
  let allContent = "";
  let data = json.news;
  //console.log(data);

  for (var i = 0; i < data.length; i++) {
    const it = data[i];
    allContent += `<div class="change">
    
    <img src="${it.image}" alt="Image" height="200px" width="100%" />
    <p class="published">Category : ${it.category}</p>
    <h4 class="title">${it.title}</h4>
    <div style="display:flex;flex-direction:row;justify-content:space-between;">
    <p class="author">By ${it.author}</p>
    <p class="published">Date: ${it.published}</p>
    </div>
    <div>
    <p class="description">${it.description}<a href="${it.url}">See more</a></p>
    </div>
    <div>
    <button class="like-button" id="${i}">
      Like
    </button>
    </div>
  </div>`;
  }
  newsText.innerHTML = allContent;
  const buttons = newsText.querySelectorAll(".main .change .like-button");
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function () {
      loveButton(data[buttons[i].id]);
    });
  }
}

//this is category section

function renderCategoryNews(json) {
  let allContent = "";
  let data = json.news;
  for (var i = 0; i < data.length; i++) {
    const it = data[i];
    allContent += `<div class="change">
    
    <img src="${it.image}" alt="Image" height="200px" width="100%" />
    <p class="published">Category : ${it.category}</p>
    <h4 class="title">${it.title}</h4>
    <div style="display:flex;flex-direction:row;justify-content:space-between;">
    <p class="author">By ${it.author}</p>
    <p class="published">Date: ${it.published}</p>
    </div>
    <div>
    <p class="description">${it.description}<a href="${it.url}">See more</a></p>
    </div>
    <div>
    <button class="like-button" id="${i}">
      Like
    </button>
    </div>
  </div>`;
  }
  newsText.innerHTML = allContent;
  const buttons = newsText.querySelectorAll(".main .change .like-button");
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function () {
      loveButton(data[buttons[i].id]);
    });
  }
}
function myFunction() {
  newNews.style.display = "none";
  savedNews.style.display = "none";
  dashboard.style.display = "block";
}

loadSavedNewsBtn.addEventListener("click", function () {
  // Code to load saved news
  dashboard.style.display = "none";
  savedNews.style.display = "block";
  document.getElementById("saveNews1").style.backgroundColor = "grey";
  savedNews();
});

loadNewNewsBtn.addEventListener("click", function () {
  //  // Code to load new news
  dashboard.style.display = "none";
  newNews.style.display = "block";
  document.getElementById("loadNew1").style.backgroundColor = "grey";
});

//this is button section

function loveButton(data) {
  let author = data.author;
  let description = data.description;
  let url = data.url;
  let image = data.image;
  let title = data.title;
  let published = data.published;
  let category = data.category;
  const savedNews = JSON.parse(localStorage.getItem("loveButton")) || [];
  savedNews.push({
    author,
    description,
    image,
    url,
    title,
    published,
    category
  });
  localStorage.setItem("loveButton", JSON.stringify(savedNews));

  let likeButtons = document.getElementsByClassName("like-button");
  for (let i = 0; i < likeButtons.length; i++) {
    likeButtons[i].addEventListener("click", function () {
      this.style.backgroundColor = "red";
    });
  }
}

////this is saved function
//
function savedFunction() {
  const savedNews = JSON.parse(localStorage.getItem("loveButton")) || [];
  let output = "";
  savedNews.forEach(function (element) {
    output += `<div class="change">
      <img src="${element.image}"height="200px" width="100%"></img>
      <p class="category">Category : ${element.category}</p>
      <h4 class="title">${element.title}</h4>
      <div style="display:flex;flex-direction:row;justify-content:space-between;">
    <p class="author">By ${element.author}</p>
    <p class="published">Date: ${element.published}</p>
    </div>
      <p class="description">${element.description}<a href="${element.url}">See more</a></p> 
      <button class="like-button" style="background-color:darkred">Like
     </button>
      </div>`;
  });
  document.getElementById("savedNewsText").innerHTML = output;
}
