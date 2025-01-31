# DOT Intern Chalange

- Demo Video: [Demo (Loom)]
- Api Collection (Postman): [ApiCollection]

Saya menggunakan design pattern MVC (Model-View-Controller) dalam NestJS selain karena lebih familiar dengan pattern ini, saya menggunakan pattern ini karena memberikan berbagai keuntungan, termasuk pemisahan tanggung jawab yang memisahkan logika aplikasi menjadi Model (data dan aturan bisnis), View (presentasi data), dan Controller (pengendali logika dan interaksi pengguna). Dengan memisahkan komponen, pengujian unit dan integrasi menjadi lebih mudah dilakukan. Arsitektur ini juga mendukung penggunaan kembali kode dengan komponen yang terdefinisi dengan baik.

![Relational diagram](doc/relational-diagram.jpg)
## Tech Stack
- NestJS
- MySQL
- Prisma

## Installation

```sh
git clone https://github.com/farhantk/DOT-Intern.git
cd DOT-Intern
npm install
npx prisma migrate dev
npm run seed
npm run dev 
```
## User
### Admin
- email: admin@gmail.com
- password: test
### Customer
- email: customer@gmail.com
- password: test



[ApiCollection]: <https://github.com/farhantk/DOT-Intern/blob/master/doc/DOT-Intern.postman_collection.json>
[Demo (Loom)]: <https://www.loom.com/share/a60a1321bc1a4c0880ec62de81745784?sid=58b26247-889a-4767-ac32-67aee85d630a>
