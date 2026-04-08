import { Product, Review, Language } from './types';

export const HERO_PRODUCT: Product = {
  id: 'zenith-stratus-neon',
  name: 'Zenith Stratus',
  tagline: 'Defy Gravity.',
  price: 525,
  description: 'A masterpiece of kinetic engineering. The Stratus features a translucent ripstop upper, exposed react-foam midsole, and a silhouette that screams forward momentum. Designed for the urban avant-garde.',
  features: [
    'Translucent Ghost-Mesh™ Upper',
    'Reactive Neon Gel Sole Unit',
    'Integrated Carbon Fiber Plate',
    'Adaptive Memory Foam Collar',
    'Speed-Lacing System'
  ],
  specs: {
    'Upper': 'Ghost-Mesh™ / TPU',
    'Midsole': 'Neon Gel + EVA',
    'Weight': '245g (Featherlight)',
    'Drop': '10mm',
    'Edition': 'Limited Run (1/500)'
  },
  images: [
    'https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=2000&auto=format&fit=crop', // Vibrant Orange/White Sneakers, Studio
    'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?q=80&w=1000&auto=format&fit=crop', // Blue Detail
    'https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1000&auto=format&fit=crop', // Sole Detail
    'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1000&auto=format&fit=crop'  // Clean Profile
  ],
  videoUrl: 'https://videos.pexels.com/video-files/5302784/5302784-hd_1920_1080_25fps.mp4', // Professional fashion shoot video
  rating: 4.9,
  reviews: 342
};

export const FEATURED_PRODUCTS: Product[] = [
  {
    id: 'zenith-aero',
    name: 'Aero Dynamic',
    tagline: 'Pure Speed.',
    price: 385,
    description: 'Minimalist runner with aerodynamic knit construction.',
    features: [],
    specs: {},
    images: ['https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=1000&auto=format&fit=crop'], // Green/White Nike-ish
    rating: 4.8,
    reviews: 156
  },
  {
    id: 'zenith-urban',
    name: 'Urban Drifter',
    tagline: 'Street Essential.',
    price: 450,
    description: 'High-top silhouette with rugged durability for city life.',
    features: [],
    specs: {},
    images: ['https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?q=80&w=1000&auto=format&fit=crop'], // Red/White/Black Jordan-ish
    rating: 5.0,
    reviews: 89
  },
  {
    id: 'zenith-mono',
    name: 'Mono Low',
    tagline: 'Timeless.',
    price: 295,
    description: 'The definitive white sneaker. Leather so soft it feels liquid.',
    features: [],
    specs: {},
    images: ['https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1000&auto=format&fit=crop'], // Clean White
    rating: 4.7,
    reviews: 54
  }
];

export const REVIEWS: Review[] = [
  {
    id: '1',
    user: 'Alex K.',
    rating: 5,
    comment: 'The aesthetics are unmatched. It looks like a render but feels like a cloud. The attention to detail is insane.',
    date: '2 days ago'
  },
  {
    id: '2',
    user: 'Sarah J.',
    rating: 5,
    comment: 'I own luxury brands that cost 3x this and are half as comfortable. The packaging alone is a work of art.',
    date: '1 week ago'
  },
  {
    id: '3',
    user: 'Davide R.',
    rating: 4,
    comment: 'Slightly bold for my usual taste, but I get compliments literally every time I leave the house.',
    date: '3 weeks ago'
  }
];

export const TRANSLATIONS: Record<Language, any> = {
  EN: {
    nav: { men: 'Men', women: 'Women', journal: 'Journal', support: 'Support', bag: 'Your Bag' },
    hero: { newSeason: "New Season '25", title: "Beyond\nGravity.", desc: "The Stratus X combines translucent architectural mesh with our proprietary Neon Gel™ core. Unapologetically bold.", shopBtn: 'Shop Stratus X', watchBtn: 'Watch Film' },
    marquee: { handcrafted: 'Handcrafted in Portugal', shipping: 'Free Global Express' },
    featured: { curration: 'Curated Selection', title: 'The Edit.', viewAll: 'View All' },
    values: { auth: 'Authenticity Guaranteed', authDesc: 'Verified by master cobblers.', global: 'Global Express', globalDesc: 'Complimentary shipping worldwide.', returns: '365-Day Returns', returnsDesc: 'Return anytime within a year.' },
    product: { newSeason: 'New Season', addCart: 'Add to Bag', selectSize: 'Select Size', payCod: 'Pay on Delivery', codBtn: 'Place Order - Pay Later', concierge: 'Zenith Concierge', help: 'Need sizing advice?', designNotes: 'Design Notes', reviews: 'Reviews' },
    cart: { empty: 'Your bag is empty.', continue: 'Continue Shopping', checkout: 'Checkout Securely', subtotal: 'Subtotal' }
  },
  FR: {
    nav: { men: 'Hommes', women: 'Femmes', journal: 'Journal', support: 'Support', bag: 'Votre Panier' },
    hero: { newSeason: "Nouvelle Saison '25", title: "Au-delà de la\nGravité.", desc: "La Stratus X combine une maille architecturale translucide avec notre noyau exclusif Neon Gel™. Audacieuse sans compromis.", shopBtn: 'Acheter Stratus X', watchBtn: 'Voir le Film' },
    marquee: { handcrafted: 'Fabriqué à la main au Portugal', shipping: 'Livraison Express Gratuite' },
    featured: { curration: 'Sélection Curatée', title: "L'Édition.", viewAll: 'Voir Tout' },
    values: { auth: 'Authenticité Garantie', authDesc: 'Vérifié par nos maîtres cordonniers.', global: 'Express Mondial', globalDesc: 'Livraison offerte dans le monde entier.', returns: 'Retours 365 Jours', returnsDesc: "Retournez à tout moment dans l'année." },
    product: { newSeason: 'Nouvelle Saison', addCart: 'Ajouter au Panier', selectSize: 'Choisir la Taille', payCod: 'Paiement à la Livraison', codBtn: 'Commander - Payer plus tard', concierge: 'Conciergerie Zenith', help: 'Besoin de conseils ?', designNotes: 'Notes de Design', reviews: 'Avis' },
    cart: { empty: 'Votre panier est vide.', continue: 'Continuer vos achats', checkout: 'Paiement Sécurisé', subtotal: 'Sous-total' }
  },
  ES: {
    nav: { men: 'Hombres', women: 'Mujeres', journal: 'Diario', support: 'Soporte', bag: 'Tu Bolsa' },
    hero: { newSeason: "Nueva Temporada '25", title: "Más allá de la\nGravedad.", desc: "El Stratus X combina malla arquitectónica translúcida con nuestro núcleo exclusivo Neon Gel™. Sin disculpas.", shopBtn: 'Comprar Stratus X', watchBtn: 'Ver Película' },
    marquee: { handcrafted: 'Hecho a mano en Portugal', shipping: 'Envío Express Gratuito' },
    featured: { curration: 'Selección Curada', title: 'La Edición.', viewAll: 'Ver Todo' },
    values: { auth: 'Autenticidad Garantizada', authDesc: 'Verificado por maestros zapateros.', global: 'Express Global', globalDesc: 'Envío gratuito a todo el mundo.', returns: 'Devoluciones 365 Días', returnsDesc: 'Devuelve en cualquier momento del año.' },
    product: { newSeason: 'Nueva Temporada', addCart: 'Añadir a la Bolsa', selectSize: 'Seleccionar Talla', payCod: 'Pago Contra Entrega', codBtn: 'Ordenar - Pagar Después', concierge: 'Conserjería Zenith', help: '¿Necesitas ayuda con la talla?', designNotes: 'Notas de Diseño', reviews: 'Reseñas' },
    cart: { empty: 'Tu bolsa está vacía.', continue: 'Seguir Comprando', checkout: 'Pago Seguro', subtotal: 'Subtotal' }
  },
  AR: {
    nav: { men: 'رجالي', women: 'نسائي', journal: 'المجلة', support: 'دعم', bag: 'حقيبتك' },
    hero: { newSeason: "موسم جديد '25", title: "ما وراء\nالجاذبية.", desc: "يجمع حذاء Stratus X بين الشبكة المعمارية الشفافة وقلب Neon Gel™ الحصري. جريء بلا اعتذار.", shopBtn: 'تسوّق Stratus X', watchBtn: 'شاهد الفيلم' },
    marquee: { handcrafted: 'صُنع يدوياً في البرتغال', shipping: 'شحن سريع مجاني عالمياً' },
    featured: { curration: 'مختارات منسقة', title: 'الإصدار.', viewAll: 'عرض الكل' },
    values: { auth: 'أصالة مضمونة', authDesc: 'تم التحقق منه من قبل كبار صانعي الأحذية.', global: 'شحن عالمي سريع', globalDesc: 'شحن مجاني لجميع أنحاء العالم.', returns: 'إرجاع لمدة 365 يومًا', returnsDesc: 'إرجاع في أي وقت خلال العام.' },
    product: { newSeason: 'موسم جديد', addCart: 'أضف إلى الحقيبة', selectSize: 'اختر المقاس', payCod: 'الدفع عند الاستلام', codBtn: 'اطلب الآن - ادفع لاحقاً', concierge: 'كونسيرج زينيث', help: 'هل تحتاج مساعدة في المقاس؟', designNotes: 'ملاحظات التصميم', reviews: 'التقييمات' },
    cart: { empty: 'حقيبتك فارغة.', continue: 'متابعة التسوق', checkout: 'دفع آمن', subtotal: 'المجموع الفرعي' }
  }
};