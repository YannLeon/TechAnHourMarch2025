# TechAnHourMarch2025

Small project to illustrate the march 2025 VISEO Tech an hour on the QA Front end symbiosis.

By [MJ Bassil](https://www.linkedin.com/in/mariejoseebassil/) and [Yann Léon](https://www.linkedin.com/in/yannleon/)

⚠️ Does not work on Safari

## How to launch Back end

```
cd .\postit-dashboard-backend\
docker-compose up
```

Then the api is accessible : http://localhost:3000

available routes :

- /postits
- /user/login
- /user/register

## How to launch Front end

```
cd .\postit-dashboard-frontend\
npm install
npm run dev
```

## How to launch QA automated tests

To run the automated tests, make sure that the backend and the front end are launched

1. Make sure you're terminal is opened in the right folder

```
cd .\postit-dashboard-qa\
```

2. Install node modules

```
npm install
```

3. Open cypress

```
npm run cy:open
```

4. To run all features containing all the tests, run the following command :

```
npm run all
```
