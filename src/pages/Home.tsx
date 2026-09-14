import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { ArrowUpRight, ChevronDown, Heart, Menu, Minus, Plus, Search, ShoppingBag, Sparkles, Star, X } from "lucide-react";

const shoeImage = "/nike-court-vision-hero.png";

const productDetails = [
  { label: "Weight", value: "454 g" },
  { label: "Best for", value: "Everyday casual" },
  { label: "Cushion", value: "Lined" },
];

const colorways = [
  { name: "White / Black", className: "bg-white", border: true },
  { name: "Black / Black", className: "bg-neutral-950" },
  { name: "Sail / Gum", className: "bg-[#d8c7aa]" },
];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState("9 UK");
  const [quantity, setQuantity] = useState(1);
  const [toast, setToast] = useState("");
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [shoeOffset, setShoeOffset] = useState({ x: 0, y: 0 });
  const dragStart = useRef({ x: 0, y: 0, baseX: 0, baseY: 0 });
  const dragging = useRef(false);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 2600);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const addToBag = () => {
    setCartCount((value) => value + quantity);
    setToast(`${quantity} pair${quantity > 1 ? "s" : ""} added to your bag`);
  };

  const startShoeDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    dragStart.current = { x: event.clientX, y: event.clientY, baseX: shoeOffset.x, baseY: shoeOffset.y };
  };

  const moveShoe = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const nextX = dragStart.current.baseX + event.clientX - dragStart.current.x;
    const nextY = dragStart.current.baseY + event.clientY - dragStart.current.y;
    setShoeOffset({ x: Math.max(-rect.width * 0.24, Math.min(rect.width * 0.24, nextX)), y: Math.max(-rect.height * 0.2, Math.min(rect.height * 0.2, nextY)) });
  };

  const endShoeDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    dragging.current = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  };

  return (
    <main className="site-shell" onMouseMove={(event) => {
      const rect = event.currentTarget.getBoundingClientRect();
      setMouse({ x: (event.clientX - rect.left) / rect.width - 0.5, y: (event.clientY - rect.top) / rect.height - 0.5 });
    }}>
      <div className="announcement"><Sparkles size={14} /> New season, same legendary court DNA <ArrowUpRight size={14} /></div>
      <header className="nav container">
        <button className="mobile-menu" aria-label="Open menu" onClick={() => setMenuOpen(true)}><Menu size={21} /></button>
        <a className="wordmark" href="#top" aria-label="Nike Court Vision home"><span className="swoosh-mark">⌁</span> NIKE</a>
        <nav className={`nav-links ${menuOpen ? "is-open" : ""}`}>
          <button onClick={() => { scrollToId("shop"); setMenuOpen(false); }}>Shop</button>
          <button onClick={() => { scrollToId("story"); setMenuOpen(false); }}>The story</button>
          <button onClick={() => { scrollToId("details"); setMenuOpen(false); }}>Details</button>
          <button className="close-menu" onClick={() => setMenuOpen(false)}><X size={18} /></button>
        </nav>
        <div className="nav-actions">
          <button aria-label="Search" onClick={() => setToast("Search is coming soon")}><Search size={20} /></button>
          <button aria-label="Wishlist" className={liked ? "is-liked" : ""} onClick={() => setLiked((value) => !value)}><Heart size={20} fill={liked ? "currentColor" : "none"} /></button>
          <button className="bag-button" aria-label="Shopping bag" onClick={() => setToast(cartCount ? `${cartCount} item${cartCount > 1 ? "s" : ""} in your bag` : "Your bag is empty")}><ShoppingBag size={20} /><span>{cartCount}</span></button>
        </div>
      </header>

      <section id="top" className="hero container">
        <div className="hero-copy">
          <p className="eyebrow"><span className="red-dot" /> Nike Court Vision Low</p>
          <h1>Move<br /><em>different.</em></h1>
          <p className="hero-description">A fresh take on the classic basketball look. Built for everyday motion, made to turn heads without trying.</p>
          <div className="hero-cta-row">
            <button className="primary-button" onClick={() => scrollToId("shop")}>Shop the drop <ArrowUpRight size={17} /></button>
            <button className="text-button" onClick={() => scrollToId("story")}>Explore the story <span>↘</span></button>
          </div>
          <div className="hero-meta"><div><strong>4.8</strong><span><Star size={12} fill="currentColor" /> <Star size={12} fill="currentColor" /> <Star size={12} fill="currentColor" /> <Star size={12} fill="currentColor" /> <Star size={12} fill="currentColor" /></span></div><span className="meta-divider" /><span>5,716 reviews</span></div>
        </div>
        <div className={`hero-stage ${dragging.current ? "is-dragging" : ""}`} aria-label="Floating Nike Court Vision Low sneaker. Press and drag anywhere to move the shoe." onPointerDown={startShoeDrag} onPointerMove={moveShoe} onPointerUp={endShoeDrag} onPointerCancel={endShoeDrag}>
          <div className="stage-label label-top">01 / 03</div>
          <div className="stage-note"><span>Designed for</span><strong>Everyday icons</strong></div>
          <div className="ring ring-one" /><div className="ring ring-two" />
          <div className="product-shadow" />
          <img className="hero-shoe" src={shoeImage} alt="White and black Nike Court Vision Low sneaker" style={{ transform: `translate(${shoeOffset.x + mouse.x * 10}px, ${shoeOffset.y + mouse.y * 7}px) rotate(${mouse.x * 1.7}deg)` }} />
          <div className="stage-stamp">COURT<br />VISION<br /><span>LOW / 2026</span></div>
          <div className="stage-scroll">Scroll to explore <span>↓</span></div>
          <div className="drag-hint"><span>✦</span> Touch & drag to move</div>
        </div>
      </section>

      <section className="ticker" aria-label="Product highlights"><div className="ticker-track"><span>RETRO DNA</span><b>✳</b><span>EVERYDAY MOTION</span><b>✳</b><span>COURT-INSPIRED</span><b>✳</b><span>RETRO DNA</span><b>✳</b><span>EVERYDAY MOTION</span><b>✳</b><span>COURT-INSPIRED</span></div></section>

      <section id="shop" className="shop-section container">
        <div className="section-heading"><div><p className="eyebrow">01 / Select your pair</p><h2>Meet the new<br /><em>everyday icon.</em></h2></div><p className="section-intro">Classic lines. Fresh energy. The Court Vision Low is your daily rotation's new MVP.</p></div>
        <div className="product-grid">
          <div className="product-visual"><div className="product-badge">Best seller</div><img src={shoeImage} alt="Nike Court Vision Low in white and black" /><button className="visual-heart" aria-label="Add to wishlist" onClick={() => setLiked((value) => !value)}><Heart size={19} fill={liked ? "currentColor" : "none"} /></button></div>
          <div className="product-info">
            <div className="product-title-row"><div><p className="product-kicker">Nike Sportswear</p><h3>Court Vision Low</h3><p className="muted">Men's sneakers</p></div><div className="price">₹4,995</div></div>
            <div className="rating-line"><span className="stars">★★★★★</span><span>4.8 (5,716)</span><span className="verified">Top brand</span></div>
            <div className="divider" />
            <div className="option-block"><div className="option-label"><span>Colour: <strong>{colorways[selectedColor].name}</strong></span><span>3 colourways</span></div><div className="swatches">{colorways.map((color, index) => <button key={color.name} aria-label={color.name} className={`swatch ${color.className} ${color.border ? "has-border" : ""} ${selectedColor === index ? "selected" : ""}`} onClick={() => setSelectedColor(index)} />)}</div></div>
            <div className="option-block"><div className="option-label"><span>Size: <strong>{selectedSize}</strong></span><button className="size-guide" onClick={() => setToast("Size guide opened")}>Size guide ↗</button></div><div className="sizes">{["5 UK", "6 UK", "7 UK", "8 UK", "9 UK", "10 UK", "11 UK", "12 UK"].map((size) => <button key={size} className={selectedSize === size ? "selected" : ""} onClick={() => setSelectedSize(size)}>{size}</button>)}</div></div>
            <div className="purchase-row"><div className="quantity"><button aria-label="Decrease quantity" onClick={() => setQuantity((value) => Math.max(1, value - 1))}><Minus size={15} /></button><span>{quantity}</span><button aria-label="Increase quantity" onClick={() => setQuantity((value) => value + 1)}><Plus size={15} /></button></div><button className="primary-button add-button" onClick={addToBag}>Add to bag <ShoppingBag size={17} /></button></div>
            <div className="service-list"><span>✓ Free delivery</span><span>↩ 10 days return & exchange</span><span>◌ Inclusive of all taxes</span></div>
          </div>
        </div>
      </section>

      <section id="story" className="story-section"><div className="container story-grid"><div className="story-number">02</div><div className="story-copy"><p className="eyebrow">The Court Vision story</p><h2>Some icons<br /><em>never fade.</em></h2><p>Born from the hardwood and made for the everyday, the Court Vision Low blends old-school basketball details with a clean, easy-to-style shape. It is familiar for a reason — then re-cut for now.</p><button className="circle-arrow" onClick={() => scrollToId("details")} aria-label="Read more">↘</button></div><div className="story-statement">A low-profile legend<br /><span>for your next move.</span></div></div></section>

      <section id="details" className="details-section container"><div className="section-heading"><div><p className="eyebrow">03 / In the details</p><h2>Made to keep<br /><em>pace with you.</em></h2></div><p className="section-intro">The little things make the everyday feel considered.</p></div><div className="details-grid">{productDetails.map((detail, index) => <div className="detail-card" key={detail.label}><span className="detail-index">0{index + 1}</span><p>{detail.label}</p><strong>{detail.value}</strong><div className="detail-line" /></div>)}</div><div className="quote-card"><span className="quote-mark">“</span><p>Good-looking, comfortable, and easy to wear with everything.</p><span className="quote-source">— Verified Nike wearer, India</span></div></section>

      <footer className="footer container"><div className="footer-brand"><span className="wordmark"><span className="swoosh-mark">⌁</span> NIKE</span><p>Move to zero.<br />Move different.</p></div><div className="footer-links"><button onClick={() => setToast("Shipping information coming soon")}>Shipping & returns</button><button onClick={() => setToast("Help center coming soon")}>Help center</button><button onClick={() => setToast("Instagram link coming soon")}>Instagram ↗</button></div><span className="copyright">© 2026 Nike, Inc.</span></footer>
      {toast && <div className="toast" role="status">{toast}<button onClick={() => setToast("")}><X size={15} /></button></div>}
    </main>
  );
}
