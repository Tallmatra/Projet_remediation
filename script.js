 const tp=document.getElementById('top');  
const API_URL ="https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI ="https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";
const center=document.getElementById('center');
const input=document.querySelector('input');
const search=document.querySelector('.search');
var page=1;
 
film(API_URL);
function film(url){
 fetch(url).then(res=>res.json()).then(data=>{
    console.log(data.results);
    showMovies(data.results);
 })
}
function showMovies(data){
center.innerHTML="";
data.forEach(center1=>{
  const {title,poster_path,vote_average,overview}=center1;
  const centre=document.createElement('div') ;
  centre.classList.add('center1');
  const img=document.createElement('img');
  img.src= IMG_PATH+poster_path;
  centre.appendChild(img);

  const cnt1=document.createElement('div');
  cnt1.classList.add('cnt1');

  const h3=document.createElement('h3');
  h3.innerHTML=title ;
  cnt1.appendChild(h3);
  const span=document.createElement('span');
  span.style.color=getColor(vote_average);
  span.innerHTML=vote_average;
  cnt1.appendChild(span);
  centre.appendChild(cnt1);

  const text=document.createElement('div');
  text.classList.add("text");

  const h=document.createElement('h3');
  h.innerHTML=`Overview`;
  text.appendChild(h);

  text.innerHTML=overview;
  centre.appendChild(text) ;
   
  center.appendChild(centre)
}) 
}
function getColor(vote){
  if(vote>=8){
    return 'green';
  }
  else if(vote>=5 ){
    return 'orange';
  }else{
    return 'red';
  }
}  
   input.addEventListener('change',value) 
function value(e){
  tp.textContent=e.target.value;
} 
// charger les pages de fur et à mesure qu on scroll
window.onscroll=function(){
  if((window.innerHeight+window.scrollY) >= document.body.scrollHeight){
    page++;
    film(API_URL+page);
  }
}
// chercher film
search.addEventListener('keyup',(e)=>{
  e.preventDefault();
  const searchFilm=search.value;
  if(searchFilm){
    film(SEARCHAPI+searchFilm)
  }else{
    film(API_URL);
  }
})