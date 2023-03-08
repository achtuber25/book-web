
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainCmp from './cmp/MainCmp';
import Together from './cmp/Together';
import Feelings from './cmp/Feelings';
import Gallery from './cmp/Gallery';


import DashboardBook from './cmp/DashboardBook'
import Login from './cmp/Login'

import Settings from './cmp/Settings'
import YoutubeDownloader from './cmp/YoutubeDownloader'



//https://achtuber25.github.io/VA_Memories/src/images/aditya/Av0.jpg


const App = () => {

  return (
    <div className='App' style={{ backgroundColor: "#f2f2f2" }}>
      <BrowserRouter >
        <Routes>
          <Route path="/" element={<MainCmp />}>
            <Route index element={<Login />} />
            <Route path="/DashboardBook" element={<DashboardBook />} />
            <Route path="/YoutubeDownloader" element={<YoutubeDownloader />} />
            <Route path="/Settings" element={<Settings />} />
            <Route path="/Together" element={<Together />} />
            <Route path="/Feelings" element={<Feelings />} />
            <Route path="/Gallery" element={<Gallery />} />


          </Route>
        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;
