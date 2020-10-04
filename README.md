# atom-ide-base

Atom IDE packages for Atom

![Build Status (Github Actions)](https://github.com/atom-ide-community/atom-ide-base/workflows/CI/badge.svg)
[![Dependency Status](https://david-dm.org/atom-ide-community/atom-ide-base.svg)](https://david-dm.org/atom-ide-community/atom-ide-base)
[![apm](https://img.shields.io/apm/dm/atom-ide-base.svg)](https://github.com/atom-ide-community/atom-ide-base)
[![apm](https://img.shields.io/apm/v/atom-ide-base.svg)](https://github.com/atom-ide-community/atom-ide-base)

## Features

This package is an all-in-one package that installs all the packages that provide Atom IDE features:

- `atom-ide-datatip`
- `atom-ide-signature-help`
- `atom-ide-hyperclick`
- `atom-ide-definitions`
- `atom-ide-outline`
- `linter`
- `linter-ui-default`
- `intentions`
- `atom-ide-markdown-service`

It also provides the TypeScript types for atom-ide packages.

## Usage

Just install and enjoy.

## Using Types

Install the packages as an npm package:

```
npm install --save-dev atom-ide-base
```

Then import the types like the following:

```ts
import { BusySignalServie } from "atom-ide-base"
```

See the "types/\*.d.ts" files to become familiar with the API.

## Using the common files for IDE packages

Install the packages as a dependency:

```
npm install --save atom-ide-base
```

Then import the files you need:

```ts
import { ProviderRegistry } from "atom-ide-base/commons-atom/ProviderRegistry"
```

## Contributing

- Let me know if you encounter any bugs.
- Feature requests are always welcome.
