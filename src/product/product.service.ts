import { HttpException, Inject, Injectable } from "@nestjs/common";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { PrismaService } from "../common/prisma.service";
import { ValidationService } from "../common/validation.service";
import { Logger } from "winston";
import { CreateProductRequest, ProductResponse, UpdateProductRequest } from "../model/product.model";
import { ProductValidation } from "./product.validation";
import { Product } from "@prisma/client";
import { promises as fs } from 'fs';
import * as path from 'path';

@Injectable()
export class ProductService{
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
        private prismaService: PrismaService,
        private validationService: ValidationService
    ){}
    async ProductIsAvailable(id:string): Promise<Product>{
        const product = await this.prismaService.product.findFirst({
            where:{id:id}
        })
        if(!product){
            throw new HttpException('Product not found', 404);
        }
        return product
    }
    
    async create(request: CreateProductRequest): Promise<ProductResponse>{
        this.logger.debug(`ProductSevice.create(${JSON.stringify(request)})`)
        const createRequest: CreateProductRequest = this.validationService.validate(
            ProductValidation.CREATE, request
        );
        const product = await this.prismaService.product.create({
            data: createRequest
        });

        return product
    }

    async get(id: string):Promise<ProductResponse>{
        const product = await this.ProductIsAvailable(id)
        return product
    }

    async update(id: string, request: UpdateProductRequest): Promise<ProductResponse>{
        const updateRequest = this.validationService.validate(ProductValidation.UPDATE, request)
        let product = await this.ProductIsAvailable(id)
        if (updateRequest.image) {
            const oldImagePath = product.image;
            if (oldImagePath) {
              try {
                await fs.unlink(path.resolve(oldImagePath));
              } catch (error) {
                this.logger.error(`Failed to delete old image: ${oldImagePath}`, error);
              }
            }
        }
        
        product = await this.prismaService.product.update({
            where:{id:id},
            data:updateRequest
        })
        return {
            id: product.id,
            name: product.name,
            desc: product.desc,
            condition: product.condition,
            price: product.price,
            image: product.image
        }
    }

    async getAll(): Promise<ProductResponse[]> {
        const product = await this.prismaService.product.findMany({
            select: {
                id: true,
                name: true,
                desc: true,
                image: true,
                condition: true,
                price: true,
            },
        });
        if (!product) {
            throw new HttpException('product not found', 404);
        }
        return product;
    }

    async remove(id: string):Promise<ProductResponse[]>{
        await this.ProductIsAvailable(id)
        const bank = await this.prismaService.product.delete({
            where:{id:id}
        })
        return this.getAll()
    }
}