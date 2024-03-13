import 'dotenv/config';
import { Request, Response } from 'express';
import { HttpStatusCode } from '../utils/httpStatusCode';
import logger from '../utils/logger';
import { payloadChecker } from '../utils/payloadChecker';
import userService from '../services/user.service';
import { generateToken } from '../utils/jwtToken';
import bcrypt from 'bcrypt';
import {
  userCreateSchema,
  userUpdateSchema,
  loginSchema,
} from '../schemas/user.schema';
import { errorMessage } from '../utils/errorMessage';

class UserController {
  public async registerUser(req: Request, res: Response) {
    try {
    const errorMessages = await payloadChecker(userCreateSchema, req.body);

    if (errorMessages.length > 0) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        message: 'Validation errors: ' + errorMessages.join(', '),
      });
    }

    const { email, mobile } = req.body;
    const payloadInString = await userService.findEmailOrMobileNo(email, mobile);

    if (payloadInString) {
      return res.status(HttpStatusCode.FORBIDDEN).json({
        success: false,
        message: errorMessage.emailOrMobileAlreadyExist,
      });
    } else {
      const salt = 10;
      const hashedPassword = bcrypt.hashSync(req.body.password, salt);
      req.body.password = hashedPassword;
      const insertUser = await userService.saveUser(req.body);
      return res.status(HttpStatusCode.CREATED).json({
        success: true,
        message: insertUser,
      });
    }
  } catch (error: any) {
    logger.error(error.message);
    return res.status(error.statusCode).json({
      success: false,
      message: errorMessage.mobileAndEmailNotProper,
    });
  }
}

public async login(req: Request, res: Response) {
  try {
    const validationErrors = await payloadChecker(loginSchema, req.body);
    if (validationErrors.length > 0) {
      return res.status(HttpStatusCode.BAD_REQUEST).send({
        success: false,
        message: validationErrors.join(' '), // Join error messages into a single string
      });
    }

    const { email, password } = req.body;
    const data = await userService.findUserByEmail(email as string);

    if (data) {
      const { password: hashedPassword, ...rest } = data;
      const comparePassword = await bcrypt.compareSync(password, hashedPassword);

      if (!comparePassword) {
        return res.status(HttpStatusCode.BAD_REQUEST).send({
          success: false,
          message: errorMessage.incorrectPassword,
        });
      }

      const token = generateToken(data._id.toString());
      return res.status(HttpStatusCode.OK).send({
        success: true,
        token,
        data: rest,
      });
    } else {
      return res.status(HttpStatusCode.FORBIDDEN).send({
        success: false,
        message: errorMessage.emailNotExist,
      });
    }
  } catch (error: any) {
    logger.error(error.message);
    return res.status(error.statusCode).send({
      success: false,
      message: errorMessage.emailNotExist,
    });
  }
}
  

  public async updateUserById(req: Request, res: Response) {
    try {
      const validationErrors = await payloadChecker(userUpdateSchema, req.body);
  
      if (validationErrors.length > 0) {
        return res.status(HttpStatusCode.BAD_REQUEST).send({
          success: false,
          message: validationErrors.join(' '), 
        });
      }
  
      const { id } = req.body;
      const data = await userService.updateUserById({ _id: id, ...req.body });
  
      if (data) {
        return res.status(HttpStatusCode.CREATED).send({
          success: true,
          data: data,
        });
      } else {
        return res.status(HttpStatusCode.OK).send({
          success: true,
          message: errorMessage.idNotExist,
        });
      }
    } catch (error: any) {
      logger.error(error.message);
      return res.status(error.statusCode).send({
        success: false,
        message: error.message,
      });
    }
  }
}

export const userController = new UserController();
