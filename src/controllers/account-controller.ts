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

import {AccountAttr} from '../@types/entities';
import {VERBIAGE} from '../constants';
import {ApiError, EntityError} from '../errors';
import AccountService from '../services/account-service';

@Security('bearer')
@Route('/api/account')
export class AccountController extends Controller {
  private accountService: AccountService;

  constructor() {
    super();
    this.accountService = new AccountService();
  }

  @OperationId('GetAllAccounts')
  @Get('/getAll')
  public async getAll(@Query() search?: string) {
    const result = await this.accountService.getAll(search);
    return result;
  }

  @Response<EntityError>(400, VERBIAGE.BAD_REQUEST)
  @SuccessResponse(201, VERBIAGE.CREATED)
  @Post('/createAccount')
  public async createAccount(@Body() data: AccountAttr) {
    try {
      const result = await this.accountService.create(data);
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
  @Patch('/updateAccount/{id}')
  public async updateAccount(
    @Path() id: number,
    @Body() data: AccountAttr
  ): Promise<AccountAttr> {
    try {
      return await this.accountService.update(id, data);
    } catch (e) {
      if (e instanceof ValidationError) {
        throw new EntityError(e);
      }
      throw new ApiError(404, VERBIAGE.NOT_FOUND);
    }
  }
}
