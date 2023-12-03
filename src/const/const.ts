export const ChristianToBuddhistDate = (christianDate: string | Date) => {
  const christianEra = new Date(christianDate);
  const BuddhistEra = new Date(christianEra);
  BuddhistEra.setFullYear(christianEra.getFullYear() + 543);
  return BuddhistEra;
};
