# ozkour-front
The client of Ozkour is to ease the creations of the requests.

## Project setup

start by installing the dependancies:
```
npm install
```

### Environment variables
Add the address of the server: 
```
VUE_APP_SERVER= *server_address*
```

The application use the Auth0 to authenticate the client (See https://auth0.com/docs/quickstart/spa/vuejs/01-login#configure-auth0).
Once you setup your Auth0, add the domain and the client Id:
```
VUE_APP_AUTH0_DOMAIN=zenika.eu.auth0.com
VUE_APP_AUTH0_CLIENT_ID=sb3yuqXcttQ5U6KbHSTD5adPEr1B6KJN
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


