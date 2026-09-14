import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";

import { ArrowUpRight, ChevronDown, Heart, Menu, Minus, Plus, Search, ShoppingBag, Sparkles, Star, X } from "lucide-react";



const shoeImage = "./nike-court-vision-hero.png";



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



function scrollToId(id: string) { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); }



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
  
  useEffect(() => { if (!toast) return; const timer = window.setTimeout(() => setToast(""), 2600); return () => window.clearTimeout(timer); }, [toast]);
  
  const addToBag = () => { setCartCount((value) => value + quantity); setToast(`${quantity} pair${quantity > 1 ? "s" : ""} added to your bag`); };
  
  const startShoeDrag = (event: ReactPointerEvent<HTMLDivElement>) => { dragging.current = true; event.currentTarget.setPointerCapture(event.pointerId); dragStart.current = { x: event.clientX, y: event.clientY, baseX: shoeOffset.x, baseY: shoeOffset.y }; };
  
  const moveShoe = (event: ReactPointerEvent<HTMLDivElement>) => { if (!dragging.current) return; const rect = event.currentTarget.getBoundingClientRect(); const nextX = dragStart.current.baseX + event.clientX - dragStart.current.x; const nextY = dragStart.current.baseY + event.clientY - dragStart.current.y; setShoeOffset({ x: Math.max(-rect.width * 0.24, Math.min(rect.width * 0.24, nextX)), y: Math.max(-rect.height * 0.2, Math.min(rect.height * 0.2, nextY)) }); };
  
  const endShoeDrag = (event: ReactPointerEvent<HTMLDivElement>) => { dragging.current = false; if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId); };
  
  return (
    
    <main className="site-shell" onMouseMove={(event) => { const rect = event.currentTarget.getBoundingClientRect(); setMouse({ x: (event.clientX - rect.left) / rect.width - 0.5, y: (event.clientY - rect.top) / rect.height - 0.5 }); }}>
      
      <div className="announcement"><Sparkles size={14} /> New season, same legendary court DNA <ArrowUpRight size={14} /></div>div>
    
      <header className="nav container"><button className="mobile-menu" aria-label="Open menu" onClick={() => setMenuOpen(true)}><Menu size={21} /></button>button><a className="wordmark" href="#top" aria-label="Nike Court Vision home"><span className="swoosh-mark">⌁</span>span> NIKE</a>a><nav className={`nav-links ${menuOpen ? "is-open" : ""}`}><button onClick={() => { scrollToId("shop"); setMenuOpen(false); }}>Shop</button>button><button onClick={() => </div>


























