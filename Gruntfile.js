module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		// watchの設定 (grunt-contrib-watch)
		watch: {
			all: {
				options: {
					livereload: true
				},
				files: [
				// watchするファイルを指定する
				"source/sass/*.scss",
				"source/sass/*/*.scss",
				"source/template/*.hbs",
				"source/template/*/*.hbs",
				"source/js/**/*.js",
				],
				// 実行するタスク
				tasks: ["compass", "assemble", "copy"]
			},
		},

		// compassの設定("grunt-contrib-compass")
		compass: {
			all: {
				options: {
					// sassファイルのディレクトリ
					sassDir: 'source/sass/',
					cssDir: 'build/static/css/',
					imagesDir: "build/static/images/",
					httpImagesPath: '/static/images/',
					httpGeneratedImagesPath: '/static/images/',
					fontsPath: '"build/static/font/"',
					httpFontsPath: '/static/font/',
					noLineComments: true,
					relativeAssets: false
				}
			},
		},
		assemble: {
			all: {
				options: {
					assets: 'assets',
					helpers: ['source/template/helpers/*.js'],
					partials: ['source/template/partials/*.hbs'],
					layoutdir: 'source/template/layouts',
					layout: 'default.hbs',
					data: ['source/template/context/*.{json,yml}'],
					flatten: true
				},
				files: {
					'build/html': ['source/template/pages/*.hbs']
				}
			},
		},

		connect: {
			all: {
				options: {
					port: 8081,
					base: 'build',
					// keepalive: true
					livereload: true,
					open: true
				}
			}
		},

		image: {
			dynamic: {
				files: [{
					expand: true,
					cwd: 'source/images/',
					src: ['**/*.{png,jpg,gif,svg}'],
					// dest: 'build/static/images/'
				}]
			}
		},
		styleguide: {
			kss: {
				options: {
					framework: {
						name: 'kss',
						options: {
							'css': 'build/static/css/all.css'
						}
					},
					name: 'Style Guide',
					template: {
						src: 'source/kss_template'
					}
				},
				files: {
					'styleguide': 'source/sass/**/*.scss'
				}
			}
		},
		copy: {
			main: {
				expand: true,
				cwd: 'source/js/',
				src: '**',
				dest: 'build/static/js/',
				// flatten: true,
				// filter: 'isFile',
			},
		},
	});

	// プラグインをロード
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-contrib-compass");
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-handlebars');
	grunt.loadNpmTasks('assemble');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-image');
	grunt.loadNpmTasks('grunt-styleguide');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');

	// watchタスク
	grunt.registerTask("default", ["compass", "assemble", "copy", "connect", "watch:all"]);
};