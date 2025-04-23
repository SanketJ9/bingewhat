// export const productionCompanies = [
//     { id: 122, name: 'Hotstar' },
//     { id: 9, name: 'Amazon Video' },
//     { id: 15, name: 'Hulu' },
//     { id: 2, name: 'Apple TV' },
//     { id: 188, name: 'YouTube Premium' },
//     { id: 8, name: 'Netflix' },
//     { id: 237, name: 'Sony Liv' },
//     { id: 337, name: 'Disney Plus' },
//     { id: 232, name: 'Zee5' }
//   ] as const;


//   export const companyMap = productionCompanies.reduce<Record<number, string>>((acc, company) => {
//     acc[company.id] = company.name;
//     return acc;
//   }, {});