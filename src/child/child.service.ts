import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateChildDto } from './dto/create-child.dto';
import { UpdateChildDto } from './dto/update-child.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ChildService {
  constructor(private prisma: PrismaService) {}
  create(createChildDto: CreateChildDto) {
    return this.prisma.child.create({
      data: createChildDto,
    });
  }

  findAll() {
    return this.prisma.child.findMany({
      include: {
        Jatek: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.child.findUnique({
      where: { id },
      include: {
        Jatek: true,
      },
    });
  }

  async update(id: number, updateChildDto: UpdateChildDto) {
  
   
    const exists = await this.prisma.child.findUnique({
      where: { id },
    });

    if (!exists) {
      throw new NotFoundException('Child not found');
    }

    return this.prisma.child.update({
      where: { id },
      data: updateChildDto,
    });
  }

  async remove(id: number) {
    const exists = await this.prisma.child.findUnique({
      where: { id },
    });

    if (!exists) {
      throw new NotFoundException(`Child with ID ${id} not found`);
    }

    return this.prisma.child.delete({
      where: { id },
    });
  }
  async addJatek(id: number, jatekId: number) {
  
    const exists = await this.prisma.child.findUnique({
      where: { id },
    });
    const Exists2 = await this.prisma.jatek.findUnique({
      where: { id: jatekId },
    });
    if (!exists) {
      throw new NotFoundException(`Child with ID ${id} not found`);
    }
    if (!Exists2) {
      throw new NotFoundException(`Jatek with ID ${jatekId} not found`);
    }
    const badorrggod=await this.prisma.child.findUnique({
      where: { id },
      select: {
          goodorbad: true
      },
    });
    if (badorrggod.goodorbad == false) {
      throw new NotFoundException('this child is forbidden to get a gift');
    }
    

    return this.prisma.child.update({
      where: { id },
      data: { Jatek: { connect: { id: jatekId } } },
    });
  }
  async removeJatek(id: number, jatekId: number) {
    
    const exists = await this.prisma.child.findUnique({
      where: { id },
    });

    if (!exists) {
      throw new NotFoundException(`Child with ID ${id} not found`);
    }
    return this.prisma.child.update({
      where: { id },
      data: { Jatek: { disconnect: { id: jatekId } } },
    });
  }
}
