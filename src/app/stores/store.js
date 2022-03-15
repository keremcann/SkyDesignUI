import { createContext, useContext } from "react";
import CatalogStore from "./catalogStore";
import CommonStore from "./commonStore";
import ModalStore from "./modalStore";
import SubCatalogDetailStore from "./subCatalogDetailStore";
import UserStore from './userStore';

export const store = {
    catalogStore: new CatalogStore(),
    modalStore: new ModalStore(),
    subCatalogDetailStore: new SubCatalogDetailStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore(),

}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}