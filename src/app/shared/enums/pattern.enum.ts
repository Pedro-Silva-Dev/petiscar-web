export enum PATTERN {
  NUMBER_ONLY = '/\d+/g', //Apenas numeros
  REMOVE_NUMBER = '/[^0-9]/g', //Para remover characters que não sejam numeros.
  DECIMAL_ONLY = '/^\d+\.?\d{1,2}$/g', //Apenas numeros com casa decimais com ponto (.)
}