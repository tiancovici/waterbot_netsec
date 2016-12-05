//=================== Inclusion =======================================//
#include <string.h>
#include <stdio.h>
#include <unistd.h>

#include <mosquitto.h>

#include "gpio.h"
#include "waterpump.h"
//=================== Macros =========================================//
#define xVERBOSE
#define DEBUG

//#define BROKER_IP "192.168.7.36"
#define BROKER_IP "192.168.1.134"
#define PORT 1202

#define CA_APPROACH



#define WATER_TOPIC       "act/water"   // WebApp to RPI3 Controller
#define POWER_TOPIC       "act/power"   // RPI3 to SmartPlug
#define READ_POWER_TOPIC  "sense/power" // SmartPlug to RPI3


/* Configuration */
#define PUMP_WATER_DELAY 10u   //10 Seconds =
#define PUMP_WATER_DELAY_PUBLISH PUMP_WATER_DELAY + 15u

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
void rpi3_callbacks(void);
void rpi3_message_callback(struct mosquitto *mosq, void *userdata, const struct mosquitto_message *message);
void rpi3_connect_callback(struct mosquitto *mosq, void *userdata, int result);
void rpi3_subscribe_callback(struct mosquitto *mosq, void *userdata, int mid, int qos_count, const int *granted_qos);
void rpi3_log_callback(struct mosquitto *mosq, void *userdata, int level, const char *str);
void rpi3_disconnect_callback(struct mosquitto *p_mosq, void *userdata, int level);


//=================== Internal Data ==================================//
struct mosquitto *p_mosq;

#ifdef DEBUG
  unsigned long int mWatts = 10;  /* Power Sensor state variable */
#endif
//=================== Function Definitions ===========================//

//  Purpose: Control Waterpumps, Light. Process commands from client2,
//           and return information back to client2
//    - Instantiate a mosquitto node
//                                 Topics
//    - Actuate: Water pumps      act/water
//               Power            act/power
//    - Sense: Power Consumption  sense/power
//
//
int main(void)
{
  int status;

  mosquitto_lib_init();

  p_mosq = mosquitto_new("RPI3",  /* Id */
                                 true,  /* instruct broker to clean all messages */
                                 NULL); /* no pointer to callbacks */
  


#ifdef CA_APPROACH
  /* Setup Secure Comm. */
  mosquitto_tls_set(p_mosq, 
            // CA filepath,  path to CA directory, client certiciate filepath, client key filepath, Password Callback
						"/home/pi/mqtt_proj/certs/ca.crt",	
            "/home/pi/mqtt_proj/certs", 
            "/home/pi/mqtt_proj/certs/client1.crt", 
            "/home/pi/mqtt_proj/certs/client1.key", 
            NULL);
#endif

#ifdef PSK_APPROACH
mosquitto_tls_psk_set(p_mosq, PSK_KEY, PSK_ID, NULL);
#endif
  // Advanced SSL/TLS Options
  /* Mosquitto instance, Verification Requirements, TLS Version, Cipher */
  mosquitto_tls_opts_set(p_mosq, SSL_VERIFY_PEER, "tlsv1.2", NULL);

  /* Setup callbacks for RPI3 client */
  rpi3_callbacks();

  // User/Password
  mosquitto_username_pw_set(p_mosq, USER, PW);
  //Setup Pre-Shared-Key


  // Connect
  /* Mosquitto instance, Broker IP Address, Broker Port,  Ping every 5 seconds*/
  status = mosquitto_connect(p_mosq,   BROKER_IP,       PORT,    10);
  if(status)
  {
    fprintf(stderr, "Unable to connect: %s \n", mosquitto_strerror(status));
    return 1;
  }

  //Subscribe to topic sensor/power
  /* Mosquitto instance, Sequencer value, Topic Name ,  Quality of Service */
  status = mosquitto_subscribe(p_mosq, NULL, WATER_TOPIC, qos0_no_confirm);
  if(status)
  {
    fprintf(stderr, "Unable to subscribe: %s \n", mosquitto_strerror(status));
  }

  gpio_export(26u);
 

  /* Initialize water pumps */
  water_init();
  //water_forward();
  //water_stop();

  return  mosquitto_loop_forever(p_mosq, 1000, 1000 /* unused */);
}

//============== Auxillary Functions ===================
void rpi3_callbacks(void)
{
  mosquitto_log_callback_set(p_mosq, rpi3_log_callback);
  mosquitto_connect_callback_set(p_mosq, rpi3_connect_callback);
  mosquitto_message_callback_set(p_mosq, rpi3_message_callback);
  mosquitto_subscribe_callback_set(p_mosq, rpi3_subscribe_callback);
  mosquitto_disconnect_callback_set(p_mosq, rpi3_disconnect_callback);
}

//============== callback ===================
void rpi3_subscribe_callback(struct mosquitto *mosq, void *userdata, int mid, int qos_count, const int *granted_qos)
{
#ifdef VERBOSE
  int i;

  printf("Subscribed (mid: %d): %d", mid, granted_qos[0]);
  for(i=1; i<qos_count; i++){
    printf(", %d", granted_qos[i]);
  }
  printf("\n");
#endif
}

void rpi3_message_callback(struct mosquitto *mosq, void *userdata, const struct mosquitto_message *message)
{
  if(message->payloadlen){
    printf("%s %s\n", message->topic, message->payload);

    if(strcmp(message->topic,WATER_TOPIC) == 0u)
    {
      if(strcmp(message->payload, PUMP_WATER) == 0u)
      {
        
        water_forward();
        sleep(PUMP_WATER_DELAY);
        water_stop();
      }
    }


  }else{
    printf("%s (null)\n", message->topic);
  }
  fflush(stdout);
}
void rpi3_connect_callback(struct mosquitto *mosq, void *userdata, int result)
{
  int i;
  if(!result){
    mosquitto_subscribe(p_mosq, NULL, "sensor/power", qos0_no_confirm);
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
