## Waterbot

NodeJS Server and mqtt client executed on desktop/laptop or raspberry pi <br/>
client1 executed on raspberry pi <br/>
switchmqtt executed on raspberry pi<br/>
## Code Example for server (root direcotry)
npm install
npm start (or npm run dev)

## Code Example for pi
copy RPI3_POWER_clients to pi <br />
scp -r RPI3_POWER_clients pi@[ip address]:~ <br />
ssh pi@[ip address] <br />
cd RPI3_POWER_clients <br />
make <br />
./client1


ssh pi@[ip address] <br />
cd RPI3_POWER_clients <br />
make <br />
./client1

python switchmqtt.py

## Extra Hardware: Waterpump driver
Bridge Driver