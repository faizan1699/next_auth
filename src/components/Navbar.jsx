
import React from 'react';
import Link from 'next/link';

const Navbar = () => {
    return (
        <div>
            <ul className="flex justify-between m-10 align-center">
                <div>
                    <Link href="/" passHref>
                        <li>Home</li>
                    </Link>
                </div>
                <div className="flex gap-10">
                    <Link href="/dashboard" passHref>
                        <li>Dashboard</li>
                    </Link>
                    <Link href="/login" passHref>
                        <li>Login</li>
                    </Link>
                    <Link href="/register" passHref>
                        <li>Register</li>
                    </Link>

                </div>
            </ul>
        </div>
    );
};

export default Navbar;
