once = (fn) ->
    returnValue = undefined
    called = false
    ->
        unless called
            called = true
            returnValue = fn.apply(this, arguments)
        returnValue

describe "sinon", ->
    it "should stub function", ->
        callback = sinon.stub().returns(42)
        proxy = once(callback)
        expect(proxy()).to.equal 42

    it "spies on things, like, the NSA", ->
        callback = sinon.spy()
        proxy = once(callback)
        proxy()
        expect(callback.called).is.true
