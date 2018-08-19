import profileLogic from './profileLogic'

class SharingLogic {

    getUsersItemIsSharedWith(item) {
        return (item.ownerIds || [])
            .filter(uId => uId !== profileLogic.getCurrentUserId())
            .map(uId => profileLogic.findFriendById(uId))
    }

    getUsersItemIsSharedWithDesc(item) {
        return this.getUsersItemIsSharedWith(item)
            .map(u => u.firstName)
            .join(", ")
    }

    getAllFriends() {
        return profileLogic.getProfile().friends;
    }
}

const SHARING_LOGIC = new SharingLogic();

export default SHARING_LOGIC;