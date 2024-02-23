import { NextFunction, Request, Response } from "express";

export type Handler = (
  req: Request & { userId: string; files: Record<string, any> },
  res: Response,
  next?: NextFunction
) => void;

export const resp = (status: boolean, data: any) => {
  const response: { ok: boolean; data?: any; message?: string } = { ok: status };

  status ? (response.data = data) : (response.message = data);

  return response;
};
