import "./App.css";
import React from "react";
import Index from './Component/Main/Index'
import { Route, Routes,NavLink  } from "react-router-dom";


function App() {
//   const [Tabledata, changeTabledata] = React.useState([]);
//   const handleCallback = (childData) =>{
//    console.log(childData);
//    changeTabledata(childData);
// }
// console.log(Tabledata);
  return (
    <div>
      <Routes>
      <Route  path="/" element={<Index  />} />
        
      </Routes>
    </div>
  );
}

export default App;
