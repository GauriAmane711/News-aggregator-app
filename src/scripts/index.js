//Code for changing the dark mode and light mode
const checkbox=document.getElementById('checkbox');
checkbox.addEventListener('change',()=>{
  document.body.classList.toggle('light');
});

const apikey="8cc07b3361bd4e5abbf5935515d3d469";
var article_area=document.getElementById("news-articles");

//Function to have all news in specific format//
function getNews(news){
  let output="";
  if(news.totalResults>0){
    news.articles.forEach(ind=>{
      output+= ` <section class="container">
                 <li class="article"><a class="article-link" href="${ind.url}" target="_blank">
                 <div class="img_area">
                 <img src="${ind.urlToImage}" class="article-img" alt="${ind.title}"></img>
                 </div>
                 <h2 class="article-title">${ind.title}</h2>
                 <p class="article-description">${ind.description || "Description not available"}</p> <br>
                 <span class="article-author">-${ind.author? ind.author: "Anon"}</span><br>
                 </a>
                 </li>
                 </section>
                 `;
    });
    article_area.innerHTML=output;
  }
  else
  { 
    article_area.innerHTML='<li class="not-found">No article was found based on the search.</li>';
  }
};
// Function to retreive news //
async function retreive(searchValueText=""){

    article_area.innerHTML='<div class="loader"> <img src="img/loader1.gif" alt="LOADING......."></div>';
    
    if(searchValueText==""){
      url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=${apikey}`;
    }
    else
    {
      url=`https://newsapi.org/v2/everything?q=${searchValueText}&apiKey=${apikey}`;
    }
    const response=await fetch(url);
    const result=await response.json();
    getNews(result);
}
//Search according to given text in search bar//
async function searchvalue(e){  
    if (event.which === 13 || event.keyCode === 13 || event.key === "Enter")
     {
      retreive(e.target.value);
     }
};
function start(){
  document.getElementById("search").addEventListener('keypress',searchvalue);
  retreive();
}
(function(){
  start();}
)();