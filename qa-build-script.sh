#!/bin/bash  
days="$(date +"%Y%m%d_%H%M")"
npm run qa-build
zip -r qa-build.zip www
scp -i  /home/ramratan/Desktop/AlkemAppKey.pem qa-build.zip  ubuntu@3.6.254.33:~/
rm -rf qa-build.zip
ssh -i /home/ramratan/Desktop/AlkemAppKey.pem ubuntu@3.6.254.33
ls -lah  
echo "build script completed"  
