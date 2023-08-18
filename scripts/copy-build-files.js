/* eslint-disable no-console, import/no-extraneous-dependencies */
import path from 'path'
import fse from 'fs-extra'

async function copyFile(file) {
  const buildPath = path.resolve(__dirname, '../dist/', path.basename(file.to || file.from))
  await fse.copy(file.from, buildPath)
  console.log(`Copied ${file.from} to ${buildPath}`)
}

async function createPackageFile() {
  const packageData = await fse.readFile(path.resolve(__dirname, '../package.json'), 'utf8')
  const newPackageData = {
    ...JSON.parse(packageData),
    scripts: undefined,
    devDependencies: undefined,
    jest: undefined,
    'lint-staged': undefined,
    main: './index.js',
    'umd:main': './umd/react-easy-sort.js',
    unpkg: './umd/react-easy-sort.js',
    jsdelivr: './umd/react-easy-sort.js',
    module: './index.module.js',
    'jsnext:main': './index.module.js',
    'react-native': './index.module.js',
    exports: {
      '.': {
        types: "./index.d.ts",
        import: './index.module.js',
        require: './index.js',
      },
    },
  }
  const buildPath = path.resolve(__dirname, '../dist/package.json')

  await fse.writeFile(buildPath, JSON.stringify(newPackageData, null, 2), 'utf8')
  console.log(`Created package.json in ${buildPath}`)

  return newPackageData
}

async function run() {
  await Promise.all([{ from: './README.md' }].map((file) => copyFile(file)))
  await createPackageFile()
}

run()
