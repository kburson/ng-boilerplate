// Creates a changelog on a new version.

module.exports =  { // changelog
    options: {
        dest: '<%= folders.docs %>/CHANGELOG.md',
            template: '<%= folders.config %>/changelog.tpl',
            github: '<%= pkg.repository.url %>',
            version: '<%= pkg.version %>'
    }
};

