import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {

//useState is used to render the changes on ui
const[text,setText]=useState('');
const[name,setName]=useState('Love');
function changeHandler(event){
  console.log(text);
  setText(event.target.value);
}

//useEffect is used to manage side effect after every update on ui
//variation1 - after every render
// useEffect(()=>{
//   console.log("Rendering done");
// });


//variation2 - after 1st render only
// useEffect(()=>{
//   console.log("rendering done");
// },[]); ->[] dependencies

//variation3 - first render + when dependencies changes
// useEffect(()=>{
//   console.log("change observed");
// },[name]);

//variation4-to handle unmounting of the component
useEffect(()=>{
  //add event listener
  console.log("event added");
return(()=>{
  console.log("event removed"); //line37 executed frst before line 35
});
},[text]);

  return (
    <div className="app">
  <input type="text" onChange={changeHandler}></input>
  </div>
  );
}

export default App;
