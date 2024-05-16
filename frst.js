const API_KEY= "d1845658f92b31c64bd94f06f7188c9c";
function renderWeatherInfo(){
    let newPara=document.createElement('p');
    newPara.textContent=`${data?.main?.temp.toFixed(2)} °C`
    document.body.appendChild(newPara);
    }

async function fetchWeatherDetails(){
    try{
    let city='goa';
    const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
    
    const data=response.json();
    console.log("data:",data);
    renderWeatherInfo();
}
catch(err){
  console.log(err);
}
}

async function getCustomWeatherDetails(){
    try{
     let latitude=15.6333;
     let longitude=18.3333;
     let response=await fetch(`https://api.openweathermap.org/data/2.5/weather?
     lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);

     let data = await response.json();
     console.log(data);
    }
    catch(err){
        console.log("Error found" ,err);
    }
}

function switchTab(clickedTab) {

    apiErrorContainer.classList.remove("active");
  
    if (clickedTab !== currentTab) {
      currentTab.classList.remove("current-tab");
      currentTab = clickedTab;
      currentTab.classList.add("current-tab");
  
      if (!searchForm.classList.contains("active")) {
        userInfoContainer.classList.remove("active");
        grantAccessContainer.classList.remove("active");
        searchForm.classList.add("active");
      } 
      else {
        searchForm.classList.remove("active");
        userInfoContainer.classList.remove("active");
        //getFromSessionStorage();
      }
  
      // console.log("Current Tab", currentTab);
    }
}

function getLocation(){
    if(navigator.geolocation){ //checking whether geolocation features is available or not
         navigator.geolocation.getCurrentPosition(showPosition);
         //navigator.geolocation.getCurrentPosition -> gives the cureent location of the user
    }
    else{
        console.log("No geolocation supported");
    }
}

function showPosition(position){
    let lat=position.coords.latitude;
    let lon=position.coords.longitude;

    console.log(lat);
    console.log(lon);
}
  