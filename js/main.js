let input = document.querySelector("input"),
    select = document.querySelector("select"),
    countries_field = document.querySelector(".countries_field"),
    content = document.querySelector(".content");
async function getApi() {
  const response = await fetch("https://restcountries.com/v2/all");
  const countries = await response.json();
  show_countries(countries);
  input.addEventListener("keyup", function () {  
    filter_countries_when_search(countries);
  });

  select.addEventListener("change", function () {
    input.value = "";
    filter_countries_with_select(countries);
  });
}
function show_countries(countries) {
  filtered_countries = countries.filter((country) => {
    return country.name !== "Israel" ? country : "";//لا ندعم الخنازير 
  });
  countries_map = filtered_countries
    .map((country) => {
      return `
            <div class="country_card">
           <div class="country_flag">
             <img src="${country.flags.png}" alt="">
       </div>
       <div class="country_info">
           <span class="country_name">${country.name}</span>
           <span class="country_population">population: ${country.population}</span>
           <span class="country_region">region: ${country.region}</span>
           <span class="country_capital">capital: ${country.capital}</span>
         </div>
         </div>
           `;
    })
    .join("");
  countries_field.innerHTML = countries_map;
  countries_field.addEventListener("click", function (e) {
    if (e.target.parentElement.parentElement.getAttribute("class") === "country_card") {
      let country_card = e.target.parentElement.parentElement ,//  <div class="country_card">  </div>
        country_name = country_card.children[1].children[0].textContent,
        filtered_click_countries = countries.filter((country) => {
          return country.name === country_name ? country : "";
        });
      filtered_click_countries_map = filtered_click_countries.map((country) => {
        return `      
            <div class="clicked_country container">
          <header>
              <button class="btn_back" onclick=" location.reload()"><i class="fas fa-long-arrow-alt-left"></i>Back</button>
          </header>
          <div class="flag_img">
              <img src="${country.flags.png}" alt="">
          </div>
          <div class="country_info">
              <header>
                  <h1>${country.name}</h1>
              </header>
              <aside>
                  <span><strong>Native Name :</strong>${country.nativeName}</span>
                  <span><strong>Population :</strong> ${country.population}</span>
                  <span><strong>Region : </strong>${country.region}</span>
                  <span><strong>Sub Region :</strong>${country.subregion}</span>
                  <span><strong>Capital :</strong> ${country.capital}</span>
              </aside>
              <aside>
                  <span><strong>Top Level Domain :</strong>${country.topLevelDomain[0]}</span>
                  <span><strong>Currencies :</strong>${country.currencies[0].name}</span>
                  <span><strong>Languages  :</strong>${country.languages[0].name}</span>
              </aside>
              <footer>
                  <h5>Border countries: </h5>
                  <span>${country.borders[0]}</span>
                  <span>${country.borders[1]}</span>
                  <span>${country.borders[2]}</span>
                  <span>${country.borders[3]}</span>
                 
              </footer>
          </div>
            `;
      });

      content.innerHTML = filtered_click_countries_map;
    }
  });
}
function filter_countries_with_select(countries) {
  searched_country = countries.filter((country) => {
    return country.region === select.value;
  });
  if (select.value !== "All") {
    show_countries(searched_country);
  } else {
    show_countries(countries);
  }
}
function filter_countries_when_search(countries){
  searched_country = countries.filter((country) => {
    return select.value !== "All"
      ? country.name.toLowerCase().includes(input.value.toLowerCase()) &&
          country.region == select.value
      : country.name.toLowerCase().includes(input.value.toLowerCase());
  });

  show_countries(searched_country);
  if (searched_country.length === 2) {
    countries_field.style.justifyContent = "start";
    countries_field.children[0].style.marginRight = "20px";
  }else{
    countries_field.style.justifyContent = "space-between";
  }

}
getApi();
