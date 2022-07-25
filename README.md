# OZKOUR

A web application to create templates for the talks given by the Z (Quoi de 9 ?, E-mailing, Slack, Meet Up).

## Installation

### Environment variable

At the root of the ozkour-back folder, create a ```.env``` file.

First, put the ports and the domain link :
```
PORT=3000
PORT_TEST=3001
ALLOWED_DOMAIN=http://localhost:8080
```

#### Google Credentials
```
client_id=
project_id=
auth_uri=https://accounts.google.com/o/oauth2/auth
token_uri=https://oauth2.googleapis.com/token
auth_provider_x509_cert_url=https://www.googleapis.com/oauth2/v1/certs
client_secret=
redirect_uris=http://localhost:3000
```

#### Google token
```
access_token=
refresh_token=
scope=
token_type=Bearer
expiry_date=
```

#### APIs

Create a google sheet file. Make sure to copy the key and paste it in :
```
GOOGLE_SHEET_LINK=
```
Here is an exemple of a [google sheet](https://docs.google.com/spreadsheets/d/1cV84uPRm8-jMLacTC1krtEyy7E4kXBp2Pha_Ep-V29o/edit?usp=sharing) file.
The key would be : ```1cV84uPRm8-jMLacTC1krtEyy7E4kXBp2Pha_Ep-V29o```

And create a google slide file. Make sure to copy the key and paste it in :
```
GOOGLE_SLIDE_LINK=
```
Here is an exemple of a [google slide](https://docs.google.com/presentation/d/1_lpgL0UeRYtqvB0X5jT3k2ZPk9kchJNgC6UHq_1J5hI/edit#slide=id.p) file.
The key would be : ```1_lpgL0UeRYtqvB0X5jT3k2ZPk9kchJNgC6UHq_1J5hI```

## Server

With npm installed (comes with [node](https://nodejs.org/en/)), run the following commands into a terminal:
```
npm install
npm run dev
```
The server will run at http://localhost:3000

## Client

Run the following commands:
```
npm install
npm run serve
```
The application will run at http://localhost:8080

## Tests

Unit tests and one integration test have been done on server and client. 
To make sure everything is working correctly run the following command :
```
npm run test
```
Or this command to only run the unit tests : 
```
npm run test:unit 
```
