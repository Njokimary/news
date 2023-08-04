document.addEventListener("DOMContentLoaded", function () {
    // const API_KEY = "55c6498d47dc42e58594ea740046d649";
    // const url = "https://newsapi.org/v2/everything?q=";
  
    async function fetchData(query) {
      try {
        const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
        const data = await res.json();
        return data;
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    }
  
    function renderMain(arr) {
      let mainHtml = '';
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].urlToImage) {
          mainHtml += `<div class="card">
              <a href=${arr[i].url}>
                  <img src=${arr[i].urlToImage} lazy="loading"/>
                  <h4>${arr[i].title}</h4>
                  <div class="publishbyDate">
                      <p>${arr[i].source.name}</p>
                      <span>•</span>
                      <p>${new Date(arr[i].publishedAt).toLocaleDateString()}</p>
                  </div>
                  <div class="desc">
                      ${arr[i].description}
                  </div>
              </a>
          </div>`;
        }
      }
  
      const mainElement = document.querySelector(".main");
      if (mainElement) {
        mainElement.innerHTML = mainHtml;
      } else {
        console.error("Element with class 'main' not found.");
      }
    }
  
    async function searchNews(query) {
      try {
        const data = await fetchData(query);
        renderMain(data.articles);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  
    const searchForm = document.getElementById("searchForm");
    const searchInput = document.getElementById("searchInput");
  
    searchForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const query = searchInput.value.trim();
      if (query !== "") {
        searchNews(query);
      }
    });
  
    // Initial load with default query "all"
    searchNews("all");
  
    let mobilemenu = document.querySelector(".mobile");
    let menuBtn = document.querySelector(".menuBtn");
  
    menuBtn.addEventListener("click", () => {
      if (menuBtn) {
        mobilemenu.classList.toggle("hidden");
      }
    });
  
    // Helper function to trigger search based on category
    function search(category) {
      searchNews(category);
    }
  
    // Add event listeners to each navbar element
    const navbarElements = document.querySelectorAll(".desktop nav ul li");
    navbarElements.forEach((element) => {
      element.addEventListener("click", () => {
        const category = element.textContent.trim().toLowerCase();
        search(category);
      });
    });
  });
  