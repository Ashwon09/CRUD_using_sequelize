import { NextFunction, Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import Config from "../Config/Config";

export interface jwtToken {
  user_id: string;
}

export function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
): Response | void {
  const authHeader = req.headers["authorization"];
  const token: any = authHeader;
  if (token == null) {
    return res.status(403).json("No token Available");
  }
  try {
    const jwtresponse = jwt.verify(
      token,
      Config.secret.access as Secret
    ) as jwtToken;

    if (!jwtresponse.user_id) {
      return res.status(401).json({
        response: "Invalid Token",
      });
    }
    req.body.user_id = jwtresponse.user_id;
    next();
  } catch (error) {
    // console.log("Token Expired Error");
    return res.json(error);
  }
}

export function verifyRefreshToken(
  req: Request,
  res: Response,
  next: NextFunction
): Response | void {
  const authHeader = req.headers["refresh"];
  console.log(req.headers);
  const token: any = authHeader;
  console.log(authHeader);
  if (!authHeader) {
    return res.json("No token Available");
  }
  try {
    const jwtresponse = jwt.verify(
      token,
      Config.secret.refresh as Secret
    ) as jwtToken;

    if (!jwtresponse.user_id) {
      return res.status(401).json({
        response: "Invalid token",
      });
    }
    req.body.user_id = jwtresponse.user_id;
    next();
  } catch (error) {
    return res.json(error);
  }
}
