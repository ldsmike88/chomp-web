import {
  useState,
  createContext,
  useContext,
  useCallback,
  useMemo,
} from 'react';
import PropTypes from 'prop-types';
import { useFetch } from '../hooks';

// const useFetch = (endpoint, cb) => {
//   const [loading, setLoading] = useState(false);
//   const [denied, setDenied] = useState(false);

//   const call = () => new Promise(resolve => {
//     // eslint-disable-next-line no-console
//     console.log('Fetch meals called');
//     setLoading(true);

//     const data = ;

//     setTimeout(() => {
//       cb(data);
//       setLoading(false);
//       setDenied(false);
//       resolve();
//     }, 2000);
//   });

//   return [call, loading, denied];
// };

const MealsContext = createContext();
const MealsProvider = props => {
  const { children } = props;

  const [fetchMealsCalled, setFetchMealsCalled] = useState(false);
  const [meals, setMeals] = useState([]);
  const [fetchMeals, mealsLoading] = useFetch('getMeals', setMeals, 'GET');

  const getMeals = useCallback(() => {
    if (!fetchMealsCalled) {
      fetchMeals();
      setFetchMealsCalled(true);
      return undefined;
    }
    if (fetchMealsCalled && mealsLoading) return undefined;
    return meals;
  }, [fetchMealsCalled, mealsLoading, meals]);

  const getMeal = useCallback(mealId => {
    if (!fetchMealsCalled) {
      fetchMeals();
      setFetchMealsCalled(true);
      return undefined;
    }
    if (fetchMealsCalled && mealsLoading) return undefined;

    return meals.find(m => m._id === mealId);
  }, [fetchMealsCalled, mealsLoading, meals]);

  const context = useMemo(
    () => ({
      mealsLoading,
      getMeals,
      getMeal,
      get meals() {
        return getMeals();
      },
    }),
    [mealsLoading, getMeals, getMeal],
  );

  return (
    <MealsContext.Provider value={context}>
      {children}
    </MealsContext.Provider>
  );
};

MealsProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

const useMeals = () => useContext(MealsContext);

export { MealsContext, MealsProvider, useMeals };
