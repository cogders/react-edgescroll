import React from 'react';
import ReactDOM from 'react-dom';
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
} from '@testing-library/react';
import EdgeScroll, { UPWARDS } from './EdgeScroll';

it('renders without crashing', () => {
    const { getByTestId } = render(
      <div>
        <EdgeScroll
          inactiveStyle={{
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            position: "absolute"
          }}
          activeStyle={{
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            position: "absolute",
          }}
          direction={UPWARDS}
        />
      </div>
    );

    const edgeSrollTestId = getByTestId('edgescroll-component');

    expect(edgeSrollTestId).toBeTruthy();

});