import { IsIn, IsNumber, IsString, IsOptional } from "class-validator";

export class CreateJatekDto {
    @IsString()
    name: string;
    @IsString()
    @IsIn(['plastic', 'wood', 'metal'])
    metarial: string;
    @IsNumber()
    veight: number;
    @IsOptional()
    @IsNumber()
    childId?: number;
}
