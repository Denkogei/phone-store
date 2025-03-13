import React from 'react';


const About = () => {
  return (
    <>
      <h2 className="about-heading">About Us</h2>
      <div className="about">
        <img
          src="/assets/about.png"
          alt="Phone Store Logo"
          className="about-image"
        />
        <p className="about-text">
          At Phone Store, we are driven by a passion for providing top-quality,
          affordable smartphones that meet the needs of our customers, all while
          promoting sustainability and reducing electronic waste. Our goal is to
          make high-end technology accessible to everyone, without compromising
          on quality or environmental responsibility.
          <br /><br />
          We specialize in offering a wide selection of second-hand phones, each
          carefully sourced and thoroughly tested to ensure they meet our strict
          standards. Every device goes through a meticulous refurbishment
          process, where it’s restored to like-new condition, ensuring that our
          customers receive reliable, high-performance smartphones at a fraction
          of the price of new ones.
          <br /><br />
          By choosing to shop with us, you're not only getting a great deal on a
          smartphone, but also contributing to a more sustainable future by
          supporting the circular economy. We're committed to extending the life
          of electronics and reducing e-waste, one phone at a time. Whether
          you're looking for the latest models or affordable alternatives, Phone
          Store is here to help you find the perfect device.
        </p>
      </div>
    </>
  );
};

export default About;