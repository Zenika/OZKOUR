# READ ME
The server of Ozkour will create and send the requests to the google api
## Environment variable
At the root of the ozkour-back folder, create a ```.env``` file.

### Server Setup
First, put the ports and the domain link :
```
PORT=3000
ALLOWED_DOMAIN=http://localhost:8080
```

### Google credentials
To get your google Credentials, follow the link https://console.cloud.google.com/apis/credentials.
Then create your project

The next step is to create the service account.
 * Go to "APIs & Services"
 * Click on "create credentials"
 * Select service account
 * Fill the form (only the service account ID is mandatory). It will create an email address, <id>@projet-ozkour.iam.gserviceaccount.com. It will be useful later.
 * Click on the service account you just created
 * Click on 'KEYS' > 'ADD KEY' > 'Create new key' > "JSON" (a private key will be dowloaded)

 > **_WARNING:_**  It is recommended to keep your private key for yourself and to not share it 

Once you have your credentials you can fill your .env file with the data in the downloaded json file

```
type=service_account
project_id= *your_project_id*
private_key_id= *your_private_key_id*
private_key= *your_private_key*
client_email= *your_client_email*
client_id= *your_client_id*
auth_uri=https://accounts.google.com/o/oauth2/auth
token_uri=https://oauth2.googleapis.com/token
auth_provider_x509_cert_url=https://www.googleapis.com/oauth2/v1/certs
client_x509_cert_url= *your_certificate_url*
```

### Google API
In this part you will have to add multiple id to your google documents/folders/drive.
The id have to be extracted from the document URL. 
For example: 
https://docs.google.com/presentation/d/**1kjfeliHJJds3djks5IhflapD94i5ucfn3**/edit#slide=id.g13615588f61_0_16
The id is"1kjfeliHJJds3djks5IhflapD94i5ucfn3"

Add the id of the google slide file "Quoi de 9". This will be where all the visuals created by the application will appear, when the template "Quoi de 9" is selected.
```
GOOGLE_SLIDE_LINK= *id_to_your_google_slide_document*
```

All your google sheets files and google docs files must be in a shared drive. 
Once your shared drive is created, you have to add the email address to the shared drive in editor mode.
Then you can add the id of the drive.
```
DRIVE_ID_SHARED_DRIVE= *id_to_your_google_shared_drive*
```

For this app, all the talks are in google sheet files and all these files are located in one folder.
```
GOOGLE_FOLDER_TALK_ID= *id_to_your_google_folder*
```

For this app, all the google doc visuals are in different folders. In these folder you have one template.
```
GOOGLE_FOLDER_EMAILING_ID= *id_to_your_google_folder_for the_emailings*
GOOGLE_TEMPLATE_EMAILING_ID= *id_to_your_google_doc_file_for the_emailings*
```

## Manage your google files
### Talk files
Each google sheet talk files must begin by a year followed by " - Les Evénements et talks Zenika  (Zenika talks and events)". (It can be changed in the file ozkour-back>infrastructure>googledrive>drive.js)

Each talk file have a sheet for each month.
Each sheet is named <month> stating with an uppercase in french followed by the year

### Shared drive
Each file created by the application will be owned the service account you provided. It implies that the owner of these files will be the service account. If the files were not in a shared drive, they may not be accessible.

Don't forget to add the service account in the shared drive as an editor.

## Launch Server

With npm installed (comes with [node](https://nodejs.org/en/)), run the following commands into a terminal:
```
npm install
npm run dev
```
The server will run at http://localhost:3000

## Add routes
If you want to add routes, it will be in the folder ozkour-back>config>routes:
* if the prefix of the route you want to create exists:
    * find the file that has the name equal to the prefix
    * add your route to this file.

* if the prefix of the route you want to create doesn't exist:
    * create a file with the prefix as a name (e.g., routes GET 'localhost/user/1' et POST 'localhost/user/1' will be in the file 'user.js').
    * add your route to this file.

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
if you want to update the snapshot, you can use the command:
```
npm run test:unit -- -u
```