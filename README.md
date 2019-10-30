# Developer Documentation

The SlackFest app is built on ReactNative with the Expo framework to make it simpler to build and ship iOS and Android apps from one codebase with code push capabilities :) 

[https://docs.expo.io/versions/v33.0.0/](https://docs.expo.io/versions/v33.0.0/)

## Running Locally

There are several options for local execution: android / ios emulators and binary execution on device OR running a local expo server to run the app within the expo app. Check the expo documentation for instructions.

## Package Management

We use yarn instead of npm for package management and the local run time. Simply replace `npm` with `yarn` in any commands you see in expo or react native documentation.

---

## Content Management

### Adding a new info pdf

See src/features/info/InfoContainer.js

The app requires a base64 encoded string of the pdf for display by [rn-pdf-reader](https://github.com/xcarpentier/rn-pdf-reader-js).

    #ON MacOS: encodes the pdf to base64 and copies it to your clipboard. Just paste it here.
    openssl base64 < path/to/file.pdf | tr -d '\n' | pbcopy

### Adding a new schedule

use the node command `yarn getData` which is defined in scheduleToJson.js. 

1. Update the spreadsheet id and sheet name in the scheduleToJson.js if importing a new schedule
    1. E.g. for BernMovesFlash, the spreadsheet id is highlighted: [https://docs.google.com/spreadsheets/d/1QBtACEflInYn8_Pt61KvaweCMBzpK8PWr-clYW9Y8VE/edit#gid=1253545848](https://docs.google.com/spreadsheets/d/1QBtACEflInYn8_Pt61KvaweCMBzpK8PWr-clYW9Y8VE/edit#gid=1253545848) 
2. Follow the spreadsheet convention from BernMovesFlash, or update the schedule to json to match sheet columns to the appropriate json field.
3. Run `yarn getData`
4. Authorize scheduleToJson to access google sheets on your behalf.
5. Let the script handle the rest.

### Adding a new map

Add the png image to the assets folder. This is critical because it ensures the image is uploaded to the EXPO CDN for codepush style updating and bundling in the app for app store publication.

For now: Update the map dimensions and file name in code
