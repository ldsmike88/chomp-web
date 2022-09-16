import {
  useState,
  createContext,
  useContext,
  useCallback,
  useMemo,
} from 'react';
import PropTypes from 'prop-types';

const useFetch = (endpoint, cb) => {
  const [loading, setLoading] = useState(false);
  const [denied, setDenied] = useState(false);

  const call = () => new Promise(resolve => {
    setLoading(true);

    const data = [
      {
        _id: '1',
        name: 'Steak',
        sideIds: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
      },
      {
        _id: '2',
        name: 'Spaghetti',
        sideIds: ['10', '2'],
      },
      {
        _id: '3',
        name: 'Stroganoff',
        sideIds: ['11'],
      },
      {
        _id: '4',
        name: 'Tacos',
        sideIds: [],
        image: {
          alt: 'The house from the offer.',
          src: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2',
        },
      },
      {
        _id: '5',
        name: 'Lemon Pepper Chicken',
        sideIds: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
      },
      {
        _id: '6',
        name: 'Lasagna',
        sideIds: ['10', '2'],
      },
    ];

    setTimeout(() => {
      cb(data);
      setLoading(false);
      setDenied(false);
      resolve();
    }, 2000);
  });

  return [call, loading, denied];
};

const MealsContext = createContext();
const MealsProvider = props => {
  const { children } = props;

  const [fetchMealsCalled, setFetchMealsCalled] = useState(false);
  const [meals, setMeals] = useState([]);
  const [fetchMeals, mealsLoading] = useFetch('getMeals', setMeals, 'GET'); // TODO: Replace with real fetch

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
    () => ({ mealsLoading, getMeals, getMeal }),
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
