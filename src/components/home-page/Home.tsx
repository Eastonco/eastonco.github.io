import React from 'react';
import './home.scss'
import { AiFillLinkedin, AiOutlineInstagram, AiFillGithub } from 'react-icons/ai'

export const Home = () => (
    <div>
        <h1>Connor Easton</h1>
        <p>eastonco@icloud.com</p>
        <div className='socials'>
            <a href='https://github.com/eastonco'>
                <AiFillGithub />
            </a>
            <a href='https://linkedin.com/in/eastonco'>
                <AiFillLinkedin />
            </a>
            <a href='https://instagram.com/eastonco'>
                <AiOutlineInstagram />

            </a>
        </div>
    </div>
)