// import { makeAutoObservable } from "mobx";

import { makeObservable, observable } from "mobx";

export default class BaseCRUDStore {
    updateModalOpen = false;
    addModalOpen = false;
    deleteModalOpen = false;


    constructor() {
        makeObservable(this, {
            updateModalOpen: observable,
            addModalOpen: observable,
            deleteModalOpen: observable
        })
    }

    toggleAddModal = () => {
        this.addModalOpen = !this.addModalOpen;
    }

    toggleUpdateModal = () => {
        this.updateModalOpen = !this.updateModalOpen;
    }

    toggleDeleteModal = () => {
        this.deleteModalOpen = !this.deleteModalOpen;
    }
}