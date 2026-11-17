import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init({
  duration: 800,
  once: false,
  mirror: true,
  offset: 20,
});

window.addEventListener('load', () => {
  AOS.refresh();
});