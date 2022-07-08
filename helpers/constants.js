const regexURL = /^(https?:\/\/\w+[.\-\w]*)+(\.[a-z]{1,3})+(\/[\w\-.~:\/?#[\]@!$&'()*+,;=]*)*#?$/i;
const regexID = /^[0-9a-fA-F]{24}$/;

module.exports = { regexURL, regexID };