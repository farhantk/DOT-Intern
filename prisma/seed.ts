import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
const prisma = new PrismaClient();

async function main() {
    await prisma.user.createMany({
      data: [
        {
            id: uuidv4(),
            name: "Customer 1",
            email: "customer@gmail.com",
            role: "Customer",
            street: "Cipadung",
            city: "Bandung",
            province: "Jawa Barat",
            country: "Indonesia",
            postal_code: "423423",
            password: "$2b$10$y/pTKUcgBC3QoJcdWP.Bu.OMicSzDMI90LQK3aSIJ1jHuUQtjUj5W"
        },
        {
            id: uuidv4(),
            name: "Admin 1",
            email: "admin@gmail.com",
            role: "Admin",
            street: "admin",
            city: "admin",
            province: "admin",
            country: "admin",
            postal_code: "admin",
            password: "$2b$10$y/pTKUcgBC3QoJcdWP.Bu.OMicSzDMI90LQK3aSIJ1jHuUQtjUj5W"
        },
      ],
    });

    await prisma.shipment.createMany({
      data: [
        {
          id: uuidv4(),
          name: 'JNT',
          price: 12000
        },
        {
          id: uuidv4(),
          name: 'JNE',
          price: 12000
        },
        {
          id: uuidv4(),
          name: 'Si Cepat',
          price: 12000
        },
        {
          id: uuidv4(),
          name: 'Lion Parcel',
          price: 12000
        },
      ],
    });

    await prisma.bank.createMany({
      data: [
        {
          id: '16cf7155-4a28-4eb0-8204-c475bc31a92a',
          name: 'BCA',
        },
        {
          id: '16cf7155-4a28-4eb0-8204-c475bc31a92b',
          name: 'BNI',
        },
        {
          id: '16cf7155-4a28-4eb0-8204-c475bc31a92c',
          name: 'BSI',
        },
        {
          id: '16cf7155-4a28-4eb0-8204-c475bc31a92d',
          name: 'Mandiri',
        },
      ],
    });

    await prisma.payment_method.createMany({
      data: [
        {
            id: uuidv4(),
            bank_id: '16cf7155-4a28-4eb0-8204-c475bc31a92a',
            name: 'Bank Transfer',
            acc_name: 'PT Makmur Jaya',
            acc_number: '24324532523'
        },
        {
            id: uuidv4(),
            bank_id: '16cf7155-4a28-4eb0-8204-c475bc31a92a',
            name: 'Virtual Account',
            acc_name: 'PT Makmur Jaya',
            acc_number: '6523462460000'
        },
        {
            id: uuidv4(),
            bank_id: '16cf7155-4a28-4eb0-8204-c475bc31a92b',
            name: 'Bank Transfer',
            acc_name: 'PT Makmur Jaya',
            acc_number: '24324532523'
        },
        {
            id: uuidv4(),
            bank_id: '16cf7155-4a28-4eb0-8204-c475bc31a92c',
            name: 'Virtual Account',
            acc_name: 'PT Makmur Jaya',
            acc_number: '6523462460000'
        },
        {
            id: uuidv4(),
            bank_id: '16cf7155-4a28-4eb0-8204-c475bc31a92c',
            name: 'Virtual Account',
            acc_name: 'PT Makmur Jaya',
            acc_number: '6523462460000'
        },
        {
            id: uuidv4(),
            bank_id: '16cf7155-4a28-4eb0-8204-c475bc31a92d',
            name: 'Virtual Account',
            acc_name: 'PT Makmur Jaya',
            acc_number: '6523462460000'
        },
        {
            id: uuidv4(),
            bank_id: '16cf7155-4a28-4eb0-8204-c475bc31a92d',
            name: 'Virtual Account',
            acc_name: 'PT Makmur Jaya',
            acc_number: '6523462460000'
        }
      ],
    });

    await prisma.product.createMany({
      data: [
        {
            id: uuidv4(),
            name: 'Monitor Samsung 24 inch',
            price: 1600000,
            desc: 'desk monitor samsung',
            image: 'uploads\\Product1.jpg',
            condition: 'Baru'
        },
        {
            id: uuidv4(),
            name: 'Keyboard HyperX',
            price: 600000,
            desc: 'desk Keyboard HyperX',
            image: 'uploads\\Product2.jpg',
            condition: 'Bekas'
        },
        {
            id: uuidv4(),
            name: 'Keyboard Gojodog',
            price: 400000,
            desc: 'desk Keyboard Gojodog',
            image: 'uploads\\Product3.jpg',
            condition: 'Baru'
        },
      ],
    });
  
    console.log('Seeding completed.');
}
  
  main()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });