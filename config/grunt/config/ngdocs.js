/**
 * Basic ngdocs configuration. Contains a temporary `site_tmp` folder which
 * gets later committed to gh-pages branch. The nav-template modifies the standard
 * ngdocs navigation template to add additional markup for example.
 *
 * html5Mode controls if pushState is active or not. We set this to `false` by default
 * to make sure the generated site works well on github pages without routing
 * problems.
 *
 * `styles` let you manipulate the basic styles that come with ngdocs, we made
 * the font-sizes in particular cases a bit smaller so that everything looks
 * nice.
 *
 * `api`, `guide` and `tutorial` configure the certain sections. You could either
 * declare some source files as `src` which contain ngdoc comments, or simply
 * *.ngdoc files which also get interpreted as ngdoc files.
 */
module.exports = { // ngdocs

    options: {
        dest: 'site_tmp',
        title: '<%= pkg.name %>',
        navTemplate: '<%= folders.docs %>/html/navigation.html',
        html5Mode: false,
        startPage: '/guide',
        styles: ['<%= folders.docs %>/css/styles.css']
    },

    /*
     * API section configuration. Defines source files and a section title.
     */
    api: {
        src: ['<%= files.main %>', '<%= files.app %>', '<%= folders.docs %>/content/api/*.ngdoc'],
        title: 'API Reference'
    },

    /*
     * Guide section configuration. Defines source files and a section title.
     */
    guide: {
        src: ['<%= folders.docs %>/content/guide/*.ngdoc'],
        title: 'Guide'
    },
    /*
     * Tutorial section configuration. Defines source files and a section title.
     */
    tutorial: {
        src: ['<%= folders.docs %>/content/tutorial/*.ngdoc'],
        title: 'Tutorial'
    }
};