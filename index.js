const fs = require('fs')
const readline = require('readline')
const prompt = require('prompt')
let fileArr = []

console.log('Welcome to Ascii Art!')
console.log('---------------------')

prompt.message = ''
prompt.delimiter = ''
prompt.start()

const option = {
  name: 'option',
  hidden: false,
  message: `Choose an artwork to display, or:
  "c" to comment
  "d" to delete comments
  "v" to view comments
  "q" to quit
  ------------------
  1. Black Cat
  2. Charmander
  3. Kiwi
  4. Mickey Mouse
  5. Minions
  6. Pikachu
  7. Snoopy
  8. The Simpsons
  \n`,
}

function asciiArt() {
  prompt.get(option, (err, input) => {
    if (err) throw err
    pressEnter(input)
  })
}
asciiArt()

function pressEnter(input) {
  if (input.option === 'q') {
    process.exit()
  } else if (input.option === 'c') {
    comment()
  } else if (input.option === 'v') {
    viewComment()
  } else if (input.option === 'd') {
    deleteComment()
  } else {
    loadFile(input.option)
  }
}

function comment() {
  const rl = readline.createInterface(process.stdin, process.stdout)
  rl.question('Please leave a comment: ', (input) => {
    rl.close()
    fs.appendFile('./data/saved-comment.txt', input + '\n', 'utf-8', (err) => {
      if (err) throw err
      console.log('Your comment has been saved')
    })
  })
}

function viewComment() {
  fs.readFile('./data/saved-comment.txt', 'utf-8', (err, data) => {
    if (err) throw err
    console.log(data)
  })
}

function deleteComment() {
  const rl = readline.createInterface(process.stdin, process.stdout)

  rl.question(`Are you sure? 'y' for Yes or 'n' for No \n`, (input) => {
    rl.close()
    if (input === 'y') {
      fs.writeFile('./data/saved-comment.txt', '', (err) => {
        if (err) throw err
        return
      })
    } else {
      return
    }
  })
}

function loadFile(input) {
  fs.readdir('./data/', 'utf-8', (err, files) => {
    if (err) throw err
    fileArr = files

    fs.readFile('./data/' + fileArr[input - 1], 'utf-8', (err, data) => {
      if (err) throw err
      console.log('\n' + data)
      asciiArt()
    })
  })
}
