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
    assemble:
      # ASSEMBLE!!!
      options:
        flatten: true
        assets: 'assets'
        layoutdir: 'layouts'
        layout: 'default.hbs'
      docs:
        options:
          ext: '.html'
          layout: 'docs.hbs'
        files: [
          {
            expand: true
            cwd: 'content/'
            src: ['*.md']
            dest: 'dest/'
            rename: (dest, src) ->
              dest + src.substring(0, src.indexOf('.')) + '/index.html'
          }
        ]
          

    # 'gh-pages':

    clean:
      dest: ['dest/**/*']

    copy:
      start:
        dest: 'dest/index.html'
        src: 'dest/start/index.html'

    watch:
      main:
        files: ['content/*.md']
        tasks: ['build']

  grunt.initConfig gruntConfig

  grunt.loadNpmTasks 'assemble'
  grunt.loadNpmTasks 'grunt-gh-pages'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.loadNpmTasks 'grunt-contrib-copy'

  grunt.registerTask 'publish', ['build', 'gh-pages']
  grunt.registerTask 'build', ['clean', 'assemble', 'copy']