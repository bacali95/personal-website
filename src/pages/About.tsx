import Section from '@components/Section';
import { profile } from '@data/profile';
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-5xl capitalize">
        {profile.firstName} {profile.lastName}
      </div>
      <div className="mt-4 text-gray-500 text-lg font-light">{profile.profession}</div>
      <Section header="About Me">
        <div className="w-3/4 text-center italic text-gray-400 font-light">“ {profile.intro} “</div>
      </Section>
      <Section header="Personal Info">
        <div className="mb-2 w-3 h-3 rounded-full bg-black" />
        <div className="flex w-full items-center divide-x">
          <div className="flex flex-col w-1/2 items-end pr-6">
            <div className="h-8" />
            <div>Name</div>
            <div>Birthday</div>
            <div>Place of Birth</div>
            <div>Nationality</div>
            <div>Marital Status</div>
            <div className="h-8" />
          </div>
          <div className="flex flex-col w-1/2 items-start pl-6 text-gray-400 capitalize">
            <div className="h-8" />
            <div>
              {profile.firstName} {profile.lastName}
            </div>
            <div>{profile.birthDate}</div>
            <div>{profile.birthPlace}</div>
            <div>{profile.nationality}</div>
            <div>{profile.maritalStatus}</div>
            <div className="h-8" />
          </div>
        </div>
        <div className="mt-2 w-3 h-3 rounded-full bg-yellow-400" />
      </Section>
      <Section header="Contact Info">
        <div className="mb-2 w-3 h-3 rounded-full bg-black" />
        <div className="flex w-full items-center divide-x">
          <div className="flex flex-col w-1/2 items-end pr-6">
            <div className="h-8" />
            <div>Address</div>
            <div>Email</div>
            <div>Website</div>
            <div>Phone</div>
            <div className="h-8" />
          </div>
          <div className="flex flex-col w-1/2 items-start pl-6 text-gray-400">
            <div className="h-8" />
            <div>{profile.address}</div>
            <div>{profile.email}</div>
            <div>{profile.website}</div>
            <div>{profile.phone}</div>
            <div className="h-8" />
          </div>
        </div>
        <div className="mt-2 w-3 h-3 rounded-full bg-yellow-400" />
      </Section>
      <div className="mt-20 text-sm">- 1 / 4 -</div>
    </div>
  );
};
export default About;
