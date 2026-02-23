import { createContext, useContext, useState, useEffect } from 'react'

const translations = {
  en: {
    // Navigation
    home: 'Home',
    gallery: 'Gallery',
    auction: 'Auction',
    about: 'About Artist',
    contact: 'Contact',
    
    // Home Page
    welcomeTo: 'Welcome to',
    heroDescription: 'Discover the soul of Africa through exceptional artworks that celebrate tradition, modernity, and the enduring spirit of the continent.',
    exploreGallery: 'Explore Gallery',
    aboutTheArtist: 'About the Artist',
    curatedCollection: 'Curated Collection',
    featuredWorks: 'Featured Works',
    featuredDescription: 'Handpicked pieces that represent the depth and diversity of African artistry',
    viewAllArtworks: 'View All Artworks',
    theArtist: 'The Artist',
    readFullStory: 'Read Full Story',
    artworks: 'Artworks',
    exhibitions: 'Exhibitions',
    countries: 'Countries',
    yearsExperience: 'Years Experience',
    ownPieceOfAfricanArt: 'Own a Piece of African Art',
    ctaDescription: 'Each artwork tells a story. Let these extraordinary pieces become part of your collection and your story.',
    startExploring: 'Start Exploring',
    
    // Gallery
    galleryDescription: 'Explore our collection of contemporary African artworks',
    searchArtworks: 'Search artworks...',
    all: 'All',
    paintings: 'Paintings',
    sculptures: 'Sculptures',
    digital: 'Digital Art',
    filterBy: 'Filter by',
    sortBy: 'Sort by',
    priceLowToHigh: 'Price: Low to High',
    priceHighToLow: 'Price: High to Low',
    newest: 'Newest',
    nameAZ: 'Name: A-Z',
    showing: 'Showing',
    noArtworksFound: 'No artworks found',
    tryAdjustingFilters: 'Try adjusting your filters or search query',
    browseGallery: 'Browse Gallery',
    
    // About Page
    biography: 'Biography',
    myStory: 'My Story',
    artisticPhilosophy: 'Artistic Philosophy',
    careerHighlights: 'Career Highlights',
    portfolio: 'Portfolio',
    selectedWorks: 'Selected Works',
    
    // Contact Page
    contactHeroDescription: 'Have questions about an artwork? Want to discuss a commission? We\'d love to hear from you.',
    internationalBuyers: 'International Buyers',
    domesticBuyers: 'Domestic Buyers',
    forBuyersOutsideTanzania: 'For buyers outside Tanzania',
    forBuyersWithinTanzania: 'For buyers within Tanzania',
    averageResponseTime: 'Average response time: Within 24 hours',
    sendMessage: 'Send a Message',
    fillOutForm: 'Fill out the form below and we\'ll get back to you as soon as possible.',
    messageSent: 'Message Sent!',
    selectTopic: 'Select a topic',
    inquiryPurchase: 'Inquiry about purchase',
    commissionRequest: 'Commission request',
    exhibitionInquiry: 'Exhibition inquiry',
    other: 'Other',
    sending: 'Sending...',
    visitOurStudio: 'Visit Our Studio',
    studioAddress: 'Studio Address',
    studioHours: 'Studio Hours',
    studioHoursDescription: 'Monday - Friday: 9AM - 6PM, Saturday: 10AM - 4PM',
    securePayments: 'Secure Payments',
    paymentOptions: 'Payment Options',
    paymentDescription: 'We offer flexible payment methods for your convenience',
    internationalPayments: 'International Payments',
    domesticPayments: 'Domestic Payments',
    subject: 'Subject',
    
    // Artwork Detail
    addToCart: 'Add to Cart',
    buyNow: 'Buy Now',
    placeBid: 'Place Bid',
    artist: 'Artist',
    medium: 'Medium',
    dimensions: 'Dimensions',
    size: 'Size',
    year: 'Year',
    description: 'Description',
    relatedArtworks: 'Related Artworks',
    artworkNotFound: 'Artwork not found',
    backToGallery: 'Back to Gallery',
    aboutThisArtwork: 'About this Artwork',
    save: 'Save',
    share: 'Share',
    viewProfile: 'View Profile',
    moreArtworks: 'More Artworks',
    
    // Cart
    yourCart: 'Your Cart',
    emptyCart: 'Your cart is empty',
    subtotal: 'Subtotal',
    checkout: 'Checkout',
    continueShopping: 'Continue Shopping',
    remove: 'Remove',
    shippingTaxesNote: 'Shipping and taxes calculated at checkout',
    proceedToCheckout: 'Proceed to Checkout',
    
    // Auction
    auctionEnds: 'Auction Ends',
    auctionEnded: 'Auction Ended',
    highestBidder: 'Highest Bidder',
    yourBid: 'Your Bid',
    bidHistory: 'Bid History',
    upcomingAuctions: 'Upcoming Auctions',
    liveNow: 'Live Now',
    endsIn: 'Ends in',
    currentBid: 'Current Bid',
    
    // Footer
    celebratingAfricanArt: 'Celebrating the rich tapestry of African art and artistry',
    navigation: 'Navigation',
    categories: 'Categories',
    contactInfo: 'Contact',
    arusha: 'Arusha, Tanzania',
    allRightsReserved: 'All rights reserved.',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
    
    // About
    aboutArtist: 'About the Artist',
    readMore: 'Read More',
    
    // Contact
    getInTouch: 'Get in Touch',
    name: 'Name',
    email: 'Email',
    message: 'Message',
    sendMessageBtn: 'Send Message',
    thankYou: 'Thank you for your message!',
  },
  sw: {
    // Navigation
    home: 'Nyumbani',
    gallery: 'Jumba la maonyesho',
    auction: 'Michezo ya mangaze',
    about: 'Mhubiri',
    contact: 'Wasiliana',
    
    // Home Page
    welcomeTo: 'Karibu kwenye',
    heroDescription: 'Gundua roho ya Afrika kupitia kazi za kisanii za kipekee zinazoadhimisha utamaduni, utandawazi, na roho ya kudumu ya bara.',
    exploreGallery: 'Chunguza Jumba la Maonyesho',
    aboutTheArtist: 'Kuhusu Mhubiri',
    curatedCollection: 'Mkusanyiko Maalum',
    featuredWorks: 'Kazi Zilizoangaziwa',
    featuredDescription: 'Vipande vilivyochukuliwa kwa mkono vinawakilisha kina na anuwai ya ukumbi wa sanaa wa Kiafrika',
    viewAllArtworks: 'Tazama Kazi Zote za Sanaa',
    theArtist: 'Mhubiri',
    readFullStory: 'Soma Hadithi Yote',
    artworks: 'Kazi za Sanaa',
    exhibitions: 'Maonyesho',
    countries: 'Nchi',
    yearsExperience: 'Miaka ya Uzoefu',
    ownPieceOfAfricanArt: 'Miliki Sehemu ya Sanaa ya Kiafrika',
    ctaDescription: 'Kila kazi ya sanaa inasimulia hadithi. Waruhusu vipengee hivi vya kipekee viwe sehemu ya mkusanyiko wako na hadithi yako.',
    startExploring: 'Anza Kuchunguza',
    
    // Gallery
    galleryDescription: 'Chunguza mkusanyiko wetu wa kazi za sanaa za Kiafrika za kisasa',
    searchArtworks: 'Tafuta kazi za sanaa...',
    all: 'Zote',
    paintings: 'Michoro',
    sculptures: 'Sanamu',
    digital: 'Sanaa ya Dijitali',
    filterBy: 'Chuja kwa',
    sortBy: 'Panga kwa',
    priceLowToHigh: 'Bei: Chini hadi Juu',
    priceHighToLow: 'Bei: Juu hadi Chini',
    newest: 'Mpya zaidi',
    nameAZ: 'Jina: A-Z',
    showing: 'Inaonyesha',
    noArtworksFound: 'Hakuna kazi za sanaa zilizopatikana',
    tryAdjustingFilters: 'Jaribu kurekebisha vichujio au hoja ya utafutaji wako',
    browseGallery: 'Chunguza Jumba la Maonyesho',
    
    // About Page
    biography: 'Wasifu',
    myStory: 'Hadithi Yangu',
    artisticPhilosophy: 'Falsafa ya Sanaa',
    careerHighlights: 'Viashiria vya Kazi',
    portfolio: 'Hotuba',
    selectedWorks: 'Kazi Zilizochaguliwa',
    
    // Contact Page
    contactHeroDescription: 'Una maswali kuhusu kazi ya sanaa? Unataka kuzungumza commission? Tungependa kusikia kutoka kwako.',
    internationalBuyers: 'Wanunuu wa Kimataifa',
    domesticBuyers: 'Wanunuu wa Ndani',
    forBuyersOutsideTanzania: 'Kwa wanunuu nje ya Tanzania',
    forBuyersWithinTanzania: 'Kwa wanunuu ndani ya Tanzania',
    averageResponseTime: 'Muda wa majibu: Ndani ya saa 24',
    sendMessage: 'Tuma Ujumbe',
    fillOutForm: 'Jaza fomu hapa chini na tutakurudulia hivi karibuni.',
    messageSent: 'Ujumbe Umetumwa!',
    selectTopic: 'Chagua somo',
    inquiryPurchase: 'Hoja kuhusu ununuzi',
    commissionRequest: 'Ombi la komisheni',
    exhibitionInquiry: 'Hoja ya maonyesho',
    other: 'Nyingine',
    sending: 'Inatuma...',
    visitOurStudio: 'Tembelea Studio Yetu',
    studioAddress: 'Anwani ya Studio',
    studioHours: 'Saa za Studio',
    studioHoursDescription: 'Jumatatu - Ijumaa: 9AD - 6PM, Jumamosi: 10AD - 4PM',
    securePayments: 'Malipo Salama',
    paymentOptions: 'Chaguo za Malipo',
    paymentDescription: 'Tunatoa njia za malipo灵活性 kwa faragha yako',
    internationalPayments: 'Malipo ya Kimataifa',
    domesticPayments: 'Malipo ya Ndani',
    subject: 'Somo',
    
    // Artwork Detail
    addToCart: 'Ongeza kwenye trolley',
    buyNow: 'Nunua Sasa',
    placeBid: 'Weka Chapa',
    artist: 'Mhusika',
    medium: 'Kati',
    dimensions: 'Vipimo',
    size: 'Ukubwa',
    year: 'Mwaka',
    description: 'Maelezo',
    relatedArtworks: 'Kazi zinazohusiana',
    artworkNotFound: 'Kazi ya sanaa haipatikani',
    backToGallery: 'Rudi kwenye Jumba la Maonyesho',
    aboutThisArtwork: 'Kuhusu Kazi hii ya Sanaa',
    save: 'Hifadhi',
    share: 'Shiriki',
    viewProfile: 'Tazama Wasifu',
    moreArtworks: 'Kazi Zaidi za Sanaa',
    
    // Cart
    yourCart: 'Trolley Yako',
    emptyCart: 'Trolley yako ni tupu',
    subtotal: 'Jumla ndogo',
    checkout: 'Malipo',
    continueShopping: 'Endelea Kununua',
    remove: 'Ondoa',
    shippingTaxesNote: 'Upelekaji na ushuru huo hulipiwa wakati wa malipo',
    proceedToCheckout: 'Endelea kwenye Malipo',
    
    // Auction
    auctionEnds: 'Michezo Inaisha',
    auctionEnded: 'Michezo Imekwisha',
    highestBidder: 'Mwenye Kuchapa Zaidi',
    yourBid: 'Chapa Yako',
    bidHistory: 'Historia ya Machapa',
    upcomingAuctions: 'Michezo ya Mangaze Inayokuja',
    liveNow: 'Inaendelea Sasa',
    endsIn: 'Inaisha katika',
    currentBid: 'Kiwango cha Juu',
    
    // Footer
    celebratingAfricanArt: 'Kusherehekea utajiri wa sanaa na ufundi wa Kiafrika',
    navigation: 'Urambazaji',
    categories: 'Viungo',
    contactInfo: 'Mawasiliano',
    arusha: 'Arusha, Tanzania',
    allRightsReserved: 'Haki zote zimehifadhiwa.',
    privacyPolicy: 'Sera ya Faragha',
    termsOfService: 'Masharti ya Huduma',
    
    // About
    aboutArtist: 'Kuhusu Mhubiri',
    readMore: 'Soma Zaidi',
    
    // Contact
    getInTouch: 'Wasiliana Nasi',
    name: 'Jina',
    email: 'Barua pepe',
    message: 'Ujumbe',
    sendMessageBtn: 'Tuma Ujumbe',
    thankYou: 'Asante kwa ujumbe wako!',
  },
  fr: {
    // Navigation
    home: 'Accueil',
    gallery: 'Galerie',
    auction: 'Encheres',
    about: 'A propos de l\'Artiste',
    contact: 'Contact',
    
    // Home Page
    welcomeTo: 'Bienvenue a',
    heroDescription: 'Decouvrez l\'ame de l\'Afrique a travers des œuvres exceptionnelles qui celebration la tradition, la modernite et l\'esprit durable du continent.',
    exploreGallery: 'Explorer la Galerie',
    aboutTheArtist: 'A propos de l\'Artiste',
    curatedCollection: 'Collection Curee',
    featuredWorks: 'Œuvres en Vedette',
    featuredDescription: 'Pieces selectionnees qui representent la profondeur et la diversite de l\'artisanat africain',
    viewAllArtworks: 'Voir Toutes les Œuvres',
    theArtist: 'L\'Artiste',
    readFullStory: 'Lire l\'Histoire Complete',
    artworks: 'Œuvres',
    exhibitions: 'Expositions',
    countries: 'Pays',
    yearsExperience: 'Annees d\'Experience',
    ownPieceOfAfricanArt: 'Possedez une Piece d\'Art Africain',
    ctaDescription: 'Chaque œuvre d\'art raconte une histoire. Laissez ces pieces extraordinaires faire partie de votre collection et de votre histoire.',
    startExploring: 'Commencer a Explorer',
    
    // Gallery
    galleryDescription: 'Explorez notre collection d\'art contemporain africain',
    searchArtworks: 'Rechercher des œuvres...',
    all: 'Tout',
    paintings: 'Peintures',
    sculptures: 'Sculptures',
    digital: 'Art numerique',
    filterBy: 'Filtrer par',
    sortBy: 'Trier par',
    priceLowToHigh: 'Prix: Croissant',
    priceHighToLow: 'Prix: Decroissant',
    newest: 'Plus recent',
    nameAZ: 'Nom: A-Z',
    showing: 'Affichage de',
    noArtworksFound: 'Aucune œuvre trouvee',
    tryAdjustingFilters: 'Essayez d\'ajuster vos filtres ou votre requete de recherche',
    browseGallery: 'Parcourir la Galerie',
    
    // About Page
    biography: 'Biographie',
    myStory: 'Mon Histoire',
    artisticPhilosophy: 'Philosophie Artistique',
    careerHighlights: 'Temps Forts de Carriere',
    portfolio: 'Portfolio',
    selectedWorks: 'Œuvres Selectionnees',
    
    // Contact Page
    contactHeroDescription: 'Vous avez des questions sur une œuvre? Voulez-vous discuter d\'une commission? Nous aimerions avoir de vos nouvelles.',
    internationalBuyers: 'Acheteurs Internationaux',
    domesticBuyers: 'Acheteurs Nationaux',
    forBuyersOutsideTanzania: 'Pour les acheteurs hors Tanzanie',
    forBuyersWithinTanzania: 'Pour les acheteurs en Tanzanie',
    averageResponseTime: 'Temps de reponse moyen: Dans les 24 heures',
    sendMessage: 'Envoyer un Message',
    fillOutForm: 'Remplissez le formulaire ci-dessous et nous vous repondrons des que possible.',
    messageSent: 'Message Envoyé!',
    selectTopic: 'Selectionnez un sujet',
    inquiryPurchase: 'Demande d\'achat',
    commissionRequest: 'Demande de commission',
    exhibitionInquiry: 'Demande d\'exposition',
    other: 'Autre',
    sending: 'Envoi en cours...',
    visitOurStudio: 'Visitez Notre Studio',
    studioAddress: 'Adresse du Studio',
    studioHours: 'Heures d\'ouverture',
    studioHoursDescription: 'Lundi - Vendredi: 9h - 18h, Samedi: 10h - 16h',
    securePayments: 'Paiements Securises',
    paymentOptions: 'Options de Paiement',
    paymentDescription: 'Nous proposons des methodes de paiement flexibles pour votre commodite',
    internationalPayments: 'Paiements Internationaux',
    domesticPayments: 'Paiements Nationaux',
    subject: 'Sujet',
    
    // Artwork Detail
    addToCart: 'Ajouter au panier',
    buyNow: 'Acheter maintenant',
    placeBid: 'Faire une offre',
    artist: 'Artiste',
    medium: 'Medium',
    dimensions: 'Dimensions',
    size: 'Taille',
    year: 'Annee',
    description: 'Description',
    relatedArtworks: 'Œuvres similaires',
    artworkNotFound: 'Œuvre non trouvee',
    backToGallery: 'Retour a la Galerie',
    aboutThisArtwork: 'A propos de cette œuvre',
    save: 'Sauvegarder',
    share: 'Partager',
    viewProfile: 'Voir le Profil',
    moreArtworks: 'Plus d\'Œuvres',
    
    // Cart
    yourCart: 'Votre panier',
    emptyCart: 'Votre panier est vide',
    subtotal: 'Sous-total',
    checkout: 'Commander',
    continueShopping: 'Continuer les achats',
    remove: 'Supprimer',
    shippingTaxesNote: 'Frais de port et taxes calcules a la commande',
    proceedToCheckout: 'Passer a la Caisse',
    
    // Auction
    auctionEnds: 'Les encheres se terminent',
    auctionEnded: 'Encheres terminees',
    highestBidder: 'Meilleur enchérisseur',
    yourBid: 'Votre offre',
    bidHistory: 'Historique des offres',
    upcomingAuctions: 'Encheres a venir',
    liveNow: 'En direct',
    endsIn: 'Se termine dans',
    currentBid: 'Enchere actuelle',
    
    // Footer
    celebratingAfricanArt: 'Celebrer la riche tapisserie de l\'art et de l\'artisanat africain',
    navigation: 'Navigation',
    categories: 'Categories',
    contactInfo: 'Contact',
    arusha: 'Arusha, Tanzanie',
    allRightsReserved: 'Tous droits reserves.',
    privacyPolicy: 'Politique de confidentialite',
    termsOfService: 'Conditions d\'utilisation',
    
    // About
    aboutArtist: 'A propos de l\'artiste',
    readMore: 'Lire la suite',
    
    // Contact
    getInTouch: 'Contactez-nous',
    name: 'Nom',
    email: 'Email',
    message: 'Message',
    sendMessageBtn: 'Envoyer le message',
    thankYou: 'Merci pour votre message!',
  }
}

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'en'
  })

  useEffect(() => {
    localStorage.setItem('language', language)
  }, [language])

  const t = (key) => {
    return translations[language][key] || translations['en'][key] || key
  }

  const changeLanguage = (lang) => {
    if (translations[lang]) {
      setLanguage(lang)
    }
  }

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
