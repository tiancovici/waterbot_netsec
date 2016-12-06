#include "gpio.h"
#include <stdlib.h>
#include <stdio.h>


char buf[70];

void gpio_export(u8_t idx)
{
   snprintf(buf, sizeof(buf), "echo %d > /sys/class/gpio/export \n", idx);
   //printf("%s", buf);
   system(buf);
}

void gpio_unexport(u8_t idx)
{
   snprintf(buf, sizeof(buf), "echo %d > /sys/class/gpio/unexport \n", idx);
   //printf("%s", buf);
   system(buf);
}

void gpio_dir(u8_t idx, u8_t dir)
{
   if(dir == 0)
      snprintf(buf, sizeof(buf), "echo out > /sys/class/gpio/gpio%d/direction \n", idx);
   else if (dir == 1)
      snprintf(buf, sizeof(buf), "echo in > /sys/class/gpio/gpio%d/direction \n", idx);

   //printf("%s", buf);
   system(buf);
}

void gpio_set(u8_t idx, u8_t lvl)
{
   snprintf(buf, sizeof(buf), "echo %d > /sys/class/gpio/gpio%d/value \n", lvl, idx);
   //printf("%s", buf);
   system(buf);
} 