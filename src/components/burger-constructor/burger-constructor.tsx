import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  selectBurger,
  selectLoadingConstructor,
  selectModalData,
  resetBurger,
  orderBurger,
  selectUserData
} from '@slices';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const constructorItems = useSelector(selectBurger);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUserData);

  const orderRequest = useSelector(selectLoadingConstructor);

  const orderModalData = useSelector(selectModalData);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!user) {
      navigate('/login');
    } else {
      const order = [
        constructorItems.bun._id,
        constructorItems.bun._id,
        ...constructorItems.ingredients.map((ingredient) => ingredient._id)
      ];

      dispatch(orderBurger(order));
    }
  };

  const closeOrderModal = () => {
    dispatch(resetBurger());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
