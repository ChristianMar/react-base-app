/*eslint-disable*/
const webpack = require('webpack');
const merge = require('webpack-merge');
const { GitRevisionPlugin } = require('git-revision-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CSPWebpackPlugin = require('csp-webpack-plugin');
// const CspHtmlWebpackPlugin = require('csp-html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const common = require('./webpack.common.js');
const createStage = require('./createStage.js');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const S3Plugin = require('webpack-s3-plugin');
const AWS = require('aws-sdk');
const SitemapPlugin = require('sitemap-webpack-plugin').default;
const GenerateJsonPlugin = require('generate-json-webpack-plugin');

module.exports = (env, options) => {
  console.log('BUILD', env, options);
  const webpackConfig = common(env, options);
  const webappStageConfig = createStage(env, options);
  const rootPath = path.join(__dirname, '..', '..');

  const facebookShare = `
    <meta property="og:url"                content=\"https://${webappStageConfig.CASINO_LOBBY_DOMAIN}${webappStageConfig.OG_BASE_PATH}\" />
    <meta property="og:image"              content=\"${webappStageConfig.BANNER_HEADER_2_URL}\" />
    <meta property="og:type"               content=\"${webappStageConfig.OG_TYPE}\" />
    <meta property="og:title"              content=\"${webappStageConfig.OG_TITLE}\" />
    <meta property="og:description"        content=\"${webappStageConfig.OG_DESCRIPTION_ES}\" />
    <meta property="og:locale"             content="es_ES" />
    <meta property="og:locale:alternate"   content="en_US" />
    <meta property="og:description"        content=\"${webappStageConfig.OG_DESCRIPTION_EN}\" />
    <meta property="og:locale"             content="en_US" />
    <meta property="og:locale:alternate"   content="es_ES" />
  `;
  const twitterShare = `
    <meta property="twitter:card"          content=\"${webappStageConfig.TWITTER_CARD}\" />
  `;
  const androidIcon = `<link rel="icon" type="image/png" sizes="192x192" href="data:image/png;base64,${webappStageConfig.ANDROID_ICON}" />`;
  const appleIcon = `
    <meta name="apple-mobile-web-app-title" content="${webappStageConfig.OG_TITLE}" />
    <link rel="apple-touch-icon" sizes="180x180" href="data:image/png;base64,${webappStageConfig.IOS_ICON_180}" />
    <link rel="apple-touch-icon" sizes="167x167" href="data:image/png;base64,${webappStageConfig.IOS_ICON_167}" />
  `;

  var s3Config = {
    s3Options: {
      credentials: new AWS.SharedIniFileCredentials({
        profile: `${webappStageConfig.PROJECT}-${env}`,
      }),
      region: webappStageConfig.REGION,
    },
    directory: path.join(rootPath, 'build'),
    s3UploadOptions: {
      Bucket: webappStageConfig.CASINO_LOBBY_BUCKET,
      ContentType(fileName) {
        if (/\.json/.test(fileName)) return 'application/json'; // WARNING: do not move, must be before js
        if (/\.js/.test(fileName)) return 'text/javascript';
        if (/\.html/.test(fileName)) return 'text/html';
        if (/\.xml/.test(fileName)) return 'application/xml';
        if (/\.png/.test(fileName)) return 'image/png';
        if (/\.jpg/.test(fileName)) return 'image/jpeg';
        if (/\.jpeg/.test(fileName)) return 'image/jpeg';
        if (/\.gif/.test(fileName)) return 'image/gif';
        if (/\.gz/.test(fileName)) return 'application/gzip';
        else return 'text/plain';
      },
    },
  };

  // if a cloudfront distribution id is provided
  // if (
  //   webappStageConfig.CASINO_LOBBY_CLOUDFRONT_DISTRIBUTION_ID &&
  //   webappStageConfig.CASINO_LOBBY_CLOUDFRONT_DISTRIBUTION_ID != ''
  // ) {
  //   s3Config.cloudfrontInvalidateOptions = {
  //     DistributionId: `${webappStageConfig.CASINO_LOBBY_CLOUDFRONT_DISTRIBUTION_ID}`,
  //     Items: ['/index.html'],
  //   };
  // }

  var htmlConfig = {
    // cspPlugin: {
    //   enabled: true,
    // },
    inject: true,
    FONT: `<link href="https://fonts.googleapis.com/css2?family=${webappStageConfig.FONT_NAME}:${webappStageConfig.FONT_OPTIONS}&display=swap" rel="stylesheet" />`,
    FONT_SECONDARY: `<link href="https://fonts.googleapis.com/css2?family=${webappStageConfig.FONT_SECONDARY_NAME}:${webappStageConfig.FONT_SECONDARY_OPTIONS}&display=swap" rel="stylesheet" />`,
    FAVICON:
      `<link rel="shortcut icon" type="image/png" href="data:image/png;base64,` +
      webappStageConfig.FAVICON_BASE64 +
      `"/>`,
    APP_NAME: webappStageConfig.CASINO_LOBBY_APP_NAME,
    APP_TITLE: webappStageConfig.CASINO_LOBBY_APP_TITLE,
    AWS_CW_RUM:
      webappStageConfig.STAGE === 'dev' && webappStageConfig.PROJECT === 'hilo'
        ? `<script>(function(n,i,v,r,s,c,x,z){x=window.AwsRumClient={q:[],n:n,i:i,v:v,r:r,c:c};window[n]=function(c,p){x.q.push({c:c,p:p});};z=document.createElement('script');z.async=true;z.src=s;document.head.insertBefore(z,document.getElementsByTagName('script')[0]);})('cwr','b0a1b1bb-ef0f-437a-827a-83211995c704','1.0.0','eu-west-2','https://client.rum.us-east-1.amazonaws.com/1.0.2/cwr.js',{sessionSampleRate:1,guestRoleArn:"arn:aws:iam::405878963276:role/RUM-Monitor-eu-west-2-405878963276-5085132100461-Unauth",identityPoolId:"eu-west-2:da5fc624-d7b0-4de9-9e66-44fa4e08b51a",endpoint:"https://dataplane.rum.eu-west-2.amazonaws.com",telemetries:["performance","errors","http"],allowCookies:true,enableXRay:false});</script>`
        : '',
    FACEBOOK_SHARE: facebookShare,
    TWITTER_SHARE: twitterShare,
    ANDROID_ICON: androidIcon,
    APPLE_ICON: appleIcon,
    ICONVERT: !options.soon
      ? ''
      : '<script async src="https://cdn.iconvert.network/code/b9415c12-018f-4c70-b51e-423406ec628b.js" id="iconvert"></script>',
    template: path.join(
      rootPath,
      'source',
      'app',
      'webapp',
      'src',
      'index.html'
    ),
    filename: './index.html',
  };

  const paths = [
    { path: '', changefreq: 'weekly', priority: 1.0 },
    { path: '/lobby/signup', changefreq: 'weekly', priority: 0.9 },
    { path: '/lobby/home/promotions', changefreq: 'weekly', priority: 0.8 },
    { path: '/lobby/home/showcase', changefreq: 'weekly', priority: 0.7 },
    { path: '/lobby/home/popularGames', changefreq: 'weekly', priority: 0.6 },
    { path: '/lobby/home/newGames', changefreq: 'weekly', priority: 0.5 },
    { path: '/lobby/home/casino', changefreq: 'weekly', priority: 0.4 },
    { path: '/lobby/home/bingo', changefreq: 'weekly', priority: 0.3 },
    { path: '/lobby/home/aboutUs', changefreq: 'weekly', priority: 0.2 },
    { path: '/lobby/help/faq', changefreq: 'weekly', priority: 0.1 },
    { path: '/lobby/help/terms', changefreq: 'weekly', priority: 0.1 },
    { path: '/lobby/help/privacy', changefreq: 'weekly', priority: 0.1 },
    { path: '/lobby/help/cookies', changefreq: 'weekly', priority: 0.1 },
    {
      path: '/lobby/help/playResponsibly',
      changefreq: 'weekly',
      priority: 0.1,
    },
  ];

  // let cspBody = {
  //   'default-src': "'self'",
  //   'worker-src': ["'self'", 'https://cdn.webpu.sh'],
  //   'img-src': [
  //     "'self'",
  //     'data:',
  //     'https://assets.dev.hilo.bet',
  //     'https://static.dev.hilo.bet',
  //     'https://videos.dev.hilo.bet',
  //     'https://www.googletagmanager.com',
  //     'https://cdn.iconvert.network',
  //     '*.gstatic.com',
  //     '*.google-analytics.com',
  //     '*.zdassets.com',
  //   ],
  //   'script-src': [
  //     "'self'",
  //     'nonce-c96591c2ec5788848a969c54161bf950',
  //     'https://api.dev.hilo.bet',
  //     'https://ls.dev.hilo.bet',
  //     'https://cdn.webpu.sh',
  //     'https://www.googletagmanager.com',
  //     'https://api.xtremepush.com',
  //     '*.zdassets.com',
  //     '*.zdassets.com',
  //     '*.amazonaws.com',
  //     'https://cdn.iconvert.network',
  //     '*.google-analytics.com',
  //     '*.ingest.sentry.io',
  //     '*.zopim.com',
  //   ],
  //   'style-src': [
  //     "'self'",
  //     'https://fonts.gstatic.com',
  //     'https://fonts.googleapis.com',
  //     'https://www.googletagmanager.com',
  //     '*.zdassets.com',
  //   ],
  //   'object-src': ["'self'", '*.google-analytics.com'],
  //   'connect-src': [
  //     "'self'",
  //     'https://api.dev.hilo.bet',
  //     'https://ls.dev.hilo.bet',
  //     '*.amazonaws.com',
  //     'wss://widget-mediator.zopim.com',
  //     '*.zdassets.com',
  //     '*.zdassets.com',
  //     '*.ingest.sentry.io',
  //     '*.zendesk.com',
  //     '*.zopim.com',
  //   ],
  //   'media-src': ["'self'", '*.zdassets.com'],
  // };

  return merge.smart(webpackConfig, {
    mode: 'production',
    target: 'web',
    entry: {
      app: path.resolve(__dirname, '../', 'app', 'webapp', 'src', 'index.js'),
    },
    output: {
      path: path.resolve(__dirname, '../', '../', 'build'),
      publicPath: '/',
      filename: '[name].[chunkhash].min.js',
    },
    optimization: {
      minimize: true,
      usedExports: true,
      minimizer: [
        new TerserPlugin({
          include: /\.min\.(js|scss)$/,
          terserOptions: {
            compress: {
              drop_console: true, // << this needs only to remove console.log
              // drop_console: false,
            },
          },
        }),
        new TerserPlugin({
          terserOptions: {
            format: {
              comments: false, // << remove every comment from code //
            },
          },
          extractComments: false,
        }),
      ],
    },
    plugins: [
      new webpack.EnvironmentPlugin(webappStageConfig),
      new GitRevisionPlugin(),
      new MiniCssExtractPlugin(),
      // new CspHtmlWebpackPlugin(
      //   cspBody,
      //   {
      //     enabled: true,
      //     hashingMethod: 'sha256',
      //     hashEnabled: {
      //       'script-src': true,
      //       'style-src': true,
      //     },
      //     nonceEnabled: {
      //       'script-src': false,
      //       'style-src': false,
      //     },
      //   }
      // ),
      new HtmlWebpackPlugin(htmlConfig),
      new SitemapPlugin({
        base: `https://www.${webappStageConfig.CASINO_LOBBY_DOMAIN}`,
        paths,
      }),
      new S3Plugin(s3Config),
      new GenerateJsonPlugin('maintenance.json', {
        success: true,
        result: {
          maintenance: webappStageConfig.MAINTENANCE,
          updatedAt: webappStageConfig.STORE_TIMESTAMP,
        },
      }),
    ],
  });
};
