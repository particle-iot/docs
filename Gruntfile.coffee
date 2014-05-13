###
#
# The Gruntfile for the Spark documentation
# Created by Zach Supalla
# https://www.spark.io/
#
# Use this gruntfile to:
# - Assemble the static site (grunt assemble)
# - Publish to Github pages (grunt gh-pages)
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
            rename: (dest, src) ->
              dest + '/' + src.substring(0, src.indexOf('.')) + '/index.html'
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
      main:
        files: ['<%= config.content %>/*.md', '<%= config.layouts %>/*.hbs']
        tasks: ['build']
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

  grunt.initConfig gruntConfig

  grunt.loadNpmTasks 'assemble'
  grunt.loadNpmTasks 'grunt-gh-pages'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.loadNpmTasks 'grunt-contrib-copy'
  grunt.loadNpmTasks 'grunt-contrib-connect'

  grunt.registerTask 'server', ['build', 'connect:livereload', 'watch']
  grunt.registerTask 'publish', ['build', 'gh-pages']
  grunt.registerTask 'build', ['clean', 'assemble', 'copy']
