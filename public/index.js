axios.defaults.headers.common['authentication'] = localStorage.getItem('token')

const checkLogin = async ()=>{
    const token = localStorage.getItem('token');
    console.log(token)
    if(!token){
        document.location='/user/login'
    }
    const res = await axios.get('/auth');
    if (res.status==202){
        document.location='/user/login'
    }
}
checkLogin()