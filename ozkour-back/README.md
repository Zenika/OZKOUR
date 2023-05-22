# READ ME

Welcome to the Ozkour project backend, in order to successfully launch our project, you will need to follow all of the following steps to the letter.

## ENVIRONNEMET VARIABLE
At the root of the ozkour-back folder, create a ```.env``` file.

## I) SERVER SETUP
First, In your .env file put the ports and the domain link :
```
PORT=3000
ALLOWED_DOMAIN=http://localhost:8080
```

## II) GOOGLE CLOUD

Our backend service uses google cloud services to connect to google api and interact with them (edit slide, read google sheets, etc). 
To use these services, google will ask you to authenticate yourself through a service account. This account will allow you to interact with Google Cloud resources, such as APIs in our case. To do this, you need to follow these steps: 


#### Step 1: GET ACCESS TO THE PROJECT

* Ask the DSI to give you the access to the ozkour-project in Google Cloud Plateform 
* Log in to: https://console.cloud.google.com/apis/credentials

#### Step 2: GENERATE YOUR CREDENTIALS 

These are the credentials that you will be asked for when you access google services. 

* Click on the service account named ozkour-bot@projet-ozkour.iam.gserviceaccount.com (bottom of the page).
* Select "KEYS" in the menu at the top of the page
* Click on "ADD A KEY" > "CREATE A KEY" > "JSON"

As you can see, there is now a new active key for the service account (Bottom of the page). There will be a specific key for each contributor to the project. All these keys are linked to a single service account. 

In the project's Config folder, you can drag and rename your downloaded json file. 

In your ```.env``` file, create the following key: 

```
GOOGLE_APPLICATION_CREDENTIALS=/Path/to/your/JsonFile
```

## III) SHARED DRIVE

To access the Zenika shared drive, you can contact the marketing department via slack.

You will find in this drive two folders (talks and trainings) containing the different files that will be read and edited by our application. To allow google to access these files, you must respect the following steps: 

NOTE: The accesses to the files and folders of the project are already managed. The steps below simply explain the process in case you need to manage new ones. 

#### Step 1: MANAGE ACCESS

You will need to repeat the following substeps as many times as there are files and folders.  

* Click on a file or folder
* Click on the "Manage Access" button on the right side of your screen (You must be the file editor)
* Fill in the text field with your Zenika email address
* Repeat the same action with the email address of our google service account (ex : ozkour-bot@projet-ozkour.iam.gserviceaccount.com) 

## IV) GOOGLE API

In your backend service, you will have to add all the id of the files and folders of the drive to your ```.env``` file to allow the google api to access them. These ids are present in each of the urls of the files and folders of the drive. For example : https://docs.google.com/presentation/d/1kjfeliHJJds3djks5IhflapD94i5ucfn3/edit#slide=id.g13615588f61_0_16

the id is 1kjfeliHJJds3djks5IhflapD94i5ucfn3"

#### Step 1: SHARED DRIVE 

For the shared drive use the id below.

```
DRIVE_ID_SHARED_DRIVE=0AGdSbEOfEoGwUk9PVA
```

#### Step 2: TALKS 

For this application, all talks are in a shared folder:

```
GOOGLE_FOLDER_TALK_ID= *id_to_your_google_folder*
```
For this application, all selected talks will be edited in a google slide. 

```
GOOGLE_SLIDE_LINK= *id_to_your_google_slide_document*
```

#### Step 3: TRAINING

```
GOOGLE_FOLDER_TRAINING_ID= *id_to_your_google_folder*
```
For this application, all selected training will be edited in a google slide. 

```
GOOGLE_SLIDE_TRAINING_LINK= *id_to_your_google_slide_document*
```

#### Step 4: EMAILS

Same process as the last 3 steps: 

```
GOOGLE_FOLDER_EMAILING_ID= *id_to_your_google_folder_for the_emailings*
GOOGLE_TEMPLATE_EMAILING_ID= *id_to_your_google_doc_file_for the_emailings*
```

In summary your ```.env``` should look like this: 

```
PORT=3000
ALLOWED_DOMAIN=http://localhost:8080

GOOGLE_APPLICATION_CREDENTIALS=/Path/to/your/JsonFile

DRIVE_ID_SHARED_DRIVE=0AGdSbEOfEoGwUk9PVA
GOOGLE_FOLDER_TALK_ID= *id_to_your_google_folder*
GOOGLE_SLIDE_LINK= *id_to_your_google_slide_document*
GOOGLE_FOLDER_TRAINING_ID= *id_to_your_google_folder*
GOOGLE_SLIDE_TRAINING_LINK=*id_to_your_google_slide_document*
GOOGLE_FOLDER_EMAILING_ID= *id_to_your_google_folder_for the_emailings*
GOOGLE_TEMPLATE_EMAILING_ID= *id_to_your_google_doc_file_for the_emailings*
```

## V) MANAGE YOUR GOOGLE FILE

#### V.a) Talk files
Each google sheet talk files must begin by a year followed by " - Les Evénements et talks Zenika  (Zenika talks and events)". (It can be changed in the file ozkour-back>infrastructure>googledrive>googleDriveRepository.js)

Each talk file have a sheet for each month.
Each sheet is named <month> stating with an uppercase in french followed by the year

#### V.b) Shared drive
Each file created by the application will be owned the service account you provided. It implies that the owner of these files will be the service account. If the files were not in a shared drive, they may not be accessible.

Don't forget to add the service account in the shared drive as an editor.

## VI) LAUNCH SERVER

With npm installed (comes with [node](https://nodejs.org/en/)), run the following commands into a terminal:
```
npm install
npm run dev
```
The server will run at http://localhost:3000

## VII) ADD ROUTES

If you want to add routes, it will be in the folder ozkour-back>src>routes:
* if the prefix of the route you want to create exists:
    * find the file that has the name equal to the prefix
    * add your route to this file.

* if the prefix of the route you want to create doesn't exist:
    * create a file with the prefix as a name (e.g., routes GET 'localhost/user/1' et POST 'localhost/user/1' will be in the file 'user.js').
    * add your route to this file.

## VIII) TESTS

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
   
## IX) IN THE CASE YOU WANT CREATE YOUR OWN PROJECT

#### Step 1: CREATE A YOUR OWN PROJECT

* Log in to: https://console.cloud.google.com/getting-started 
* In the menu on the left, click on "APIs and Services" > "Login"  
* Click on "CREATE A PROJECT"
* Fill in the form (project name: project-ozkour)
* Click on the "create" button

#### Step 2: CREATE A SERVICE ACCOUNT

Google cloud generates a new page.

* Click on "CREATE IDENTIFIERS" (menu under the search bar at the top of the page)
* Select "Service account"
* Fill out the form (only the service account ID is required). This will create an email address, @projet-ozkour.iam.gserviceaccount.com. 
* Click on "Ok". 

#### Step 3: GENERATE YOUR CREDENTIALS 

These are the credentials that you will be asked for when you access google services. 

* Click on your service account that you just created (bottom of the page).
* Select "KEYS" in the menu at the top of the page
* Click on "ADD A KEY" > "CREATE A KEY" > "JSON"

In the project's Config folder, you can drag and rename your downloaded json file. 

In your ```.env``` file, create the following key: 

```
GOOGLE_APPLICATION_CREDENTIALS=/Path/to/your/JsonFile
```

   
   
   
