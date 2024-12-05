const conditionIf = require('../../../lib/logics/parser/conditionIf')
const getJsFormat = require('../test-parser-helper')

describe('Test Condition If', () => {
  it('Should parse string correctly', () => {
    const test1 = conditionIf("kalo fomo itu 'lu'")
    expect(test1.exp).toBe(`if (fomo  ==  'lu')`)
  })

  it('Should parse number correctly', () => {
    const test1 = conditionIf("kalo fomo itu 123")
    expect(test1.exp).toBe(`if (fomo  ==  123)`)
  })

  it('Should return null if not match', () =>{
    const test1 = conditionIf("kal fomo itu 123")
    const test2 = conditionIf("kaloo fomo i 123")
    expect(test1).toBe(null)
    expect(test2).toBe(null)
  })

  it('Should return correctly flexing', () => {
    const jsFormat = getJsFormat(`
      kalo fomo itu 123
        nampilin "its 123"
      udahlah
    `)
    expect(jsFormat).not.toBeNull()
    let shouldMatch = [
      'if (fomo  ==  123) {',
      'console.log("its 123")',
      '}'
    ]
    jsFormat.split("\n").every((v, i) => {
      if(!shouldMatch[i]) return true;
      return expect(v).toContain(shouldMatch[i])
    })
  })
})