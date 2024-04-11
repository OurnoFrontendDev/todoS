import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { Configuration } from 'webpack';
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

interface Environment {
    production: boolean;
}

export default (env: Environment, argv: { mode: string }): Configuration => {
    const isDevelopment = argv.mode === 'development';
    const config: Configuration = {
        entry: './src/index.tsx',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.js'
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env',
                                '@babel/preset-react',
                                '@babel/preset-typescript'
                            ]
                        }
                    }
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                modules: {
                                    auto: (resPath: string) => Boolean(resPath.includes('.module.')),
                                    localIdentName: isDevelopment
                                        ? '[path][name][local]--[hash:base64:1]'
                                        : '[hash:base64:8]',
                                },
                            },
                        },
                        'sass-loader',
                    ]
                },
                {
                    test: /\.(png|jpe?g|gif|woff2|woff)$/i,
                    use: [
                        {
                            loader: 'file-loader',
                        },
                    ],
                },
                {
                    test: /\.svg$/,
                    use: [{
                        loader: '@svgr/webpack',
                        options: {
                            icon: true,
                            svgoConfig: {
                                plugins: [
                                    {
                                        name: 'convertColors',
                                        params: {
                                            currentColor: false,
                                        }
                                    }
                                ]
                            }
                        }
                    }],
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                filename:'index.html',
                template: './public/index.html'
            }),
            new MiniCssExtractPlugin(),
            new CleanWebpackPlugin(), // Переместите сюда
        ]
    };

    // Добавляем конфигурацию сервера разработки, если мы находимся в режиме разработки
    if (isDevelopment) {
        const devServerConfig: DevServerConfiguration = {
            static: {
                directory: path.join(__dirname, "public")
            }, // Указываем путь к статическим файлам
            compress: true,
            port: 3000,
            open: true,
            hot: true,
        };
        config.devServer = devServerConfig;
    }

    return config;
};