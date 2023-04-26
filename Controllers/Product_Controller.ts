import { Request, Response } from "express";
import pool from "../db_init";
import { QueryResult } from "pg";
import { v4 as uuid } from "uuid";
import { product } from "../Models/product.model";
import { where } from "sequelize";

export const addProductController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { product_name, product_desc, product_price } = req.body;
    const productId: string = uuid();
    const addProductCommand = await product.create({
      product_name: product_name,
      product_desc: product_desc,
      product_price: product_price,
    });
    res.json(addProductCommand);
  } catch (error) {
    res.json(error);
  }
};

export const readProductController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const readProductsCommand: object[] = await product.findAll();

    return res.json(readProductsCommand);
  } catch (error) {
    return res.json(error);
  }
};

export const updateProductController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { product_name, product_desc, product_price } = req.body;
  console.log(product_desc, product_price);
  try {
    const updateProductCommand = await product.update(
      {
        product_name: product_name,
        product_desc: product_desc,
        product_price: product_price,
      },
      {
        where: {
          product_id: req.params.product_id,
        },
        returning: true,
      }
    );

    res.json(updateProductCommand);
  } catch (error) {
    res.json(error);
  }
};

export const deleteProductController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const deleteProductCommand = await product.destroy({
      where: { product_id: req.params.product_id },
    });
    res.json(deleteProductCommand);
  } catch (error) {
    res.json(error);
  }
};
