module.exports = (grunt) ->
	grunt.initConfig
	    sass: 
	    	dist:
	    		files:
	    			"style.css" : "scss/style.scss"

		watch:
			css:
				files: '*.scss',
				tasks: ['sass']

		coffee:
			compile:
				files:
					'main.js' : 'coffee/main.coffee'
		uglify:
			my_target:
				files:
					'dist/app.min.js': 'javascript/*.js'

	grunt.loadNpmTasks 'grunt-contrib-uglify'
	grunt.loadNpmTasks 'grunt-contrib-coffee'
	grunt.loadNpmTasks 'grunt-contrib-sass'
	grunt.loadNpmTasks 'grunt-contrib-watch'

	grunt.registerTask 'default', ['watch']
	grunt.registerTask 'dev', ['sass', 'coffee', 'uglify']