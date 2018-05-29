const path = require('path');
const SAASCONFIG = process.env.SAASCONFIG;
if (!SAASCONFIG) {
  throw new Error('请配置saas入口, 配置方法:在dos里， set SAASCONFIG=ST，并在dos里启动项目');
}
const saas = require(`./saas_conf/${SAASCONFIG}`);
const LessPluginAutoPrefix = require('less-plugin-autoprefix');
var prod = process.env.NODE_ENV === 'production'

module.exports = {
  wpyExt: '.wpy',
  build: {
    web: {
      htmlTemplate: path.join('src', 'index.template.html'),
      htmlOutput: path.join('web', 'index.html'),
      jsOutput: path.join('web', 'index.js')
    }
  },
  resolve: {
    alias: {
      counter: path.join(__dirname, 'src/components/counter'),
      '@': path.join(__dirname, 'src')
    },
    modules: ['node_modules']
  },
  eslint: true,
  compilers: {
    less: {
      compress: true,
      plugins: [new LessPluginAutoPrefix({
        browsers: ['Android >= 2.3', 'Chrome > 20', 'iOS >= 6']
      })]
    },
    // sass: {
    //   outputStyle: 'compressed'
    // },
    babel: {
      sourceMap: true,
      presets: [
        'env'
      ],
      plugins: [
        'transform-class-properties',
        'transform-decorators-legacy',
        'transform-object-rest-spread',
        'transform-export-extensions'
      ]
    }
  },
  plugins: {
    'replace': [{
      filter: /.*\.json$/,
      config: {
        find: /{\$([^}]+)}/g,
        replace: function (matchs, word) {
          return saas.KVS[word] || '';
        }
      }
    }, {
      filter: /.*\.js$/,
      config: {
        find: /{\$([^}]+)}/g,
        replace: function (matchs, word) {
          return saas.KVS[word] || '';
        }
      }
    }]
  },
  appConfig: {
    noPromiseAPI: ['createSelectorQuery']
  }
}

if (prod) {
  //如果是生产环境，则删除sourceMap update by guoran 20180130
  delete module.exports.compilers.babel.sourceMap;
  // 压缩sass
  // module.exports.compilers['sass'] = {outputStyle: 'compressed'}

  // 压缩less
  module.exports.compilers['less'] = {
    compress: true
  }

  // 压缩js
  module.exports.plugins = Object.assign(module.exports.plugins, {
    uglifyjs: {
      filter: /\.js$/,
      config: {}
    },
    imagemin: {
      filter: /\.(jpg|png|jpeg)$/,
      config: {
        jpg: {
          quality: 80
        },
        png: {
          quality: 80
        }
      }
    }
  });
}
