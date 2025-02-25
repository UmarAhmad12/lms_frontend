## LMS Frontend

### Setup instructions

1. clone the project

.....
git clone https://github.com/UmarAhmad12/LMS.git
.......

2. Move into the directory

.....
cd LMS
....

3. Install dependencies

.....
npm i
.....

4. run the server

....
npm run dev
....

## Setup instructions for tailwind

[Tail wind official instruction docs](https://tailwindcss.com/docs/installation)

1. Install tailwindcss

.....
npm install -D tailwindcss postcss autoprefixer
....

note: if you have setup the project with vite react then install this--> npx tailwindcss init -p (if not then dont install)

2. Create tailwind config file

....
npx tailwindcss init
....

3. Add file entensions to tailwind config file in the content property

....
    ["./index.html", "./src/**/*.{html,js,jsx,ts,tsx}"]
....

4. Add the following details in the plugin property of tailwind config

......
    [require("daisyui"), require("@tailwindcss/line-clamp")]
......

5. Add the tailwind directives at the top of the `index.css` file

.....
@tailwind base;
@tailwind components;
@tailwind utilities;
.....


### Adding plugins and dependencies

.....
npm i @reduxjs/toolkit react-redux react-router-dom react-icons react-chartjs-2 chart.js daisyui axios react-hot-toast @tailwindcss/line-clamp
.....

### Configure auto import sort eslint

### To automatically sort imports on save in Visual Studio Code, you can use the ESLint extension along with eslint-plugin-simple-import-sort.

1. Install eslint simple import sort and eslint extension in vscode

   .....
   npm i -D eslint-plugin-simple-import-sort
   .....

2. Add rules in `.eslintrc.cjs`

.....
rules: {
"simple-import-sort/imports": "error",
},
....

3. Add simple-import sort plugin in `.eslint.cjs`

....
plugins: [ ..... , 'simple-import-sort'],
....

4. To enable auto import sort on file save in vscode

......
Open your Visual Studio Code settings (settings.json) by either selecting Preferences > Settings or pressing Ctrl+,. Then, add the following configuration:

    "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
    },

......
