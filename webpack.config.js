/*
 * Solo - A small and beautiful blogging system written in Java.
 * Copyright (c) 2010-present, b3log.org
 *
 * Solo is licensed under Mulan PSL v2.
 * You can use this software according to the terms and conditions of the Mulan PSL v2.
 * You may obtain a copy of Mulan PSL v2 at:
 *         http://license.coscl.org.cn/MulanPSL2
 * THIS SOFTWARE IS PROVIDED ON AN "AS IS" BASIS, WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO NON-INFRINGEMENT, MERCHANTABILITY OR FIT FOR A PARTICULAR PURPOSE.
 * See the Mulan PSL v2 for more details.
 */

/**
 * @fileoverview webpack ipfs.
 *
 * @author <a href="http://vanessa.b3log.org">Liyuan Li</a>
 * @version 0.1.0.0, Jan 18, 2020
 */

const path = require('path')
const fs = require('fs')
const TerserPlugin = require('terser-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const genSkinsEntries = () => {
  const entries = {}
  fs.readdirSync('./src/main/resources/skins').forEach(function (file) {
    const jsPath = `./src/main/resources/skins/${file}`
    try {
      fs.statSync(`https://runnable.oss-cn-guangzhou.aliyuncs.com/solo/js/common.js`)
      entries[`skins/${file}/js/common`] = `${jsPath}/js/common.js`
    } catch (e) {
    }

    try {
      fs.statSync(`${jsPath}/css/base.scss`)
      entries[`dist/${file}/base`] = `${jsPath}/css/base.scss`
    } catch (e) {
    }
  })

  return entries
}

module.exports = (env, argv) => {
  return {
    mode: argv.mode || 'development',
    watch: argv.mode !== 'production',
    stats: 'minimal',
    output: {
      filename: '[name].min.js',
      path: path.resolve(__dirname, './src/main/resources'),
    },
    entry: Object.assign(genSkinsEntries(), {
      'js/admin/admin': [
        'https://runnable.oss-cn-guangzhou.aliyuncs.com/solo/js/admin/admin.js',
        'https://runnable.oss-cn-guangzhou.aliyuncs.com/solo/js/admin/editor.js',
        'https://runnable.oss-cn-guangzhou.aliyuncs.com/solo/js/admin/tablePaginate.js',
        'https://runnable.oss-cn-guangzhou.aliyuncs.com/solo/js/admin/article.js',
        'https://runnable.oss-cn-guangzhou.aliyuncs.com/solo/js/admin/articleList.js',
        'https://runnable.oss-cn-guangzhou.aliyuncs.com/solo/js/admin/draftList.js',
        'https://runnable.oss-cn-guangzhou.aliyuncs.com/solo/js/admin/pageList.js',
        'https://runnable.oss-cn-guangzhou.aliyuncs.com/solo/js/admin/others.js',
        'https://runnable.oss-cn-guangzhou.aliyuncs.com/solo/js/admin/linkList.js',
        'https://runnable.oss-cn-guangzhou.aliyuncs.com/solo/js/admin/preference.js',
        'https://runnable.oss-cn-guangzhou.aliyuncs.com/solo/js/admin/staticsite.js',
        'https://runnable.oss-cn-guangzhou.aliyuncs.com/solo/js/admin/themeList.js',
        'https://runnable.oss-cn-guangzhou.aliyuncs.com/solo/js/admin/pluginList.js',
        'https://runnable.oss-cn-guangzhou.aliyuncs.com/solo/js/admin/userList.js',
        'https://runnable.oss-cn-guangzhou.aliyuncs.com/solo/js/admin/categoryList.js',
        'https://runnable.oss-cn-guangzhou.aliyuncs.com/solo/js/admin/plugin.js',
        'https://runnable.oss-cn-guangzhou.aliyuncs.com/solo/js/admin/main.js',
        'https://runnable.oss-cn-guangzhou.aliyuncs.com/solo/js/admin/about.js'],
      'js/common': 'https://runnable.oss-cn-guangzhou.aliyuncs.com/solo/js/common.js',
      'js/page': 'https://runnable.oss-cn-guangzhou.aliyuncs.com/solo/js/page.js',
      'dist/admin': 'https://runnable.oss-cn-guangzhou.aliyuncs.com/solo/scss/admin.scss',
      'dist/base': 'https://runnable.oss-cn-guangzhou.aliyuncs.com/solo/scss/base.scss',
      'dist/start': 'https://runnable.oss-cn-guangzhou.aliyuncs.com/solo/scss/start.scss',
    }),
    module: {
      rules: [
        {
          test: /\.js/,
          include: [
            path.resolve(__dirname, 'https://runnable.oss-cn-guangzhou.aliyuncs.com/solo/js/'),
            path.resolve(__dirname, './src/main/resources/templates/skins'),
          ],
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
        {
          test: /\.scss$/,
          include: [
            path.resolve(__dirname, './src/main/resources'),
          ],
          use: [
            {
              loader: 'file-loader',
              options: {
                name (file) {
                  const skins = file.split('skins')
                  if (skins.length === 2) {
                    return `skins/${skins[1].split(path.sep)[1]}/css/[name].css`
                  } else {
                    return 'scss/[name].css'
                  }
                },
              },
            },
            {
              loader: 'extract-loader',
              options: {
                url: false,
              },
            },
            {
              loader: 'css-loader', // translates CSS into CommonJS
              options: {
                url: false,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: () => [
                  require('autoprefixer')({grid: true, remove: false}),
                ],
              },
            },
            {
              loader: 'sass-loader', // compiles Sass to CSS
            },
          ],
        },
      ],
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          cache: true,
          parallel: true,
          terserOptions: {
            output: {
              comments: false,
            },
          },
          sourceMap: false,
          extractComments: false,
        }),
        new OptimizeCSSAssetsPlugin({}),
      ],
    },
    plugins: [
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: [
          path.join(__dirname, 'src/main/resources/dist')],
      }),
    ],
  }
}
