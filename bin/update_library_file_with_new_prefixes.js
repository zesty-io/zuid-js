#!/usr/bin/env node

const fs = require('fs')
const specPrefixJsonFilePath = '../zuid-specification/prefixes.json'
const libraryFilePath = './src/zuid.js'
const startDelim = '// START OF AUTOMATICALLY UPDATED PREFIXES (DO NOT REMOVE THIS LINE)'
const endDelim = '// END OF AUTOMATICALLY UPDATED PREFIXES (DO NOT REMOVE THIS LINE)'

console.log("\n")

if (!fs.existsSync(specPrefixJsonFilePath)) {
  console.log("\nZUID Specification JSON file not found at " +  specPrefixJsonFilePath + "\n")
  process.exit()
}

const zuidJson = fs.readFileSync(specPrefixJsonFilePath, 'utf8')
const existingLibraryFileContents = fs.readFileSync(libraryFilePath, 'utf8')

const beforeStart = existingLibraryFileContents.split(startDelim).slice(0, 1)
const afterEnd = existingLibraryFileContents.split(endDelim).slice(1)
const newFileContents = beforeStart + startDelim + "\n\n" + 'Zuid.prefix = ' + zuidJson + "\n" + endDelim + afterEnd

fs.writeFileSync(libraryFilePath, newFileContents)

console.log("\nCode updated successfully\n")
