import profileLogic from './profileLogic'

class SharingLogic {

    getUsersItemIsSharedWith(item) {
        return (item.ownerIds || [])
            .filter(uId => uId !== profileLogic.getCurrentUserId())
            .map(uId => profileLogic.findFriendById(uId))
    }

    getUsersItemIsSharedWithDescShort(item) {
        return this.getUsersItemIsSharedWith(item)
            .map(u => u.firstName)
            .join(", ")
    }

    getUsersItemIsSharedWithDescFull(item) {
        return this.getUsersItemIsSharedWith(item)
            .map(u => u.fullName)
            .join(", ")
    }


    getAllFriends() {
        return profileLogic.getProfile().friends;
    }
}

const SHARING_LOGIC = new SharingLogic();

export default SHARING_LOGIC;