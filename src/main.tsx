import { useMemo, useState, type ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

type Product = {
  id: number
  count: number
  name: string
  subtitle: string
  price: number
  accent: string
  image: string
  tag?: string
  description: string
}

type CartLine = Product & { quantity: number }

type IconName = 'bag' | 'arrow' | 'plus' | 'minus' | 'close' | 'chevron' | 'sparkle' | 'gift' | 'leaf' | 'check' | 'menu' | 'trash'

const heroImage = '/manus-storage/async-images/ypMBhQTIHeJLtbUx58MotS/image-1.webp'
const assortmentImage = '/manus-storage/async-images/ypMBhQTIHeJLtbUx58MotS/image-2.webp'
const detailImage = '/manus-storage/async-images/ypMBhQTIHeJLtbUx58MotS/image-3.webp'
const giftingImage = '/manus-storage/async-images/ypMBhQTIHeJLtbUx58MotS/image-4.webp'

const products: Product[] = [
  { id: 2, count: 2, name: 'دوئت', subtitle: 'برای یک قرار کوچک', price: 290000, accent: 'rose', image: detailImage, description: 'دو شکلات دست‌ساز با مغزهای لطیف و روکش براق، در جعبه‌ای کوچک و به‌یادماندنی.' },
  { id: 4, count: 4, name: 'کوارتت', subtitle: 'چهار نت از طعم', price: 490000, accent: 'caramel', image: assortmentImage, description: 'چهار انتخاب از امضای Cacaoir؛ ترکیبی از تلخی، شیرینی و عطرهای ظریف.' },
  { id: 6, count: 6, name: 'نیم‌دوجین', subtitle: 'برای لحظه‌های مشترک', price: 690000, accent: 'pistachio', image: heroImage, tag: 'پیشنهاد ما', description: 'شش شکلات منتخب در جعبه‌ای مخملی؛ تعادل کامل برای هدیه‌ای که حرف می‌زند.' },
  { id: 9, count: 9, name: 'نه‌تایی', subtitle: 'مجموعه‌ی کشف طعم‌ها', price: 990000, accent: 'plum', image: giftingImage, description: 'نه طعم متفاوت برای یک سفر کامل در جهان شکلات‌های دست‌ساز.' },
  { id: 12, count: 12, name: 'دوازده‌تایی', subtitle: 'جعبه‌ی امضای Cacaoir', price: 1290000, accent: 'burgundy', image: assortmentImage, tag: 'محبوب', description: 'دوازده شکلات با چیدمان اختصاصی، برای میزهای مهم و آدم‌های مهم‌تر.' },
  { id: 24, count: 24, name: 'بیست‌وچهارتایی', subtitle: 'برای مهمانی‌های ماندگار', price: 2290000, accent: 'cacao', image: heroImage, description: 'بیست‌وچهار قطعه از بهترین ترکیبات Cacaoir برای بخشیدن به یک جمع دوست‌داشتنی.' },
  { id: 36, count: 36, name: 'سی‌وشش‌تایی', subtitle: 'آرشیو کامل طعم‌ها', price: 3190000, accent: 'gold', image: giftingImage, tag: 'ویژه', description: 'بزرگ‌ترین جعبه‌ی ما؛ یک هدیه‌ی کامل با تمام امضاهای طعمی Cacaoir.' },
]

const formatPrice = (price: number) => new Intl.NumberFormat('fa-IR').format(price)

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  const paths: Record<IconName, ReactNode> = {
    bag: <><path d="M6.5 8.5h11l1 11h-13l1-11Z" /><path d="M9 9V6.5a3 3 0 0 1 6 0V9" /></>,
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    plus: <><path d="M12 5v14" /><path d="M5 12h14" /></>,
    minus: <path d="M5 12h14" />,
    close: <><path d="m6 6 12 12" /><path d="M18 6 6 18" /></>,
    chevron: <path d="m6 9 6 6 6-6" />,
    sparkle: <><path d="m12 3 1.4 5.6L19 10l-5.6 1.4L12 17l-1.4-5.6L5 10l5.6-1.4L12 3Z" /><path d="m19 16 .6 2.4L22 19l-2.4.6L19 22l-.6-2.4L16 19l2.4-.6L19 16Z" /></>,
    gift: <><rect x="4" y="9" width="16" height="11" rx="1" /><path d="M12 9v11M3 9h18M12 9H8.5a2.5 2.5 0 1 1 2.3-3.4L12 9Zm0 0h3.5a2.5 2.5 0 1 0-2.3-3.4L12 9Z" /></>,
    leaf: <><path d="M20 4C12 4 5 8 5 15c0 2.5 1.8 4 4.5 4C16.5 19 20 12 20 4Z" /><path d="M4 21c3-4 6-7 11-10" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    trash: <><path d="M4 7h16M10 11v6M14 11v6" /><path d="m6 7 1 13h10l1-13M9 7V4h6v3" /></>,
  }
  return <svg {...common} aria-hidden="true">{paths[name]}</svg>
}

function App() {
  const [cart, setCart] = useState<CartLine[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [detailProduct, setDetailProduct] = useState<Product | null>(null)
  const [detailQuantity, setDetailQuantity] = useState(1)
  const [menuOpen, setMenuOpen] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)

  const totalItems = cart.reduce((sum, line) => sum + line.quantity, 0)
  const subtotal = cart.reduce((sum, line) => sum + line.price * line.quantity, 0)
  const shipping = subtotal > 1500000 || subtotal === 0 ? 0 : 85000
  const total = subtotal + shipping

  const addToCart = (product: Product, quantity = 1) => {
    setCart((current) => {
      const existing = current.find((line) => line.id === product.id)
      if (existing) return current.map((line) => line.id === product.id ? { ...line, quantity: line.quantity + quantity } : line)
      return [...current, { ...product, quantity }]
    })
    setCartOpen(true)
  }

  const updateQuantity = (id: number, delta: number) => {
    setCart((current) => current.map((line) => line.id === id ? { ...line, quantity: Math.max(0, line.quantity + delta) } : line).filter((line) => line.quantity > 0))
  }

  const openDetail = (product: Product) => {
    setDetailProduct(product)
    setDetailQuantity(1)
  }

  const navTo = (id: string) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const popular = useMemo(() => products.filter((product) => [6, 12, 24].includes(product.count)), [])

  return (
    <div className="app-shell">
      <div className="announcement"><Icon name="sparkle" size={15} /><span>ارسال رایگان برای سفارش‌های بالای یک میلیون و پانصد هزار تومان</span></div>
      <header className="site-header">
        <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="باز کردن منو"><Icon name={menuOpen ? 'close' : 'menu'} /></button>
        <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`}>
          <button onClick={() => navTo('collection')}>جعبه‌ها</button>
          <button onClick={() => navTo('story')}>داستان ما</button>
          <button onClick={() => navTo('gifting')}>هدیه‌دادن</button>
        </nav>
        <button className="brand-mark" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="صفحه اصلی Cacaoir">
          <span className="brand-symbol">✦</span><span className="brand-name">cacaoir</span><span className="brand-origin">EST. 2024 · TEHRAN</span>
        </button>
        <button className="cart-trigger" onClick={() => setCartOpen(true)} aria-label="سبد خرید"><Icon name="bag" size={22} /><span>سبد شما</span>{totalItems > 0 && <b>{totalItems.toLocaleString('fa-IR')}</b>}</button>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-line" /> ساختن لحظه‌های ماندگار <span className="eyebrow-line" /></div>
            <h1>طعمِ <em>آرامِ</em><br />یک اتفاق خوب.</h1>
            <p>شکلات‌های دست‌سازی که آهسته ساخته می‌شوند، با دقت انتخاب می‌شوند و برای لحظه‌هایی که قرار است بمانند، بسته‌بندی می‌شوند.</p>
            <button className="primary-button" onClick={() => navTo('collection')}>دیدن مجموعه <Icon name="arrow" size={17} /></button>
            <div className="hero-note"><span>01</span><span className="note-line" /><span>طعم‌هایی برای مکث‌کردن</span></div>
          </div>
          <div className="hero-visual">
            <div className="hero-image-wrap"><img src={heroImage} alt="جعبه شکلات دست‌ساز Cacaoir" /><div className="image-stamp">دست‌ساز<br /><span>با عشق</span></div></div>
            <div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" />
            <div className="vertical-label">HANDCRAFTED · SLOWLY MADE · CACAOIR</div>
          </div>
        </section>

        <section className="ritual-strip" id="story">
          <div className="ritual-intro"><span className="section-kicker">فلسفه‌ی ما</span><h2>هر جعبه،<br /><em>یک رسم کوچک.</em></h2></div>
          <div className="ritual-copy"><p>ما به زیباییِ چیزهای آهسته باور داریم؛ به انتخاب دانه‌ها، به دست‌هایی که هر شکلات را جداگانه شکل می‌دهند و به جعبه‌ای که پیش از بازشدن، قصه‌اش را شروع می‌کند.</p><a href="#collection" onClick={(e) => { e.preventDefault(); navTo('collection') }}>داستان Cacaoir <Icon name="arrow" size={16} /></a></div>
          <div className="ritual-seal"><Icon name="leaf" size={30} /><span>کاکائوی<br />خالص</span></div>
        </section>

        <section className="collection-section" id="collection">
          <div className="section-heading"><div><span className="section-kicker">مجموعه‌ی جعبه‌ها</span><h2>برای هر <em>لحظه</em><br />یک اندازه.</h2></div><p>از یک قرار دونفره تا یک میز شلوغ و دوست‌داشتنی؛ جعبه‌ی مناسب شما همین‌جا منتظر است.</p></div>
          <div className="collection-layout">
            <div className="collection-feature"><div className="feature-image"><img src={assortmentImage} alt="مجموعه شکلات‌های Cacaoir" /><span className="feature-label">THE CACAOIR<br /><b>COLLECTION</b></span></div><div className="feature-caption"><span>انتخاب سردبیر</span><h3>لحظه را<br />بزرگ‌تر کن.</h3><button onClick={() => openDetail(products[4])}>دوازده‌تایی را ببین <Icon name="arrow" size={16} /></button></div></div>
            <div className="product-grid">{products.map((product) => <ProductCard key={product.id} product={product} onAdd={addToCart} onDetail={openDetail} />)}</div>
          </div>
        </section>

        <section className="gifting-section" id="gifting">
          <div className="gifting-image"><img src={giftingImage} alt="هدیه دادن شکلات Cacaoir" /><span className="gifting-vertical">FOR SOMEONE SPECIAL</span></div>
          <div className="gifting-copy"><span className="section-kicker">هدیه‌ای که می‌ماند</span><h2>بعضی هدیه‌ها<br /><em>نیازی به توضیح ندارند.</em></h2><p>برای تشکر، تبریک، دلتنگی یا فقط برای گفتنِ «به یادت بودم». جعبه‌ی شما با کارت دست‌نویس و روبان اختصاصی آماده می‌شود.</p><button className="outline-button" onClick={() => navTo('collection')}>انتخاب یک هدیه <Icon name="arrow" size={17} /></button><div className="gift-detail"><Icon name="gift" size={21} /><span>کارت هدیه‌ی دست‌نویس<br /><small>برای هر سفارش، به انتخاب شما</small></span></div></div>
        </section>

        <section className="popular-section"><div className="section-heading compact"><div><span className="section-kicker">انتخاب‌های دوست‌داشتنی</span><h2>بیشتر <em>دوستش</em> دارند.</h2></div><button className="text-button" onClick={() => navTo('collection')}>مشاهده همه <Icon name="arrow" size={16} /></button></div><div className="popular-row">{popular.map((product) => <ProductCard key={product.id} product={product} onAdd={addToCart} onDetail={openDetail} compact />)}</div></section>

        <section className="newsletter"><div className="newsletter-star">✦</div><div><span className="section-kicker">نامه‌های کوچک از دنیای Cacaoir</span><h2>برای خبرهای <em>خوب</em> بمان.</h2></div><form onSubmit={(e) => e.preventDefault()}><input type="email" placeholder="ایمیل شما" aria-label="ایمیل شما" /><button type="submit" aria-label="عضویت"><Icon name="arrow" size={18} /></button></form></section>
      </main>

      <footer className="site-footer"><div className="footer-brand"><span className="brand-symbol">✦</span><span className="brand-name">cacaoir</span><p>شکلات‌های دست‌ساز برای لحظه‌هایی که قرار است بمانند.</p></div><div className="footer-links"><div><span>کاوش</span><button onClick={() => navTo('collection')}>جعبه‌ها</button><button onClick={() => navTo('story')}>داستان ما</button><button onClick={() => navTo('gifting')}>هدیه‌دادن</button></div><div><span>ارتباط</span><a href="mailto:hello@cacaoir.ir">hello@cacaoir.ir</a><a href="#home">اینستاگرام</a><a href="tel:+982112345678">۰۲۱ · ۱۲۳۴۵۶۷۸</a></div></div><div className="footer-bottom"><span>© ۱۴۰۳ Cacaoir</span><span>ساخته‌شده برای مکث‌های شیرین</span></div></footer>

      {cartOpen && <div className="modal-backdrop" onClick={() => setCartOpen(false)}><aside className="cart-drawer" onClick={(e) => e.stopPropagation()}><div className="drawer-header"><div><span className="section-kicker">سفارش شما</span><h2>سبد خرید <small>{totalItems.toLocaleString('fa-IR')} جعبه</small></h2></div><button className="icon-button" onClick={() => setCartOpen(false)} aria-label="بستن"><Icon name="close" /></button></div>{cart.length === 0 ? <div className="empty-cart"><div className="empty-icon"><Icon name="bag" size={26} /></div><h3>سبد شما هنوز خالی است.</h3><p>یک جعبه برای شروع این لحظه انتخاب کنید.</p><button className="primary-button" onClick={() => { setCartOpen(false); navTo('collection') }}>دیدن جعبه‌ها <Icon name="arrow" size={16} /></button></div> : <><div className="cart-lines">{cart.map((line) => <div className="cart-line" key={line.id}><img src={line.image} alt={line.name} /><div className="cart-line-info"><div className="cart-line-top"><div><h3>{line.name}</h3><span>{line.count.toLocaleString('fa-IR')} شکلات</span></div><button className="remove-button" onClick={() => setCart((current) => current.filter((item) => item.id !== line.id))}><Icon name="trash" size={16} /></button></div><div className="cart-line-bottom"><strong>{formatPrice(line.price)} <small>تومان</small></strong><div className="quantity-controls"><button onClick={() => updateQuantity(line.id, -1)}><Icon name="minus" size={14} /></button><span>{line.quantity.toLocaleString('fa-IR')}</span><button onClick={() => updateQuantity(line.id, 1)}><Icon name="plus" size={14} /></button></div></div></div></div>)}</div><div className="cart-summary"><div><span>جمع سفارش</span><strong>{formatPrice(subtotal)} <small>تومان</small></strong></div><div><span>ارسال</span><strong>{shipping === 0 ? 'رایگان' : `${formatPrice(shipping)} تومان`}</strong></div><div className="summary-total"><span>مبلغ نهایی</span><strong>{formatPrice(total)} <small>تومان</small></strong></div><button className="primary-button full" onClick={() => { setCartOpen(false); setCheckoutOpen(true) }}>ادامه و تسویه‌حساب <Icon name="arrow" size={17} /></button><p className="secure-note"><Icon name="sparkle" size={14} /> پرداخت امن و بسته‌بندی با دقت</p></div></>}</aside></div>}

      {detailProduct && <div className="modal-backdrop" onClick={() => setDetailProduct(null)}><div className="product-modal" onClick={(e) => e.stopPropagation()}><button className="icon-button modal-close" onClick={() => setDetailProduct(null)} aria-label="بستن"><Icon name="close" /></button><div className="modal-product-image"><img src={detailProduct.image} alt={detailProduct.name} /><span>{detailProduct.count.toLocaleString('fa-IR')} عدد</span></div><div className="modal-product-copy"><span className="section-kicker">جعبه‌ی {detailProduct.count.toLocaleString('fa-IR')} تایی</span><h2>{detailProduct.name}</h2><p className="modal-subtitle">{detailProduct.subtitle}</p><p>{detailProduct.description}</p><div className="modal-divider" /><div className="modal-buy-row"><strong>{formatPrice(detailProduct.price)} <small>تومان</small></strong><div className="quantity-controls"><button onClick={() => setDetailQuantity(Math.max(1, detailQuantity - 1))}><Icon name="minus" size={14} /></button><span>{detailQuantity.toLocaleString('fa-IR')}</span><button onClick={() => setDetailQuantity(detailQuantity + 1)}><Icon name="plus" size={14} /></button></div></div><button className="primary-button full" onClick={() => { addToCart(detailProduct, detailQuantity); setDetailProduct(null) }}>افزودن به سبد <Icon name="bag" size={17} /></button><div className="modal-perks"><span><Icon name="check" size={15} /> دست‌ساز و تازه</span><span><Icon name="check" size={15} /> بسته‌بندی هدیه</span></div></div></div></div>}

      {checkoutOpen && <div className="modal-backdrop" onClick={() => setCheckoutOpen(false)}><div className="checkout-modal" onClick={(e) => e.stopPropagation()}>{orderPlaced ? <div className="order-success"><div className="success-mark"><Icon name="check" size={32} /></div><span className="section-kicker">سفارش شما ثبت شد</span><h2>لحظه‌ی شیرین<br /><em>در راه است.</em></h2><p>از انتخاب شما ممنونیم. جزئیات سفارش و زمان ارسال به ایمیل شما فرستاده خواهد شد.</p><button className="primary-button" onClick={() => { setCheckoutOpen(false); setCart([]); setOrderPlaced(false) }}>بازگشت به فروشگاه <Icon name="arrow" size={17} /></button></div> : <><div className="drawer-header"><div><span className="section-kicker">مرحله‌ی آخر</span><h2>تکمیل سفارش</h2></div><button className="icon-button" onClick={() => setCheckoutOpen(false)} aria-label="بستن"><Icon name="close" /></button></div><form className="checkout-form" onSubmit={(e) => { e.preventDefault(); setOrderPlaced(true) }}><div className="form-section"><span>اطلاعات تماس</span><div className="form-grid"><label>نام و نام خانوادگی<input required placeholder="مثلاً سارا احمدی" /></label><label>شماره موبایل<input required type="tel" placeholder="۰۹۱۲ ۱۲۳ ۴۵۶۷" /></label><label className="wide">ایمیل<input required type="email" placeholder="you@example.com" /></label></div></div><div className="form-section"><span>نشانی ارسال</span><label className="wide">آدرس کامل<input required placeholder="خیابان، کوچه، پلاک، واحد" /></label><div className="form-grid"><label>شهر<input required placeholder="تهران" /></label><label>کد پستی<input required placeholder="۱۰ رقمی" /></label></div></div><div className="checkout-total"><span>مبلغ قابل پرداخت</span><strong>{formatPrice(total)} <small>تومان</small></strong></div><button className="primary-button full" type="submit">ثبت سفارش و پرداخت <Icon name="arrow" size={17} /></button><p className="secure-note"><Icon name="sparkle" size={14} /> اطلاعات شما نزد ما محفوظ می‌ماند</p></form></>}</div></div>}
    </div>
  )
}

function ProductCard({ product, onAdd, onDetail, compact = false }: { product: Product; onAdd: (product: Product) => void; onDetail: (product: Product) => void; compact?: boolean }) {
  return <article className={`product-card ${compact ? 'compact' : ''}`}><button className="product-image-button" onClick={() => onDetail(product)} aria-label={`مشاهده ${product.name}`}><div className={`product-image accent-${product.accent}`}><img src={product.image} alt={`${product.name} Cacaoir`} />{product.tag && <span className="product-tag">{product.tag}</span>}<span className="product-count">{product.count.toLocaleString('fa-IR')} عدد</span></div></button><div className="product-meta"><div><h3>{product.name}</h3><p>{product.subtitle}</p></div><button className="add-button" onClick={() => onAdd(product)} aria-label={`افزودن ${product.name}`}><Icon name="plus" size={18} /></button></div><div className="product-price">{formatPrice(product.price)} <small>تومان</small></div></article>
}

createRoot(document.getElementById('root')!).render(<App />)
