import React, {PropTypes} from 'react';

const App = ({assets, content, head, initialState}) => (
  <html>
    <head>
      <meta charSet='utf-8' />
      <meta content='width=device-width, initial-scale=1' name='viewport' />
      {head.meta.toComponent()}
      {head.title.toComponent()}

      <link href="https://cdnjs.cloudflare.com/ajax/libs/normalize/4.2.0/normalize.css" rel='stylesheet' />
      <link href={assets.main.css} rel='stylesheet' />
      <link href='https://fonts.googleapis.com/css?family=Raleway:400,700' rel='stylesheet' type='text/css' />
    </head>
    <body>
      <div dangerouslySetInnerHTML={{__html: content}} id='root' />
      <script dangerouslySetInnerHTML={{__html: `window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}`}} />
      <script src={assets.main.js} defer="true" />
    </body>
  </html>
);

App.propTypes = {
  assets: PropTypes.object.isRequired,
  content: PropTypes.string.isRequired,
  head: PropTypes.object.isRequired,
  initialState: PropTypes.object.isRequired
};

export default App;
