import { IsBoolean, IsString, isString } from "class-validator";

export class CreateChildDto {
    @IsString()
    nev: string;
    @IsString()
    address: string;
    @IsBoolean()
    goodorbad: boolean;
}
