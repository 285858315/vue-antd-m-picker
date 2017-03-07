var path = require("path")
var webpack = require("webpack")
var is_prod = process.env.NODE_ENV === "production"
var babelOptions = {
	presets:['es2015','stage-0'],
	plugins: ['transform-runtime']
}
module.exports = {
	entry: {
		test:'./src/PickerTest.js',
		index:"./src/Picker.vue",
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist'),
	},	
	module:{
		rules:[
			{
				test:/\.vue$/,
				loader:"vue-loader"
			},
			{
				test:/\.ts(x?)$/,
				exclude:/node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: babelOptions
					},
					{
						loader: 'ts-loader'
					}
				]
			},
			{
				test:/\.js$/,
				exclude:/node_modules/,
				use: [
					{
						loader:'babel-loader',
						options:babelOptions
					}
				]
			},            
			{ 
               test: /\.html$/, 
               loader: "html-loader?attrs=false"
            },
		]
	},
	resolve: {
        alias: {
            'vue':'vue/dist/vue.js'
        },
		extensions: ['.ts', '.tsx', '.js']
    },
	devtool: '#source-map'
}

if(is_prod){
	//module.exports.devtool = '#source-map'
	module.exports.plugins = [
		new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
		new webpack.optimize.UglifyJsPlugin({
			// sourceMap: true,
			compress: {
				warnings: false
			}
		}),
		new webpack.LoaderOptionsPlugin({
			minimize: true
		})
	]
	module.exports.externals = {
        vue: {
            root: 'Vue',
            commonjs: 'vue',
            commonjs2: 'vue',
            amd: 'vue'
        }
    }
}else{
	module.exports.devServer = {
		contentBase:path.join(__dirname, "dist"),
		compress:true,
		watchOptions:{
			ignored:/node_modules/
		},
		watchContentBase:true
	}
}