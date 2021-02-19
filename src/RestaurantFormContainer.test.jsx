import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import RestaurantFormContainer from './RestaurantFormContainer';

import {
  updateRestaurant,
} from './actions';

describe('RestaurantFormContainer', () => {
  const renderRestaurantFormContainer = () => render((<RestaurantFormContainer />));

  const dispatch = jest.fn();

  const restaurant = {
    name: '베이징',
    category: '중식',
    address: '파주시',
  };

  beforeEach(() => {
    jest.clearAllMocks();

    useSelector.mockImplementation((selector) => selector({ restaurant }));

    useDispatch.mockImplementation(() => dispatch);
  });

  it('updates values upon changing of input values', () => {
    const { getByDisplayValue } = renderRestaurantFormContainer();

    fireEvent.change(getByDisplayValue(/베이징/), {
      target: { value: '송화루' },
    });

    expect(dispatch).toBeCalledWith(updateRestaurant({ name: '송화루' }));
  });
});
