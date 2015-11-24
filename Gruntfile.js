 'use strict';
module.exports = function (grunt){
    require("time-grunt")(grunt);
    require('load-grunt-tasks')(grunt);
	  require("rsyncwrapper").rsync;

	 //loading grunt tasks
    grunt.loadNpmTasks('grunt-php');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-notify');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-rsync');
    grunt.loadNpmTasks('grunt-jade-php');
    grunt.loadNpmTasks('grunt-contrib-coffee');

 //grunt options
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        //package optionsgrunt 
        php: {
	        watch: {
	            options: {
	                hostname: '127.0.0.1',
	                port: 9000,
	                keepalive: true,
	                open: true
	            }
	        }
	    },
        jadephp: {
          compile: {
            options: {
              pretty: true
            },
            files:[{
              expand: true,
              cwd: 'assets/jade',
              src: ['**/*.jade'],
              dest: 'assets/php/includes/',
              ext: '.php'
            }]
          }
        },
        coffee:{ 
        	glob_to_multiple: {
    			expand: true,
    			bare: true,
    			flatten: false,
    			cwd: 'assets/js/coffee/',
    			src: ['*.coffee'],
    			dest: 'assets/js/build',
    			ext: '.js'
  			}
  		},
        compass: {
        	dev: {
            	options: {
              		sassDir: 'assets/style/sass',
              		cssDir: 'assets/style/css',
              		fontsDir: 'assets/fonts',
              		javascriptsDir: 'assets/js',
              		imagesDir: 'assets/img',
              		force:true,
              		relativeAssets: true,
            	}
          	}
        },
       jshint:{
        	files: ['assets/js/*.js'],
        	options: {
            	globals: {
                	jQuery: true
              	}
        	}
        },
        concat: {
        	dev: {
        		src: ['assets/js/build/*.js' ],
      			dest: 'assets/js/script.js'
    		  }
    	 },
  		uglify: {
  				target: {
    				src: '<%= concat.dev.dest %>',
    				dest: '../landingpage_production/assets/js/main.min.js'
  				}
		  },
		imagemin: {
   				dist: {
      				options: {
        				optimizationLevel: 5
      				},
      				files: [{
         				expand: true,
         				cwd: 'assets/img',
         				src: ['**/*.{png,jpg,gif}'],
         				dest: '../landingpage_production/assets/img'
      				}]
   				}
		  },
		
      	htmlhint: {
  			php: {
    			options: {
    	  			'tag-pair': true
    			},
    			src: ['** /*.php']
  		},
        html1: {
          options: {
              'tag-pair': true
          },
          src: ['*.html', ]
        	}
		},
		
		watch: {
			
        	
          	compass: {
            	files: ['assets/style/sass/{,*/}*.{scss,sass}'],
            	tasks: ['compass:dev']
          	},
          	
          	jadephp:{
          		files:['assets/jade/**/*.jade'],
          		tasks: ['jadephp']
          	},
          	html: {
          		files :['*.html'],
          		tasks : ['htmlhint']
          	},
          	coffee:{
          		files:["assets/js/coffee/**/*.coffee"],
          		tasks: ['coffee']
          	},
          	concat: {
        		files: ['assets/js/build/*.js' ],
      			tasks: ['concat:dev']
    		}  	
    	},
		rsync: {
    		options: {
        		args: ["--verbose"],
        		exclude: [".git*","*.scss","node_modules",".bowerrc", "bower.json", "livereload.js", "Gruntfile.js", ".sass-cache", 'src', 'Main', 'bootstrap/grunt','bootstrap/js','bootstrap/less','bootstrap/fonts' ,'pro', 'build', 'sass/_bootstrapSass', 'sass/_partials' ,'sass/style.scss', 'sass/download-monitor.html.zip' ,'sass/img.zip' ,'package.js', 'LICENSE' ,'package.json', 'js/script.js', 'designs', '.DS_Store','assets/jade', 'config.rb', 'npm-debug.log', 'js/coffee'],
        		recursive: true
    		},
    		dist: {
        		options: {
            		src: "./",
            		dest: "../landingpage_production"
        		}
    		},
    		stage: {
        		options: {
            		src: "../landingpage_production",
            		dest: "/var/www/site",
            		host: "user@staging-host",
           			// delete: true // Careful this option could cause data loss, read the docs!
        		}
    		},
    		prod: {
        		options: {
            		src: "../landingpage_production",
            		dest: "/var/www/site",
            		host: "user@live-host",
            		//delete: true // Careful this option could cause data loss, read the docs!
        		}
    		}
		}
	});



    //register tasks here


    //grunt.registerTask('go-all', ['watch', 'compass:dev', 'jshint', 'phplint', 'htmlhint:php', 'jadephp' ]);

    //grunt.registerTask('go', ['watch', 'compass:dev', 'jshint', 'phplint', 'jadephp' ]);

    grunt.registerTask('go', ['watch', 'compass:dev', 'coffee', 'jadephp', 'concat:dev', 'jshint' ]);

    grunt.registerTask('build-pro', [  , 'uglify','imagemin' , 'rsync:dist']);
    
    grunt.registerTask('server', ['php']);

    grunt.registerTask('pro', [  'rsync:dist']);

    grunt.registerTask('ug', [ 'uglify', 'rsync:dist']);



}