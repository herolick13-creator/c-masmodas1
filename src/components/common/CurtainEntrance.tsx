import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import BrandLogo from "@/components/common/BrandLogo";
import { Sparkles, ArrowRight, Volume2, VolumeX } from "lucide-react";
import { dataStore } from "@/services/dataStore";

interface CurtainEntranceProps {
  onComplete?: () => void;
  forceOpen?: boolean;
}

export default function CurtainEntrance({ onComplete, forceOpen = false }: CurtainEntranceProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  useEffect(() => {
    // Check if user already saw the curtain in this session
    const hasSeen = dataStore.hasSeenCurtain();
    if (hasSeen && !forceOpen) {
      setIsDismissed(true);
      if (onComplete) onComplete();
      return;
    }

    // Auto-trigger curtain reveal after 1.8s
    const timer = setTimeout(() => {
      handleOpen();
    }, 1800);

    return () => clearTimeout(timer);
  }, [forceOpen]);

  const handleOpen = () => {
    if (isOpening) return;
    setIsOpening(true);
    setTimeout(() => {
      setIsOpen(true);
      dataStore.setCurtainSeen();
      setTimeout(() => {
        setIsDismissed(true);
        if (onComplete) onComplete();
      }, 1400);
    }, 400);
  };

  if (isDismissed) return null;

  return (
    <AnimatePresence>
      {!isDismissed && (
        <div
          id="cmas-curtain-container"
          className="fixed inset-0 z-50 overflow-hidden pointer-events-auto flex items-center justify-center select-none"
        >
          {/* Left Curtain Wing */}
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: isOpen ? "-100%" : 0 }}
            transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
            className="absolute top-0 bottom-0 left-0 w-1/2 bg-gradient-to-r from-[#32000B] via-[#4A0010] to-[#720018] shadow-2xl border-r border-[#C9A86A]/40 overflow-hidden flex flex-col justify-between"
          >
            {/* Velvet Drapery Folds (Vertical highlights) */}
            <div className="absolute inset-0 opacity-25 bg-[repeating-linear-gradient(90deg,transparent,transparent_40px,rgba(0,0,0,0.5)_40px,rgba(255,255,255,0.15)_80px)] pointer-events-none" />

            {/* Top Gold Fringe / Valance */}
            <div className="h-6 w-full bg-gradient-to-b from-[#C9A86A] to-[#8C5428] opacity-80 border-b border-[#F8F5F3]/30 shadow-md" />

            {/* Left Gold Tassel Rope */}
            <div className="absolute top-1/3 left-6 hidden md:flex flex-col items-center opacity-60">
              <div className="w-1.5 h-32 bg-gradient-to-b from-[#C9A86A] to-[#603813] rounded-full shadow" />
              <div className="w-6 h-10 bg-[#C9A86A] rounded-b-xl border border-amber-300 shadow-md flex items-end justify-center pb-1">
                <span className="text-[7px] text-[#4A0010] font-bold">CM</span>
              </div>
            </div>

            {/* Bottom Hem */}
            <div className="h-4 w-full bg-[#32000B] border-t border-[#C9A86A]/30" />
          </motion.div>

          {/* Right Curtain Wing */}
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: isOpen ? "100%" : 0 }}
            transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
            className="absolute top-0 bottom-0 right-0 w-1/2 bg-gradient-to-l from-[#32000B] via-[#4A0010] to-[#720018] shadow-2xl border-l border-[#C9A86A]/40 overflow-hidden flex flex-col justify-between"
          >
            {/* Velvet Drapery Folds (Vertical highlights) */}
            <div className="absolute inset-0 opacity-25 bg-[repeating-linear-gradient(90deg,transparent,transparent_40px,rgba(0,0,0,0.5)_40px,rgba(255,255,255,0.15)_80px)] pointer-events-none" />

            {/* Top Gold Fringe / Valance */}
            <div className="h-6 w-full bg-gradient-to-b from-[#C9A86A] to-[#8C5428] opacity-80 border-b border-[#F8F5F3]/30 shadow-md" />

            {/* Right Gold Tassel Rope */}
            <div className="absolute top-1/3 right-6 hidden md:flex flex-col items-center opacity-60">
              <div className="w-1.5 h-32 bg-gradient-to-b from-[#C9A86A] to-[#603813] rounded-full shadow" />
              <div className="w-6 h-10 bg-[#C9A86A] rounded-b-xl border border-amber-300 shadow-md flex items-end justify-center pb-1">
                <span className="text-[7px] text-[#4A0010] font-bold">CM</span>
              </div>
            </div>

            {/* Bottom Hem */}
            <div className="h-4 w-full bg-[#32000B] border-t border-[#C9A86A]/30" />
          </motion.div>

          {/* Center Royal Medallion & Opening Prompt */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{
              scale: isOpen ? 1.15 : 1,
              opacity: isOpen ? 0 : 1,
              y: isOpen ? -30 : 0
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10 flex flex-col items-center text-center px-6"
          >
            {/* Golden Halo glow */}
            <div className="absolute w-72 h-72 rounded-full bg-amber-500/15 blur-3xl -top-10 pointer-events-none" />

            <div className="p-8 rounded-3xl bg-[#4A0010]/95 border-2 border-[#C9A86A] shadow-2xl backdrop-blur-md flex flex-col items-center max-w-sm">
              <BrandLogo size="lg" variant="dark" showTagline={false} />

              <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#C9A86A] to-transparent my-4" />

              <h2 className="font-serif-luxury text-2xl text-[#F8F5F3] font-medium tracking-wide">
                Boutique C-MAS Modas
              </h2>
              <p className="text-xs text-[#C9A86A] uppercase tracking-[0.2em] mt-1 font-medium">
                Campo Grande • MS
              </p>
              <p className="text-xs text-slate-300 font-light mt-3 max-w-xs leading-relaxed">
                Apresentando a nova coleção de alta elegância e alfaiataria exclusiva.
              </p>

              <button
                id="btn-open-curtain"
                onClick={handleOpen}
                className="mt-6 group inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#C9A86A] to-[#B38D4F] text-[#32000B] font-semibold text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-black/40 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Entrar na Loja</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <button
              onClick={() => {
                dataStore.setCurtainSeen();
                setIsDismissed(true);
                if (onComplete) onComplete();
              }}
              className="mt-4 text-[11px] text-amber-200/60 hover:text-amber-200 underline tracking-wide uppercase transition-colors"
            >
              Pular introdução
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
