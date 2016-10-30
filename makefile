MOSQUITTO=/usr/local/Cellar/mosquitto/1.4.10

CC=gcc
CFLAGS= -ggdb -I$(MOSQUITTO)/include 
LDFLAGS=$(MOSQUITTO)/lib/libmosquitto.1.4.10.dylib



all: client1 client2
	rm -f *.o


client1: client1.o
	$(CC) -o client1 client1.o $(CFLAGS) $(LDFLAGS)

client2: client2.o
	$(CC) -o client2 client2.o $(CFLAGS) $(LDFLAGS)

clean:
	rm -f client1 client2
