import React, { useState, useEffect } from 'react';
import ImageOne from '../images/car1.png';
import ImageTwo from '../images/car2.png';
import ImageThree from '../images/car3.png';
import ImageFour from '../images/car4.png';
import '../styles/login_style.css'

const images = [ImageOne, ImageTwo, ImageThree, ImageFour];
function Welcome() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const imageInterval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 1500);
        return () => {
            clearInterval(imageInterval);
        };
    }, []);

    return (
        <div className="welcome-container">
            <div className="container container-vertical">
                <div className="container-horizontal">
                    <div className="half left">
                        <img src={images[currentImageIndex]} id="changing_images" alt="car_images" />
                    </div>
                    <div className="half text-center">
                        <h3 className="page-title">Welcome To</h3>
                        <h1 className="web-title page-title mb-5">Wheel Deal</h1>
                        <p className='text-justify'>
                            Welcome, the ultimate destination for car enthusiasts and buyers alike! Our
                            platform seamlessly blends the thrill of social media with the excitement of a
                            car auction site, creating a unique space where car lovers can connect, share,
                            and discover their dream vehicles.
                        </p>
                        <p className='text-justify'>
                            Join us at Wheel Deal and become part of a vibrant community that celebrates the 
                            passion for cars. Explore, connect, and bid with confidence, knowing you're in the
                            best place for car lovers. Welcome to a new era of automotive discovery and 
                            excitement!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Welcome;
