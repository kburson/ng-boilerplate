module.exports = (karma) ->

    # This is the list of file patterns to load into the browser during testing.
    karma.set files: [ <% scripts.forEach( function ( file ){ %>
        '<%= file %>'<% }); %>
    ]
