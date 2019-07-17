/**
 * @format
 */

import 'react-native';
import React from 'react';
import RegisterScreen from '../src/pages/register/RegisterScreen';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
    const tree = renderer.create(<RegisterScreen />);
    expect(tree).toMatchSnapshot();
});
