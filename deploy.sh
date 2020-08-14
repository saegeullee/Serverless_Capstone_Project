apt-get install sshpass
sshpass -p "$SSH_PASSWORD" ssh root@49.247.207.38
docker ps --filter name=client* -aq | xargs docker stop
docker run --name client-$SHA -p 80:3000 -d lemix777/capstone-client:$SHA
exit