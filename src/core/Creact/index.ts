// refactored, adapted and definitelytyped from Didact tutorial
// https://engineering.hexacta.com/didact-learning-how-react-works-by-building-it-from-scratch-51007984e5c5

import createElement from './element';
import { Component, Fragment } from './Component';
import { render } from './reconciler';

export default {
  createElement,
  Fragment, // ToDo: Fragments not working for now
  Component,
  render,
};
