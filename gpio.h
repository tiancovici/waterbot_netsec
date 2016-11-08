
#include <string.h>

typedef unsigned char u8_t;
typedef unsigned short int u16_t;

void gpio_export(u8_t idx);
void gpio_dir(u8_t idx, u8_t dir);
void gpio_set(u8_t idx, u8_t lvl);