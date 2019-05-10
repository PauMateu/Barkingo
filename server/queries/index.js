const { createUser,
    loginUser,
    renewGoogleToken,
    renewFacebookToken,
    user } = require('./login_register');

const { currentUser,
    getUser,
    createProfile,
    updateUser,
    getUserImage,
    createUserImage } = require('./users');

const { getOffers,
    createOffer,
    offerDetails,
    updateOffer,
    swipe,
    deleteOffer,
    //eliminateOffer,
    myOffers,
    favourites,
    unfavourite,
    getImage,
    uploadImage,
    deleteSeenOffers,
    racesList } = require('./offers');

const { getChats,
    createChat,
    deleteChat } = require('./chat');

module.exports = {
    //LOGIN_REGISTER
    createUser,
    loginUser,
    renewGoogleToken,
    renewFacebookToken,
    user,
    //USERS
    currentUser,
    getUser,
    createProfile,
    updateUser,
    getUserImage,
    createUserImage,
    //OFFERS
    getOffers,
    createOffer,
    offerDetails,
    updateOffer,
    swipe,
    deleteOffer,
    //eliminateOffer,
    myOffers,
    favourites,
    unfavourite,
    getImage,
    uploadImage,
    deleteSeenOffers,
    racesList,
    //CHAT
    getChats,
    createChat,
    deleteChat
};