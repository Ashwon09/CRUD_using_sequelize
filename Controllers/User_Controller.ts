import e, { Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import Config from "../Config/Config";
import pool from "../db_init";
import { v4 as uuid } from "uuid";
import { user } from "../Models/user.model";
import { where } from "sequelize";
import { Model } from "sequelize";
export const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const searchUserEmail: any = await user.findOne({
      where: { user_email: email },
    });

    if (searchUserEmail == null) {
      return res.json({
        response: "Account not found",
        status: 400,
      });
    }

    if (searchUserEmail.user_password == password) {
      const { user_id } = searchUserEmail;
      const accesstoken = jwt.sign(
        { user_id: user_id },
        Config.secret.access as Secret,
        {
          expiresIn: "30s",
        }
      );
      const refreshtoken = jwt.sign(
        { user_id: user_id },
        Config.secret.refresh as Secret,
        {
          expiresIn: "60s",
        }
      );
      res.json({
        response: "Login sucessfull",
        status: 200,
        accesstoken: accesstoken,
        refreshtoken: refreshtoken,
      });
    } else {
      res.json({
        response: "Wrong Password",
        status: 404,
      });
    }
  } catch (error) {
    res.json(error);
  }
};

export const registerController = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const userId = uuid();

  try {
    console.log("Entered here");
    const addUserCommand = await pool.query(
      "insert into users (user_id,user_email,user_password) values ($1,$2,$3) returning *",
      [userId, email, password]
    );
    res.json(addUserCommand);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const refreshTokenController = async (req: Request, res: Response) => {
  const { user_id } = req.body;
  try {
    const findUser = await pool.query(
      "SELECT * FROM USERS WHERE user_id = $1",
      [user_id]
    );

    if (findUser.rowCount > 0) {
      const accesstoken = jwt.sign(
        { user_id: user_id },
        Config.secret.access as Secret,
        {
          expiresIn: "1hr",
        }
      );
      const refreshtoken = jwt.sign(
        { user_id: user_id },
        Config.secret.refresh as Secret,
        {
          expiresIn: "1d",
        }
      );
      res.status(200).json({
        response: "token refresh successful",
        accessToken: accesstoken,
        refreshToken: refreshtoken,
      });
    }
  } catch (error) {
    res.json(error);
  }
};

export const updateUserController = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user_id = req.params.user_id;
  try {
    const updateusercommand = await user.update(
      { user_email: email, user_password: password },
      {
        where: {
          user_id: user_id,
        },
        returning: true,
      }
    );
    console.log(updateusercommand);
    res.json(updateusercommand);
  } catch (error) {
    console.error(error);
    res.json(error);
  }
};

export const readOneUserController = async (req: Request, res: Response) => {
  try {
    const readalluserscommand = await user.findByPk(req.params.user_id);
    res.json(readalluserscommand);
  } catch (error) {
    console.error(error);
    res.json(error);
  }
};
