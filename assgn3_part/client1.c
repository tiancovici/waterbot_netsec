#include <string.h>
#include <stdio.h>
#include <mosquitto.h>

#define BROKER_IP "localhost"
#define PORT 1202

typedef enum
{
 qos0_no_confirm,
 qos1_with_confirm,
 qos2_four_step_handshake

}qos_t;

void rpi3_message_callback(struct mosquitto *mosq, void *userdata, const struct mosquitto_message *message);
void rpi3_connect_callback(struct mosquitto *mosq, void *userdata, int result);
void rpi3_subscribe_callback(struct mosquitto *mosq, void *userdata, int mid, int qos_count, const int *granted_qos);
void rpi3_log_callback(struct mosquitto *mosq, void *userdata, int level, const char *str);
void rpi3_disconnect_callback(struct mosquitto *p_mosq, void *userdata, int level);

int main(void)
{
  unsigned long int mWatts = 10;  /* Power Sensor state variable */
  char msg[8];                    /* Message to send */
  struct mosquitto *p_mosq;

  memset(msg, 0, sizeof(msg));    /* Clear message */

  //mosquitto_lib_init();
  p_mosq = mosquitto_new("rpi3",  /* Id */
                                 true,  /* instruct broker to clean all messages */
                                 NULL); /* no pointer to callbacks */
    
  mosquitto_log_callback_set(p_mosq, rpi3_log_callback);
  mosquitto_connect_callback_set(p_mosq, rpi3_connect_callback);
  mosquitto_message_callback_set(p_mosq, rpi3_message_callback);
  mosquitto_subscribe_callback_set(p_mosq, rpi3_subscribe_callback);
  mosquitto_disconnect_callback_set(p_mosq, rpi3_disconnect_callback);

  if(mosquitto_connect(p_mosq,   /* mosquitto pointer */ 
                 BROKER_IP,   /* Broker IP Address */
                      PORT,   /* Broker Port */
                         5))   /* Ping every 5 seconds */
  {
    fprintf(stderr, "Unable to connect.\n");
    return 1;
  }

  mosquitto_subscribe(p_mosq,
                      NULL,
                      "sensor/power",
                      qos0_no_confirm);

  return  mosquitto_loop_forever(p_mosq, 1000, 1000 /* unused */);
}


void rpi3_subscribe_callback(struct mosquitto *mosq, void *userdata, int mid, int qos_count, const int *granted_qos)
{
  int i;

  printf("Subscribed (mid: %d): %d", mid, granted_qos[0]);
  for(i=1; i<qos_count; i++){
    printf(", %d", granted_qos[i]);
  }
  printf("\n");
}

void rpi3_message_callback(struct mosquitto *mosq, void *userdata, const struct mosquitto_message *message)
{
  if(message->payloadlen){
    printf("%s %s\n", message->topic, message->payload);
  }else{
    printf("%s (null)\n", message->topic);
  }
  //fflush(stdout);
}
void rpi3_connect_callback(struct mosquitto *mosq, void *userdata, int result)
{
  int i;
  if(!result){
    mosquitto_subscribe(mosq, NULL, "$SYS/#", 2);
  }else{
    fprintf(stderr, "Connect failed\n");
  }
}

void rpi3_log_callback(struct mosquitto *mosq, void *userdata, int level, const char *str)
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