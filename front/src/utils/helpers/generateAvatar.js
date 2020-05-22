import tinycolor from 'tinycolor2'

const getCurrentNumber = number => {
    if (number > 255) {
        return 255
    }
    if (number < 0) {
        return 0
    }
    return number
}

export default hash => {
    const [r, g, b] = hash.substr(-3).split('').map(char => getCurrentNumber(char.charCodeAt(0)))
    return {
        color: tinycolor({r, g, b}).lighten(10).saturate(30).toHexString(),
        colorLighten: tinycolor({r, g, b}).lighten(55).saturate(30).toHexString()
    }
}