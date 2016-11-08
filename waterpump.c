#include "waterpump.h"

#define MUX_1 20
#define MUX_2 21

void water_init(void)
{
  gpio_export(MUX_1);   /* Mux input 1*/
  gpio_export(MUX_2);   /* Mux input 2*/
  /* Set as output */
  gpio_dir(MUX_1, 0);   
  gpio_dir(MUX_2, 0);
}

void water_forward(void)
{
  gpio_set(MUX_1, 1);   
  gpio_set(MUX_2, 0);
}

void water_back(void)
{
  gpio_set(MUX_1, 0);   
  gpio_set(MUX_2, 1);
}

void water_break(void)
{
  gpio_set(MUX_1, 1);   
  gpio_set(MUX_2, 1);
}


void water_stop(void)
{
  gpio_set(MUX_1, 0);   
  gpio_set(MUX_2, 0);
}