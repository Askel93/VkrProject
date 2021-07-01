import { api } from './util'
import { urlConstants, Filters } from '../types';

const getFilters = () => api<Filters>(
  `${urlConstants.SHIP_SERVICE}/filter/getFilters`,
  {});


export default getFilters;