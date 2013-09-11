module.exports = { // bump
    /**
     * Increments the version number, etc.
     */
    options: {
        files: [
            'package.json',
            'bower.json'
        ],
        commit: true,
        commitMessage: 'chore(release): v%VERSION%',
        commitFiles: [
            'package.json',
            'bower.json'
        ],
        createTag: true,
        tagName: 'v%VERSION%',
        tagMessage: 'Version %VERSION%',
        push: true,
        pushTo: 'origin'
    }
};
