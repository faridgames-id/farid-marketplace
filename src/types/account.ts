export type GameType = 'Free Fire' | 'Mobile Legends' | 'Valorant' | 'PUBG Mobile';
export type AccountStatus = 'Available' | 'Booked' | 'Sold';

export interface Account {
  id: string;
  game: GameType;
  title: string;
  price: number;
  tier: string;
  image: string;          // Simplified from Airtable Attachment array for now, using a primary image URL
  status: AccountStatus;
  specs: string;          // Markdown or long text detailing skins, heroes, etc.
  badge?: string;         // E.g. "Fast Sell", "Hot Item", "Sultan"
  dateAdded: string;      // ISO date string
  buyerName?: string;
  soldPrice?: number;
  dateSold?: string;      // ISO date string when sold
}
