/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';

import 'react-native-url-polyfill/auto';
import 'react-native-get-random-values';
import 'react-native-gesture-handler';
import Amplify from 'aws-amplify';
import awsConfig from './awsConfig';
// @ts-ignore
import { withAuthenticator } from 'aws-amplify-react-native';
import StackNavigator from './src/routes/StackPrincipal';

Amplify.configure(awsConfig);

const App = () => {
  return (
    <StackNavigator />
  );
};

export default withAuthenticator(App);
