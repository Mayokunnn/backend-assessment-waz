"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const adapter_pg_1 = require("@prisma/adapter-pg");
const pg_1 = require("pg");
const bcrypt = __importStar(require("bcrypt"));
require("dotenv/config");
const dbUrl = process.env.DATABASE_URL;
console.log('Using Database URL:', dbUrl);
const pool = new pg_1.Pool({
    connectionString: dbUrl,
});
const adapter = new adapter_pg_1.PrismaPg(pool);
const prisma = new client_1.PrismaClient({ adapter });
async function main() {
    console.log('Starting database seeding...');
    const hashedAdminPassword = await bcrypt.hash('Admin123!', 10);
    const admin = await prisma.user.upsert({
        where: { email: 'admin@example.com' },
        update: {},
        create: {
            email: 'admin@example.com',
            password: hashedAdminPassword,
            firstName: 'Admin',
            lastName: 'User',
            role: client_1.Role.ADMIN,
        },
    });
    console.log('Admin user created:', admin.email);
    const hashedUserPassword = await bcrypt.hash('User123!', 10);
    const user = await prisma.user.upsert({
        where: { email: 'user@example.com' },
        update: {},
        create: {
            email: 'user@example.com',
            password: hashedUserPassword,
            firstName: 'Mayokun',
            lastName: 'Areola',
            role: client_1.Role.USER,
        },
    });
    console.log('Test user created:', user.email);
    const products = [
        {
            name: 'Wireless Headphones',
            description: 'Premium noise-cancelling wireless headphones with 30-hour battery life',
            price: 299.99,
            stock: 50,
            category: 'Electronics',
            imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
        },
        {
            name: 'Smart Watch',
            description: 'Fitness tracker with heart rate monitor and GPS',
            price: 399.99,
            stock: 30,
            category: 'Electronics',
            imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
        },
        {
            name: 'Laptop Stand',
            description: 'Ergonomic aluminum laptop stand with adjustable height',
            price: 49.99,
            stock: 100,
            category: 'Accessories',
            imageUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500',
        },
        {
            name: 'Mechanical Keyboard',
            description: 'RGB backlit mechanical gaming keyboard with blue switches',
            price: 129.99,
            stock: 45,
            category: 'Electronics',
            imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500',
        },
        {
            name: 'Wireless Mouse',
            description: 'Ergonomic wireless mouse with precision tracking',
            price: 59.99,
            stock: 80,
            category: 'Accessories',
            imageUrl: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500',
        },
        {
            name: 'USB-C Hub',
            description: '7-in-1 USB-C hub with HDMI, USB 3.0, and SD card reader',
            price: 39.99,
            stock: 120,
            category: 'Accessories',
            imageUrl: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500',
        },
        {
            name: 'Portable SSD',
            description: '1TB portable solid state drive with USB 3.2 Gen 2',
            price: 149.99,
            stock: 60,
            category: 'Storage',
            imageUrl: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500',
        },
        {
            name: 'Webcam 4K',
            description: '4K webcam with auto-focus and built-in microphone',
            price: 89.99,
            stock: 35,
            category: 'Electronics',
            imageUrl: 'https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?w=500',
        },
        {
            name: 'Phone Case',
            description: 'Protective silicone phone case with shock absorption',
            price: 19.99,
            stock: 200,
            category: 'Accessories',
            imageUrl: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500',
        },
        {
            name: 'Bluetooth Speaker',
            description: 'Portable waterproof Bluetooth speaker with 12-hour battery',
            price: 79.99,
            stock: 70,
            category: 'Electronics',
            imageUrl: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500',
        },
        {
            name: 'Screen Protector',
            description: 'Tempered glass screen protector with anti-fingerprint coating',
            price: 14.99,
            stock: 150,
            category: 'Accessories',
            imageUrl: 'https://images.unsplash.com/photo-1585790050230-5dd28404f27d?w=500',
        },
        {
            name: 'Cable Organizer',
            description: 'Desk cable management system with multiple clips',
            price: 12.99,
            stock: 180,
            category: 'Accessories',
            imageUrl: 'https://images.unsplash.com/photo-1572297794321-8f5b8f1b6e51?w=500',
        },
    ];
    for (const product of products) {
        const slugId = product.name.toLowerCase().replace(/\s+/g, '-');
        const created = await prisma.product.upsert({
            where: { slug: slugId },
            update: {},
            create: {
                ...product,
                slug: slugId,
            },
        });
        console.log(`Product created: ${created.name}`);
    }
    console.log('Database seeding completed successfully!');
}
main()
    .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
});
//# sourceMappingURL=seed.js.map