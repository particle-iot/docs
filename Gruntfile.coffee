###
#
# The Gruntfile for the Spark documentation
# Created by Zach Supalla
# https://www.spark.io/
#
# Use this gruntfile to:
# - Assemble the static site (grunt build)
# - Deploy locally for development (grunt server)
#
# Copyright (c) 2013 Spark Labs, Inc.
# Licensed under a Creative Commons Attribution-Sharealike 3.0 License.
#
###

module.exports = (grunt) ->

  gruntConfig =

    config:
      src: 'src'
      dist: 'dest'
      content: 'src/content'
      layouts: 'src/layouts'

    assemble:
      # ASSEMBLE!!!
      options:
        flatten: true
        assets: '<%= config.dist %>/assets'
        layoutdir: '<%= config.src %>/layouts'
        layout: 'default.hbs'
        plugins: ['assemble-contrib-permalinks']
        permalinks:
          structure: ':basename/index:ext'
      docs:
        options:
          ext: '.html'
          layout: 'docs.hbs'
        files: [
          {
            expand: true
            cwd: '<%= config.content %>'
            src: ['*.md']
            dest: '<%= config.dist %>'
          }
        ]


    # 'gh-pages':

    clean:
      dest: ['<%= config.dist %>/*.{html,xml}']

    copy:
      start:
        dest: '<%= config.dist %>/index.html'
        src: '<%= config.dist %>/start/index.html'

    watch:
      content:
        files: ['<%= config.content %>/*.md', '<%= config.layouts %>/*.hbs']
        tasks: ['build']
      stylesheets:
        files: ['<%= config.src %>/stylesheets/*.less']
        tasks: ['less']
      livereload:
        options:
          livereload: '<%= connect.options.livereload %>'
        files: [
          '<%= config.dist %>/{,*/}*.html',
          '<%= config.dist %>/assets/{,*/}*.css',
          '<%= config.dist %>/assets/{,*/}*.js',
          '<%= config.dist %>/assets/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]

    connect:
      options:
        port: 9000
        livereload: 35729
        hostname: 'localhost'
      livereload:
        options:
          open: true
          base: ['<%= config.dist %>']

    coffeelint:
      grunt: ['Gruntfile.coffee']

    less:
      docs:
        files:
          '<%= config.dist %>/assets/css/style.css':
            '<%= config.src %>/stylesheets/style.less'

  grunt.initConfig gruntConfig

  grunt.loadNpmTasks 'assemble'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.loadNpmTasks 'grunt-contrib-copy'
  grunt.loadNpmTasks 'grunt-contrib-connect'
  grunt.loadNpmTasks 'grunt-contrib-jshint'
  grunt.loadNpmTasks 'grunt-coffeelint'
  grunt.loadNpmTasks 'grunt-contrib-less'

  grunt.registerTask 'server', ['build', 'connect:livereload', 'watch']
  grunt.registerTask 'build', ['test', 'clean', 'assemble', 'less', 'copy']
  grunt.registerTask 'test', ['coffeelint']
