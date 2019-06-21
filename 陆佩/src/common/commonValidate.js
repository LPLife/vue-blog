export function isNotEmpty(s) {
    return !/^\s*$/.test(s);
}
export function isChinese(s) {
    return /^[\u4e00-\u9fa5]+$/.test(s);
}