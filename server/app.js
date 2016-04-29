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
import routes               from './falcorRoutes/routes';
import bodyParser           from 'body-parser';

const paths = config.get('utils_paths');
const compiler = webpack(webpackConfig);
const app = express();

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({limit: '5mb', extended: false}));

app.use(historyApiFallback({
  verbose : false
}));

app.use('/static', express.static('static'));

app.use('/model.json', falcor.dataSourceRoute(function(req, res) {
  return new Router(
      []
        .concat(routes( req, res ))
    );
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
