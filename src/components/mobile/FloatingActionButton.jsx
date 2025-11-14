import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * Floating Action Button (FAB) para móvil
 * - Botón flotante en esquina inferior derecha
 * - Acción principal contextual (añadir venta, producto, etc.)
 * - Animación de entrada/salida
 * - Thumb-friendly (56x56px)
 */
export function FloatingActionButton({ 
  onClick, 
  icon: Icon = Plus, 
  label = "Añadir",
  show = true,
  variant = "primary" // primary | secondary | accent
}) {
  const variants = {
    primary: "bg-[#003B46] hover:bg-[#002831] text-white shadow-[#003B46]/30",
    secondary: "bg-[#07575B] hover:bg-[#054449] text-white shadow-[#07575B]/30",
    accent: "bg-[#66A5AD] hover:bg-[#5694a0] text-white shadow-[#66A5AD]/30",
  };

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
        scale: show ? 1 : 0, 
        opacity: show ? 1 : 0 
      }}
      transition={{ 
        type: "spring", 
        stiffness: 500, 
        damping: 30 
      }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className={`
        fixed bottom-20 right-4 z-40
        w-14 h-14 rounded-full
        flex items-center justify-center
        shadow-lg hover:shadow-xl
        transition-all duration-200
        sm:hidden
        ${variants[variant]}
      `}
      aria-label={label}
    >
      <Icon size={24} strokeWidth={2.5} />
    </motion.button>
  );
}
