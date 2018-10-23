let auth = (() => {
    function isLoading() {
        return sessionStorage.getItem('authtoken') !== null;
    }

    function saveSession(userInfo) {
        sessionStorage.setItem('authtoken', userInfo._kmd.authtoken);
        sessionStorage.setItem('userId', userInfo._id);
        sessionStorage.setItem('username', userInfo.username);
        sessionStorage.setItem('email', userInfo.email);
        sessionStorage.setItem('avatarUrl', userInfo.avatarUrl);
    }

    // user/login
    function login(username, password) {
        return requester.post('user', 'login', {username, password}, 'basic');
    }

    // user/register
    function register(username, password, email, avatarUrl) {
        let userDetails = {username, password, email, avatarUrl};
        return requester.post('user', '', userDetails, 'basic');
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