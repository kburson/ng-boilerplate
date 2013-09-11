/*
 browser dependency manager.  Download frameworks and libraries that used by the browser.
 This is different than npm package manager used for build and dev tools.
 use :  grunt bower
 this depends on the component packages having a properly formatted bower.json file with a 'main' attribute
 set to the list of files that are necessary for deployment.
 If the library you are useing does not have a properly formmatted bower.json file then you must override
 the export functionality in your bower.json to identify which library files you want copied to your project.
 */
module.exports =  { //bower
    install: {
        //just run 'grunt bower:install' and you'll see files from your Bower packages in lib directory
        options: {
            install: true,
                //cleanTargetDir: true,
                //cleanBowerDir: true,
                layout: 'byComponent',
                targetDir: '<%= bowerrc.directory %>',
                verbose: true,
                copy: false
        }
    },
    prune: {
        options: {
            install: false,
                prune: true,
                targetDir: '<%= bowerrc.directory %>',
                verbose: true
        }
    }
}