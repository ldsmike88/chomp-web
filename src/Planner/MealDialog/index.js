import {
  useState,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@mui/material';
import { Loading } from '../../sharedComponents';
import { useMeals, useSides } from '../../contexts';

const MealDialog = props => {
  const { opened, selectedMealId, close } = props;

  const { getMeal } = useMeals();
  const { getSidesByIds } = useSides();

  const [checkedSides, setCheckedSides] = useState([]);

  useEffect(() => {
    setCheckedSides([]);
  }, [selectedMealId]);

  const handleCheckbox = ({ target: { id, checked } }) => {
    if (checked) setCheckedSides([...new Set([...checkedSides, id])]);
    if (!checked) setCheckedSides([...new Set([...checkedSides.filter(side => side !== id)])]);
  };

  const meal = getMeal(selectedMealId);
  const sides = getSidesByIds(meal?.sideIds);

  return (
    <div>
      <Dialog open={opened} onClose={close}>
        <DialogTitle>
          {meal?.name}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {meal ? meal?.description : (<Loading />)}
          </DialogContentText>
          {sides ? (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell colSpan={2}>Side</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sides?.map(side => (
                  <TableRow key={side._id}>
                    <TableCell>{side.name}</TableCell>
                    <TableCell>
                      <Checkbox id={side._id} onChange={handleCheckbox} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <Loading />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={close}>Close</Button>
          <Button onClick={close}>Add to Plan</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

MealDialog.propTypes = {
  opened: PropTypes.bool.isRequired,
  selectedMealId: PropTypes.string,
  close: PropTypes.func.isRequired,
};

MealDialog.defaultProps = {
  selectedMealId: null,
};

export default MealDialog;
