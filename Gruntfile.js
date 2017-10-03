module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        htmlmin: {
            // Task
            docs: {
                // Target
                options: {
                    // Target options
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    // Dictionary of files
                    "docs/index.html": "src/index.html"
                }
            }
        },
        sass: {
            // Task
            docs: {
                // Target
                options: {
                    // Target options
                    outputStyle: "compact",
                    sourceMap: false
                },
                files: {
                    // Dictionary of files
                    "docs/styles/style.css": "src/styles/style.scss"
                }
            }
        },
        postcss: {
            options: {
                map: true,
                processors: [
                    require('autoprefixer')
                ]
            },
            docs: {
                src: 'docs/styles/*.css'
            }
        },
        browserify: {
            docs: {
                files: {
                    'docs/js/browserify.js': 'src/js/script.js'
                },
                options: {
                }
            }
        },
        babel: {
            options: {
                "presets": [
                    [ "env", {
                        "targets": {
                            "browsers": ["last 2 versions", "> 5%"]
                        }
                    }]
                ],
                minified: true,
                comments: false
            },
            docs: {
                files: {
                    'docs/js/bundle.js': 'docs/js/browserify.js'
                }
            }
        },
        purifycss: {
          options: {
            minify: true
          },
          target: {
            src: ['docs/index.html', 'docs/js/bundle.js'],
            css: ['docs/styles/bootstrap-grid.css', 'docs/styles/bootstrap.css', 'docs/styles/style.css'],
            dest: 'docs/styles/bundle.css'
          },
        },
        copy: {
          docs: {
            files: [
              {
                expand: true,
                cwd: 'src/images',
                src: ['**'],
                dest: 'docs/images'
              },{
                expand: true,
                cwd: 'src/video',
                src: ['**'],
                dest: 'docs/video'
              }
            ]
          }
        },
        clean:  {
          css: ['docs/styles/*.css', '!docs/styles/bundle.css'],
          js: 'docs/js/browserify.js'
        },
        shell: {
            command: 'afplay /System/Library/Sounds/Glass.aiff'
        },
        chokidar: {
          scripts: {
            files: ['src/**'],
            tasks: ['default']
          }
        }
    });
    grunt.loadNpmTasks("grunt-contrib-htmlmin");
    grunt.loadNpmTasks("grunt-sass");
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-purifycss');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-chokidar');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-shell');
    // Default task(s).
    grunt.registerTask("default", [ "htmlmin", "sass", "postcss", "purifycss", "copy", "browserify", "babel", "clean", "shell" ]);
    grunt.registerTask("watch", [ "chokidar" ]);

};