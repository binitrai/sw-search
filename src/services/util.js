import {
    REQ_LIMIT,
    REQ_TIME,
    ALLOWED_USER
} from "./constants"
const getExpDate = (expiresIn) => {
    return new Date(new Date().getTime() + expiresIn * 1000);
}

const getId = url => {
    let parts = url.split("/");
    return parts[parts.length -2];
}

var reqLimit =  userId => {
    userId = userId || localStorage.getItem("userId");
    if (userId === ALLOWED_USER) {
        console.log("allowedUser");
        return true;
    }
    const preFix = "USER_REQ_";
    let key = preFix + userId;
    let userDetail = localStorage.getItem(key);
    if (userDetail) {
        userDetail = JSON.parse(userDetail);
        if (userDetail.count >= REQ_LIMIT) {
            
            let diff = timeDifference(userDetail.reqTime);
            if (diff < REQ_TIME) {
                return false;
            } else {
                userDetail.count = 1;
                userDetail.reqTime = new Date().getTime();
                localStorage.setItem(key, JSON.stringify(userDetail)); 
            }
        } else {
            userDetail.count += 1;
            localStorage.setItem(key, JSON.stringify(userDetail));
        }
    } else {
        let detail = {
            id : userId,
            reqTime : new Date().getTime(),
            count : 1 
        }
        localStorage.setItem(key, JSON.stringify(detail));
    }
    return true;
}

const timeDifference = (prev, now = new Date()) => {
    prev = new Date(prev);
    let timeDiff = Math.abs(prev.getTime() - now.getTime()); 
    return Math.ceil(timeDiff / 1000);
}

export {
    getExpDate,
    getId,
    reqLimit
}