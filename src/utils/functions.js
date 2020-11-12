import {
    twitterReg,
    facebookReg,
    instagramReg,
    blogReg,
    youtubeReg,
    soundcloudReg,
} from './variablesAndRegs.js';

export const getUnreadElements = elements => {
    if(elements.length === 0) return [];
    return elements.filter(element => element.isRead === false);
}

export const getUnreadElementsLength = elements => {
    if(elements.length === 0) return 0;
    return elements.filter(element => element.isRead === false).length;
}

export const getDateKor = dateformat => { 
    return `${dateformat.substring(0, 4)}년 ${dateformat.substring(5, 7)}월 ${dateformat.substring(8, 10)}일`;
}

export const getPrivateChannel = (curPrivateChats, fromUser, toUser) => {
    if (curPrivateChats.length === 0) return [];
    else{
        return curPrivateChats.filter(channel => (
            (channel.members[0].user === fromUser._id && channel.members[1].user === toUser._id)
            || (channel.members[1].user === fromUser._id && channel.members[0].user === toUser._id)
        ))
    }
}

//check is valid sns link
export const checkSnsLink = (type, link) => {
    switch(type) {
        case 'youtube':
            return youtubeReg.test(link);
        case 'twitter':
            return twitterReg.test(link);
        case 'instagram':
            return instagramReg.test(link);
        case 'soundcloud':
            return soundcloudReg.test(link);
        case 'facebook':
            return facebookReg.test(link);
        default:
            return blogReg.test(link);
    }
}