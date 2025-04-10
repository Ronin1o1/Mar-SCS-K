// Copy this file to a file named Gruntfile.js then update the variable(s) below in the copy to match your development environment.
// Replacements are required wherever "TBD" is found
var grunt = require('grunt');
var path = require('path');
var os = require('os');

// This is the directory in which the git repo lives, it shouldn't need to change
var srcRoot = './';
var clientRoot = srcRoot + 'rfp-webapp-web/WebContent/';

// This is the path to the WAR is installed.
// end the path with a slash (/)
var webSphereWarpath = 'C:/Program Files (x86)/IBM/WebSphere/AppServer/profiles/AppSrv01/installedApps/HDQBEPC270668Node01Cell/rfp-app.ear/rfp-webapp-web.war/';

var gruntConfig = {
    sync: {
        main:  {
            files: [{
                cwd: clientRoot,
                src: ['**'],
                dest: webSphereWarpath
            }],
            verbose: true
        }
    },
    watch: {
        files: [clientRoot + 'jsp/**', clientRoot + 'script/**', clientRoot + 'less/**'],
        tasks: ['less', 'sync'],
        options: {
            spawn: false
        }
    },
    less: {
        files: {
            src: clientRoot + '/less/main.less',
            dest : clientRoot + '/script/app/css/main.css'
        }
    }
};

grunt.initConfig(gruntConfig);
grunt.loadNpmTasks('grunt-sync');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-less');

grunt.registerTask('default', ['watch']);