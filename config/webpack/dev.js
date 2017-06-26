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
				loaders: [
					`awesome-typescript-loader?{ tsconfig: "tsconfig.json" }`,
					"angular2-template-loader"
				],
				exclude: [
					/node_modules\/(?!(ng2-.+))/
				]
			},

			{
				test: /\.json$/,
				loader: "json-loader"
			},

			{
				test: /\.css$/,
				exclude: root( "src", "app" ),
				loader: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: [ "css-loader", "postcss-loader" ]
				})
			},

			{
				test: /\.css$/,
				include: root( "src", "app" ),
				loader: "raw-loader!postcss-loader"
			},

			{
				test: /\.(scss|sass)$/,
				exclude: [
					root( "src", "app" )
				],
				loader: "null-loader"
			},

			{
				test: /\.(scss|sass)$/,
				exclude: [
					root( "src", "public", "assets", "sass" ),
				],
				loader: "raw-loader!postcss-loader!sass-loader"
			},

			{
				test: /\.html$/,
				loader: "raw-loader",
				exclude: root( "src", "public" )
			},
			
			{
				test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: "file-loader?name=fonts/[name].[hash].[ext]?"
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
						root( "src", "public", "assets", "sass" )
					]
				},
				
				postcss: [
					autoprefixer({
						browsers: [ "last 2 version" ]
					})
				]
			}
		})
	];

	
	config.plugins.push(
		
		new CommonsChunkPlugin({
			name: [ "polyfills", "vendor" ]
		}),
		
		new HtmlWebpackPlugin({
			template: root( "src", "public", "index.html" ),
			chunksSortMode: "dependency"
		}),
		
		new ExtractTextPlugin({
			filename: "css/[name].[hash].css",
			disable: true
		}),
	
		new webpack.ProvidePlugin({
			$: "jquery",
			jquery: "jquery",
			jQuery: "jquery"
		})
	);
	
	config.devServer = {
		contentBase: root( "src", "public" ),
		historyApiFallback: true,
		quiet: true,
		stats: "minimal"
	};

	return config;
};