// chitri_frontend/src/pages/HomePage.jsx
import React, { useEffect, useState, useRef } from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import PaintingCard from '../components/paintings/PaintingCard';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import axios from '../utils/api';
import { toast } from 'react-hot-toast';
import useAuth from '../hooks/useAuth';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { CATEGORIES } from '../utils/constants';

// Three.js component for background
const AbstractBackground = () => {
  const mesh = useRef();
  const material = useRef();

  const black = new THREE.Color(0x000000);
  const grayLight = new THREE.Color(0xD1D0D0);

  useFrame(({ clock }) => {
    if (material.current) {
      material.current.uniforms.uTime.value = clock.getElapsedTime();
    }
    if (mesh.current) {
      mesh.current.rotation.x = clock.getElapsedTime() * 0.01;
      mesh.current.rotation.y = clock.getElapsedTime() * 0.015;
    }
  });

  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[5, 64, 64]} />
      <shaderMaterial
        ref={material}
        attach="material"
        uniforms={{
          uTime: { value: 0 },
          uColor: { value: black },
          uSecondaryColor: { value: grayLight },
        }}
        vertexShader={`
          uniform float uTime;
          varying vec2 vUv;
          void main() {
            vUv = uv;
            vec3 newPosition = position;
            newPosition.y += sin(position.x * 2.0 + uTime * 0.5) * 0.2;
            newPosition.x += cos(position.y * 2.0 + uTime * 0.5) * 0.2;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
          }
        `}
        fragmentShader={`
          uniform float uTime;
          uniform vec3 uColor;
          uniform vec3 uSecondaryColor;
          varying vec2 vUv;
          void main() {
            vec3 color = mix(uColor, uSecondaryColor, sin(vUv.x * 10.0 + uTime * 0.1) * 0.5 + 0.5);
            gl_FragColor = vec4(color, 1.0);
          }
        `}
      />
    </mesh>
  );
};


const HomePage = () => {
  const [paintings, setPaintings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const { currentUser, loading: authLoading, authToken } = useAuth();

  // Get mobile menu state from Navbar (if possible, or manage locally)
  // For simplicity, we'll assume Navbar's state might affect this,
  // or we need a global state for mobile menu.
  // A simpler approach for now: just hide the content if the menu is open.
  // This requires a way to know if the menu is open.
  // Let's assume Navbar will manage `isMobileMenuOpen` and we can't directly access it here.
  // The most robust way is to hide the entire main content when the menu is open.
  // This is handled by the Navbar's overlay and z-index.

  useEffect(() => {
    const fetchPaintings = async () => {
      if (!authLoading && currentUser && authToken) {
        setLoading(true);
        try {
          const response = await axios.get(`/paintings`);
          setPaintings(response.data);
          setError(null);
        } catch (err) {
          console.error("Error fetching paintings:", err);
          if (err.response && err.response.status === 401) {
            setError("You are not logged in or authorized to view paintings.");
          } else {
            setError("Failed to fetch paintings. Please try again later.");
          }
          toast.error("Failed to load paintings.");
        } finally {
          setLoading(false);
        }
      } else if (!authLoading && !currentUser) {
        setLoading(false);
      }
    };
    fetchPaintings();
  }, [authLoading, currentUser, authToken]);

  const filteredPaintings = paintings.filter(painting => {
    const paintingName = painting.name ?? '';
    const paintingCategory = painting.category ?? '';

    const matchesSearch = paintingName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'All' || paintingCategory === filterCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading || authLoading) {
    return <LoadingSpinner message="Loading CHITRIKA..." />;
  }

  if (!currentUser) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black text-gray-light font-serif relative overflow-hidden flex flex-col">
      {/* Three.js Background Canvas */}
      <div className="absolute inset-0 z-0 opacity-50">
        <Canvas camera={{ position: [0, 0, 3] }}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <pointLight position={[-10, -10, -10]} />
          <AbstractBackground />
        </Canvas>
      </div>

      <div className="relative z-10 flex flex-col flex-grow">
        <Navbar />

        {/* Main content area with responsive flex/grid */}
        {/* The Navbar's full-screen overlay should now cover this content */}
        <div className="container mx-auto p-4 flex flex-col md:flex-row mt-20 flex-grow">
          {/* Left Sidebar - Categories */}
          <aside className="w-full md:w-1/4 p-4 md:sticky md:top-20 md:h-[calc(100vh-100px)] overflow-y-auto bg-deep-taupe rounded-lg shadow-lg mb-6 md:mb-0">
            <h3 className="text-xl font-bold text-taupe mb-4">Categories</h3>
            <ul>
              {CATEGORIES.map((category) => (
                <li key={category} className="mb-2">
                  <button
                    onClick={() => setFilterCategory(category)}
                    className={`block w-full text-left py-2 px-3 rounded-md transition duration-200 ${
                      filterCategory === category ? 'bg-taupe text-black font-semibold' : 'hover:bg-gray-700'
                    }`}
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          {/* Right Main Content */}
          <main className="w-full md:w-3/4 md:pl-8">
            <div className="mb-8 p-4 bg-deep-taupe rounded-lg shadow-lg flex items-center">
              <input
                type="text"
                placeholder="Search paintings by name..."
                className="flex-grow px-4 py-2 bg-gray-700 border border-taupe rounded-md focus:outline-none focus:ring-2 focus:ring-taupe text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPaintings.length > 0 ? (
                filteredPaintings.map((painting) => (
                  <PaintingCard key={painting._id} painting={painting} />
                ))
              ) : (
                <p className="text-center text-gray-400 col-span-full">No paintings found.</p>
              )}
            </div>
          </main>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
