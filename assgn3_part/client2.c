#include <string.h>
#include <stdio.h>
#include <unistd.h>
#include "mosquitto.h"

#define BROKER_IP "192.168.7.36"
//#define BROKER_IP "localhost"
#define PORT 1202

typedef enum
{
 qos0_no_confirm,
 qos1_with_confirm,
 qos2_four_step_handshake

}qos_t;

void smartPlug_message_callback(struct mosquitto *mosq, void *userdata, const struct mosquitto_message *message);
void smartPlug_connect_callback(struct mosquitto *mosq, void *userdata, int result);
void smartPlug_publish_callback(struct mosquitto *mosq, void *userdata, int mid);
void smartPlug_log_callback(struct mosquitto *mosq, void *userdata, int level, const char *str);
void smartPlug_disconnect_callback(struct mosquitto *p_mosq, void *userdata, int level);

void simWattMeter(unsigned long int* val);

int main(void)
{
  unsigned long int mWatts = 10;  /* Power Sensor state variable */
  char msg[8];                    /* Message to send */

  memset(msg, 0, sizeof(msg));    /* Clear message */

  struct mosquitto *p_mosq;

  //mosquitto_lib_init();
  /* Instantiate */
  p_mosq = mosquitto_new("SmartPlug",  /* Id */
                                 true,  /* instruct broker to clean all messages */
                                 NULL); /* no pointer to callbacks */
  	

  /* Initialize*/
  mosquitto_log_callback_set(p_mosq, smartPlug_log_callback);
  mosquitto_connect_callback_set(p_mosq, smartPlug_connect_callback);
  mosquitto_message_callback_set(p_mosq, smartPlug_message_callback);
  mosquitto_publish_callback_set(p_mosq, smartPlug_publish_callback);
  if(mosquitto_connect(p_mosq,   /* mosquitto pointer */ 
                 BROKER_IP,   /* Broker IP Address */
                      PORT,   /* Broker Port       */
                         5))  /* Ping every 5 seconds */
  {
    fprintf(stderr, "Unable to connect.\n");
    return 1;
  }


  /* Program */
  while(1)
  {
    snprintf(msg, 8, "%lu", mWatts);
    mosquitto_publish( p_mosq, 
            					   NULL, 
            					 "sensor/power",    /* Topic */
            					 8,                 /* Payload length */
                       &msg,              /* Message array */
                       qos1_with_confirm, /* QoS 0*/
                       false);            /* Don't retain */

    simWattMeter(&mWatts);	  /* Fake wattage meter*/
    sleep(1);
  }

  return 0;
}


//============== callback ===================
void smartPlug_publish_callback(struct mosquitto *mosq, void *userdata, int mid)
{
    printf("Sent mWatts via topic: sensor/power");
}

void smartPlug_message_callback(struct mosquitto *mosq, void *userdata, const struct mosquitto_message *message)
{
  if(message->payloadlen){
    printf("%s %s\n", message->topic, message->payload);
  }else{
    printf("%s (null)\n", message->topic);
  }
  //fflush(stdout);
}
void smartPlug_connect_callback(struct mosquitto *mosq, void *userdata, int result)
{
  int i;
  if(!result){
    mosquitto_subscribe(mosq, NULL, "$SYS/#", 2);
  }else{
    fprintf(stderr, "Connect failed\n");
  }
}

void smartPlug_log_callback(struct mosquitto *mosq, void *userdata, int level, const char *str)
{
    /* Pring all log messages regardless of level. */
  printf("%s\n", str);
}
void rpi3_disconnect_callback(struct mosquitto *p_mosq, void *userdata, int level)
{
  mosquitto_connect(p_mosq,   /* mosquitto pointer */ 
                 BROKER_IP,   /* Broker IP Address */
                      PORT,   /* Broker Port */
                         5);  /* Ping every 5 seconds */
}
//=============================================



void simWattMeter(unsigned long int* val)
{
  *val += 1;
}