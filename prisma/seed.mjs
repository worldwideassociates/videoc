
import { PrismaClient } from '@prisma/client'
import fs from 'fs';
import Papa from 'papaparse';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

  const prisma = new PrismaClient();


  const main = async () => {
    const csvData = fs.readFileSync(resolve(__dirname, 'localTaxOfficeList.csv'), 'utf8');
    const results = Papa.parse(csvData, {
      header: true,
      skipEmptyLines: true
    });
    const createdOffices = await prisma.taxOffice.createMany({
      data: results.data
    })

    console.log('Created offices:', createdOffices.length)
  }

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


