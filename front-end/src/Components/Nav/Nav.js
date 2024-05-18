//Nav
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Nav.module.css'; // Import the CSS module

const Nav = () => {
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate('/signup');
    };

    return (
        <div className={styles.Nav}>

            {auth ?
                <ul className={styles['nav-ul']}>
                    <li><Link to='/'>Product</Link></li>
                    <li><Link to='/add'>Add product</Link></li>
                    {/* <li><Link to='/update'>Update product</Link></li> */}
                    <Link to='/profile'><img alt="logo" className={styles.logo} src="https://yt3.googleusercontent.com/ytc/AIdro_lpwLOOTumlQiiMYMHbBgJfQXVyRBGrZdTZ6NbtY-YA8wg=s176-c-k-c0x00ffffff-no-rj" /></Link>
                    <li><Link to='/profile'>{JSON.parse(auth).name}</Link></li>
                    <li><Link onClick={logout} to='/login'>Logout</Link></li>
                </ul>
                :
                <ul className={`${styles['nav-ul']} ${styles['nav-right']}`}>
                    <li><Link to='/signup'>SignUp</Link></li>
                    <li><Link to='/login'>Login</Link></li>


                </ul>
            }




        </div>
    );
}

export default Nav;
