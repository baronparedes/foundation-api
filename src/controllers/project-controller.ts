import {ValidationError} from 'sequelize';
import {
  Body,
  Controller,
  Get,
  OperationId,
  Patch,
  Path,
  Post,
  Query,
  Response,
  Route,
  Security,
  SuccessResponse,
} from 'tsoa';

import {ProjectAttr} from '../@types/entities';
import {VERBIAGE} from '../constants';
import {ApiError, EntityError} from '../errors';
import ProjectService from '../services/project-service';

@Security('bearer')
@Route('/api/project')
export class ProjectController extends Controller {
  private projectService: ProjectService;

  constructor() {
    super();
    this.projectService = new ProjectService();
  }

  @OperationId('GetAllProjects')
  @Get('/getAll')
  public async getAll(@Query() search?: string) {
    const result = await this.projectService.getAll(search);
    return result;
  }

  @Response<EntityError>(400, VERBIAGE.BAD_REQUEST)
  @SuccessResponse(201, VERBIAGE.CREATED)
  @Post('/createProject')
  public async createProject(@Body() data: ProjectAttr) {
    try {
      const result = await this.projectService.create(data);
      return result;
    } catch (e) {
      if (e instanceof ValidationError) {
        throw new EntityError(e);
      }
      throw e;
    }
  }

  @Response<EntityError>(400, VERBIAGE.BAD_REQUEST)
  @Response<ApiError>(404, VERBIAGE.NOT_FOUND)
  @Patch('/updateProject/{id}')
  public async updateProject(
    @Path() id: number,
    @Body() data: ProjectAttr
  ): Promise<ProjectAttr> {
    try {
      return await this.projectService.update(id, data);
    } catch (e) {
      if (e instanceof ValidationError) {
        throw new EntityError(e);
      }
      throw new ApiError(404, VERBIAGE.NOT_FOUND);
    }
  }
}
