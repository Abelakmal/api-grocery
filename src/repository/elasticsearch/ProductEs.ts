import { Client } from "@elastic/elasticsearch";
import { baseURL, elasticsearchConfig } from "../../helper/config";
import { IProduct } from "../../types/product.type";
import { PrismaClient } from "@prisma/client";
import path from "path";
import fs from "fs";

export class ProductEs {
  private client: Client;
  private prisma: PrismaClient;

  constructor() {
    this.client = new Client({ node: elasticsearchConfig.node });
    this.prisma = new PrismaClient();
  }

  public async indexDocument(product: IProduct, pathImg: string) {
    try {
      return await this.client.index({
        index: "product",
        id: product.id.toString(),
        document: {
          name: product.name,
          description: product.description,
          weight: product.weight,
          unitWeight: product.unitWeight,
          image: product.image,
          price: product.price.toString(),
        },
      });
    } catch (error) {
      console.log(error);
      
      await this.prisma.product.delete({ where: { id: product.id } });
      fs.unlinkSync(pathImg);
      throw error;
    }
  }

  public async search(query: string) {
    try {
      const result = await this.client.search({
        index: "product",
        query: {
          match: {
            name: query,
          },
        },
      });
      return result;
    } catch (error) {
      throw error;
    }
  }

  public async updateDocument(product: IProduct, beforeproduct: IProduct) {
    try {
      await this.client.update({
        index: "product",
        id: product.id.toString(),
        doc: {
          name: product.name,
          description: product.description,
          weight: product.weight,
          unitWeight: product.unitWeight,
          image: product.image,
          price: product.price.toString(),
        },
      });
    } catch (error) {
      await this.prisma.product.update({
        where: { id: product.id },
        data: beforeproduct,
      });
      const filePath = path.resolve(
        "src/images" + product.image.replaceAll(`${baseURL}/media`, "")
      );

      fs.unlinkSync(filePath);

      throw error;
    }
  }
}
