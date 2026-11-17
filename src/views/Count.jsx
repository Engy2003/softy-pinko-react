import React, { useState, useEffect, useRef } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import rate from '../assets/images/circle-dec.png';

const statsData = [
  { id: 1, target: 126, label: 'Projects', hasDivider: true },
  { id: 2, target: 63, label: 'Happy Clients', hasDivider: true },
  { id: 3, target: 126, label: 'Awards Wins', hasDivider: true },
  { id: 4, target: 27, label: 'Countries', hasDivider: false },
];

const Count = () => {
  const [counts, setCounts] = useState(statsData.map(() => 0));
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
          setCounts(statsData.map(() => 0));
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    let startTime = null;
    let animationFrameId;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      setCounts(statsData.map((item) => Math.floor(progress * item.target)));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCounts(statsData.map((item) => item.target));
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isVisible]);

  return (
    <section className='count' id='count' ref={sectionRef}>
      <Container>
        <Row>
          {statsData.map((item, index) => (
            <Col key={item.id} className='col-12 col-sm-6 col-md-3 rate'>
              <div className='rate_num'>
                <p>{counts[index]}</p>
                <span>{item.label}</span>
              </div>
              {item.hasDivider && (
                <div className='img_rate'>
                  <img src={rate} alt='' />
                </div>
              )}
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Count;
