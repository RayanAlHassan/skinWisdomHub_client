import create from 'zustand';

const useFilterStore = create((set) => ({
  filterData: {},
  setFilterData: (filterData) => set({ filterData }),
}));

export default useFilterStore;