import { createContext, useContext } from "react";
import CatalogStore from "./catalogStore";
import ModalStore from "./modalStore";
import SubCatalogDetailStore from "./subCatalogDetailStore";

export const store = {
    catalogStore: new CatalogStore(),
    modalStore: new ModalStore(),
    subCatalogDetailStore: new SubCatalogDetailStore(),
    
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}