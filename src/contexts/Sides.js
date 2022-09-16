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
        name: 'Corn on the Cob',
      },
      {
        _id: '2',
        name: 'Salad',
      },
      {
        _id: '3',
        name: 'Canned Corn',
      },
      {
        _id: '4',
        name: 'Fresh Green Beans',
      },
      {
        _id: '5',
        name: 'Canned Green Beans',
      },
      {
        _id: '6',
        name: 'Baked Potatoes',
      },
      {
        _id: '7',
        name: 'Sweet Potatoes',
      },
      {
        _id: '8',
        name: 'Mashed Potatoes',
      },
      {
        _id: '9',
        name: 'French Fries',
      },
      {
        _id: '10',
        name: 'Garlic Toast',
      },
      {
        _id: '11',
        name: 'Cranberry Sauce',
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

const SidesContext = createContext();
const SidesProvider = props => {
  const { children } = props;

  const [fetchSidesCalled, setFetchSidesCalled] = useState(false);
  const [sides, setSides] = useState([]);
  const [fetchSides, sidesLoading] = useFetch('getSides', setSides, 'GET'); // TODO: Replace with real fetch

  const ready = useCallback(() => {
    if (!fetchSidesCalled) {
      fetchSides();
      setFetchSidesCalled(true);
      return false;
    }

    if (fetchSidesCalled && sidesLoading) return false;

    return true;
  }, [fetchSidesCalled, sidesLoading]);

  const getSides = useCallback(
    () => (ready() ? sides : undefined),
    [ready, sides],
  );

  const getSide = useCallback(
    sideId => (ready() ? sides.find(s => s._id === sideId) : undefined),
    [ready, sides],
  );

  const getSidesByIds = useCallback(
    sideIds => ((ready() && sideIds) ? sides.filter(s => sideIds.includes(s._id)) : undefined),
    [ready, sides],
  );

  const context = useMemo(
    () => ({
      sidesLoading, getSides, getSide, getSidesByIds,
    }),
    [sidesLoading, getSides, getSide, getSidesByIds],
  );

  return (
    <SidesContext.Provider value={context}>
      {children}
    </SidesContext.Provider>
  );
};

SidesProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

const useSides = () => useContext(SidesContext);

export { SidesContext, SidesProvider, useSides };
