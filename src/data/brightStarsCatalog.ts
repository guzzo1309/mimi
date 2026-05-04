/** Catálogo J2000: RA en horas, Dec en grados, magnitud visual aprox. */
export type CatalogStar = {
  id: string
  /** Nombre corto para accesibilidad / tooltips */
  name: string
  raHours: number
  decDeg: number
  mag: number
}

export const BRIGHT_STARS_CATALOG: CatalogStar[] = [
  { id: 'sirius', name: 'Sirio', raHours: 6.75248, decDeg: -16.71611, mag: -1.46 },
  { id: 'canopus', name: 'Canopo', raHours: 6.39919, decDeg: -52.69572, mag: -0.74 },
  { id: 'rigilkent', name: 'Rigil Kentaurus', raHours: 14.66098, decDeg: -60.83563, mag: -0.01 },
  { id: 'arcturus', name: 'Arturo', raHours: 14.26121, decDeg: 19.18241, mag: -0.05 },
  { id: 'vega', name: 'Vega', raHours: 18.61565, decDeg: 38.78369, mag: 0.03 },
  { id: 'capella', name: 'Capella', raHours: 5.27814, decDeg: 45.99801, mag: 0.08 },
  { id: 'rigel', name: 'Rigel', raHours: 5.2423, decDeg: -8.2016, mag: 0.13 },
  { id: 'procyon', name: 'Proción', raHours: 7.65588, decDeg: 5.22499, mag: 0.34 },
  { id: 'betelgeuse', name: 'Betelgeuse', raHours: 5.91953, decDeg: 7.40706, mag: 0.5 },
  { id: 'achernar', name: 'Achernar', raHours: 1.62857, decDeg: -57.23675, mag: 0.45 },
  { id: 'hadar', name: 'Hadar', raHours: 14.30379, decDeg: -60.37355, mag: 0.61 },
  { id: 'altair', name: 'Altair', raHours: 19.8464, decDeg: 8.8683, mag: 0.76 },
  { id: 'aldebaran', name: 'Aldebarán', raHours: 4.59867, decDeg: 16.50928, mag: 0.86 },
  { id: 'spica', name: 'Spica', raHours: 13.41989, decDeg: -11.16132, mag: 0.97 },
  { id: 'antares', name: 'Antares', raHours: 16.49013, decDeg: -26.43199, mag: 1.06 },
  { id: 'pollux', name: 'Pólux', raHours: 7.75538, decDeg: 28.02621, mag: 1.14 },
  { id: 'fomalhaut', name: 'Fomalhaut', raHours: 22.96085, decDeg: -29.62224, mag: 1.16 },
  { id: 'deneb', name: 'Deneb', raHours: 20.69053, decDeg: 45.2803, mag: 1.25 },
  { id: 'mimosa', name: 'Mimosa', raHours: 12.79593, decDeg: -59.68928, mag: 1.25 },
  { id: 'regulus', name: 'Regulus', raHours: 10.13953, decDeg: 12.09559, mag: 1.4 },
  { id: 'acrux', name: 'Acrux', raHours: 12.44335, decDeg: -63.09992, mag: 0.76 },
  { id: 'gacrux', name: 'Gacrux', raHours: 12.51943, decDeg: -57.11323, mag: 1.64 },
  { id: 'bellatrix', name: 'Bellatrix', raHours: 5.4189, decDeg: 6.3497, mag: 1.64 },
  { id: 'mintaka', name: 'Mintaka', raHours: 5.603559, decDeg: -0.299598, mag: 2.41 },
  { id: 'alnilam', name: 'Alnilam', raHours: 5.603227, decDeg: -1.20192, mag: 1.69 },
  { id: 'alnitak', name: 'Alnitak', raHours: 5.679313, decDeg: -1.9426, mag: 1.74 },
  { id: 'saiph', name: 'Saiph', raHours: 5.795941, decDeg: -9.66962, mag: 2.06 },
  { id: 'castor', name: 'Cástor', raHours: 7.57663, decDeg: 31.88828, mag: 1.58 },
  { id: 'menkalinan', name: 'Menkalinan', raHours: 5.99243, decDeg: 44.94743, mag: 1.98 },
  { id: 'alnath', name: 'Alnath', raHours: 5.4382, decDeg: 28.6075, mag: 1.65 },
  { id: 'alphecca', name: 'Alphecca', raHours: 15.57818, decDeg: 26.71476, mag: 2.23 },
  { id: 'denebola', name: 'Denebola', raHours: 11.81726, decDeg: 14.57199, mag: 2.14 },
  { id: 'alphard', name: 'Alphard', raHours: 9.45979, decDeg: -8.65869, mag: 1.99 },
  { id: 'avior', name: 'Avior', raHours: 8.37547, decDeg: -59.50947, mag: 1.86 },
  { id: 'aspidiske', name: 'Aspidiske', raHours: 10.76411, decDeg: -59.77448, mag: 2.25 },
  { id: 'miaplacidus', name: 'Miaplacidus', raHours: 9.22025, decDeg: -69.71714, mag: 1.68 },
  { id: 'suhail', name: 'Suhail', raHours: 9.13327, decDeg: -43.43259, mag: 2.23 },
  { id: 'algieba', name: 'Algieba', raHours: 10.33282, decDeg: 19.84525, mag: 2.61 },
  { id: 'mizar', name: 'Mizar', raHours: 13.3987, decDeg: 54.9254, mag: 2.27 },
  { id: 'alcor', name: 'Alcor', raHours: 13.4111, decDeg: 54.9879, mag: 4.01 },
  { id: 'hamal', name: 'Hamal', raHours: 2.11999, decDeg: 23.46239, mag: 2.01 },
  { id: 'schedar', name: 'Schedar', raHours: 0.94514, decDeg: 56.53733, mag: 2.24 },
  { id: 'mirach', name: 'Mirach', raHours: 1.16217, decDeg: 35.62083, mag: 2.05 },
  { id: 'menkent', name: 'Menkent', raHours: 14.304, decDeg: -36.37, mag: 2.3 },
  { id: 'algenib', name: 'Algenib', raHours: 3.30882, decDeg: 15.1836, mag: 2.83 },
  { id: 'scheat', name: 'Scheat', raHours: 23.06287, decDeg: 28.0828, mag: 2.42 },
  { id: 'caph', name: 'Caph', raHours: 0.15294, decDeg: 59.1498, mag: 2.28 },
]
