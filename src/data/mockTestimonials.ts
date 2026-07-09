/**
 * mockTestimonials.ts — Dummy testimoni pembeli
 */

export interface Testimonial {
  id: string;
  name: string;
  avatar: string;      // initial letters shown in gradient circle
  game: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
  badge?: string;
}

export const MOCK_TESTIMONIALS: Testimonial[] = [
  {
    id: 'T-001',
    name: 'Ardi Setiawan',
    avatar: 'AS',
    game: 'Free Fire',
    rating: 5,
    comment: 'Mantap banget! Akun FF Sultan S1 yang gue beli beneran sesuai deskripsi. Proses transfernya cepet, gak sampe 10 menit udah beres. Trusted seller!',
    date: '2026-06-28',
    verified: true,
    badge: 'Top Buyer',
  },
  {
    id: 'T-002',
    name: 'Rizky Pratama',
    avatar: 'RP',
    game: 'Mobile Legends',
    rating: 5,
    comment: 'Udah 3x beli di sini, selalu aman. Akun ML Mythic Glory-nya full skin beneran, harga reasonable. Admin fast response di WA. Pokoknya recommended!',
    date: '2026-06-29',
    verified: true,
    badge: 'Loyal',
  },
  {
    id: 'T-003',
    name: 'Fajar Nugroho',
    avatar: 'FN',
    game: 'PUBG Mobile',
    rating: 5,
    comment: 'Conqueror account-nya legit! Semua outfit dan senjata sesuai foto. Admin juga sabar nemenin proses transfer sampe berhasil. 10/10 deh.',
    date: '2026-06-30',
    verified: true,
  },
  {
    id: 'T-004',
    name: 'Dinda Ayu',
    avatar: 'DA',
    game: 'Mobile Legends',
    rating: 4,
    comment: 'Akun ML-nya sesuai ekspektasi. Skinnya lengkap dan ranknya memang Mythic. Sedikit lama di proses konfirmasi tapi overall oke dan aman.',
    date: '2026-07-01',
    verified: true,
  },
  {
    id: 'T-005',
    name: 'Kevin Alfarizi',
    avatar: 'KA',
    game: 'Valorant',
    rating: 5,
    comment: 'Immortal account Valorant beneran keren! Skins Kuronami Vandal ada dan bisa dimainkan. Admin kasih garansi 24 jam setelah transfer. Super trusted!',
    date: '2026-07-02',
    verified: true,
    badge: 'VIP',
  },
  {
    id: 'T-006',
    name: 'Bima Saputra',
    avatar: 'BS',
    game: 'Free Fire',
    rating: 5,
    comment: 'Ini yang keempat kalinya beli akun FF di sini. Seller paling amanah yang pernah gue kenal. Proses cepet, akun langsung bisa dipake. Gas terus Farid Shop!',
    date: '2026-07-03',
    verified: true,
    badge: 'Loyal',
  },
];
