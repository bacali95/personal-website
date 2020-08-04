import { Controller, Get, Param, Query, Render, Res } from '@nestjs/common';
import { ProfileRepository } from '../api/profile/profile.repository';
import { ProjectsRepository } from '../api/projects/projects.repository';
import { EducationsRepository } from '../api/educations/educations.repository';
import { CategoriesRepository } from '../api/categories/categories.repository';
import { SkillsRepository } from '../api/skills/skills.repository';
import { AssetsRepository } from '../api/assets/assets.repository';
import { sortComparator } from '../utils';
import { Response } from 'express';

@Controller()
export class PublicController {
  constructor(
    private readonly profileRepository: ProfileRepository,
    private readonly projectsRepository: ProjectsRepository,
    private readonly educationsRepository: EducationsRepository,
    private readonly categoriesRepository: CategoriesRepository,
    private readonly skillsRepository: SkillsRepository,
    private readonly assetsRepository: AssetsRepository,
  ) {
    profileRepository.findOne().then((profile) => {
      if (!profile) {
        profileRepository
          .create({
            firstName: 'Test',
            lastName: 'Account',
            address: 'Test, test',
            birthdayDate: new Date(),
            birthdayPlace: 'Test',
            email: 'test@gmail.com',
            imageURL: null,
            intro: 'Test',
            maritalStatus: 'Test',
            nationality: 'Test',
            phone: 'Test',
            profession: 'Test',
            skype: 'Test',
            website: 'Test',
          })
          .catch(console.log);
      }
    });
  }

  @Get()
  @Render('sections')
  async getIndexView(): Promise<any> {
    const profile = await this.profileRepository.findOne();
    const projects = (await this.projectsRepository.findAll())
      .map((p) => {
        p.startDate = new Date(p.startDate);
        p.endDate = new Date(p.endDate);
        return p;
      })
      .sort(sortComparator('desc', 'startDate'));
    const educations = (await this.educationsRepository.findAll()).sort(
      sortComparator('desc', 'rank'),
    );
    const categories = await this.categoriesRepository.findAll();
    const skills = (await this.skillsRepository.findAll()).sort(
      sortComparator('asc', 'rank'),
    );
    const assets = await this.assetsRepository.findAll();
    profile.birthdayDate = new Date(profile.birthdayDate);
    return { profile, projects, educations, categories, skills, assets };
  }

  @Get('project/:id')
  @Render('project')
  async getProjectView(
    @Param('id') id: string,
    @Query('index') index: number,
    @Res() res: Response,
  ): Promise<any> {
    const project = await this.projectsRepository.findById(id);
    if (!project) {
      return res.redirect('/');
    }
    project.clicks = (project.clicks || 0) + 1;
    await this.projectsRepository.update(project);
    project.startDate = new Date(project.startDate);
    project.endDate = new Date(project.endDate);
    return { project, index };
  }

  @Get('next/:index')
  async getNextProjectView(
    @Param('index') index: number,
    @Res() res: Response,
  ): Promise<void> {
    const projects = (await this.projectsRepository.findAll())
      .map((p) => {
        p.startDate = new Date(p.startDate);
        p.endDate = new Date(p.endDate);
        return p;
      })
      .sort(sortComparator('desc', 'startDate'));

    if (!index || isNaN(index)) {
      index = 0;
    }

    index = projects.length + Number(index);
    index %= projects.length;
    const id = projects[index].id;
    return res.redirect(`/project/${id}?index=${index}`);
  }
}
