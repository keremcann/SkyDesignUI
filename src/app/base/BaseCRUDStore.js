// import { makeAutoObservable } from "mobx";

import { makeObservable, observable, runInAction } from "mobx";

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
        runInAction(() => {
            this.addModalOpen = !this.addModalOpen;
        })
    }

    toggleUpdateModal = () => {
        runInAction(() => {
            this.updateModalOpen = !this.updateModalOpen;
        })
    }

    toggleDeleteModal = () => {
        runInAction(() => {
            this.deleteModalOpen = !this.deleteModalOpen;
        })
    }
}