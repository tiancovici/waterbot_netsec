MOSQUITTO=/usr/local/Cellar/mosquitto/1.4.10

CC=gcc
CFLAGS= -ggdb -I$(MOSQUITTO)/include 
LDFLAGS=$(MOSQUITTO)/lib/libmosquitto.1.4.10.dylib



all: client1 client2
	rm -f *.o

#Raspberry Pi3 Program
client1: client1.o waterpump
	$(CC) -o client1 client1.o gpio.o waterpump.o $(CFLAGS) $(LDFLAGS)

#Smartplug program
client2: client2.o
	$(CC) -o client2 client2.o $(CFLAGS) $(LDFLAGS)

waterpump: waterpump.c waterpump.h gpio
	$(CC) -c waterpump.c

gpio: gpio.c gpio.h
	$(CC) -c gpio.c

clean:
	rm -f client1 client2
