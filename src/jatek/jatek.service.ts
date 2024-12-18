import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateJatekDto } from './dto/create-jatek.dto';
import { UpdateJatekDto } from './dto/update-jatek.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class JatekService {
  constructor(private prisma: PrismaService) {}
  create(createJatekDto: CreateJatekDto) {
    const { childId, ...jatekData } = createJatekDto;
    
    return this.prisma.jatek.create({
        data: {
            ...jatekData,
            Child: childId ? {
                connect: { id: childId }
            } : undefined
        }
    });
  }

  findAll() {
    return this.prisma.jatek.findMany({
      include: {
        Child: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.jatek.findUnique({
      where: { id },
      include: {
        Child: true,
      },  
    });
  }

  async update(id: number, updateJatekDto: UpdateJatekDto) {
   
    const exists = await this.prisma.jatek.findUnique({
      where: { id },
    });

    if (!exists) {
      throw new NotFoundException(`Jatek with ID ${id} not found`);
    }

    return this.prisma.jatek.update({
      where: { id },
      data: updateJatekDto,
    });
  }

  async remove(id: number) {
    const exists = await this.prisma.jatek.findUnique({
      where: { id },
    });

    if (!exists) {
      throw new NotFoundException(`Jatek with ID ${id} not found`);
    }

    return this.prisma.jatek.delete({
      where: { id },
    });
  }
}
