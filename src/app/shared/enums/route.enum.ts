export enum ROUTE {
  INDEX = '',
  AUTH = 'auth',
  PRODUCT = 'produtos',
  PRODUCT_DETAIL = `${PRODUCT}/{id}/detalhes`,
  CATEGORY = 'categorias',
  CATEGORY_DETAIL = `${CATEGORY}/:id/detalhes`,
  PROMOTION = 'promocoes',

}