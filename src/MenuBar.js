import { useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Menu, Settings } from '@mui/icons-material';

const webPages = ['Planner', 'Kitchen', 'Shopping List'];
const mobilePages = [...webPages, 'divider', 'Settings', 'Account', 'About'];

const MenuBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = open => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setMenuOpen(open);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, display: 'flex' }}>
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
              <Menu />
            </IconButton>
            <Drawer anchor="right" open={menuOpen} onClose={toggleMenu(false)}>
              <Box
                sx={{ width: 150 }}
                role="presentation"
                onClick={toggleMenu(false)}
                onKeyDown={toggleMenu(false)}
              >
                <List>
                  {mobilePages.map(text => (
                    text === 'divider' ?
                      <Divider key={text} /> :
                      (
                        <ListItem button key={text}>
                          <ListItemText
                            // primary={<Link to={text.replace(/\s/g, '_')}>{text}</Link>}
                            primary={text}
                            onClick={() => navigate(`/${text.replace(/\s/g, '_')}`)}
                          />
                        </ListItem>
                      )
                  ))}
                </List>
              </Box>
            </Drawer>
          </Box>

          {webPages.map(page => (
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
            <Settings />
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default MenuBar;
