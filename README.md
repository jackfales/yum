<p align="center"> 
  <img  src="https://github.com/jackfales/yum/assets/88995035/33c9cf42-8978-496e-ab18-2620a1b41bb1" data-canonical-src="https://github.com/jackfales/yum/assets/88995035/33c9cf42-8978-496e-ab18-2620a1b41bb1"/>
</p>
<h1 align="center">
  A social platform for chefs and home-cooks alike.
</h1>

YUM is an open-source social media application that invites everyone, from the 
aspiring home cook to seasoned professional chefs, to share their favorite 
recipes!

If you're the type of person who loves exploring new cuisines, crafting 
beautiful recipes, or is just plain tired of that monotonous meal prep plan, 
then join the thriving community of users on YUM!

# 🍽 Product Features
YUM provides its users with several core features:

👥**Social Platform**: Share and discover recipes created by hundreds of fellow YUM 
users.

🥕**Virtual Pantry**: Keep track of your ingredients with our virtual pantry! 
Easily see what you already have for a given recipe and replenish ingredients 
that you're running low on.

🤖**AI-Powered Recommendations**: Receive personalized dish recommendations based 
on your previous interests so you'll never have to scroll too far to find 
something you'll love!

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
