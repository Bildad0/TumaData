import { Canvas } from '@react-three/fiber';
import { Box } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <nav className="flex justify-between p-4 bg-gray-800 text-white">
        <div className="font-bold">Backup App</div>
        <div>
          <Link to="/login" className="mr-4 hover:underline">Login</Link>
          <Link to="/register" className="hover:underline">Register</Link>
        </div>
      </nav>

      <div className="flex-grow flex items-center justify-center bg-gray-100">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-4xl font-bold mb-4">Secure Your Backups</h1>
          <p className="text-lg mb-8">Simple. Fast. Reliable.</p>
          <Link to="/register" className="bg-blue-500 text-white px-6 py-2 rounded-lg">
            Get Started
          </Link>
        </motion.div>

        {/* Three.js 3D Animation */}
        <Canvas className="w-1/2 h-[400px]">
          <ambientLight />
          <Box args={[2, 2, 2]} rotation={[0, 0, 0]} position={[0, 0, 0]}>
            <meshStandardMaterial color="lightblue" />
          </Box>
        </Canvas>
      </div>

      <footer className="text-center p-4 bg-gray-800 text-white">
        &copy; 2024 Backup App
      </footer>
    </div>
  );
}
