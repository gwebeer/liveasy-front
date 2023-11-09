// in src/MyLayout.js
import { Layout } from 'react-admin';
import { MyMenu } from './Menu';
import { MyAppBar } from './AppBar';

export const MyLayout = props => <Layout {...props} appBar={MyAppBar} menu={MyMenu} />;