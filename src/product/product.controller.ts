import { BadRequestException, Body, Controller, HttpCode, Post } from "@nestjs/common";
import { Delete, Get, Param, Put, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common/decorators";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import * as path from 'path';
import { CreateProductRequest, ProductResponse, UpdateProductRequest } from "../model/product.model";
import { WebResponse } from "../model/web.model";
import { ProductService } from "./product.service";
import { uuid } from 'uuidv4';
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../auth/guards/role.guard";
import { Roles } from "../common/role.decorator";

const imageFileFilter = (req, file, callback) => {
    if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
        return callback(new BadRequestException('Only image files are allowed!'), false);
    }
    callback(null, true);
};

const config = {
    fileFilter: imageFileFilter,
    storage: diskStorage({
        destination: './uploads',
        filename: (req, image, cb) => {
            const filename: string = path.parse(image.originalname).name.replace(/\s/g,'')+uuid();
            const extension: string = path.parse(image.originalname).ext;

            cb(null, `${filename}${extension}`)
        }
    })
}
@Controller('/api/product/')
export class ProductController{
    constructor(
        private productService: ProductService
    ){}
    
    
    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('Admin')
    @UseInterceptors(FileInterceptor('image', config))
    @HttpCode(200)
    async create(
        @UploadedFile() image: Express.Multer.File,
        @Body() request: any
    ): Promise<WebResponse<ProductResponse>>{
        if (!image) {
            throw new BadRequestException('Image file is required');
        }
        const createProductRequest: CreateProductRequest = {
            name: request.name,
            price: parseFloat(request.price),
            desc: request.desc,
            condition: request.condition,
            image: image.path
        };
        const result = await this.productService.create(createProductRequest)
        return {
            data: result
        }
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    async get(@Param('id') id: string):Promise<WebResponse<ProductResponse>>{
        const result = await this.productService.get(id)
        return{
            data: result
        }
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    async getAll():Promise<WebResponse<ProductResponse[]>>{
        const result = await this.productService.getAll()
        return{
            data: result
        }
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('Admin')
    @UseInterceptors(FileInterceptor('image', config))
    @HttpCode(200)
    async update(
        @Param('id') id: string,
        @UploadedFile() image: Express.Multer.File,
        @Body() request: any
    ): Promise<WebResponse<ProductResponse>> {
        const updateProductRequest: UpdateProductRequest = {
            name: request.name,
            price: parseFloat(request.price),
            desc: request.desc,
            condition: request.condition,
            image: image?.path, // Optional field if image is not provided
        };
        const result = await this.productService.update(id, updateProductRequest);
        return {
        data: result,
        };
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('Admin')
    @HttpCode(200)
    async remove(@Param('id') id: string):Promise<WebResponse<ProductResponse[]>>{
        const result = await this.productService.remove(id)
        return{
            data: result
        }
    }
}