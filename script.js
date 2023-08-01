// variables
const generalBtn = document.getElementById("general");
const businessBtn = document.getElementById("business");
const sportsBtn = document.getElementById("sport");
const entertainmentBtn = document.getElementById("entertainment");
const scienceBtn = document.getElementById("science");
const technologyBtn = document.getElementById("technology");
const searchBtn = document.getElementById("searchBtn");

const newsQuery = document.getElementById("newsQuery");
const newsType = document.getElementById("newsType");
const newsdetails = document.getElementById("newsdetails");

// APIs
const API_KEY = '0cf3ed8422cd4005a4bbf5b0d86254cc';
const HEADLINES_NEWS = "https://newsapi.org/v2/top-headlines?country=in&apiKey=";
const SEARCH_NEWS = "https://newsapi.org/v2/everything?q=";

// Helper function to fetch news based on category or search query
const fetchNews = async (category = "", query = "") => {
  const endpoint = query
    ? `${SEARCH_NEWS}${encodeURIComponent(query)}&apiKey=${API_KEY}`
    : `${HEADLINES_NEWS}${category ? `&category=${category}` : ""}&apiKey=${API_KEY}`;

  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }
    const data = await response.json();
    return data.articles;
  } catch (error) {
    console.error("Error fetching news:", error.message);
    return [];
  }
};

// Helper function to display news articles
const displayNews = (articles) => {
  newsdetails.innerHTML = "";

  if (articles.length === 0) {
    newsdetails.innerHTML = "<h5>No data found.</h5>";
    return;
  }

  articles.forEach((news) => {
    var date = news.publishedAt.split("T");

    var col = document.createElement("div");
    col.className = "col-sm-12 col-md-4 col-lg-3 p-2 card";

    var card = document.createElement("div");
    card.className = "p-2";

    var image = document.createElement("img");
    image.setAttribute("height", "matchparent");
    image.setAttribute("width", "100%");
    image.src = news.urlToImage;

    var cardBody = document.createElement("div");

    var newsHeading = document.createElement("h5");
    newsHeading.className = "card-title";
    newsHeading.innerHTML = news.title;

    var dateHeading = document.createElement("h6");
    dateHeading.className = "text-primary";
    dateHeading.innerHTML = date[0];

    var description = document.createElement("p");
    description.className = "text-muted";
    description.innerHTML = news.description;

    var link = document.createElement("a");
    link.className = "btn btn-dark btn-outline-warning";
    link.setAttribute("target", "_blank");
    link.href = news.url;
    link.innerHTML = "Read more";

    cardBody.appendChild(newsHeading);
    cardBody.appendChild(dateHeading);
    cardBody.appendChild(description);
    cardBody.appendChild(link);

    card.appendChild(image);
    card.appendChild(cardBody);

    col.appendChild(card);

    newsdetails.appendChild(col);
  });
};

// Event handler for category buttons and search button
const handleCategoryButtonClick = async (event) => {
  const category = event.target.id;
  const query = newsQuery.value;

  newsType.innerHTML = `<h3><b>${query ? `Showing results for: ${query}` : `${category.toUpperCase()} NEWS`}</b></h3>`;

  const articles = await fetchNews(category, query);
  displayNews(articles);
};

// Attach event listeners to buttons
generalBtn.addEventListener("click", handleCategoryButtonClick);
businessBtn.addEventListener("click", handleCategoryButtonClick);
sportsBtn.addEventListener("click", handleCategoryButtonClick);
entertainmentBtn.addEventListener("click", handleCategoryButtonClick);
scienceBtn.addEventListener("click", handleCategoryButtonClick);
technologyBtn.addEventListener("click", handleCategoryButtonClick);
searchBtn.addEventListener("click", handleCategoryButtonClick);
