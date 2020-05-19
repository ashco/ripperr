Need to download serviceAccount.json file from Firebase in order for cypress-firebase to work. See instructions here:
https://sites.google.com/site/scriptsexamples/new-connectors-to-google-services/firebase/tutorials/authenticate-with-a-service-account

If you have issues, it might be because you modified the json file's contents. Just copy and paste it to where it needs to go.


place both of these env files in the root directory.
# .env
API_KEY=""
PROJECT_ID=""
MESSAGING_SENDER_ID=""
APP_ID=""
MEASUREMENT_ID=""

# cypress.env.json
{
  "API_KEY": "",
  "PROJECT_ID": "",
  "MESSAGING_SENDER_ID": ""
}