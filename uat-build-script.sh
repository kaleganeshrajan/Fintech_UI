#!/bin/bash  
npm run uat-build
zip -r uat-build.zip www
scp -i  /home/ramratan/Desktop/AlkemAppKey.pem uat-build.zip  ubuntu@3.6.254.33:~/
rm -rf uat-build.zip
ssh -i /home/ramratan/Desktop/AlkemAppKey.pem ubuntu@3.6.254.33
ls -lah  
echo "build script completed"