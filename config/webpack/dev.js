const Path = require( "path" );
const RootPath = require( "app-root-path" );

const Webpack = require( "webpack" );

const TSLoader = require( "awesome-typescript-loader" );
const Autoprefixer = require( "autoprefixer" );
const HtmlWebpackPlugin = require( "html-webpack-plugin" );
const CopyWebpackPlugin = require( "copy-webpack-plugin" );
const ExtractTextPlugin = require( "extract-text-webpack-plugin" );


const CommonsChunkPlugin = Webpack.optimize.CommonsChunkPlugin;


const root = ( ...args ) => {
	return RootPath.resolve( Path.join( ...args ) );
};



module.exports = ( options ) => {

	let config = {

	};
	
	config.node = {
		console: true,
		fs: "empty",
		net: "empty",
		tls: "empty"
	};

	config.entry = {
		polyfills: root( "src", "app", "polyfills.ts" ),
		vendor: root( "src", "app", "vendor.ts" ),
		app: root( "src", "app", "boot.ts" ),
	};

	config.output = {
		path: root( "build" ),
		publicPath: "",
		filename: "assets/js/[name].js"
	};

	config.resolve = {
		extensions: [ ".ts", ".js", ".json", ".css", ".scss", ".html" ],
	};
	
	
	config.devtool = "#source-map";
	
	
	config.devServer = {
		open: false,
		port: 9085,
		contentBase: root( "src", "public" ),
		historyApiFallback: true
	};
	
	
	config.plugins = [
		
		new CommonsChunkPlugin({
			name: [ "polyfills", "vendor" ]
		}),
		
		new Webpack.ContextReplacementPlugin(
			/angular(\\|\/)core(\\|\/)@angular/,
			root( "src" )
		),
		
		new Webpack.ProvidePlugin({
			$: "jquery",
			jquery: "jquery",
			jQuery: "jquery"
		}),
		
		new TSLoader.CheckerPlugin(),
		
		new HtmlWebpackPlugin({
			template: root( "src", "public", "index.html" ),
			chunksSortMode: "dependency",
		}),
		
		new Webpack.LoaderOptionsPlugin({
			options: {
				postcss: [
					Autoprefixer( {
						browsers: [ "last 3 version" ]
					})
				]
			}
		}),
		
		new ExtractTextPlugin({
			filename: "assets/css/[name].css",
			disable: true
		}),
		
		new CopyWebpackPlugin(
			[{
				from: root( "src", "public", "assets" ),
				to: 'assets',
			}]
		)
	];

	config.module = {

		rules: [
			
			{
				test: /\.ts$/,
				exclude: [
					root( "git" ),
					/node_modules/
				],
				use: [
					{
						loader: "awesome-typescript-loader",
						options: {
							configFileName: root( "tsconfig.json" )
						}
					},
					"angular2-template-loader"
				]
			},
			
			{
				test: /\.html$/i,
				use: [ "html-loader" ]
			},
			
			{
				test: /\.(css)$/,
				use: ExtractTextPlugin.extract({
					fallback: "to-string-loader",
					use: [ "style-loader", "css-loader", "postcss-loader" ]
				})
			},
			
			{
				test: /\.(css|scss|sass)$/,
				include: [
					root( "src" )
				],
				use: [ "to-string-loader", "css-loader", "sass-loader" ]
			},
			
			{
				test: /\.(png|jpe?g|gif)$/,
				use: [ "url-loader?name=assets/img/[name].[ext]" ]
			},
			
			{
				test: /\.(svg|woff|woff2|ttf|eot|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				use: [ "file-loader?name=assets/fonts/[name].[ext]?" ]
			}
		]
	};

	return config;
};