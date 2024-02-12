import { Role } from "@prisma/client";
import prismadb from "./prismadb";
import axios from "axios";
import * as  XLSX from "xlsx";


export const importer = async ({ url, type }: { url: string, type: Role }) => {
  const upload = await prismadb.upload.create({
    data: {
      type, url
    }
  })

  // Download the XLSX file
  const response = await axios.get(url, { responseType: 'arraybuffer' });

  // Parse the XLSX file
  const workbook = XLSX.read(response.data, { type: 'buffer' });
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];

  /**
   *   {
    A: 'ΧΟΝΔΡΙΚΟ ΕΜΠΟΡΙΟ ΔΟΚΩΝ ΚΑΙ ΡΑΒΔΩΝ ΑΠΟ ΣΙΔΗΡΟ Η ΧΑΛΥΒΑ, ΣΦΥΡΗΛΑΤΗΜΕΝΩΝ',   //name
    B: 'ΚΟΛΙΤΣΙΔΑΚΗΣ  ΙΩΑΝΝΗΣ', // localTaxOffice
    C: '036468048',// profession
    D: 'ΑΘΗΝΩΝ  ΚΑΙ  ΑΓΙΑΣ ΛΑΥΡΑΣ 8', //vatNumber
    E: 'ΚΑΛΑΜΑΤΑΣ',// address
    F: 'ΕΛΛΑΔΑ',// zipCode
    G: '24100',// city
    H: '2721081059', //country
    I: '', //phoneNumber
    J: '', //phoneNumber2
    K: '',// email
    L: 'john.kolitsidakis@gmail.com' // email2
    M: '' fax
    N: '' web

  },
   */
  const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 'A', defval: '' });

  const users = jsonData.map((row: any) => ({
    name: row['A'],
    role: type,
    localTaxOffice: row['B'],
    profession: row['C'],
    vatNumber: row['D'],
    address: row['E'],
    postalCode: row['F'],
    city: row['G'],
    country: row['H'],
    phone: row['J'],
    email: row['K'] || row['L'],
    email2: row['L'],
    fax: row['M'],
    websiteUrl: row['N']
  }))



  for (let user of users) {
    try {
      const saved = await prismadb.user.create({
        data: user
      })
      console.log('.')
    } catch (e) {
      console.log('failed to save user')
      console.log(user)
      console.log(e)
    }
  }
  console.log("Done")
}