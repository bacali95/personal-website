import Section from '@components/Section';
import { assets } from '@data/assets';
import { educations } from '@data/education';
import { hobbies } from '@data/hobbies';
import { languages } from '@data/languages';
import { skills } from '@data/skills';
import classNames from 'classnames';
import React from 'react';

const Resume: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-5xl capitalize">Resume</div>
      <div className="mt-4 text-gray-500 text-sm font-light">CURRICULUM VITA</div>
      <Section header="Education">
        <div className="flex flex-col w-full">
          {educations.map(({ name, period }, index) => (
            <div key={index} className="flex w-full divide-x">
              {index % 2 ? <div className="w-1/2" /> : undefined}
              <div
                className={classNames('relative px-8 py-3 flex flex-col w-1/2', {
                  'text-right': !(index % 2),
                })}
              >
                <div
                  className={classNames('absolute h-3 w-3 mt-1 rounded-full', {
                    'left-0 -ml-1.5 bg-black': index % 2,
                    'right-0 -mr-1.5 bg-yellow-400': !(index % 2),
                  })}
                />
                <div className="text-sm text-gray-400">{period}</div>
                <div>{name}</div>
              </div>
              {!(index % 2) ? <div className="w-1/2" /> : undefined}
            </div>
          ))}
        </div>
      </Section>
      <Section header="Skills">
        <div className="mb-2 w-3 h-3 rounded-full bg-black" />
        <div className="flex w-full items-center divide-x">
          <div className="flex flex-col w-1/2 items-end pr-6">
            <div className="h-8" />
            <div className="mb-3 font-bold">Technologies</div>
            {skills.map(({ name, level }, index) => (
              <div key={index} className="flex gap-3">
                <div>{name}</div>
                <div className="flex items-center gap-1.5">
                  {new Array(10).fill(null).map((_, index) => (
                    <div
                      key={index}
                      className={classNames('w-1.5 h-1.5 rounded-full', {
                        'bg-yellow-400': index < level,
                        'bg-gray-300': index >= level,
                      })}
                    />
                  ))}
                </div>
              </div>
            ))}
            <div className="h-8" />
          </div>
          <div className="flex flex-col w-1/2 items-start pl-6">
            <div className="h-8" />
            <div className="mb-3 font-bold">Assets</div>
            {assets.join(', ')}
            <div className="mb-3 mt-6 font-bold">Languages</div>
            {languages.map(({ name, level }, index) => (
              <div key={index} className="flex gap-1 items-center">
                <div>{name}</div>
                <div className="text-sm text-gray-400">({level})</div>
              </div>
            ))}
            <div className="mb-3 mt-6 font-bold">Hobbies & Interests</div>
            <div className="flex gap-4">
              {hobbies.map(({ Icon, name }, index) => (
                <div key={index} className="flex flex-col gap-1.5 items-center">
                  <Icon className="p-2 h-10 w-10 text-yellow-400 border border-yellow-400 rounded-full" />
                  <div className="text-sm text-gray-400">{name}</div>
                </div>
              ))}
            </div>
            <div className="h-8" />
          </div>
        </div>
        <div className="mt-2 w-3 h-3 rounded-full bg-yellow-400" />
      </Section>
      <div className="mt-20 text-sm">- 2 / 4 -</div>
    </div>
  );
};

export default Resume;
