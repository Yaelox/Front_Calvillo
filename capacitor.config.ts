import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.miapp.tienda',
  appName: 'Tienda Online',
  webDir: 'www', // Directorio de salida de la build
  bundledWebRuntime: false,
  plugins: {
    Camera: {
      permissions: {
        camera: 'true',
      },
    },
  },
};

export default config;
