
import { Hotspot } from './types';

export const HOTSPOTS: Hotspot[] = [
  {
    id: 'Side Quest',
    label: 'swing trader',
    description: '2 years of swing trading.\nBeating the market._',
    x: 10.5,
    y: 9.5,
    width: 12.8,
    height: 18.2,
    color: '#00FF00'
  },
  {
    id: 'day job',
    label: 'product designer',
    description: 'Monetizing Gen-AI products.\n$0 → $100K ARR._',
    x: 23.5,
    y: 9.5,
    width: 13.6,
    height: 18.2,
    color: '#FFFF00'
  },
  {
    id: 'DRY',
    label: 'RUOYUN DAI',
    description: '· Multidisciplinary designer\n· Afro house head\n· Voyager_',
    x: 36.5,
    y: 27.2,
    width: 19.8,
    height: 31.8,
    color: '#FF0000'
  },
  {
    id: 'DNA',
    label: 'Artist',
    description: 'No matter how advanced the tech is, ideas always start on paper._',
    x: 73.2,
    y: 27.2,
    width: 26.8,
    height: 30.5,
    color: '#FF0000'
  },
  {
    id: 'offline',
    label: 'Animal Flow',
    description: 'Fitness enthusiast currently obsessed with animal flow._',
    x: 0,
    y: 62.0,
    width: 29.5,
    height: 27.8,
    color: '#0000FF'
  },
  {
    id: 'operator',
    label: 'food blogger',
    description: '3 years of flavor hunting.\n1M+ views · 200K saves & likes._',
    x: 73.0,
    y: 69.5,
    width: 26.0,
    height: 22.0,
    color: '#9B00FF'
  }
];

export const IMAGES = {
  base: 'https://raw.githubusercontent.com/ruoyundai/intro-me-hover/main/me%20copy.jpg',
  mask: 'me copy 2.jpg'
};
