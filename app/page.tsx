'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Apple, ShoppingBag, Search, ChevronLeft, Check, Truck, Box, Star, ShieldCheck, Zap, X, CreditCard, ArrowRight, Mail, Lock, Loader2, User, LogOut, History } from 'lucide-react';
import emailjs from '@emailjs/browser';

// --- CẤU HÌNH EMAILJS ---
const EMAILJS_SERVICE_ID = 'service_feuyjn3'; 
const EMAILJS_TEMPLATE_ID = 'template_6pfo64s'; 
const EMAILJS_PUBLIC_KEY = 'Ym6azQAZezwF-Oj6H';   

// --- CHUNG CHO CÁC MÁY MAC ---
const NIC_OPTIONS = [
  { label: '2.5Gb Ethernet', price: 0 },
  { label: '10Gb Ethernet (RJ45)', price: 100 },
  { label: '10Gb Ethernet (SFP+)', price: 150 }
  { label: 'No NIC' }
];

const PRODUCTS = [
  {
    id: 'iphone-16-pro', category: 'iphone', name: 'iPhone 16 Pro', chip: 'A18 Pro', basePrice: 999, 
    colors: [
      { name: 'Black Titanium', code: '#3c3c3d', img: 'https://pngimg.com/d/iphone16_PNG7.png' },
      { name: 'Desert Titanium', code: '#cbb8a3', img: 'https://m.media-amazon.com/images/I/61U1XRJMAML._AC_UF894,1000_QL80_.jpg' }
    ],
    specs: {
      model: [{ label: '6.3" Display', price: 0 }, { label: '6.9" Display (Max)', price: 200 }],
      ssd: [{ label: '128GB', price: 0 }, { label: '256GB', price: 100 }, { label: '512GB', price: 300 }]
    }
  },
  { 
    id: 'mbp', category: 'mac', name: 'MacBook Pro 14"', chip: 'M4 Pro', basePrice: 1599, 
    colors: [
      { name: 'Silver', code: '#e3e4e5', img: 'https://cdsassets.apple.com/live/SZLF0YNV/images/sp/111902_mbp14-silver2.png' },
      { name: 'Space Black', code: '#1d1d1f', img: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/refurb-mbp14-m3-max-pro-spaceblack-202402?wid=1200&hei=630&fmt=jpeg&qlt=95&.v=1709175741398' }
    ],
    specs: {
      cpu: [{ label: 'M4 Pro Chip', price: 0 }, { label: 'M4 Max Chip', price: 900 }],
      ssd: [{ label: '512GB', price: 0 }, { label: '1TB', price: 200 }],
      ram: [{ label: '18GB Unified Memory', price: 0 }, { label: '36GB Unified Memory', price: 400 }, { label: '128GB Unified Memory', price: 1200 }],
      nic: NIC_OPTIONS
    }
  },
  { 
    id: 'imac', category: 'mac', name: 'iMac 24"', chip: 'M4', basePrice: 1299, 
    colors: [
      { name: 'Blue', code: '#a2b9d3', img: 'https://cdn.shopify.com/s/files/1/0024/9803/5810/files/686825-Product-0-I-638657536809989990.jpg?v=1738188554' },
      { name: 'Pink', code: '#e9a7ad', img: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/refurb-imac-24-touch-id-pink-202402?wid=2000&hei=2000&fmt=jpeg&qlt=90&.v=1709178834972' }
    ],
    specs: {
      cpu: [{ label: '8-core CPU', price: 0 }, { label: '10-core CPU', price: 200 }],
      ssd: [{ label: '256GB', price: 0 }, { label: '512GB', price: 200 }],
      ram: [{ label: '16GB Unified Memory', price: 0 }, { label: '24GB Unified Memory', price: 200 }, { label: '32GB Unified Memory', price: 400 }],
      nic: NIC_OPTIONS
    }
  },
  { 
    id: 'studio', category: 'mac', name: 'Mac Studio', chip: 'M2 Ultra', basePrice: 1999, 
    colors: [{ name: 'Silver', code: '#e3e4e5', img: 'https://cdsassets.apple.com/live/7WUAS350/images/tech-specs/mac-studio-2025.png' }],
    specs: {
      cpu: [{ label: 'M2 Max', price: 0 }, { label: 'M2 Ultra', price: 2000 }],
      ssd: [{ label: '512GB', price: 0 }, { label: '1TB', price: 200 }, { label: '2TB', price: 600 }],
      ram: [{ label: '64GB Unified Memory', price: 0 }, { label: '128GB Unified Memory', price: 800 }, { label: '192GB Unified Memory', price: 1600 }],
      nic: NIC_OPTIONS
    }
  },
  { 
    id: 'mac-pro', category: 'mac', name: 'Mac Pro', chip: 'Custom Server', basePrice: 6999, 
    colors: [{ name: 'Silver', code: '#e3e4e5', img: 'https://ipowerresale.com/cdn/shop/files/media_01a10052-b554-4944-8244-10bbdd908256.png?v=1761066570' }],
    specs: {
      cpu: [
        { label: 'Apple M5 Ultra (Base)', price: 0 }, 
        { label: 'Intel Xeon Silver 4314 (16-core)', price: 800 },
        { label: 'Intel Xeon Gold 6338 (32-core)', price: 2500 },
        { label: 'Intel Xeon Platinum 8380 (40-core)', price: 5000 },
        { label: 'AMD EPYC 9654 (96-core)', price: 7500 }
      ],
      gpu: [
        { label: 'Integrated / Base GPU', price: 0 },
        { label: 'Radeon Pro W6800X Duo', price: 2400 },
        { label: 'NVIDIA RTX 4090 24GB', price: 1800 },
        { label: 'NVIDIA RTX 6000 Ada 64GB', price: 3600 },
      ],
      ram: [
        { label: '64GB Unified Memory', price: 0 }, 
        { label: '192GB Unified Memory', price: 800 },
        { label: '384GB Unified Memory', price: 1600 }, 
        { label: '5TB Server ECC Memory', price: 6000 },
      ],
      ssd: [
        { label: '1TB NVMe SSD', price: 0 }, 
        { label: '4TB NVMe SSD', price: 1000 }, 
        { label: '1PB NVMe Array', price: 9000 }
      ],
      nic: NIC_OPTIONS
    }
  },
  { 
    id: 'mini', category: 'mac', name: 'Mac mini', chip: 'M4', basePrice: 599, 
    colors: [{ name: 'Silver', code: '#e3e4e5', img: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/mac-mini-chip-unselect-202601-gallery-1_FMT_WHH?wid=690&hei=720&fmt=p-jpg&qlt=80&.v=d1pXNGRPZVVoYmlPOFhNR3g4R2wxUGFyNWMrRXhVOURuN2tLWDJRa3lPZ2JLeEpwTVdId3c2M0IzMUdUQVhQaXNQSmo4S3Y2K1lXWjJLUjd2dkU2MDJ5aFM4QSthSG1nSUl6WXJQME1SZ2tHUmF6alNHcDh0aHZjREFOanRZMHFoNG5zaDVpV0hVYUV5eVFvejlsM2J3&traceId=1' }],
    specs: {
      cpu: [{ label: 'M4 Chip', price: 0 }, { label: 'M4 Pro Chip', price: 400 }],
      ssd: [{ label: '256GB', price: 0 }, { label: '512GB', price: 200 }],
      ram: [{ label: '16GB Unified Memory', price: 0 }, { label: '24GB Unified Memory', price: 200 }, { label: '32GB Unified Memory', price: 400 }],
      nic: NIC_OPTIONS
    }
  },
  { 
    id: 'ipad-pro', category: 'ipad', name: 'iPad Pro', chip: 'M4', basePrice: 999, 
    colors: [
      { name: 'Space Black', code: '#1d1d1f', img: 'https://ipowerresale.com/cdn/shop/files/media_b69809b8-c1ac-4bd2-b825-cd876e94b543_1946x.png?v=1771398538' },
      { name: 'Silver', code: '#e3e4e5', img: 'https://www.provideocoalition.com/wp-content/uploads/Apple-M4-chip-iPad-Pro-silver-and-space-black_X.png' }
    ],
    specs: {
      model: [{ label: '11-inch', price: 0 }, { label: '13-inch', price: 300 }],
      ssd: [{ label: '256GB', price: 0 }, { label: '512GB', price: 200 }]
    }
  },
  { 
    id: 'airpods-max', category: 'accessories', name: 'AirPods Max', chip: 'H2', basePrice: 549, 
    colors: [
      { name: 'Midnight', code: '#1d1d1f', img: 'https://9to5toys.com/wp-content/uploads/sites/5/2025/07/AirPods-Max-Midnight.jpg?quality=82&strip=all&w=1600' },
      { name: 'Starlight', code: '#faf0e6', img: 'https://shopowltech.com/media/catalog/product/cache/26228c64a1d76a1479e7cc55771b2e97/9/5/95945e3fStarlight_20_28Side_29.png' }
    ],
    specs: {
      model: [{ label: 'Standard', price: 0 }]
    }
  },
  { 
    id: 'magic-keyboard', category: 'accessories', name: 'Magic Keyboard', chip: 'Wireless', basePrice: 199, 
    colors: [{ name: 'White', code: '#ffffff', img: 'https://upload.wikimedia.org/wikipedia/commons/c/c0/Apple_Magic_Keyboard_-_US_remix_transparent.png' }],
    specs: {
      model: [{ label: 'US English', price: 0 }, { label: 'Vietnamese', price: 0 }]
    }
  },
  { 
    id: 'magic-mouse', category: 'accessories', name: 'Magic Mouse', chip: 'Wireless', basePrice: 79, 
    colors: [
      { name: 'White', code: '#ffffff', img: 'https://toppng.com/uploads/thumbnail/apple-mla02za-a-magic-mouse-2-115497881996ytcixprph.png' },
      { name: 'Black', code: '#1d1d1f', img: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MMMQ3?wid=1144&hei=1144&fmt=jpeg' }
    ],
    specs: {
      model: [{ label: 'Standard', price: 0 }]
    }
  },
  { 
    id: 'ssd-acpi', category: 'accessories', name: 'SSD For Mac (ACPI)', chip: 'ACPI (PCIE)', basePrice: 199, 
    colors: [{ name: 'Space Gray', code: '#545558', img: 'https://www.bhphotovideo.com/images/fb/apple_mxnq2am_a_4tb_ssd_kit_for_1570292.jpg' }],
    specs: {
      ssd: [{ label: '1TB', price: 0 }, { label: '2TB', price: 200 }, { label: '4TB', price: 600 }, { label: '8TB', price: 1200 }, { label: '16TB', price: 3000 }, { label: '32TB', price: 4500 }, { label: '64TB', price: 7000}]
    }
  },
  { 
    id: 'mb-air-m5', category: 'mac', name: 'MacBook Air (M5)', chip: 'M5', basePrice: 1099, 
    colors: [
      { name: 'Midnight', code: '#2e3641', img: 'https://www.apple.com/v/macbook-air/y/images/overview/hero/hero_endframe__c67cz35iy9me_large.png' },
      { name: 'Starlight', code: '#faf0e6', img: 'https://cdn.shopify.com/s/files/1/0641/9388/8321/files/50098293_1050999.png?v=1773185199' }
    ],
    specs: {
      model: [{ label: '13-inch', price: 0 }, { label: '15-inch', price: 200 }],
      cpu: [{ label: 'M5 Chip (8-core)', price: 0 }, { label: 'M5 Chip (10-core)', price: 150 }],
      ram: [{ label: '16GB Unified Memory', price: 0 }, { label: '24GB', price: 200 }],
      ssd: [{ label: '256GB', price: 0 }, { label: '512GB', price: 200 }]
    }
  },
  { 
    id: 'mb-neo', category: 'mac', name: 'MacBook Neo', chip: 'M5', basePrice: 799, 
    colors: [{ name: 'Silver', code: '#e3e4e5', img: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/macbook-neo-specs-options-select-202603-silver?wid=5120&hei=3280&fmt=p-jpg&qlt=80&.v=aXdUbnVNSHBKZTgyUzlKYTQ3UG0ySko5NzJ2Z3dVQzlTT2FtR1JERDVwcDdDaFd2ZkVvT014dzlUcURhc0JhenJUNGJWZ1llU1plZmhBekVhZm5NQnJ4YnM0WFduSzYyM1pGalVqQlB0d0lHb3JuMTZBRld0YTRsRERmUTFTT2VFZ2pKQkI0V0ZnZDIvNGZqaEFxNlVn&traceId=1' }],
    specs: {
      model: [{ label: '13-inch Ultra-Portable', price: 0 }],
      ssd: [{ label: '256GB', price: 0 }, { label: '512GB', price: 150 }]
    }
  },
  { 
    id: 'studio-display-2', category: 'accessories', name: 'Studio Display 2', chip: 'A15 Bionic', basePrice: 1799, 
    colors: [{ name: 'Silver', code: '#e3e4e5', img: 'https://p.turbosquid.com/ts-thumb/Zt/XoUNLT/r3/apple_studio_display_01/jpg/1667322451/1920x1080/fit_q87/6705d0e72daec4121d897235b16c23abb43b321c/apple_studio_display_01.jpg' }],
    specs: {
      model: [{ label: 'Standard Glass', price: 0 }, { label: 'Nano-texture Glass', price: 300 }],
      stand: [{ label: 'Tilt-adjustable', price: 0 }, { label: 'Tilt- and height-adjustable', price: 400 }]
    }
  },
  { 
    id: 'mbp-m5', category: 'mac', name: 'MacBook Pro (M5)', chip: 'M5 Pro', basePrice: 1999, 
    colors: [{ name: 'Space Black', code: '#1d1d1f', img: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-m3-max-pro-spaceblack-select-202310?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1697311054290' }],
    specs: {
      cpu: [{ label: 'M5 Pro Chip', price: 0 }, { label: 'M5 Max Chip', price: 800 }],
      ram: [{ label: '36GB', price: 0 }, { label: '64GB', price: 400 }, { label: '128GB', price: 1000 }],
      ssd: [{ label: '512GB', price: 0 }, { label: '1TB', price: 200 }]
    }
  }
];

const formatUSD = (val: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

export default function AppleStore() {
  const [mounted, setMounted] = useState(false);
  const [category, setCategory] = useState('store');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  
  // State quản lý toàn bộ các option cấu hình
  const [config, setConfig] = useState({ color: 0, model: 0, ram: 0, ssd: 0, gpu: 0, nic: 0 });

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup' | 'history'>('login');
  const [user, setUser] = useState<any>(null);
  const [authForm, setAuthForm] = useState({ name: '', email: '', password: '' });

  const [cart, setCart] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'none' | 'payment' | 'details' | 'processing' | 'success'>('none');
  const [email, setEmail] = useState('');

  useEffect(() => { 
    setMounted(true); 
    const savedUser = localStorage.getItem('ben_store_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setEmail(JSON.parse(savedUser).email);
    }
  }, []);

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser = { name: authForm.name, email: authForm.email, password: authForm.password, orders: [] };
    const allUsers = JSON.parse(localStorage.getItem('ben_store_all_users') || '[]');
    if (allUsers.find((u: any) => u.email === authForm.email)) return alert("Email already registered!");
    allUsers.push(newUser);
    localStorage.setItem('ben_store_all_users', JSON.stringify(allUsers));
    setUser(newUser);
    localStorage.setItem('ben_store_user', JSON.stringify(newUser));
    setEmail(newUser.email);
    setIsAuthOpen(false);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const allUsers = JSON.parse(localStorage.getItem('ben_store_all_users') || '[]');
    const found = allUsers.find((u: any) => u.email === authForm.email && u.password === authForm.password);
    if (found || (authForm.email === 'ben@apple.com' && authForm.password === '123')) {
      const loggedUser = found || { name: 'Ben', email: 'ben@apple.com', orders: [] };
      setUser(loggedUser);
      localStorage.setItem('ben_store_user', JSON.stringify(loggedUser));
      setEmail(loggedUser.email);
      setIsAuthOpen(false);
    } else alert("Incorrect email or password.");
  };

  const handleLogout = () => { setUser(null); localStorage.removeItem('ben_store_user'); setIsAuthOpen(false); };

  const handleProcessCheckout = () => {
    setCheckoutStep('processing');
    const orderId = Math.floor(Math.random() * 1000000).toString();
    const templateParams = {
      user_name: user?.name || "Ben Store Customer",
      user_email: email, 
      order_id: orderId,
      order_details: cart.map((item: any) => `
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
    <tr>
      <td width="120" valign="top" style="padding-right: 20px;">
        <div style="background-color: #f5f5f7; border-radius: 12px; padding: 10px;">
          <img src="${item.img}" width="100" style="display: block; object-fit: contain;" alt="${item.name}">
        </div>
      </td>
      <td valign="top" style="padding-top: 5px;">
        <p style="margin: 0 0 5px 0; color: #0071e3; font-weight: 700; font-size: 16px;">• ${item.name}</p>
        <p style="margin: 0 0 10px 0; color: #86868b; font-size: 13px; line-height: 1.5;">${item.details}</p>
        <p style="margin: 0; color: #1c1c1e; font-weight: 600; font-size: 14px;">Giá: ${formatUSD(item.price)}</p>
      </td>
    </tr>
  </table>
`).join(''),
      total_price: formatUSD(totalCartPrice),
      product_image: cart.length > 0 ? cart[0].img : '',
    };

    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY)
    .then(() => {
      if (user) {
        const newOrder = { id: orderId, date: new Date().toLocaleDateString('en-GB'), total: totalCartPrice, items: cart.map(i => i.name).join(', ') };
        const updatedUser = { ...user, orders: [newOrder, ...(user.orders || [])] };
        setUser(updatedUser);
        localStorage.setItem('ben_store_user', JSON.stringify(updatedUser));
        const allUsers = JSON.parse(localStorage.getItem('ben_store_all_users') || '[]');
        const idx = allUsers.findIndex((u: any) => u.email === user.email);
        if (idx > -1) { allUsers[idx] = updatedUser; localStorage.setItem('ben_store_all_users', JSON.stringify(allUsers)); }
      }
      setCheckoutStep('success');
    })
    .catch((err) => { console.error("EmailJS Error:", err); setCheckoutStep('success'); });
  };

  const filteredProducts = category === 'store' ? PRODUCTS : PRODUCTS.filter(p => p.category === category);

  const calculateCurrentPrice = () => {
    if (!selectedProduct) return 0;
    const s = selectedProduct.specs;
    
    const modelPrice = s.model && s.model[config.model] ? s.model[config.model].price 
                     : (s.cpu && s.cpu[config.model] ? s.cpu[config.model].price : 0);
                     
    const ramPrice = s.ram && s.ram[config.ram] ? s.ram[config.ram].price : 0;
    const ssdPrice = s.ssd && s.ssd[config.ssd] ? s.ssd[config.ssd].price : 0;
    const gpuPrice = s.gpu && s.gpu[config.gpu] ? s.gpu[config.gpu].price : 0;
    const nicPrice = s.nic && s.nic[config.nic] ? s.nic[config.nic].price : 0;
    
    return selectedProduct.basePrice + modelPrice + ramPrice + ssdPrice + gpuPrice + nicPrice;
  };

  const handleAddToBag = () => {
    const s = selectedProduct.specs;
    let details = selectedProduct.colors[config.color].name;
    
    if (s.cpu && s.cpu[config.model]) details += `, ${s.cpu[config.model].label}`;
    else if (s.model && s.model[config.model]) details += `, ${s.model[config.model].label}`;
    
    if (s.ram && s.ram[config.ram]) details += `, ${s.ram[config.ram].label}`;
    if (s.gpu && s.gpu[config.gpu]) details += `, ${s.gpu[config.gpu].label}`;
    if (s.ssd && s.ssd[config.ssd]) details += `, ${s.ssd[config.ssd].label}`;
    if (s.nic && s.nic[config.nic]) details += `, ${s.nic[config.nic].label}`;

    const newItem = { id: `item-${Date.now()}`, name: selectedProduct.name, img: selectedProduct.colors[config.color].img, price: calculateCurrentPrice(), details };
    setCart([...cart, newItem]);
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => setCart(cart.filter(item => item.id !== id));
  const totalCartPrice = cart.reduce((sum, item) => sum + item.price, 0);

  if (!mounted) return null;

  return (
    <main className="bg-white text-[#1d1d1f] min-h-screen antialiased">
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-black/5 h-12 flex items-center justify-between px-10 text-[12px] font-bold">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => {setCategory('store'); setSelectedProduct(null);}}>
          <Apple size={18} />
          <span className="tracking-tight uppercase">BEN STORE</span>
        </div>
        <div className="flex gap-8">
          {['store', 'mac', 'ipad', 'iphone', 'accessories'].map((cat) => (
            <button key={cat} onClick={() => {setCategory(cat); setSelectedProduct(null);}} className={`capitalize transition ${category === cat ? 'text-black underline underline-offset-4' : 'text-gray-400 hover:text-black'}`}>
              {cat}
            </button>
          ))}
        </div>
        <div className="flex gap-5 items-center">
          <Search size={16} className="cursor-pointer" />
          <div className="cursor-pointer hover:text-blue-600 transition" onClick={() => {setIsAuthOpen(true); setAuthMode(user ? 'history' : 'login');}}>
             {user ? <span className="text-blue-600">Hi, {user.name}</span> : <User size={16} />}
          </div>
          <div className="relative cursor-pointer" onClick={() => setIsCartOpen(true)}>
            <ShoppingBag size={16} />
            {cart.length > 0 && <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">{cart.length}</span>}
          </div>
        </div>
      </nav>

      {/* AUTH MODAL */}
      <AnimatePresence>
        {isAuthOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsAuthOpen(false)} className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-white w-full max-w-lg rounded-[32px] p-8 shadow-2xl max-h-[85vh] overflow-y-auto">
              <X className="absolute top-6 right-6 cursor-pointer text-gray-300 hover:text-black" onClick={() => setIsAuthOpen(false)} />
              
              {authMode === 'login' && (
                <form onSubmit={handleLogin} className="space-y-6">
                  <div className="text-center mb-8">
                    <Apple size={40} className="mx-auto mb-4" />
                    <h2 className="text-2xl font-bold">Sign in to Ben Store</h2>
                  </div>
                  <input required type="email" placeholder="Email" className="w-full p-4 border rounded-xl outline-none focus:ring-2 ring-blue-500" onChange={(e) => setAuthForm({...authForm, email: e.target.value})} />
                  <input required type="password" placeholder="Password" className="w-full p-4 border rounded-xl outline-none focus:ring-2 ring-blue-500" onChange={(e) => setAuthForm({...authForm, password: e.target.value})} />
                  <button type="submit" className="w-full bg-black text-white py-4 rounded-xl font-bold hover:opacity-80 transition">Sign In</button>
                  <p className="text-center text-xs text-gray-400">New here? <span className="text-blue-600 cursor-pointer font-bold" onClick={() => setAuthMode('signup')}>Create your Account.</span></p>
                </form>
              )}

              {authMode === 'signup' && (
                <form onSubmit={handleSignUp} className="space-y-6">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold">Create your Account</h2>
                    <p className="text-gray-400">Join the Ben Store community.</p>
                  </div>
                  <input required type="text" placeholder="Full Name" className="w-full p-4 border rounded-xl outline-none focus:ring-2 ring-blue-500" onChange={(e) => setAuthForm({...authForm, name: e.target.value})} />
                  <input required type="email" placeholder="Email Address" className="w-full p-4 border rounded-xl outline-none focus:ring-2 ring-blue-500" onChange={(e) => setAuthForm({...authForm, email: e.target.value})} />
                  <input required type="password" placeholder="Password" className="w-full p-4 border rounded-xl outline-none focus:ring-2 ring-blue-500" onChange={(e) => setAuthForm({...authForm, password: e.target.value})} />
                  <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:opacity-80 transition">Sign Up</button>
                  <p className="text-center text-xs text-gray-400" onClick={() => setAuthMode('login')}>Already have an account? <span className="text-blue-600 cursor-pointer font-bold">Sign in.</span></p>
                </form>
              )}

              {authMode === 'history' && user && (
                <div className="space-y-6 py-4">
                   <div className="flex justify-between items-center border-b pb-4">
                      <h2 className="text-2xl font-bold">Order History</h2>
                      <button onClick={handleLogout} className="text-red-500 text-sm flex items-center gap-1 hover:underline"><LogOut size={14}/> Log Out</button>
                   </div>
                   {user.orders?.length > 0 ? (
                     <div className="space-y-4">
                        {user.orders.map((order: any) => (
                          <div key={order.id} className="p-5 bg-gray-50 rounded-2xl border border-gray-100">
                             <div className="flex justify-between text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest">
                                <span>Order #{order.id}</span>
                                <span className="text-blue-600">{order.date}</span>
                             </div>
                             <p className="font-bold text-sm mb-1">{order.items}</p>
                             <p className="text-lg font-bold">{formatUSD(order.total)}</p>
                          </div>
                        ))}
                     </div>
                   ) : (
                     <div className="text-center py-10">
                        <Box size={40} className="mx-auto text-gray-200 mb-4" />
                        <p className="text-gray-400">No orders found.</p>
                     </div>
                   )}
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CART SIDEBAR */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCartOpen(false)} className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60]" />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl p-8 overflow-y-auto">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold">Your Bag.</h2>
                <X className="cursor-pointer text-gray-400 hover:text-black" onClick={() => setIsCartOpen(false)} />
              </div>
              {cart.length === 0 ? (
                <div className="text-center py-20 text-gray-400">Your bag is empty.</div>
              ) : (
                <div className="space-y-6">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-4 border-b pb-6">
                      <img src={item.img} className="w-20 h-20 object-contain bg-[#f5f5f7] rounded-xl" />
                      <div className="flex-1">
                        <h4 className="font-bold">{item.name}</h4>
                        <p className="text-xs text-gray-500">{item.details}</p>
                        <p className="font-medium mt-2">{formatUSD(item.price)}</p>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-xs text-blue-600 hover:underline">Remove</button>
                    </div>
                  ))}
                  <div className="pt-6 border-t">
                    <div className="flex justify-between text-2xl font-bold">
                      <span>Total</span>
                      <span>{formatUSD(totalCartPrice)}</span>
                    </div>
                    <button onClick={() => setCheckoutStep('payment')} className="w-full bg-[#0071e3] text-white py-4 rounded-xl font-bold mt-8 hover:bg-[#0077ed]">Checkout</button>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* CHECKOUT OVERLAY */}
      <AnimatePresence>
        {checkoutStep !== 'none' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-white flex items-center justify-center p-6 overflow-y-auto">
            <div className="max-w-md w-full py-10">
              {checkoutStep === 'payment' ? (
                <motion.div initial={{ y: 20 }} animate={{ y: 0 }}>
                  <h2 className="text-4xl font-bold mb-4 text-center tracking-tight">Payment Method</h2>
                  <p className="text-gray-500 text-center mb-10">Choose your payment option.</p>
                  <div className="space-y-4">
                    <button onClick={() => setCheckoutStep('details')} className="w-full p-6 border-2 rounded-2xl flex items-center gap-4 hover:border-blue-500 transition group text-left">
                      <div className="p-3 bg-orange-100 rounded-full group-hover:bg-orange-200"><Zap className="text-orange-600" /></div>
                      <div className="flex-1"><p className="font-bold">Pay via Instalments</p><p className="text-xs text-gray-400">Flexible monthly payments.</p></div>
                      <ArrowRight size={18} className="text-gray-300" />
                    </button>
                    <button onClick={() => setCheckoutStep('details')} className="w-full p-6 border-2 rounded-2xl flex items-center gap-4 hover:border-blue-500 transition group text-left">
                      <div className="p-3 bg-blue-100 rounded-full group-hover:bg-blue-200"><CreditCard className="text-blue-600" /></div>
                      <div className="flex-1"><p className="font-bold">Card / Cash</p><p className="text-xs text-gray-400">Visa, Mastercard, or Cash on delivery.</p></div>
                      <ArrowRight size={18} className="text-gray-300" />
                    </button>
                  </div>
                  <button onClick={() => setCheckoutStep('none')} className="w-full mt-8 text-gray-400 text-sm hover:text-black underline">Cancel</button>
                </motion.div>
              ) : checkoutStep === 'details' ? (
                <motion.div initial={{ y: 20 }} animate={{ y: 0 }} className="space-y-6">
                  <div className="flex items-center gap-2 cursor-pointer text-blue-600 font-medium mb-4 justify-center" onClick={() => setCheckoutStep('payment')}><ChevronLeft size={16}/> Back</div>
                  <h2 className="text-3xl font-bold tracking-tight text-center">Checkout Details</h2>
                  
                  <div className="space-y-4 text-left">
                    <div>
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2 mb-2"><Mail size={12}/> Confirm Email</label>
                      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" className="w-full p-4 border rounded-xl outline-none focus:border-blue-500 transition" />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2 mb-2"><Lock size={12}/> Payment Details</label>
                      <input type="text" placeholder="Card Number" className="w-full p-4 border rounded-xl outline-none focus:border-blue-500 transition mb-3" />
                      <div className="flex gap-4">
                        <input type="text" placeholder="MM / YY" className="w-1/2 p-4 border rounded-xl outline-none focus:border-blue-500 transition" />
                        <input type="text" placeholder="CVC" className="w-1/2 p-4 border rounded-xl outline-none focus:border-blue-500 transition" />
                      </div>
                    </div>
                  </div>

                  <button 
                    disabled={!email.includes('@')} 
                    onClick={handleProcessCheckout} 
                    className={`w-full py-4 rounded-xl font-bold shadow-lg transition-all ${email.includes('@') ? 'bg-black text-white hover:opacity-90' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                  >
                    Pay {formatUSD(totalCartPrice)}
                  </button>
                </motion.div>
              ) : checkoutStep === 'processing' ? (
                <div className="text-center space-y-4">
                  <Loader2 className="animate-spin mx-auto text-blue-600" size={48} />
                  <h2 className="text-2xl font-bold">Processing...</h2>
                  <p className="text-gray-500 italic">"Please wait while we confirm your order."</p>
                </div>
              ) : (
                <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="text-center">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check size={40} className="text-green-600" />
                  </div>
                  <h2 className="text-4xl font-bold mb-4 tracking-tight">Order Placed!</h2>
                  <p className="text-gray-500 mb-8 leading-relaxed">A confirmation email has been sent to <span className="font-bold text-black">{email}</span>.</p>
                  <button onClick={() => {setCart([]); setCheckoutStep('none'); setIsCartOpen(false); setSelectedProduct(null);}} className="bg-black text-white px-10 py-3 rounded-full font-bold hover:opacity-80">Continue Shopping</button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PRODUCT LIST & CONFIGURATION */}
      <AnimatePresence mode="wait">
        {!selectedProduct ? (
          <motion.section key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-24 pb-20">
            {category === 'store' && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl mx-auto px-6 mb-24 text-center">
                <h1 className="text-4xl md:text-7xl font-bold tracking-tighter mb-6 bg-gradient-to-r from-gray-900 to-gray-500 bg-clip-text text-transparent">
                  Store. <span className="text-gray-400">The best way to buy the products you love.</span>
                </h1>
                <div className="flex flex-wrap justify-center gap-6 md:gap-12 mt-12 text-sm font-medium text-gray-500">
                  <div className="flex items-center gap-2"><Star size={16} className="text-orange-500"/> Expert Support</div>
                  <div className="flex items-center gap-2"><ShieldCheck size={16} className="text-green-500"/> 2-Year Warranty</div>
                  <div className="flex items-center gap-2"><Zap size={16} className="text-blue-500"/> Fast Delivery</div>
                </div>
              </motion.div>
            )}

            <div className="max-w-7xl mx-auto px-6">
              {category !== 'store' && <h2 className="text-5xl font-bold mb-12 tracking-tight capitalize">{category}.</h2>}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((p, idx) => (
                  <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} className="bg-[#f5f5f7] rounded-[32px] p-8 flex flex-col items-center hover:scale-[1.02] transition-transform border border-black/5 cursor-default">
                    <span className="text-[10px] font-bold text-orange-600 uppercase tracking-widest">{p.chip} Chip</span>
                    <h3 className="text-2xl font-bold mt-2">{p.name}</h3>
                    <img src={p.colors[0].img} alt={p.name} className="w-full h-56 object-contain my-8" />
                    <p className="mb-6 font-medium text-gray-500">From {formatUSD(p.basePrice)}</p>
                    <button onClick={() => {setSelectedProduct(p); setConfig({color:0, model:0, ram:0, ssd:0, gpu:0, nic:0})}} className="bg-[#0071e3] text-white px-10 py-2 rounded-full font-bold hover:bg-[#0077ed]">Buy</button>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>
        ) : (
          <motion.section key="config" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="pt-24 pb-40 px-6 max-w-[1100px] mx-auto">
            <button onClick={() => setSelectedProduct(null)} className="flex items-center text-blue-600 mb-8 font-medium hover:underline"><ChevronLeft size={18}/> Back</button>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
              <div className="lg:sticky lg:top-24 h-fit">
                <motion.img key={config.color} initial={{ opacity: 0 }} animate={{ opacity: 1 }} src={selectedProduct.colors[config.color]?.img} className="w-full h-[300px] md:h-[450px] object-contain" />
              </div>
              <div className="space-y-12">
                <h1 className="text-5xl font-bold tracking-tight">{selectedProduct.name}</h1>
                <div>
                  <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-gray-400">Finish</h4>
                  <div className="flex gap-4">
                    {selectedProduct.colors.map((c:any, i:number) => (
                      <button key={i} onClick={() => setConfig({...config, color: i})} className={`w-10 h-10 rounded-full border-2 p-0.5 ${config.color === i ? 'border-blue-500 scale-110' : 'border-gray-200'}`}>
                        <div className="w-full h-full rounded-full border border-black/5" style={{ backgroundColor: c.code }} />
                      </button>
                    ))}
                  </div>
                  <p className="mt-2 text-sm font-medium">{selectedProduct.colors[config.color].name}</p>
                </div>
                
                <OptionGroup title={selectedProduct.category === 'mac' ? 'Processor' : 'Model'} options={selectedProduct.specs.model || selectedProduct.specs.cpu} activeIndex={config.model} onChange={(i:number) => setConfig({...config, model: i})} />
                
                {selectedProduct.specs.gpu && (
                  <OptionGroup title="Graphics" options={selectedProduct.specs.gpu} activeIndex={config.gpu} onChange={(i:number) => setConfig({...config, gpu: i})} />
                )}

                {selectedProduct.specs.ram && (
                  <OptionGroup title="Memory" options={selectedProduct.specs.ram} activeIndex={config.ram} onChange={(i:number) => setConfig({...config, ram: i})} />
                )}

                {selectedProduct.specs.ssd && (
                  <OptionGroup title="Storage" options={selectedProduct.specs.ssd} activeIndex={config.ssd} onChange={(i:number) => setConfig({...config, ssd: i})} />
                )}

                {selectedProduct.specs.nic && (
                  <OptionGroup title="Networking" options={selectedProduct.specs.nic} activeIndex={config.nic} onChange={(i:number) => setConfig({...config, nic: i})} />
                )}
              </div>
            </div>
            
            <div className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-md border-t p-6 z-50 shadow-2xl">
              <div className="max-w-[1100px] mx-auto flex justify-between items-center px-6">
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total</p>
                  <p className="text-2xl md:text-4xl font-bold tracking-tighter">{formatUSD(calculateCurrentPrice())}</p>
                </div>
                <button onClick={handleAddToBag} className="bg-[#0071e3] text-white px-8 md:px-12 py-3 md:py-4 rounded-full font-bold hover:bg-[#0077ed] text-sm md:text-base">Add to Bag</button>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </main>
  );
}

function OptionGroup({ title, options, activeIndex, onChange }: any) {
  if (!options) return null;
  return (
    <div>
      <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-gray-400">{title}</h4>
      <div className="grid gap-3">
        {options.map((opt: any, i: number) => (
          <button key={i} onClick={() => onChange(i)} className={`p-5 rounded-2xl border-2 flex justify-between items-center transition-all ${activeIndex === i ? 'border-blue-500 bg-blue-50/10 shadow-sm' : 'border-gray-200 hover:border-gray-400'}`}>
            <span className="font-bold text-left">{opt.label}</span>
            <div className="flex items-center gap-2">
              {opt.price > 0 && <span className="text-sm font-medium text-gray-500">+{formatUSD(opt.price)}</span>}
              {activeIndex === i && <Check size={18} className="text-blue-500" />}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
