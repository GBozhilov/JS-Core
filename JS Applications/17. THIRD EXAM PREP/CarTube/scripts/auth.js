let auth = (() => {
    function isLoading() {
        return sessionStorage.getItem('authtoken') !== null;
    }

    function saveSession(userInfo) {
        sessionStorage.setItem('authtoken', userInfo._kmd.authtoken);
        sessionStorage.setItem('userId', userInfo._id);
        sessionStorage.setItem('username', userInfo.username);
    }

    // user/login
    function login(username, password) {
        return requester.post('user', 'login', {username, password}, 'basic');
    }

    // user/register
    function register(username, password) {
        return requester.post('user', '', {username, password}, 'basic');
    }

    // user/logout
    function logout() {
        return requester.post('user', '_logout', {authtoken: sessionStorage.getItem('authtoken')});
    }

    return {
        login,
        register,
        logout,
        saveSession,
        isLoading
    }
})();