import { BiCode, BiGlobe, BiSwim } from 'react-icons/bi';
import { MdLocalPizza } from 'react-icons/md';

import { Hobby } from '@core/types';

export const hobbies: Hobby[] = [
  {
    Icon: BiCode,
    name: 'Code',
  },
  {
    Icon: BiSwim,
    name: 'Swim',
  },
  {
    Icon: MdLocalPizza,
    name: 'Pizza',
  },
  {
    Icon: BiGlobe,
    name: 'Travel',
  },
];
