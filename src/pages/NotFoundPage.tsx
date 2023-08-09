import React from 'react';
import Card from '../components/UI/Card';
import Header from '../components/Header';
import style from '../assets/css/NotFoundPage.module.css'
const NotFoundPage: React.FC = () => {
    return (
        <>
            <Header />
            <div className={style.container}>
                <Card className={style.container}>
                    <h2>Sorry, we can't find the page you're looking for.</h2>
                </Card>
            </div>
        </>
    );
}

export default NotFoundPage;