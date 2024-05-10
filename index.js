const URL="https://api.github.com/users/";
const searchBtn=document.querySelector(".search-btn");
const searchBar=document.querySelector(".search-container");
const root = document.documentElement.style;
const get = (para) => document.getElementById(`${para}`);
const profilecontainer = document.querySelector(".profile-container");
const input=document.getElementById("input");
const noResult=document.getElementById("no-results");
const modeBtn=document.getElementById("btn-mode");
const modeTxt=document.getElementById("mode-txt");
const modeIcon=document.getElementById("icon");
const image=document.getElementById("avatar");
const username=document.getElementById("username");
const user=document.getElementById("user");
const date=document.getElementById("date");
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const bio=document.getElementById("bio");
const repo=document.getElementById("repos");
const followers=document.getElementById("followers");
const following=document.getElementById("following");
const location=document.getElementById("location");
const page=document.getElementById("page");
const twitter=document.getElementById("twitter");
const company=document.getElementById("company");
let darkMode=false;

 function getUserData(getURL){
    // try{
    // const response=await fetch(URL);
    // const data=await response.json();

    // updateData(data);
    // }
    // catch(err){

    // }

    fetch(getURL)
    .then((response)=>response.json)
    .then((data)=>{
        console.log(data);
        updateData(data);
    })
    .catch((error)=>{
        throw error;
    })
}

function updateData(data){
      if(data.message!=='Not Found'){
          noResult.style.dispaly="none";
          function checkNull(para1,para2){
               if(para1==="" || para1===null){
                  para2.style.opacity=0.5;
                  para2.previousElementSibling.style.opacity = 0.5;
                  return false;
               }
               else{
               return true;
               }
          }
      

      image.src=`${data.avatar_url}`;
      username.innerText=data.name === null ? data.login : data.name;
      user.innerText=`${data.login}`;
      user.href=`${data.html_url}`
      datesegments = data.created_at.split("T").shift().split("-");
      date.innerText=`Joined ${datesegments[2]} ${months[datesegments[1] - 1]} ${datesegments[0]}`;
      bio.innerText=data.bio==null ? "This profile has no bio" : `${data.bio}`;
      repo.innerText=`${data.public_repos}`;
      followers.innerText=`${data.followers}`;
      following.innerText = `${data.following}`;
      location.innerText= checkNull(data.location,location) ? data.location : 'Not available';
      page.innerText=checkNull(data.blog,page) ? data.blog : 'Not available';
      page.href=checkNull(data.blog, page) ? data.blog : "#";
      twitter.innerText=checkNull(data.twitter_username,twitter) ? data.twitter_username : 'Not available';
      twitter.href=checkNull(data.twitter_username, twitter) ? `https://twitter.com/${data.twitter_username}` : "#";
      company.innerText=checkNull(data.company,company) ? data.company : 'Not available';
      searchBar.classList.toggle("active"); 
      profilecontainer.classList.toggle("active");
    } else {
      noResult.style.display = "block";
    }
        }



searchBtn.addEventListener('click',function(){
    if(input.value!=""){  //whenever we put some input API call will be done thro the given function
       getUserData(URL+input.value);
    }
});

input.addEventListener('input',function(){
    noResult.style.display="none";  //when in input field there is some text and we add some more then "no results"
                                     //will be hidden
});

input.addEventListener('keydown',function(e){
    if(e.key=='Enter'){  //here keydown is an even when we press any key and here we say that the key must be Enter
        if(input.value!=""){  //so when there is input in the field and we press Enter key 
         getUserData(URL+input.value);  //API call will happen
         console.log(URL+input.value);
        }
    }
});

modeBtn.addEventListener('click',function(){
    if(darkMode){
       lightModeProp(); 
    }
    else{
        darkModeProp();
    }
});


function darkModeProp(){
    root.setProperty("--lm-bg", "#141D2F");
    root.setProperty("--lm-bg-content", "#1E2A47");
    root.setProperty("--lm-text", "white");
    root.setProperty("--lm-text-alt", "white");
    root.setProperty("--lm-shadow-xl", "rgba(70,88,109,0.15)");
    modeTxt.innerText = "LIGHT";
    modeIcon.src = "./assets/images/sun-icon.svg";
    root.setProperty("--lm-icon-bg", "brightness(1000%)");
    darkMode = true;
    localStorage.setItem("dark-mode", true)
}
function lightModeProp(){
    root.setProperty("--lm-bg", "#F6F8FF");
  root.setProperty("--lm-bg-content", "#FEFEFE");
  root.setProperty("--lm-text", "#4B6A9B");
  root.setProperty("--lm-text-alt", "#2B3442");
  root.setProperty("--lm-shadow-xl", "rgba(70, 88, 109, 0.25)");
  modeTxt.innerText = "DARK";
  modeIcon.src = "./assets/images/moon-icon.svg";
  root.setProperty("--lm-icon-bg", "brightness(100%)");
  darkMode = false;
  localStorage.setItem("dark-mode", false);
}

function init(){
     darkMode=false;
     getUserData(url+"thepranaygupta");
}
init();

