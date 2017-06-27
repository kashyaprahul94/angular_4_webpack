const path = require( "path" );
const rootPath = require( "app-root-path" );
const webpack = require( "webpack" );

const autoprefixer = require( "autoprefixer" );
const HtmlWebpackPlugin = require( "html-webpack-plugin" );
const ExtractTextPlugin = require( "extract-text-webpack-plugin" );
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;


const root = ( ...args ) => {
	return rootPath.resolve( path.join( ...args ) );
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
		publicPath: "/",
		filename: "js/[name].js"
	};
	
	config.resolve = {
		extensions: [ ".ts", ".js", ".json", ".css", ".scss", ".html" ],
	};
	
	config.module = {
		
		rules: [
			
			{
				test: /\.ts$/,
				exclude: [
					/node_modules\/(?!(ng2-.+))/
				],
				use: [
					"awesome-typescript-loader?{ tsconfig: \"tsconfig.json\" }",
					"angular2-template-loader"
				]
			},
			
			{
				test: /\.json$/,
				use: [ "json-loader" ]
			},
			
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: "to-string-loader",
					use: [ "style-loader", "css-loader", "postcss-loader" ]
				})
			},
			
			{
				test: /\.(css|scss|sass)$/,
				include: [
					root( "src", "app" ),
					root( "src", "public", "assets", "sass" )
				],
				use: [ "to-string-loader", "css-loader", "postcss-loader", "sass-loader" ]
			},
			
			{
				test: /\.html$/,
				use: [ "raw-loader" ],
				exclude: [
					root( "src", "public" )
				]
			},
			
			{
				test: /\.(png|jpe?g|gif|svg|ico)$/,
				use: [ "file-loader?name=assets/img/[name].[ext]?" ],
				include: [
					root( "src", "public", "assets", "img" )
				]
			},
			
			{
				test: /\.(svg|woff|woff2|ttf|eot|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				use: [ "file-loader?name=assets/fonts/[name].[ext]?" ]
			}
		]
	};
	
	config.plugins = [
		
		new webpack.ContextReplacementPlugin(
			/angular(\\|\/)core(\\|\/)@angular/,
			root( "src" )
		),
		
		new webpack.LoaderOptionsPlugin({
			
			options: {
				
				sassLoader: {
					includePaths: [
						root( "src", "app" ),
						root( "src", "public", "assets", "sass" )
					]
				},
				
				postcss: [
					autoprefixer({
						browsers: [ "last 2 version" ]
					})
				]
			}
		}),
		
		new CommonsChunkPlugin({
			name: [ "polyfills", "vendor" ]
		}),
		
		new HtmlWebpackPlugin({
			template: root( "src", "public", "index.html" ),
			chunksSortMode: "dependency"
		}),
		
		new ExtractTextPlugin({
			filename: "assets/css/[name].css",
			disable: true
		}),
		
		new webpack.ProvidePlugin({
			$: "jquery",
			jquery: "jquery",
			jQuery: "jquery"
		})
	];
	
	
	config.devServer = {
		contentBase: root( "src", "public" ),
		historyApiFallback: true,
		quiet: true,
		stats: "minimal",
		compress: true,
		port: 9085,
		open: false,
		hot: false
	};
	
	return config;
};