import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import DevTools from '../src/dev_tools.jsx';
import App from '../src/app.jsx';

import { reduce } from '../src/reducer.jsx';

describe("intergration test", function() {
  it("Imports", function() {
    expect(React).toBeDefined();
    expect(ReactDOM).toBeDefined();
    expect(Provider).toBeDefined();
    expect(createStore).toBeDefined();
    expect(applyMiddleware).toBeDefined();
    expect(compose).toBeDefined();
    expect(thunk).toBeDefined();

    expect(DevTools).toBeDefined();
    expect(App).toBeDefined();
    expect(reduce).toBeDefined();
  });

  it("Create A Store", function() {
    //create the store
    var store = createStore(
      reduce,
      compose(
        applyMiddleware(thunk),
        DevTools.instrument()
      )
    );

    expect(store).toBeDefined()
  });

  it("Full Render", function() {
    //create the root node, then append it to the body
    var rootNode = document.createElement("DIV");
    rootNode.id = "root";
    document.querySelector('body').appendChild(rootNode);

    //create the store
    var store = createStore(
      reduce,
      compose(
        applyMiddleware(thunk),
        DevTools.instrument()
      )
    );

    //start the process
    ReactDOM.render(
      <Provider store={store}>
        <div>
          <App />
          <DevTools />
        </div>
      </Provider>,
      document.querySelector('#root'));

    //cleanup
    document.querySelector('body').removeChild(document.querySelector('#root'));
  });
});
