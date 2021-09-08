import React, { useContext } from "react";
import { withStyles } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";

// React router dom Import
import { useHistory } from "react-router-dom";

//Internal Imports
import { AuthContext } from "../../Context/authContext";

// Core Imports
import { ListItemText, MenuItem, Menu, Button } from "@material-ui/core";

// Icon Imports
import PersonIcon from "@material-ui/icons/Person";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListItemIcon from "@material-ui/core/ListItemIcon";

const useStyles = makeStyles((theme) => ({
  menuBorder: {
    componentPaper: "25px solid #d3d4d5",
  },
}));

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
    borderRadius: 30,
    backgroundColor: "#efebe9",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default function CustomizedMenus({
  handleShowDetails,
  handleShowFavorites,
}) {
  const classes = useStyles();
  let history = useHistory();
  const { signOut } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Sign Out function gets fired if you click the button + Redirect to the Homescreen
  const onClickSignOut = () => {
    signOut();
    history.push("/");
  };

  return (
    <div>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        style={{ textTransform: "none" }}
        onClick={handleClick}
      >
        Explore Your CoCo
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className={classes.menuBorder}
      >
        <StyledMenuItem onClick={() => handleShowDetails(handleClose)}>
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Profile Details" />
        </StyledMenuItem>
        <StyledMenuItem onClick={() => handleShowFavorites(handleClose)}>
          <ListItemIcon>
            <FavoriteBorderIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="My CoCo Favorites" />
        </StyledMenuItem>
        <StyledMenuItem onClick={() => onClickSignOut()}>
          <ListItemIcon>
            <ExitToAppIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Sign Out" />
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
}
