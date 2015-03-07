module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        project: {
            src: 'source/js',
            libs: 'source/lib',
            css: 'source/styles',
            build: 'build'
        },
        jshint: {
            app: ['Gruntfile.js', '<%= project.src %>/**/*.js']
        },
        concat: {
            js: {
                src: ['<%= project.lib %>/jquery/dist/jquery.min.js',
                    '<%= project.lib %>/bootstrap/dist/js/bootstrap.min.js',
                    '<%= project.lib %>/moment/moment.js',
                    '<%= project.lib %>/jquery-ui/jquery-ui.min.js',
                    '<%= project.lib %>/q/q.js',
                    '<%= project.src %>/helpers/enum.js',
                    '<%= project.src %>/helpers/http-requester.js',
                    '<%= project.src %>/services/fuelo.js',
                    '<%= project.src %>/controllers/popup.js'],
                dest: '.tmp/concat/scripts/build.js'
            },
            css: {
                files: {
                    '.tmp/concat/styles/build.css': ['<%= project.css %>/**/*.css']
                }
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            js: {
                files: {
                    '.tmp/min/scripts/build.min.js': '.tmp/concat/scripts/build.js'
                }
            }
        },
        cssmin: {
            css: {
                files: {
                    '.tmp/min/styles/build.min.css': '.tmp/concat/styles/build.css'
                }
            }
        },
        copy: {
            img: {
                files: [
                    {expand: true, cwd: '<%= project.app %>', src: ['img/**'], dest: '<%= project.build %>'}
                ]
            },
            js: {
                files: {
                    '<%= project.build %>/scripts/build.min.js': '.tmp/min/scripts/build.min.js'
                }
            },
            css: {
                files: {
                    '<%= project.build %>/styles/build.min.css': '.tmp/min/styles/build.min.css'
                }
            }
        },
        clean: {
            build: {
                src: ['.tmp', '<%= project.build %>']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.registerTask('build', ['jshint', 'clean', 'concat', 'uglify', 'cssmin', 'copy']);
};