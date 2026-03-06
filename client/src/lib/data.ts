import heroImg from '../assets/images/hero-perfume.png';
import oudImg from '../assets/images/product-oud.png';
import floralImg from '../assets/images/product-floral.png';
import muskImg from '../assets/images/product-musk.png';
import amberImg from '../assets/images/product-amber.png';

export const products = [
  {
    id: '1',
    name: 'Midnight Oud',
    collection: 'Heritage Collection',
    price: 850,
    currency: 'AED',
    image: oudImg,
    description: 'A deep, mysterious blend of aged agarwood, dark spices, and subtle floral undertones.'
  },
  {
    id: '2',
    name: 'Desert Rose',
    collection: 'Floral Collection',
    price: 650,
    currency: 'AED',
    image: floralImg,
    description: 'An elegant composition of Taif rose, warm amber, and delicate jasmine petals.'
  },
  {
    id: '3',
    name: 'White Musk',
    collection: 'Signature Collection',
    price: 550,
    currency: 'AED',
    image: muskImg,
    description: 'A clean, sophisticated fragrance featuring pure white musk, sandalwood, and vanilla.'
  },
  {
    id: '4',
    name: 'Royal Amber',
    collection: 'Heritage Collection',
    price: 950,
    currency: 'AED',
    image: amberImg,
    description: 'A luxurious interpretation of classic amber, enriched with saffron and precious woods.'
  }
];

export { heroImg };