import {
  useState,
  useCallback,
  // useContext,
  // useEffect,
} from 'react';
import { Card, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import MealDialog from './MealDialog';
import { Loading } from '../sharedComponents';
import { useMeals } from '../contexts';
// import { MealsContext } from '../contexts/Meals';
// import { MealsContext } from '../contexts/Meals';

const MyCard = styled(Card)(({ theme }) => ({
  color: 'darkslategray',
  backgroundColor: 'aliceblue',
  margin: theme.spacing(1),
  padding: theme.spacing(1),
  borderRadius: 4,
}));

const Planner = () => {
  const [selectedMealId, setSelectedMealId] = useState(null);
  const [mealDialogOpen, setMealDialogOpen] = useState(false);

  // const [meals, setMeals] = useState(undefined);
  // const { getMeals } = useMeals();
  // useEffect(() => { setMeals(getMeals()); }, [getMeals]);

  const open = useCallback(mealId => {
    setMealDialogOpen(true);
    setSelectedMealId(mealId);
  }, [setMealDialogOpen, setSelectedMealId]);
  const close = useCallback(() => setMealDialogOpen(false), [setMealDialogOpen]);

  // const { getMeals } = useMeals();
  // const meals = getMeals();
  // let meals;

  const { meals } = useMeals();

  // setTimeout(() => {
  //   // meals = useMeals().meals;
  //   meals = useContext(MealsContext).meals;
  // }, 1000);

  if (!meals) return <Loading />;

  return (
    <>
      <Box sx={{ flexDirection: 'row' }}>
        {meals.map(({ _id, name, image }) => (
          <MyCard
            key={_id}
            onClick={() => { open(_id); }}
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              // alignItems: 'center',
              // bgcolor: 'background.paper',
              overflow: 'hidden',
              // borderRadius: '12px',
              // boxShadow: 1,
              // fontWeight: 'bold',
              // padding: 0,
            }}
          >
            {image ?
              (
                <Box
                  component="img"
                  sx={{
                    height: 233,
                    width: 350,
                    maxHeight: { xs: 233, md: 167 },
                    maxWidth: { xs: 350, md: 250 },
                    padding: 0,
                    margin: 0,
                  }}
                  alt={image.alt}
                  src={image.src}
                />
              ) :
              null}
            {name}
          </MyCard>
        ))}
      </Box>
      <MealDialog {...{ opened: mealDialogOpen, selectedMealId, close }} />
    </>
  );
};

export default Planner;
