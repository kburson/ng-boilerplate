module.exports = { //shell
    options: {
        failOnError: false,
        stderr: true,
        stdout: true
    },
    bower_prune: {
        command: 'node_modules/bower/bin/bower prune --verbose'
    },
    kill_phantom: {
        command: 'pkill phantomjs'
    },
    kill_port: {
        command: 'lsof -i -P | grep <%= grunt.option("port") %> | tee /dev/tty | awk \'{print $2}\' | xargs echo | sed "s/ /, /g" | xargs kill -9'
    },
    echo: {command: 'echo port=<%= grunt.option("port")%>'},

    install_selenium: {
        command: './node_modules/protractor/bin/install_selenium_standalone'
    },
    start_selenium: {
        options: {
            async: true
        },
        command: 'java -jar selenium/selenium-server-standalone-2.33.0.jar -Dwebdriver.chrome.driver=./selenium/chromedriver'
    },
    stop_selenium: {
        command: 'curl "http://localhost:4444/selenium-server/driver/?cmd=shutDownSeleniumServer"'
    }
};