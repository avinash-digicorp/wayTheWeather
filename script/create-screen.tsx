const fs = require('fs')
const path = require('path')
const {camelCase} = require('lodash')

const toPascalCase = str => {
  const camelCaseStr = camelCase(str)
  return camelCaseStr.charAt(0).toUpperCase() + camelCaseStr.slice(1)
}

const rawScreenName = process.argv[2]

if (!rawScreenName) {
  console.error('Please provide a screen name.')
  process.exit(1)
}
const screenName = toPascalCase(rawScreenName)

const headerTemplate = `import React from 'react';
import {View, Text} from 'react-native'

export const Header = () => {
  return (
    <View>
      <Text>${screenName}</Text>
    </View>
  )
}
`

const screenTemplate = `import React from 'react';
import {View} from 'react-native'
import {use${screenName}} from './${rawScreenName}-container'
import {Header} from './partials/header'
import {I${screenName}Props} from './types'

export const ${screenName} = () => {
  const {loading}: I${screenName}Props = use${screenName}()
  return (
    <View>
      <Header />    
    </View>
  )
}
`

const containerTemplate = `import {useState} from 'react'

export const use${screenName} = () => {
     const [loading, setLoading] = useState<boolean>(false)
   
     const onSubmit = (): void => {
       setLoading(true)
       setLoading(false)
     }
   
     const values = {loading}
     const handlers = {setLoading, onSubmit}
   
     return {...values, ...handlers}
   }
   
`

const indexTemplate = `export * from './${rawScreenName}';`

const typesTemplate = `export interface I${screenName}Props {
  loading: boolean
  onSubmit: () => void
  setLoading: (loading: boolean) => void
}
`

const baseDir = path.join(__dirname, '..', 'src', 'screens', rawScreenName)
const partialsDir = path.join(baseDir, 'partials')

// Create directories
fs.mkdirSync(baseDir, {recursive: true})
fs.mkdirSync(partialsDir, {recursive: true})

// Create files
fs.writeFileSync(path.join(partialsDir, 'header.tsx'), headerTemplate)
fs.writeFileSync(path.join(baseDir, `${rawScreenName}.tsx`), screenTemplate)
fs.writeFileSync(path.join(baseDir, 'index.tsx'), indexTemplate)
fs.writeFileSync(path.join(baseDir, 'types.d.ts'), typesTemplate)
fs.writeFileSync(
  path.join(baseDir, `${rawScreenName}-container.tsx`),
  containerTemplate
)

const toConstantCase = str => {
  return str.split('-').join('_').toUpperCase()
}
const constantScreenName = toConstantCase(rawScreenName)
console.log(`New Screen ${rawScreenName} added.`)

// Update navigation routes
const routesPath = path.join(
  __dirname,
  '..',
  'src',
  'navigation',
  'navigation-routes.tsx'
)
const newRoute = `,${constantScreenName}: '${constantScreenName}'`
fs.readFile(routesPath, 'utf8', (err, data) => {
  if (err) {
    console.error(`Failed to read ${routesPath}:`, err)
    return
  }

  // Insert the new route before the closing brace
  const updatedData = data.replace(/}\s*$/, `  ${newRoute}\n}`)

  fs.writeFile(routesPath, updatedData, 'utf8', err => {
    if (err) {
      console.error(`Failed to update ${routesPath}:`, err)
      return
    }

    console.log(`Route ${constantScreenName} added to ${routesPath}.`)
  })
})
