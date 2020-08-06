export function getObjWithValues(obj) {
    const values = {};
    Object.keys(obj).forEach(key => {
        if(obj[key]) {
            values[key] = obj[key];
        }
    })
    return values;
}

export function isObjEmpty(obj){
    for(var key in obj) {
        if(obj.hasOwnProperty(key)) {
            return false;
        }
    }
    return true;
}