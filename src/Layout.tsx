import { profile } from '@data/profile';
import { socials } from '@data/socials';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { IconType } from 'react-icons';
import { HiBriefcase, HiPhone, HiPresentationChartLine, HiUser } from 'react-icons/hi';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import About from './pages/About';
import Resume from './pages/Resume';

type Tab = {
  Icon: IconType;
  label: string;
  subLabel: string;
  link: `/${string}`;
};

const Layout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentPath, setCurrentPath] = useState(location.pathname);

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location.pathname]);

  const tabs: Tab[] = [
    {
      Icon: HiUser,
      label: 'About Me',
      subLabel: 'Who Am I',
      link: '/',
    },
    {
      Icon: HiBriefcase,
      label: 'Resume',
      subLabel: 'CURRICULUM VITA',
      link: '/resume',
    },
    {
      Icon: HiPresentationChartLine,
      label: 'Portfolio',
      subLabel: 'My Projects',
      link: '/portfolio',
    },
    {
      Icon: HiPhone,
      label: 'Contact',
      subLabel: 'Say Hello',
      link: '/contact',
    },
  ];

  return (
    <div className="relative h-full w-full">
      <div
        className="absolute h-full w-full filter blur-2xl"
        style={{
          zIndex: -1,
          backgroundImage: 'url("images/background.png")',
        }}
      />
      <div className="flex container w-full gap-2 py-16">
        <div className="flex flex-col gap-2">
          <div className="flex h-36 w-36 rounded-lg shadow-xl bg-white items-center justify-center">
            <img className="rounded-lg" src={`images/${profile.image}`} alt="Profile Image" />
          </div>
          {tabs.map(({ Icon, label, subLabel, link }, index) => (
            <div
              key={index}
              className={classNames(
                'group flex flex-col h-36 w-36 rounded-lg shadow-md bg-white items-center ' +
                  'justify-center cursor-pointer hover:bg-yellow-400 transition duration-500',
                {
                  'bg-yellow-400': currentPath === link,
                }
              )}
              onClick={() => navigate(link)}
            >
              <Icon className="mb-2 h-6 w-6" />
              <div className="text-md uppercase">{label}</div>
              <div className="text-xs text-gray-500 uppercase font-light group-hover:text-black transition duration-500">
                {subLabel}
              </div>
            </div>
          ))}
        </div>
        <div className="relative py-20 w-full shadow-xl bg-white rounded-lg">
          <Routes>
            <Route path="/resume" element={<Resume />} />
            <Route path="/" element={<About />} />
          </Routes>
          <div className="absolute -bottom-4 w-full">
            <div className="mx-2 h-4 bg-yellow-400 rounded-b-lg shadow-lg" />
            <div className="-mt-7 mx-1 h-4 bg-yellow-400 rounded-b-lg shadow-lg" />
            <div className="-mt-7 h-4 bg-yellow-400 rounded-b-lg shadow-lg" />
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          {socials.map(({ Icon, name, link }, index) => (
            <a
              key={index}
              className="flex group h-10 w-10 rounded-lg shadow-md bg-yellow-400 items-center justify-center hover:bg-black transition duration-500"
              href={link}
              title={name}
              target="_blank"
              rel="noreferrer"
            >
              <Icon className="h-4 w-4 group-hover:text-yellow-400 transition duration-500" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Layout;
