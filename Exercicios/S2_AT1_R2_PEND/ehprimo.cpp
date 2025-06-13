#include <stdio.h>
#include <stdlib.h>
#include <string.h>

bool isPrime(long int numero){
    if (numero == 1 || numero == 2) {
        return true; // Se for 1 ou 2 retorna TRUE
      } else if (numero % 2) {
        for (int i = 3; i < numero; i += 2) {
          if (!(numero % i)) return false;
        }
        return true;
      } else {
        return false; // Se o número for par retorna FALSE
      }
}

unsigned int strToInt(char texto[]){
    if(texto==""){
        return 0;
    } else {
        return 1000;
    }
}

int main(int argc, char *argv[])
{
  printf("Qtde de argumentos: %d\n", argc);
  printf("Comando: %s\n", argv[0]);
  unsigned int numero = 0;
  if(argc>1) {
      // Imprime os argumentos
      printf("Argumentos: ");
      for(int i=1; i<argc; i++) {
        printf("%s ", argv[i]);
      }
      printf("\n");
      printf("%d\n", atoi(argv[1]));

      long int numero = atoi(argv[1]);

      if(numero != 0) {
          for(int i=1; i<=numero; i++){
              if(isPrime(i)) printf("%d ",i);
            }
            printf("\n");
        } else {
            printf("Argumento inválido");
      }
    }
    return 0;
}