/**
 * index.js - Ponto de entrada do aplicativo
 * 
 * Este arquivo registra o componente principal (App) como
 * a raiz da aplicação React Native/Expo
 */

import { registerRootComponent } from 'expo';
import App from './App';

// Registra o componente App como componente principal
// Funciona tanto no Expo Go quanto em builds nativos
registerRootComponent(App);
