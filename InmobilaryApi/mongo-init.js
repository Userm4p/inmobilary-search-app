db = db.getSiblingDB("inmobilarydb");

// ================== Owners (10) ==================
db.owners.insertMany([
  { _id: "O1", Name: "John Smith", Address: "123 Main Street", Photo: "https://picsum.photos/200/300?random=1", Birthday: "1985-05-15" },
  { _id: "O2", Name: "Maria Garcia", Address: "45 Oak Avenue", Photo: "https://picsum.photos/200/300?random=2", Birthday: "1990-09-21" },
  { _id: "O3", Name: "Carlos Lopez", Address: "56 Palm Street", Photo: "https://picsum.photos/200/300?random=3", Birthday: "1978-12-01" },
  { _id: "O4", Name: "Anna Rodriguez", Address: "88 High Street", Photo: "https://picsum.photos/200/300?random=4", Birthday: "1995-07-30" },
  { _id: "O5", Name: "Luis Fernandez", Address: "10 Elm Street #12", Photo: "https://picsum.photos/200/300?random=5", Birthday: "1982-03-10" },
  { _id: "O6", Name: "Laura Martinez", Address: "34 New Street", Photo: "https://picsum.photos/200/300?random=6", Birthday: "1989-04-12" },
  { _id: "O7", Name: "Peter Sanchez", Address: "77 Central Street", Photo: "https://picsum.photos/200/300?random=7", Birthday: "1980-06-25" },
  { _id: "O8", Name: "Sofia Ramirez", Address: "100 Pine Avenue", Photo: "https://picsum.photos/200/300?random=8", Birthday: "1993-01-08" },
  { _id: "O9", Name: "Diego Torres", Address: "123 Maple Avenue", Photo: "https://picsum.photos/200/300?random=9", Birthday: "1986-09-18" },
  { _id: "O10", Name: "Isabel Morales", Address: "55 Moon Street", Photo: "https://picsum.photos/200/300?random=10", Birthday: "1997-12-25" }
]);

// ================== Properties (20) ==================
db.properties.insertMany([
  { _id: "P1", Name: "North Apartment", Address: "123 Evergreen Avenue", Price: 250000, CodeInternal: "C-001", Year: 2015, OwnerId: "O1" },
  { _id: "P2", Name: "Downtown House", Address: "45 Royal Street", Price: 500000, CodeInternal: "C-002", Year: 2010, OwnerId: "O2" },
  { _id: "P3", Name: "South Farm", Address: "10 Km South Road", Price: 800000, CodeInternal: "C-003", Year: 2018, OwnerId: "O3" },
  { _id: "P4", Name: "Downtown Apartment", Address: "90th Street #15-23", Price: 350000, CodeInternal: "C-004", Year: 2012, OwnerId: "O4" },
  { _id: "P5", Name: "Beach House", Address: "77 Coastal Zone", Price: 1200000, CodeInternal: "C-005", Year: 2020, OwnerId: "O5" },
  { _id: "P6", Name: "Forest Apartment", Address: "80th Forest Avenue", Price: 270000, CodeInternal: "C-006", Year: 2016, OwnerId: "O6" },
  { _id: "P7", Name: "Family House", Address: "45 Green Street", Price: 650000, CodeInternal: "C-007", Year: 2011, OwnerId: "O7" },
  { _id: "P8", Name: "Luxury Penthouse", Address: "Sky Towers", Price: 2000000, CodeInternal: "C-008", Year: 2021, OwnerId: "O8" },
  { _id: "P9", Name: "Colonial House", Address: "Historic Center", Price: 900000, CodeInternal: "C-009", Year: 2005, OwnerId: "O9" },
  { _id: "P10", Name: "Studio Apartment", Address: "100th Street #20-20", Price: 180000, CodeInternal: "C-010", Year: 2019, OwnerId: "O10" },
  { _id: "P11", Name: "Country Farm", Address: "Rose Valley Road", Price: 750000, CodeInternal: "C-011", Year: 2014, OwnerId: "O1" },
  { _id: "P12", Name: "Condominium House", Address: "15th Street Spring Complex", Price: 600000, CodeInternal: "C-012", Year: 2017, OwnerId: "O2" },
  { _id: "P13", Name: "Modern Apartment", Address: "Tower 5 Hill", Price: 400000, CodeInternal: "C-013", Year: 2018, OwnerId: "O3" },
  { _id: "P14", Name: "Mountain House", Address: "East Heights", Price: 850000, CodeInternal: "C-014", Year: 2013, OwnerId: "O4" },
  { _id: "P15", Name: "Student Apartment", Address: "University Zone", Price: 150000, CodeInternal: "C-015", Year: 2022, OwnerId: "O5" },
  { _id: "P16", Name: "House with Garden", Address: "Garden District", Price: 450000, CodeInternal: "C-016", Year: 2010, OwnerId: "O6" },
  { _id: "P17", Name: "Family Apartment", Address: "Poplar Building", Price: 300000, CodeInternal: "C-017", Year: 2019, OwnerId: "O7" },
  { _id: "P18", Name: "Lake House", Address: "Blue Lake", Price: 950000, CodeInternal: "C-018", Year: 2020, OwnerId: "O8" },
  { _id: "P19", Name: "Executive Apartment", Address: "Business Center", Price: 500000, CodeInternal: "C-019", Year: 2016, OwnerId: "O9" },
  { _id: "P20", Name: "Duplex House", Address: "Spring District", Price: 550000, CodeInternal: "C-020", Year: 2018, OwnerId: "O10" }
]);

// ================== PropertyImgs (40) ==================
let imgs = [];
for (let i = 1; i <= 20; i++) {
  imgs.push({ _id: "IMG" + (i * 2 - 1), PropertyId: "P" + i, File: "https://picsum.photos/1440/900?random=" + (20 + i * 2 - 1), Enabled: true });
  imgs.push({ _id: "IMG" + (i * 2), PropertyId: "P" + i, File: "https://picsum.photos/1440/900?random=" + (20 + i * 2), Enabled: true });
}
db.propertyImgs.insertMany(imgs);

// ================== PropertyTraces (30) ==================
let traces = [];
for (let i = 1; i <= 15; i++) {
  traces.push({ _id: "T" + (i * 2 - 1), DateScale: new Date("2021-01-" + ((i % 28) + 1)).toISOString(), Name: "Initial Sale", Value: 200000 + i * 10000, Tax: 5000 + i * 100, PropertyId: "P" + i });
  traces.push({ _id: "T" + (i * 2), DateScale: new Date("2022-06-" + ((i % 28) + 1)).toISOString(), Name: "Resale", Value: 250000 + i * 12000, Tax: 6000 + i * 150, PropertyId: "P" + i });
}
db.propertyTraces.insertMany(traces);
