const fs = require('fs')
const path = require('path')
const _ = require('lodash')

// Convert kebab-case to PascalCase and CONSTANT_CASE
const toPascalCase = str => _.upperFirst(_.camelCase(str))
const toConstantCase = str => _.snakeCase(str).toUpperCase()

const rawSliceName = process.argv[2]

if (!rawSliceName) {
  console.error('Please provide a store slice name.')
  process.exit(1)
}

const sliceName = toPascalCase(rawSliceName)
const constantSliceName = toConstantCase(rawSliceName)

const baseDir = path.join(__dirname, '..', 'src', 'store', rawSliceName)
const servicePath = path.join(baseDir, 'service.tsx')
const slicePath = path.join(baseDir, 'slice.tsx')
const typesPath = path.join(baseDir, 'types.tsx')

// File templates
const serviceTemplate = `import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define your async thunk here
export const fetch${sliceName} = createAsyncThunk(
  '${constantSliceName}/fetch${sliceName}',
  async (params: any) => {
    const response = await axios.get('/api/${rawSliceName}');
    return response.data;
  }
);
`

const sliceTemplate = `import { createSlice } from '@reduxjs/toolkit';
import { fetch${sliceName} } from './service';
import { ${sliceName}State } from './types';

const initialState: ${sliceName}State = {
  // Define your initial state here
};

const ${sliceName}Slice = createSlice({
  name: '${constantSliceName}',
  initialState,
  reducers: {
    // Define your reducers here
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetch${sliceName}.pending, (state) => {
        // Handle pending state
      })
      .addCase(fetch${sliceName}.fulfilled, (state, action) => {
        // Handle success state
      })
      .addCase(fetch${sliceName}.rejected, (state, action) => {
        // Handle error state
      });
  },
});

export const { actions, reducer } = ${sliceName}Slice;
`

const typesTemplate = `export interface ${sliceName}State {
  // Define your state interface here
}

export type ${sliceName}Payload = {
  // Define your payload types here
};
`

// Create directory and files
fs.mkdirSync(baseDir, {recursive: true})
fs.writeFileSync(servicePath, serviceTemplate)
fs.writeFileSync(slicePath, sliceTemplate)
fs.writeFileSync(typesPath, typesTemplate)

console.log(`Store slice ${sliceName} created successfully.`)
