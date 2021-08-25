const assert = require('chai').assert
const addResponse= require('../add')
describe('addition',()=>{
    const total=addResponse(47,29);
    it('should return wrong sum',()=>{
        assert.equal(total,99);
    })
    it('should return correct sum',()=>{
        assert.equal(total,76);
    })
})