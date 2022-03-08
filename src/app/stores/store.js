import { createContext, useContext } from "react";
import CatalogStore from "./catalogStore";
import ModalStore from "./modalStore";

export const store = {
    catalogStore: new CatalogStore(),
    modalStore: new ModalStore(),

}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}