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
        files:
          'dest/': 'content/*.md'

    # 'gh-pages':

    clean:
      main: ['dest/*.html']

    watch:
      main:
        files: ['content/*.md']
        tasks: ['build']

  grunt.initConfig gruntConfig

  grunt.loadNpmTasks 'assemble'
  grunt.loadNpmTasks 'grunt-gh-pages'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-clean'

  grunt.registerTask 'publish', ['assemble', 'gh-pages']
  grunt.registerTask 'build', ['clean', 'assemble']