//=================== Inclusion =======================================//
#include <string.h>
#include <stdio.h>
#include <unistd.h>
#include "mosquitto.h"
//=================== Macros =========================================//
#define DEBUG

#define BROKER_IP "192.168.7.36"
#define PORT 1202
#define xCA_APPROACH


#define WATER_TOPIC       "act/water"
#define POWER_TOPIC       "act/power"
#define READ_POWER_TOPIC  "sense/power"

/* Configuration */
#define PUMP_WATER_DELAY 10u   //10 Seconds =
#define PUMP_WATER_DELAY_PUBLISH PUMP_WATER_DELAY + 10u

#define PW "waterbot"
#define USER "iancovici"

#define PSK_ID "psk-id"
#define PSK_KEY "6a1a247f"

#ifdef DEBUG
  #define PUMP_WATER "0"
#else
  #define PUMP_WATER "3jfir4tg"
#endif

//=================== Data Types ======================================//
typedef enum
{
 qos0_no_confirm,
 qos1_with_confirm,
 qos2_four_step_handshake
}qos_t;

typedef enum
{
  SSL_VERIFY_NONE,
  SSL_VERIFY_PEER
}ssl_verify_t;


//=================== Function Declarations ==========================//
void webApp_callbacks(void);
void webApp_message_callback(struct mosquitto *mosq, void *userdata, const struct mosquitto_message *message);
void webApp_connect_callback(struct mosquitto *mosq, void *userdata, int result);
void webApp_publish_callback(struct mosquitto *mosq, void *userdata, int mid);
void webApp_log_callback(struct mosquitto *mosq, void *userdata, int level, const char *str);
void webApp_disconnect_callback(struct mosquitto *p_mosq, void *userdata, int level);
//=================== Internal Data ==================================//
void simWattMeter(unsigned long int* val);

struct mosquitto *p_mosq;


int main(int argc, char *argv[])
{
  unsigned long int mWatts = 10;  /* Power Sensor state variable */
  char msg[8] = {};                    /* Message to send */
  int status;

  mosquitto_lib_init();
  
  /* Instantiate */
  p_mosq = mosquitto_new("WebApp",  /* Id */
                                 true,  /* instruct broker to clean all messages */
                                 NULL); /* no pointer to callbacks */
  
  #ifdef CA_APPROACH
  /* Setup Secure Comm. */
  mosquitto_tls_set(p_mosq, 
            // CA filepath,  path to CA directory, client certiciate filepath, client key filepath, Password Callback
						"./certs/ca.crt",	
            "./certs", 
            "./certs/client2.crt", 
            "./certs/client2.key", 
            NULL);
#else
mosquitto_tls_psk_set(p_mosq, PSK_KEY, PSK_ID, NULL);
#endif
  // Advanced SSL/TLS Options
  /* Mosquitto instance, Verification Requirements, TLS Version, Cipher */
  mosquitto_tls_opts_set(p_mosq, SSL_VERIFY_PEER, "tlsv1.2", NULL);

  /* Setup callbacks for smartPlug client */
  webApp_callbacks();

  // User/Password
  mosquitto_username_pw_set(p_mosq, USER, PW);


  status = mosquitto_connect(p_mosq,   BROKER_IP,       PORT,    10);

  if(status)
  {
    fprintf(stderr, "Unable to connect: %d \n", status);
    return 1;
  }
  else
  {
    sleep(2);
  }

#if 0
  /* Program */
  while(1)
  {
    snprintf(msg, 8, "%lu", mWatts);

    /* Pointer to Mosquttio instance,  , Topic, message length, message buffer, QoS, don't retain*/
    mosquitto_publish( p_mosq, NULL, "sensor/power",8, &msg, qos1_with_confirm, false);           

    simWattMeter(&mWatts);	  /* Fake wattage meter*/
    sleep(1);
  }
#endif


// while(1)
// {
//    if(argc == 2)
//    {
      memcpy(msg, PUMP_WATER, sizeof(PUMP_WATER));
      status = mosquitto_publish( p_mosq, NULL, WATER_TOPIC,sizeof(PUMP_WATER), &msg, qos0_no_confirm, false);   
      printf("Publish state: %s\n", mosquitto_strerror(status));
      sleep(1);
//      memcpy(msg, PUMP_WATER, sizeof(PUMP_WATER));
//      status = mosquitto_publish( p_mosq, NULL, WATER_TOPIC, 8, &msg, qos1_with_confirm, false);      
//      printf("Publish state: %s\n", mosquitto_strerror(status));
//      sleep(10);
//        memcpy(msg, PUMP_WATER, sizeof(PUMP_WATER));
//      status = mosquitto_publish( p_mosq, NULL, WATER_TOPIC, 8, &msg, qos1_with_confirm, false);      
//      printf("Publish state: %s\n", mosquitto_strerror(status));
//     sleep(10);
//    }
// }

	mosquitto_lib_cleanup();

  return 0;
}
//============== Auxillary Functions ===================
void webApp_callbacks(void)
{
  mosquitto_log_callback_set(p_mosq, webApp_log_callback);
  mosquitto_connect_callback_set(p_mosq, webApp_connect_callback);
  mosquitto_message_callback_set(p_mosq, webApp_message_callback);
  mosquitto_publish_callback_set(p_mosq, webApp_publish_callback);
}

//============== callback ===================
void webApp_publish_callback(struct mosquitto *mosq, void *userdata, int mid)
{
    //printf("Sent mWatts via topic: sensor/power");
}

void webApp_message_callback(struct mosquitto *mosq, void *userdata, const struct mosquitto_message *message)
{
  if(message->payloadlen){
    printf("%s %s\n", message->topic, message->payload);
  }else{
    printf("%s (null)\n", message->topic);
  }
  //fflush(stdout);
}
void webApp_connect_callback(struct mosquitto *mosq, void *userdata, int result)
{
  int i;
  if(!result){
    mosquitto_subscribe(mosq, NULL, "$SYS/#", 2);
  }else{
    fprintf(stderr, "Connect failed\n");
  }
}

void webApp_log_callback(struct mosquitto *mosq, void *userdata, int level, const char *str)
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
