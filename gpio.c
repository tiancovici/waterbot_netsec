#include "gpio.h"

#include <stdio.h>

void gpio_export(u8_t idx)
{
   printf("echo \"%d\" > /sys/class/gpio/unexport \n", idx);
}

void gpio_unexport(u8_t idx)
{
   printf("echo \"%d\" > /sys/class/gpio/export \n", idx);
}

void gpio_dir(u8_t idx, u8_t dir)
{
   if(dir == 0)
      printf("echo \"out\" > /sys/class/gpio%d/direction \n", idx);
   else if (dir == 1)
      printf("echo \"in\" > /sys/class/gpio%d/direction \n", idx);
}

void gpio_set(u8_t idx, u8_t lvl)
{
   printf("echo \"%d\" > /sys/class/gpio%d/value \n", lvl, idx);
} 