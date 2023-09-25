import React, { useState, useEffect } from 'react';

const phrases = [
  'Welcome to my store!',
  'Discover amazing deals on our products.',
  'Shop now for the best selection.',
  'Quality products at affordable prices.',
  'Explore our wide range of products.',
  "We're here to serve you!",
  'Customer satisfaction is our priority.',
  'Join our community of happy customers.',

];

const RandomPhrase = () => {
  const [randomIndex, setRandomIndex] = useState(0);

  useEffect(() => {
    const newIndex = Math.floor(Math.random() * phrases.length);
    setRandomIndex(newIndex);
  }, []);

  return <p>{phrases[randomIndex]}</p>;
};

export default RandomPhrase;
