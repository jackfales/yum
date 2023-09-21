# yum
A social media web application for chefs and home-cooks alike.

# Setup Instructions

## Install Tools
Install required packages.
```
npm i
```

# Local Development

## Lint
ESLint is run on pre-commit via Husky. To manually run the linter see below.

Run ESLint
```
npm run lint
```

Run ESLint with fixes
```
npm run lint:fix
```

## Run Frontend

### dev Environment
```
cd ./yum
npm run dev
```

### prod Environment
```
cd ./yum
npm run build
npm run start
```

## Run Backend
