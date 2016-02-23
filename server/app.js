import express              from 'express';
import falcor               from 'falcor-express';
import webpack              from 'webpack';
import WebpackDevMiddleware from 'webpack-dev-middleware';
import WebpackHotMiddleware from 'webpack-hot-middleware';
import historyApiFallback   from 'connect-history-api-fallback';
import chalk                from 'chalk';
import config               from '../config';
import webpackConfig        from '../build/webpack/development_hot';
import Router               from 'falcor-router';

const paths = config.get('utils_paths');
const compiler = webpack(webpackConfig);
const app = express();

app.use(historyApiFallback({
  verbose : false
}));

app.use('src/model.json', falcor.dataSourceRoute(function(req, res) {
 return new Router([{
  route: 'model',
  get: () => {
    return {
      path: ['model'],
      value: "0"
    };
  }
 }]);
}));

// Enable webpack middleware if the application is being
// run in development mode.
if (config.get('globals').__DEV__) {
  app.use(WebpackDevMiddleware(compiler, {
    publicPath  : webpackConfig.output.publicPath,
    contentBase : paths.project(config.get('dir_src')),
    hot         : true,
    quiet       : false,
    noInfo      : false,
    lazy        : false,
    stats       : {
      colors : true
    }
  }));

  app.use(WebpackHotMiddleware(compiler));

  console.log(chalk.blue(
    'Webpack HMR and dev middleware are enabled.'
  ));
}

export default app;
