import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

const pages = ['Planner', 'Kitchen', 'Shopping List'];

const MenuBar = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);

  const toggleMenu = (open) => (event) => {
    if (
      event.type === 'keydown'
      && (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setMenuOpen(open);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: 'flex' }}
          >
            Chomp
          </Typography>

          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={toggleMenu(true)}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Drawer anchor="right" open={menuOpen} onClose={toggleMenu(false)}>
              <Box
                sx={{ width: 150 }}
                role="presentation"
                onClick={toggleMenu(false)}
                onKeyDown={toggleMenu(false)}
              >
                <List>
                  {pages.map((text) => (
                    <ListItem button key={text}>
                      <ListItemText primary={text} />
                    </ListItem>
                  ))}
                </List>
                <Divider />
                <List>
                  {['Settings', 'Account', 'About'].map(text => (
                    <ListItem button key={text}>
                      <ListItemText primary={text} />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Drawer>
          </Box>
          {pages.map((page) => (
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: 'none', md: 'flex' },
              }}
              key={page}
            >
              <Button
                onClick={toggleMenu(false)}
                sx={{
                  mx: 2,
                  color: 'white',
                  display: 'block',
                  borderBottom: page === 'Planner' ? 2 : 0,
                  borderRadius: 0,
                }}
              >
                {page}
              </Button>
            </Box>
          ))}
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={toggleMenu(true)}
            color="inherit"
            sx={{ display: { xs: 'none', md: 'block' } }}
          >
            <SettingsIcon />
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default MenuBar;
