import React, { useState, useEffect } from 'react';
import ImageOne from '../images/car1.png';
import ImageTwo from '../images/car2.png';
import ImageThree from '../images/car3.png';
import ImageFour from '../images/car4.png';

const images = [ImageOne, ImageTwo, ImageThree, ImageFour];

const getRandomShape = () => {
    const shapes = ['circle', 'square'];
    return shapes[Math.floor(Math.random() * shapes.length)];
};

const getRandomSize = () => {
    return Math.floor(Math.random() * 100) + 20;
};

const getRandomPosition = () => {
    return {
        top: Math.floor(Math.random() * 300) + 'vh',
        left: Math.floor(Math.random() * 200) + 'vw'
    };
};

const getRandomDirection = () => {
    const directions = ['move-left', 'move-right', 'move-up', 'move-down'];
    return directions[Math.floor(Math.random() * directions.length)];
};

const generateShapes = (count) => {
    return Array.from({ length: count }, (_, index) => ({
        id: index,
        shape: getRandomShape(),
        size: getRandomSize(),
        position: getRandomPosition(),
        direction: getRandomDirection()
    }));
};

function Welcome() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [shapes, setShapes] = useState(generateShapes(10));

    useEffect(() => {
        const imageInterval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 1500);

        const shapeInterval = setInterval(() => {
            setShapes((prevShapes) => [
                ...prevShapes.slice(1),
                {
                    id: prevShapes.length,
                    shape: getRandomShape(),
                    size: getRandomSize(),
                    position: getRandomPosition(),
                    direction: getRandomDirection()
                }
            ]);
        }, 1000);

        return () => {
            clearInterval(imageInterval);
            clearInterval(shapeInterval);
        };
    }, []);

    return (
        <div className="container container-vertical">
            <div className="container-background">
                {shapes.map((shape) => (
                    <div
                        key={shape.id}
                        className={`shape ${shape.shape}`}
                        style={{
                            width: `${shape.size}px`,
                            height: `${shape.size}px`,
                            top: shape.position.top,
                            left: shape.position.left,
                            animationName: shape.direction
                        }}
                    />
                ))}
            </div>
            <div className="container-horizontal">
                <div className="half">
                    <img src={images[currentImageIndex]} id="changing_images" alt="car_images" />
                </div>
                <div className="half text-center">
                    <h2 className="page-title">Welcome To</h2>
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
    );
}

export default Welcome;
