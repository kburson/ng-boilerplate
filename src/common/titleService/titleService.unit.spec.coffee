
should = chai.should()
expect = chai.expect
assert = chai.assert

describe "titleService", ->

    beforeEach module("titleService")

    it "should set a title without a suffix", inject((titleService) ->
        title = "new title"
        titleService.setTitle title
        expect(titleService.getTitle()).to.equal title
    )

    it "should allow specification a suffix", inject((titleService) ->
        suffix = " :: new suffix"
        titleService.setSuffix suffix
        expect(titleService.getSuffix()).to.equal suffix
    )

    it "should set the title, including the suffix", inject((titleService) ->
        title = "New Title"
        suffix = " :: new suffix"
        titleService.setSuffix suffix
        titleService.setTitle title
        expect(titleService.getTitle()).to.equal title + suffix
    )
