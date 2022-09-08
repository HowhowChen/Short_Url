const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
const upperCaseLetters = lowerCaseLetters.toUpperCase()
const numbers = '1234567890'
let collections = []

collections = collections.concat(lowerCaseLetters.split(''), upperCaseLetters.split(''), numbers.split(''))

module.exports = () => {
  let randomString = ''
  for (let i = 0; i < 5; i++) {
    let randomIndex = Math.floor(Math.random() * collections.length)
    randomString += collections[randomIndex]
  }

  return randomString
}
