import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction  from '@material-ui/core/BottomNavigationAction';

const useStyles = makeStyles({
    root:{
        width: 500,
    },
});

const BottomNavigation = () => {

    const classes = useStyles();

    return ( 
        <BottomNavigation>
            <BottomNavigationAction label='Home' icon={} />
            <BottomNavigationAction label='Profile' icon={} />
            <BottomNavigationAction label='Information' icon={} />
        </BottomNavigation>
     );
}
 
export default BottomNavigation;