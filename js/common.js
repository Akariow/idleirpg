export function v(attribute) {
    if (typeof attribute === 'function') {
        return attribute()
    } else {
        return attribute;
    }
}