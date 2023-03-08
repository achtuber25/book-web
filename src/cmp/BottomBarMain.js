import React from 'react';
import { obj } from './config'
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import { NavLink } from "react-router-dom";
export default function BootomBarMain() {
  const [value, setValue] = React.useState(0);
  const isSafe = JSON.parse(localStorage.getItem('isSaftey'))
  return (
    <Box sx={{ width: '100%', }} style={{ position: 'fixed', height: '50px', bottom: "0px" }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Books" component={NavLink} to="/DashboardBook" icon={<MenuBookIcon />} />
        <BottomNavigationAction label="Youtube" component={NavLink} to="/YoutubeDownloader" icon={<YouTubeIcon />} />
        {isSafe !== true && <BottomNavigationAction label="Feelings" component={NavLink} to="/Feelings" icon={<FavoriteIcon />} />}

        <BottomNavigationAction label="Together" component={NavLink} to="/Together" icon={<FamilyRestroomIcon />} />

      </BottomNavigation>
    </Box>
  );
}