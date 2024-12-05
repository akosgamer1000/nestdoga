import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
   for (let i = 0; i < 10; i++) {
    await prisma.child.create({
        data: {
            nev: faker.person.fullName(),
            address: faker.location.streetAddress(),
            goodorbad: faker.datatype.boolean(),
           
            
        },
    });
   }
   for (let i = 0; i < 10; i++) {
    await prisma.jatek.create({
        data: {
            name: faker.commerce.productName(),
            metarial: faker.commerce.productMaterial(),
            veight: faker.number.int({ min: 1, max: 100 }),
            Child: {
                connect: {
                    id: i+1
                },
            },
        },
    });
   }
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })