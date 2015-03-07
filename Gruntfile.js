module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        project: {
            root: 'source',
            src: '<%= project.root %>/js',
            libs: '<%= project.root %>/lib',
            css: '<%= project.root %>/styles',
            build: 'build'
        },
        jshint: {
            app: ['Gruntfile.js', '<%= project.src %>/**/*.js']
        },
        concat: {
            js: {
                src: ['<%= project.libs %>/jquery/dist/jquery.min.js',
                    '<%= project.libs %>/bootstrap/dist/js/bootstrap.min.js',
                    '<%= project.libs %>/moment/moment.js',
                    '<%= project.libs %>/jquery-ui/jquery-ui.min.js',
                    '<%= project.libs %>/q/q.js',
                    '<%= project.src %>/helpers/enum.js',
                    '<%= project.src %>/helpers/http-requester.js',
                    '<%= project.src %>/services/fuelo.js',
                    '<%= project.src %>/controllers/popup.js'],
                dest: '.tmp/concat/js/build.js'
            },
            css: {
                src: ['<%= project.libs %>/bootstrap/dist/css/bootstrap.min.css',
                    '<%= project.libs %>/bootstrap/dist/css/bootstrap-theme.min.css',
                    '<%= project.libs %>/jquery-ui/themes/base/jquery-ui.min.css',
                    '<%= project.css %>/popup.css'],
                dest: '.tmp/concat/styles/build.css'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            js: {
                files: {
                    '.tmp/min/js/build.min.js': '.tmp/concat/js/build.js'
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
                    {expand: true, cwd: '<%= project.root %>', src: ['img/**'], dest: '<%= project.build %>'}
                ]
            },
            js: {
                files: {
                    '<%= project.build %>/js/build.min.js': '.tmp/min/js/build.min.js'
                }
            },
            css: {
                files: {
                    '<%= project.build %>/styles/build.min.css': '.tmp/min/styles/build.min.css'
                }
            },
            html: {
                files: [
                    {
                        expand: true, flatten: true, cwd: '<%= project.root %>', src: ['*.html', '*.json '],
                        dest: '<%= project.build %>', filter: 'isFile'
                    }
                ]
            }
        },
        compress: {
            main: {
                options: {
                    archive: '<%= pkg.name %>.zip'
                },
                files: [
                    {expand: true, cwd: '<%= project.build %>', src: ['**/*'], dest: '/'}
                ]
            }
        },
        clean: {
            build: {
                src: ['.tmp', '<%= project.build %>', '<%= pkg.name %>.zip']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.registerTask('build', ['jshint', 'clean', 'concat', 'uglify', 'cssmin', 'copy', 'compress']);
};