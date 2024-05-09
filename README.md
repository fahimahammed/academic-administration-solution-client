## advising-pro-client

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Eslint and Prettier commands 
```bash
# checking lint
yarn lint:check

# fixing lint
yarn lint:fix

# checking code fotmat
yarn prettier:check

# fixing code format
yarn prettier:fix
```

Creating new custom icons & other svg
```bash
#svgr command for creating icons 
npx @svgr/cli src/assets/icons/raw --out-dir src/assets/icons/custom --icon --typescript --ignore-existing

#svgr command for creating other svgs
npx @svgr/cli src/assets/others/raw --out-dir src/assets/others/custom --icon --typescript --ignore-existing
```