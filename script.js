const searchInput = document.querySelector(".search--input");
const searchBtn = document.querySelector(".search--icon");
const done = document.querySelector(".heading--tr");
const box = document.querySelector(".box");
const foodImg = document.querySelector(".food--img");
const foodNameall = document.querySelector(".heading-four");
const result = document.querySelector(".section__result");
const instuction = document.querySelector(".instuction--text");
const youtube = document.querySelector(".youtubeLink");
const popup = document.querySelector(".popup");
const close = document.querySelector(".close");
const popupImg = document.querySelector(".popup--img");

let getFood = function (foodName) {
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`)
    .then(function (responce) {
      if (!responce.ok) {
        throw new Error((done.style.display = "block"));
      }
      return responce.json();
    })
    .then(function (res) {
      plusHtml(res);
    })
    .catch(error);
};

searchBtn.addEventListener("click", function (e) {
  e.preventDefault();
  getFood(searchInput.value);
  done.style.display = "none";
});

let plusHtml = function (res) {
  res.meals.forEach((val) => {
    let html = `
    <div class="box" id="${val.idMeal}">
          <img  class="food--img" src="${val.strMealThumb}" alt="Image" />
          <h4 class="heading--four">${val.strMeal}</h4>
          <button class="btn--recipe">Get Recipe</button>
        </div>`;

    result.insertAdjacentHTML("afterbegin", html);
    let btnrecipe = document.querySelector(".btn--recipe");

    btnrecipe.addEventListener("click", (e) => {
      let aniq = btnrecipe.parentElement.id;
      let pop = res.meals.find((el) => {
        return el.idMeal === aniq;
      });
      instuction.textContent = pop.strInstructions;
      youtube.href = pop.strYoutube;
      popup.style.display = "flex";
      popupImg.src = pop.strMealThumb;
      document.querySelector("body").style.overflow = "hidden";
      console.log(pop);

      // e.preventDefault();
      // console.log(id);
    });
    close.addEventListener("click", () => {
      popup.style.display = "none";
      document.querySelector("body").style.overflow = "auto";
    });
  });
};
