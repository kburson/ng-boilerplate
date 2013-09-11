// open browser to hosted location
module.exports =  { // open
    dev: {
        path: 'http://localhost:<%=express.livereload.options.port%>',
            app: 'Google Chrome'
    },
    dist: {
        path: 'http://localhost:<%=express.dist.options.port%>',
            app: 'Google Chrome'
    }
};

