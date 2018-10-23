function validateRequest(obj) {
    let methods = ['GET', 'POST', 'DELETE', 'CONNECT'];
    let versions = ['HTTP/0.9', 'HTTP/1.0', 'HTTP/1.1', 'HTTP/2.0'];

    if (!methods.includes(obj.method)) {
        throw new Error('Invalid request header: Invalid Method');
    }

    let uriPattern = /^[A-Za-z0-9.]+$/;

    if (!obj.uri) {
        throw new Error('Invalid request header: Invalid URI');
    }

    if (!uriPattern.test(obj.uri) && obj.uri !== '' && obj.uri !== '*') {
        throw new Error('Invalid request header: Invalid URI');
    }

    if (!versions.includes(obj.version)) {
        throw new Error('Invalid request header: Invalid Version');
    }

    let messagePattern = /^[^<>\\&"']+$/;

    if (obj.message === undefined) {
        throw new Error('Invalid request header: Invalid Message');
    }

    if (!messagePattern.test(obj.message) && obj.message !== '') {
        throw new Error('Invalid request header: Invalid Message');
    }

    return obj;
}

console.log(validateRequest({
    method: 'GET',
    uri: 'svn.public.catalog',
    version: 'HTTP/1.1',
    message: ''
}));