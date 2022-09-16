import {
  Outlet,
} from 'react-router-dom';
import MenuBar from './MenuBar';
import { MealsProvider } from './contexts/Meals';
import { SidesProvider } from './contexts/Sides';

const Layout = () => (
  <>
    <MenuBar />
    <MealsProvider>
      <SidesProvider>
        <Outlet />
      </SidesProvider>
    </MealsProvider>
  </>
);

export default Layout;
