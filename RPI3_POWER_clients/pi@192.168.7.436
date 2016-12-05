import paho.mqtt.client as mqtt
import telnetlib

def light_on():
	tel.write("ledctl LED POWER ON \n ")
	print "Light On!"

def light_off():
	tel.write("ledctl LED POWER OFF \n ")
	print "Light Off!"

def on_connect(client, userdata, rc):
    print("Connected with result code "+str(rc))
    client.subscribe("light_ctrl")

def on_message(client, userdata, msg):
	#print "Hello!"
	if (msg.topic == "light_ctrl"):
		if (msg.payload == "0"):
			light_off()
		elif (msg.payload == "1"):
			light_on()
		else:
			print "Right Topic Wrong Msg: " + msg.payload
	else:
		print "Wrong Topic: " + msg.topic

tel = telnetlib.Telnet("10.0.0.14", 1355)
client = mqtt.Client()
client.on_message = on_message
client.on_connect = on_connect
client.connect("localhost", 1883)
client.loop_forever()