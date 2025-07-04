# 3D Solar System Simulation

A comprehensive 3D solar system simulation built with Three.js featuring realistic planetary orbits, interactive controls, and stunning visual effects.

## 🌟 Features

### Core Requirements
- **3D Solar System**: Complete solar system with the Sun and all 8 planets (Mercury to Neptune)
- **Realistic Orbital Animation**: Planets orbit at different speeds based on realistic proportions
- **Individual Speed Controls**: Real-time speed adjustment for each planet using sliders
- **Smooth Animation**: Uses THREE.Clock and requestAnimationFrame for smooth 60fps animation
- **Responsive Design**: Mobile-responsive web page that works on all modern browsers

### Bonus Features Implemented
- **✅ Pause/Resume Button**: Control animation playback
- **✅ Background Stars**: Beautiful animated starfield
- **✅ Planet Information**: Hover tooltips with planet details
- **✅ Dark/Light Theme Toggle**: Switch between visual themes
- **✅ Interactive Camera**: Mouse drag to rotate view, scroll to zoom
- **✅ Orbit Visualization**: Subtle orbit lines for better understanding
- **✅ Reset Functionality**: Reset all planets to default state
- **✅ Planet Rotation**: Each planet rotates on its axis
- **✅ Enhanced Lighting**: Realistic lighting with shadows
- **✅ Sun Glow Effect**: Animated sun with glow
- **✅ Responsive Controls**: Touch-friendly controls for mobile

## 🚀 How to Run

### Option 1: Live Demo (GitHub Pages)
🌐 **Live Demo**: https://kunalmaurya-17-24.github.io/2d-Solar-System/

### Option 2: Direct Browser
1. Download and extract the project files
2. Open `index.html` in any modern web browser
3. The simulation will start automatically

### Option 3: Local Server (Recommended for Development)
1. Open terminal/command prompt in the project directory
2. Run a local server:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   
   # Node.js (if you have it)
   npx serve .
   ```
3. Open `http://localhost:8000` in your browser

### Setting up GitHub Pages
To enable GitHub Pages for your fork:
1. Go to your repository settings
2. Scroll to "Pages" section
3. Under "Source", select "Deploy from a branch"
4. Choose "master" branch and "/ (root)" folder
5. Click "Save"
6. Your site will be available at: `https://yourusername.github.io/2d-Solar-System/`

## 🎮 Controls

### Speed Controls
- **Individual Planet Sliders**: Adjust orbital speed from 0x to 5x for each planet
- **Real-time Updates**: Changes take effect immediately

### Camera Controls
- **Mouse Drag**: Click and drag to rotate camera around the solar system
- **Mouse Wheel**: Scroll to zoom in/out (range: 20-200 units)
- **Auto Focus**: Camera always looks at the center of the solar system

### Animation Controls
- **Pause/Resume**: Toggle animation playback
- **Reset**: Reset all planets to default positions and speeds
- **Theme Toggle**: Switch between dark and light modes

### Planet Information
- **Hover Effects**: Hover over any planet to see detailed information
- **Planet Details**: Learn about orbital periods and interesting facts

## 🏗️ Technical Implementation

### Three.js Features Used
- **Scene Management**: Proper scene setup with camera and renderer
- **Geometry**: SphereGeometry for planets and sun
- **Materials**: MeshLambertMaterial for realistic lighting
- **Lighting**: Ambient, Point, and Directional lights
- **Shadows**: Enabled shadow mapping for realistic effects
- **Raycasting**: For mouse interaction and hover detection
- **BufferGeometry**: Efficient star field rendering

### Animation System
- **Delta Time**: Uses THREE.Clock for frame-rate independent animation
- **Orbital Mechanics**: Circular orbits with realistic speed ratios
- **Planet Rotation**: Individual rotation speeds for each planet
- **Smooth Controls**: Interpolated camera movement

### Performance Optimizations
- **Efficient Rendering**: Single animation loop with requestAnimationFrame
- **LOD Management**: Appropriate geometry detail levels
- **Memory Management**: Proper disposal of unused objects
- **Mobile Optimization**: Touch-friendly controls and responsive design

## 📁 File Structure

```
solar-system-3d/
├── index.html          # Main HTML file with UI and styling
├── js/
│   └── main.js         # Complete JavaScript implementation
└── README.md           # This file
```

## 🌍 Planet Data

The simulation includes accurate relative data for all planets:

| Planet  | Size | Distance | Speed | Rotation |
|---------|------|----------|-------|----------|
| Mercury | 0.4  | 12       | Fast  | Slow     |
| Venus   | 0.7  | 16       | Med   | V.Slow   |
| Earth   | 0.8  | 20       | Med   | Fast     |
| Mars    | 0.6  | 25       | Slow  | Fast     |
| Jupiter | 1.5  | 32       | V.Slow| V.Fast   |
| Saturn  | 1.2  | 40       | V.Slow| V.Fast   |
| Uranus  | 1.0  | 48       | Slow  | Fast     |
| Neptune | 0.9  | 56       | V.Slow| Fast     |

## 🔧 Browser Compatibility

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 📱 Mobile Support

- Responsive design that adapts to all screen sizes
- Touch-friendly controls
- Optimized UI panels for mobile viewing
- Gesture support for camera controls

## 🎨 Customization

The simulation is highly customizable:

- **Planet Colors**: Modify colors in the `planetData` array
- **Orbital Distances**: Adjust `distance` values for spacing
- **Speeds**: Change `baseSpeed` for different orbital periods
- **Visual Effects**: Modify materials and lighting in the code
- **UI Styling**: Customize CSS for different appearance

## 🐛 Troubleshooting

**Black Screen**: Ensure you're running from a web server, not file:// protocol
**Performance Issues**: Reduce star count or disable shadows in the code
**Mobile Issues**: Ensure viewport meta tag is present in HTML

## 📈 Performance Tips

- The simulation runs at 60fps on modern devices
- Uses efficient rendering techniques
- Optimized for both desktop and mobile
- Minimal memory footprint

---

Built with ❤️ using Three.js and vanilla JavaScript
