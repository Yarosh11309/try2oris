(function(){
    const ADMIN_USER = {email: 'admin', password: 'admin', role: 'admin'};

    function loadUsers(){
        let users = JSON.parse(localStorage.getItem('users') || '[]');
        if(!users.find(u => u.email === ADMIN_USER.email)){
            users.push(ADMIN_USER);
            localStorage.setItem('users', JSON.stringify(users));
        }
        return users;
    }
    window.auth = {
        loadUsers,
        register(email,password){
            const users = loadUsers();
            if(users.find(u => u.email === email)) return false;
            users.push({email,password,role:'пользователь'});
            localStorage.setItem('users', JSON.stringify(users));
            return true;
        },
        login(email,password){
            const users = loadUsers();
            const user = users.find(u => u.email === email && u.password === password);
            if(user){
                localStorage.setItem('currentUser', JSON.stringify(user));
                return user;
            }
            return null;
        },
        current(){
            try{ return JSON.parse(localStorage.getItem('currentUser')); }catch(e){return null;}
        },
        logout(){
            localStorage.removeItem('currentUser');
        },
        isAdmin(){
            const u = this.current();
            return u && u.role === 'admin';
        }
    };
})();
