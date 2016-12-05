## Waterbot

NodeJS Server and mqtt client executed on desktop/laptop or raspberry pi 
client1 executed on raspberry pi
## Code Example for server (root direcotry)

npm start

## Code Example for pi
copy RPI3_POWER_clients to pi
scp -r RPI3_POWER_clients pi@[ip address]:~
ssh pi@[ip address]
cd RPI3_POWER_clients
make
./client1
