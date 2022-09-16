import MenuBar from './MenuBar';
import Planner from './Planner';
import { MealsProvider } from './contexts/Meals';
import { SidesProvider } from './contexts/Sides';

const Layout = () => (
  <>
  <MenuBar />
    <MealsProvider>
      <SidesProvider>
        <Planner />
      </SidesProvider>
    </MealsProvider>
  </>
);

export default Layout;
