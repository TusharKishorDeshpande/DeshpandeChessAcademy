import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";

export default function Hero() {
  const { scrollY } = useScroll();

  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 2000], [0, -200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat h-auto"
        style={{
          backgroundImage: 'url("/chess-bg.jpg")',
          backgroundSize: "cover ",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-custom-dark/80 via-custom-paper/55 to-black/90" />

      {/* Parallax Elements */}
      <motion.div
        style={{ y: y1 }}
        className="absolute top-20 left-10 w-32 h-32 bg-gold/20 rounded-full blur-xl"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute top-40 right-20 w-40 h-40 bg-gold/20 rounded-full blur-xl"
      />

      {/* Hero Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 container mx-auto my-8 px-4 py-20 flex flex-col lg:flex-row items-center justify-between"
      >
        {/* Text Content */}
        <div className="lg:w-1/2 text-white mb-10 lg:mb-0">
          <div className="flex items-center mb-6">
            {/* <img 
              src="/logo.png" 
              alt="Chess Academy Logo" 
              className="w-16 h-16 mr-4"
            /> */}
            <h1 className="text-5xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
              Master the Game of Kings
            </h1>
          </div>
          <p className="text-xl lg:text-2xl mb-8 text-purple-100">
            Join our academy and learn from experienced coach. Develop your
            strategic thinking and tactical prowess.
          </p>
          <div className="flex gap-4 mt-11">
            <Link to="/services" className="no-underline">
              <button className="bg-white text-purple-900 px-8 py-3 rounded-lg font-semibold hover:bg-purple-100 transition-colors">
                Start Learning
              </button>
            </Link>
            <Link to="/about" className="no-underline">
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                Learn More
              </button>
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-center"
      >
        <p className="text-sm mb-2">Scroll to Explore</p>
        <div className="w-6 h-10 border-2 border-white rounded-full mx-auto p-2">
          <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce mx-auto"></div>
        </div>
      </motion.div>
    </div>
  );
}
