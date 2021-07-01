import { FilterReducer, Filters, FilterState } from '../types';

const initState = (): FilterState => {
  const initFiltersString = sessionStorage.getItem("initfilters");
  if (initFiltersString) {
    const { filters } = JSON.parse(initFiltersString);
    return filters
  }
  return null;
}

const filterReducer: FilterReducer = (state = initState(), action) => {
  if (action.type === 'INIT_FILTERS') {
    sessionStorage.setItem("initfilters", JSON.stringify({ filters: action.payload }))
    return action.payload as Filters;
  }
  return state;
}

export default filterReducer;