This folder is for when you need to setup a google cloud web development server. You don't need to do this if your computer is strong enough to handle setting up multiple pods running on it. If you have an older computer this section will probably help you. However, it does cost to setup a dev environment. You get $300 free with google when you associate a credit card. However there is no guarantee that you don't mess something up and end up incurring charges. Use at your own risk

1. Your Kubernetes cluster node is going to be run on Google's Cloud VM. It will run the cluster of pods. Skaffold allows us to set up everything on google cloud almost effortlessly. It was invented by a team at Google which is why we use Google Cloud instead of AWS. It has a tight integration with Google Cloud because of this. 

2. We will make a change in our skaffold.yaml file to point to Google Cloud VM. This means that any changes made to our files get synced up to Google Cloud thanks to Skaffold. A rebuild will happen if something happens to an unsynced file (think package.json file), skaffold reaches out to the Google Cloud Build service in Google Cloud that will build the docker image for us. Then that rebuilt image gets sent to the Google Cloud VM. 


