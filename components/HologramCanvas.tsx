'use client';

import React, { useRef, useEffect, useState } from 'react';

// Interfaces for our 3D Vector Engine
interface Point3D {
  x: number;
  y: number;
  z: number;
  label?: string;
  type?: 'base' | 'pinnacle' | 'window' | 'spire' | 'grid';
  brightness?: number; // for pulsating windows
}

interface Edge {
  a: number; // Index of Point3D a
  b: number; // Index of Point3D b
  color?: string;
  dashed?: boolean;
}

interface ScanModeProps {
  id: string;
  name: string;
  primaryColor: string;
  glowColor: string;
}

export default function HologramCanvas({
  scrollProgress = 0, // value from 0 to 1
  activePhase = 'showcase', // 'showcase' | 'generate' | 'ai' | 'book' | 'close'
}: {
  scrollProgress: number;
  activePhase: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Hologram configurations
  const [showGrid, setShowGrid] = useState(true);
  const [scanSpeed, setScanSpeed] = useState(1); // 1 = Normal, 2 = Overdrive, 0 = Static
  const [activeScanMode, setActiveScanMode] = useState<string>('laser');
  
  // Interactive orbit overrides
  const [mouseRotX, setMouseRotX] = useState(0);
  const [mouseRotY, setMouseRotY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const [systemUptime, setSystemUptime] = useState('00:00:00');

  // Generate system uptime clock
  useEffect(() => {
    const start = Date.now();
    const interval = setInterval(() => {
      const diff = Date.now() - start;
      const ms = Math.floor((diff % 1000) / 10).toString().padStart(2, '0');
      const secs = Math.floor((diff / 1000) % 60).toString().padStart(2, '0');
      const mins = Math.floor((diff / 60000) % 60).toString().padStart(2, '0');
      setSystemUptime(`${mins}:${secs}:${ms}`);
    }, 45);
    return () => clearInterval(interval);
  }, []);

  // 1. Build the Skyscraper Point Cloud and Mesh Edges
  const { vertices, edges } = React.useMemo(() => {
    const list: Point3D[] = [];
    const connectionList: Edge[] = [];

    // Core Skyscraper Parameters
    const baseW = 32;
    const peakW = 20;
    const floorsCount = 6;
    const floorSpacing = 42;
    const totalHeight = floorsCount * floorSpacing; // 252

    // Let's position the building center at X: 0, Y: -100, Z: 0 in 3D Space
    // Level heights (y starting from -110 pushing up to 142)
    const yBaseline = -110;

    // Generate tower structure (Floors & Pillars)
    for (let f = 0; f <= floorsCount; f++) {
      const pct = f / floorsCount;
      const currW = baseW * (1 - pct * 0.35); // Slight tapering as it reaches peak
      const yVal = yBaseline + f * floorSpacing;

      // Add 4 corners per floor
      // Index offset = f * 4
      list.push({ x: -currW, y: yVal, z: -currW, type: 'base' }); // Front Left
      list.push({ x: currW, y: yVal, z: -currW, type: 'base' });  // Front Right
      list.push({ x: currW, y: yVal, z: currW, type: 'base' });   // Back Right
      list.push({ x: -currW, y: yVal, z: currW, type: 'base' });  // Back Left

      // Connect floor perimeter
      const baseIdx = f * 4;
      connectionList.push({ a: baseIdx, b: baseIdx + 1, color: '#22c55e' });
      connectionList.push({ a: baseIdx + 1, b: baseIdx + 2, color: '#22c55e' });
      connectionList.push({ a: baseIdx + 2, b: baseIdx + 3, color: '#22c55e' });
      connectionList.push({ a: baseIdx + 3, b: baseIdx, color: '#22c55e' });

      // Connect vertically to prior floor
      if (f > 0) {
        const priorIdx = (f - 1) * 4;
        connectionList.push({ a: priorIdx, b: baseIdx, color: '#16a34a' });
        connectionList.push({ a: priorIdx + 1, b: baseIdx + 1, color: '#16a34a' });
        connectionList.push({ a: priorIdx + 2, b: baseIdx + 2, color: '#16a34a' });
        connectionList.push({ a: priorIdx + 3, b: baseIdx + 3, color: '#16a34a' });

        // Structural Diagonal Bracing in Middle Section (Truncated CAD truss)
        if (f === 2 || f === 4) {
          connectionList.push({ a: priorIdx, b: baseIdx + 1, color: '#84cc16', dashed: true });
          connectionList.push({ a: priorIdx + 2, b: baseIdx + 3, color: '#84cc16', dashed: true });
        }
      }
    }

    // Add Antenna Spire details on building top
    const topFloorY = yBaseline + totalHeight;
    const spireStartIdx = list.length;
    list.push({ x: 0, y: topFloorY, z: 0, type: 'spire' });                 // Spire Base mount
    list.push({ x: 0, y: topFloorY + 30, z: 0, type: 'spire' });            // Mid-antenna segment
    list.push({ x: 0, y: topFloorY + 65, z: 0, type: 'pinnacle' });         // Peak Warning Light

    connectionList.push({ a: spireStartIdx, b: spireStartIdx + 1, color: '#bef264' });
    connectionList.push({ a: spireStartIdx + 1, b: spireStartIdx + 2, color: '#a3e635' });

    // Diagonal support lines for antenna
    const topFloorStartIdx = floorsCount * 4;
    connectionList.push({ a: topFloorStartIdx, b: spireStartIdx + 1, color: '#15803d', dashed: true });
    connectionList.push({ a: topFloorStartIdx + 2, b: spireStartIdx + 1, color: '#15803d', dashed: true });

    // Generate random pulsating "Window" modules aligned to grid facades
    // These reflect AI-automated transactions / real estate units
    const facadeWindowCount = 36;
    for (let w = 0; w < facadeWindowCount; w++) {
      const f = 1 + Math.floor(Math.random() * (floorsCount - 1)); // Random middle floors
      const yVal = yBaseline + f * floorSpacing - (10 + Math.random() * 20);
      const face = Math.floor(Math.random() * 4); // 0 = North, 1 = East, 2 = South, 3 = West
      const offsetPos = -22 + Math.random() * 44;
      const currW = baseW * (1 - (f / floorsCount) * 0.35);

      let wx = 0, wz = 0;
      if (face === 0) { wx = offsetPos; wz = -currW; }
      else if (face === 1) { wx = currW; wz = offsetPos; }
      else if (face === 2) { wx = offsetPos; wz = currW; }
      else { wx = -currW; wz = offsetPos; }

      list.push({
        x: wx,
        y: yVal,
        z: wz,
        type: 'window',
        brightness: Math.random(),
      });
    }

    return { vertices: list, edges: connectionList };
  }, []);

  // Handle Dragging / Interactive Rotation State
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    setMouseRotY(prev => prev + dx * 0.007);
    setMouseRotX(prev => Math.max(-Math.PI/3, Math.min(Math.PI/3, prev - dy * 0.007)));
    dragStart.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const resetManualControl = () => {
    setMouseRotX(0);
    setMouseRotY(0);
  };

  // 2. Main Render Pipeline
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let internalOrbitAngle = 0;
    let verticalLaserYPos = 0;
    let verticalLaserDir = 1;

    // Resize handler
    const fitToContainer = () => {
      const container = containerRef.current;
      if (container) {
        canvas.width = container.clientWidth * window.devicePixelRatio;
        canvas.height = container.clientHeight * window.devicePixelRatio;
        canvas.style.width = `${container.clientWidth}px`;
        canvas.style.height = `${container.clientHeight}px`;
      }
    };
    fitToContainer();
    window.addEventListener('resize', fitToContainer);

    // Render loop
    const frame = () => {
      if (!ctx || !canvas) return;
      const w = canvas.width;
      const h = canvas.height;
      const scale = window.devicePixelRatio;
      
      // Clear viewport
      ctx.clearRect(0, 0, w, h);

      // Define scan mode properties
      let primaryHue = '163, 255, 0';  // Sophisticated Dark Neon Lime (#a3ff00)
      let glowColor = 'rgba(163, 255, 0, 0.45)';
      if (activeScanMode === 'radar') {
        primaryHue = '6, 182, 212'; // cyan
        glowColor = 'rgba(6, 182, 212, 0.45)';
      } else if (activeScanMode === 'thermal') {
        primaryHue = '249, 115, 22'; // orange
        glowColor = 'rgba(249, 115, 22, 0.45)';
      }

      // Progressively update laser position
      verticalLaserYPos += 0.9 * verticalLaserDir * scanSpeed;
      if (verticalLaserYPos > 140) {
        verticalLaserYPos = 140;
        verticalLaserDir = -1;
      } else if (verticalLaserYPos < -110) {
        verticalLaserYPos = -110;
        verticalLaserDir = 1;
      }

      // Camera state calculations (combining manual dragging + scroll positions)
      // Different sections affect default orbit angle, pitch tilt, zoom depth
      let defaultAngle = internalOrbitAngle;
      let defaultPitch = 0.22; // subtle downward tilt
      let baseDistance = 380; // camera focal distance
      let verticalOffset = 15; // center vertical shift

      // Scroll Phase overrides mapping
      if (activePhase === 'showcase') {
        // High top-down aerial sweep
        defaultAngle = scrollProgress * Math.PI * 1.5;
        defaultPitch = 0.55 - (scrollProgress * 0.2); // high angle pulling down
        baseDistance = 330 + (scrollProgress * 60);
        verticalOffset = 30;
      } else if (activePhase === 'generate') {
        // Shifting fast orbit around facades
        defaultAngle = (Math.PI * 0.4) + (scrollProgress * Math.PI * 2.2);
        defaultPitch = 0.15;
        baseDistance = 290;
        verticalOffset = -10;
      } else if (activePhase === 'ai') {
        // Inquiries macro focus zooming into floors
        defaultAngle = Math.PI * 1.15;
        defaultPitch = 0.08;
        baseDistance = 210 + (scrollProgress * 70); // zooming out
        verticalOffset = -35;
      } else if (activePhase === 'book') {
        // Wide balcony perspective view
        defaultAngle = Math.PI * 1.8 + (scrollProgress * 0.8);
        defaultPitch = -0.05; // look up slightly!
        baseDistance = 340;
        verticalOffset = 45;
      } else if (activePhase === 'close') {
        // Ground-level powerful searchlight view point
        defaultAngle = scrollProgress * Math.PI * 0.8;
        defaultPitch = -0.22; // lookup perspective
        baseDistance = 420 - (scrollProgress * 150); // fast approach
        verticalOffset = -60;
      } else {
        // Default standard state
        defaultAngle += 0.003;
      }

      internalOrbitAngle += 0.0025 * scanSpeed; // constant dynamic baseline

      // Combine default parameters with manual dragging increments
      const angleY = defaultAngle + mouseRotY;
      const angleX = defaultPitch + mouseRotX;
      
      // Trigonometry math for 3D Camera system matrices
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);

      // Simple 3D projection matrix with standard scale multipliers for retina support
      const project = (pt: Point3D) => {
        // 1. Rotate Y (heading orbit)
        const x1 = pt.x * cosY - pt.z * sinY;
        const z1 = pt.x * sinY + pt.z * cosY;

        // 2. Rotate X (altitude pitching)
        const y2 = pt.y * cosX - z1 * sinX;
        const z2 = pt.y * sinX + z1 * cosX;

        // Perspective depth factors
        const depth = baseDistance - z2;
        const scaleFactor = (scale * 320) / Math.max(1, depth);
        
        return {
          currentX: (x1 * scaleFactor) + (w / 2),
          currentY: -(y2 * scaleFactor) + (h / 2) + (verticalOffset * scale),
          depth: z2,
          visible: depth > 10,
        };
      };

      // Set canvas render settings
      ctx.lineWidth = 1.2 * scale;
      ctx.lineJoin = 'round';

      // 3. Render 3D Ground Grid base (if enabled)
      if (showGrid) {
        ctx.strokeStyle = `rgba(${primaryHue}, 0.07)`;
        const gridSize = 160;
        const step = 20;
        for (let i = -gridSize; i <= gridSize; i += step) {
          // Lines along Z
          const ptA = project({ x: i, y: -110, z: -gridSize });
          const ptB = project({ x: i, y: -110, z: gridSize });
          if (ptA.visible && ptB.visible) {
            ctx.beginPath();
            ctx.moveTo(ptA.currentX, ptA.currentY);
            ctx.lineTo(ptB.currentX, ptB.currentY);
            ctx.stroke();
          }
          // Lines along X
          const ptC = project({ x: -gridSize, y: -110, z: i });
          const ptD = project({ x: gridSize, y: -110, z: i });
          if (ptC.visible && ptD.visible) {
            ctx.beginPath();
            ctx.moveTo(ptC.currentX, ptC.currentY);
            ctx.lineTo(ptD.currentX, ptD.currentY);
            ctx.stroke();
          }
        }
      }

      // 4. Project and Sort all vertices
      const projected = vertices.map(v => {
        const p = project(v);
        // Mutate window brightness for beautiful random glimmers
        if (v.type === 'window' && Math.random() < 0.04) {
          v.brightness = 0.2 + Math.random() * 0.8;
        }
        return { ...p, origin: v };
      });

      // 5. Draw Skyscraper Structural Edges
      edges.forEach(edge => {
        const ptA = projected[edge.a];
        const ptB = projected[edge.b];

        if (ptA && ptB && ptA.visible && ptB.visible) {
          ctx.beginPath();
          ctx.moveTo(ptA.currentX, ptA.currentY);
          ctx.lineTo(ptB.currentX, ptB.currentY);
          
          if (edge.dashed) {
            ctx.setLineDash([3 * scale, 5 * scale]);
          } else {
            ctx.setLineDash([]);
          }

          // Compute distance color adjustments (deeper points are dimmer)
          const midDepth = (ptA.depth + ptB.depth) / 2;
          const pct = Math.max(0.15, Math.min(1.0, (midDepth + 150) / 300));
          
          if (edge.color) {
            ctx.strokeStyle = `rgba(${primaryHue}, ${0.5 * pct})`;
          } else {
            ctx.strokeStyle = `rgba(${primaryHue}, ${0.35 * pct})`;
          }
          ctx.stroke();
        }
      });
      ctx.setLineDash([]); // Reset line dash

      // 6. Draw glowing skyscraper pulsing Windows
      projected.forEach(pt => {
        if (pt.origin.type === 'window' && pt.visible) {
          const depthPct = Math.max(0.1, Math.min(1.0, (pt.depth + 150) / 300));
          const brightness = pt.origin.brightness || 0.5;
          const alpha = 0.8 * depthPct * brightness;

          ctx.fillStyle = `rgba(${primaryHue}, ${alpha})`;
          ctx.beginPath();
          ctx.arc(pt.currentX, pt.currentY, 1.8 * scale, 0, Math.PI * 2);
          ctx.fill();

          // Add subtle outer bloom on high brightness events
          if (brightness > 0.8) {
            ctx.fillStyle = `rgba(${primaryHue}, ${0.12 * alpha})`;
            ctx.beginPath();
            ctx.arc(pt.currentX, pt.currentY, 4.5 * scale, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      });

      // 7. Draw horizontal Sweep scanning laser rings
      // Computes intersection coordinates of the scanning plane with building facade columns
      const scanBeamY = verticalLaserYPos;
      ctx.strokeStyle = `rgba(${primaryHue}, 0.75)`;
      ctx.fillStyle = `rgba(${primaryHue}, 0.035)`;
      ctx.lineWidth = 1.6 * scale;

      // Project 4 corner points of a virtual ring around building center at laser Y level
      const tH = 35 * (1 - ((scanBeamY + 110) / 252) * 0.35); // computed width of facade top-to-bottom
      const scanPts = [
        project({ x: -tH, y: scanBeamY, z: -tH }),
        project({ x: tH, y: scanBeamY, z: -tH }),
        project({ x: tH, y: scanBeamY, z: tH }),
        project({ x: -tH, y: scanBeamY, z: tH }),
      ];

      if (scanPts.every(p => p.visible)) {
        ctx.beginPath();
        ctx.moveTo(scanPts[0].currentX, scanPts[0].currentY);
        for (let idx = 1; idx < 4; idx++) {
          ctx.lineTo(scanPts[idx].currentX, scanPts[idx].currentY);
        }
        ctx.closePath();
        ctx.stroke();
        ctx.fill();

        // Target nodes blinking precisely during laser overlap
        projected.forEach(pt => {
          if (Math.abs(pt.origin.y - scanBeamY) < 12 && pt.visible) {
            ctx.fillStyle = '#ffffff';
            ctx.strokeStyle = `rgba(${primaryHue}, 0.9)`;
            ctx.beginPath();
            ctx.arc(pt.currentX, pt.currentY, 2.5 * scale, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();

            // Micro coordinate labels for CAD styling
            ctx.font = `${7 * scale}px font-mono, monospace`;
            ctx.fillStyle = `rgba(${primaryHue}, 0.85)`;
            ctx.fillText(
              `_NOD.${Math.round(pt.origin.x)}:${Math.round(pt.origin.z)}`,
              pt.currentX + 6 * scale,
              pt.currentY + 2 * scale
            );
          }
        });
      }
      ctx.lineWidth = 1.2 * scale; // Restore standard line width

      // 8. Drone parameters (orbital offset, model, laser projection)
      // Orbiting rate is twice the speed of standard visual rotation to look independently active
      const droneAngle = angleY * 1.8 + Math.PI;
      const droneRadius = 85 + Math.sin(angleY * 2.5) * 12; // wavey real-world flight drift!
      const droneY = scanBeamY + 30 * Math.cos(angleY); // hovering altitude offset

      const droneCoords: Point3D = {
        x: droneRadius * Math.cos(droneAngle),
        y: droneY,
        z: droneRadius * Math.sin(droneAngle)
      };

      const droneProj = project(droneCoords);

      if (droneProj.visible) {
        // Draw the downward scan laser cone from drone onto the building core
        const targetBeamCoord: Point3D = { x: 0, y: scanBeamY, z: 0 };
        const beamProj = project(targetBeamCoord);

        if (beamProj.visible) {
          ctx.beginPath();
          ctx.moveTo(droneProj.currentX, droneProj.currentY);
          ctx.lineTo(beamProj.currentX, beamProj.currentY);
          ctx.strokeStyle = `rgba(${primaryHue}, 0.55)`;
          ctx.lineWidth = 0.8 * scale;
          ctx.setLineDash([2 * scale, 4 * scale]);
          ctx.stroke();
          ctx.setLineDash([]);
          ctx.lineWidth = 1.2 * scale;

          // Draw cone volumetric visual
          ctx.fillStyle = `rgba(${primaryHue}, 0.05)`;
          ctx.beginPath();
          ctx.moveTo(droneProj.currentX, droneProj.currentY);
          // sweep outward at building width
          ctx.lineTo(beamProj.currentX - 25 * scale, beamProj.currentY);
          ctx.lineTo(beamProj.currentX + 25 * scale, beamProj.currentY);
          ctx.closePath();
          ctx.fill();
        }

        // Draw Drone wireframe geometry structures
        // Helicopter blades, 4 offset nodes, main central core
        const drawDroneArm = (dx: number, dz: number) => {
          const armEnd = project({
            x: droneCoords.x + dx,
            y: droneCoords.y,
            z: droneCoords.z + dz
          });
          if (armEnd.visible) {
            ctx.strokeStyle = `rgba(${primaryHue}, 0.9)`;
            ctx.beginPath();
            ctx.moveTo(droneProj.currentX, droneProj.currentY);
            ctx.lineTo(armEnd.currentX, armEnd.currentY);
            ctx.stroke();

            // Pulse miniature rotators
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(armEnd.currentX, armEnd.currentY, 2 * scale, 0, Math.PI * 2);
            ctx.fill();

            // Blades span
            const bladeLen = 6 * scale;
            const bladeAngle = (Date.now() * 0.035) % (Math.PI * 2);
            ctx.strokeStyle = `rgba(255, 255, 255, 0.4)`;
            ctx.beginPath();
            ctx.moveTo(armEnd.currentX - Math.cos(bladeAngle) * bladeLen, armEnd.currentY - Math.sin(bladeAngle) * bladeLen);
            ctx.lineTo(armEnd.currentX + Math.cos(bladeAngle) * bladeLen, armEnd.currentY + Math.sin(bladeAngle) * bladeLen);
            ctx.stroke();
          }
        };

        // Draw quad-rotor arms offsets
        drawDroneArm(-12, -12);
        drawDroneArm(12, -12);
        drawDroneArm(12, 12);
        drawDroneArm(-12, 12);

        // Core capsule
        ctx.fillStyle = '#ffffff';
        ctx.strokeStyle = `rgba(${primaryHue}, 0.95)`;
        ctx.beginPath();
        ctx.arc(droneProj.currentX, droneProj.currentY, 4 * scale, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // 9. Draw HUD Sci-Fi Target Bracket lock overlay over drone target
        const bracketW = 14 * scale;
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1 * scale;
        
        // top-left bracket
        ctx.beginPath();
        ctx.moveTo(droneProj.currentX - bracketW, droneProj.currentY - bracketW + 4 * scale);
        ctx.lineTo(droneProj.currentX - bracketW, droneProj.currentY - bracketW);
        ctx.lineTo(droneProj.currentX - bracketW + 4 * scale, droneProj.currentY - bracketW);
        ctx.stroke();

        // top-right
        ctx.beginPath();
        ctx.moveTo(droneProj.currentX + bracketW, droneProj.currentY - bracketW + 4 * scale);
        ctx.lineTo(droneProj.currentX + bracketW, droneProj.currentY - bracketW);
        ctx.lineTo(droneProj.currentX + bracketW - 4 * scale, droneProj.currentY - bracketW);
        ctx.stroke();

        // bottom-left
        ctx.beginPath();
        ctx.moveTo(droneProj.currentX - bracketW, droneProj.currentY + bracketW - 4 * scale);
        ctx.lineTo(droneProj.currentX - bracketW, droneProj.currentY + bracketW);
        ctx.lineTo(droneProj.currentX - bracketW + 4 * scale, droneProj.currentY + bracketW);
        ctx.stroke();

        // bottom-right
        ctx.beginPath();
        ctx.moveTo(droneProj.currentX + bracketW, droneProj.currentY + bracketW - 4 * scale);
        ctx.lineTo(droneProj.currentX + bracketW, droneProj.currentY + bracketW);
        ctx.lineTo(droneProj.currentX + bracketW - 4 * scale, droneProj.currentY + bracketW);
        ctx.stroke();

        // Label drone HUD parameters next to locked target
        ctx.font = `bold ${8 * scale}px font-mono, monospace`;
        ctx.fillStyle = '#ffffff';
        ctx.fillText('SYS_DRN_R67_SCAN', droneProj.currentX + bracketW + 4 * scale, droneProj.currentY - 4 * scale);
        
        ctx.font = `${7 * scale}px font-mono, monospace`;
        ctx.fillStyle = `rgba(${primaryHue}, 0.85)`;
        ctx.fillText(`ALT: ${Math.round(droneY + 120)}m`, droneProj.currentX + bracketW + 4 * scale, droneProj.currentY + 5 * scale);
        ctx.fillText(`YAW: ${Math.round((droneAngle * 180 / Math.PI) % 360)}deg`, droneProj.currentX + bracketW + 4 * scale, droneProj.currentY + 13 * scale);
      }

      // 10. Draw flashing building Pinnacle flashing Warning Beacon on Spire top
      const pinnacleIdx = vertices.findIndex(v => v.type === 'pinnacle');
      if (pinnacleIdx !== -1) {
        const pinProj = projected[pinnacleIdx];
        if (pinProj && pinProj.visible) {
          const warnFlash = (Date.now() % 1000) > 750;
          
          if (warnFlash) {
            ctx.fillStyle = '#ff3b30';
            ctx.beginPath();
            ctx.arc(pinProj.currentX, pinProj.currentY, 3.5 * scale, 0, Math.PI * 2);
            ctx.fill();

            // Flare wave
            ctx.strokeStyle = 'rgba(255, 59, 48, 0.35)';
            ctx.beginPath();
            ctx.arc(pinProj.currentX, pinProj.currentY, 9 * scale, 0, Math.PI * 2);
            ctx.stroke();
          } else {
            ctx.fillStyle = '#b3150d';
            ctx.beginPath();
            ctx.arc(pinProj.currentX, pinProj.currentY, 2 * scale, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // Restore parameters
      ctx.lineWidth = 1 * scale;
      animationFrameId = requestAnimationFrame(frame);
    };

    frame();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', fitToContainer);
    };
  }, [vertices, edges, showGrid, scanSpeed, activeScanMode, scrollProgress, activePhase, mouseRotX, mouseRotY]);

  return (
    <div className="relative w-full h-full flex flex-col justify-between" ref={containerRef}>
      {/* 3D Drag Interface Window - Capture cursor movements */}
      <div 
        id="hologram-interaction"
        className="absolute inset-0 cursor-grab active:cursor-grabbing z-10"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />

      {/* Top HUD system parameters display bar */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-start pointer-events-none z-20 font-mono text-[10px] tracking-wider text-lime-400 select-none">
        <div id="canvas-hud-stats" className="bg-emerald-950/45 backdrop-blur-[6px] border border-emerald-900/40 px-3 py-2 rounded-sm space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-white uppercase text-xs">
            <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
            Dart Media HUD _V4.7
          </div>
          <div>OBJECT REZ: SKYSCRAPER_WIRE_S4</div>
          <div>GRID ANGLE Y: {Math.round(((scrollProgress * Math.PI * 1.5 + mouseRotY) * 180 / Math.PI) % 360)}°</div>
          <div>ROTATION X: {Math.round((0.22 + mouseRotX) * 180 / Math.PI)}°</div>
          <div>SCROLL ALIGN: {Math.round(scrollProgress * 100)}%</div>
        </div>

        <div id="canvas-hud-clock" className="bg-emerald-950/45 backdrop-blur-[6px] border border-emerald-900/40 px-3 py-2 rounded-sm text-right space-y-1">
          <div className="font-bold text-white">UPTIME COUNT</div>
          <div className="text-lime-300 font-mono text-xs font-semibold">{systemUptime}</div>
          <div className="text-[9px] text-emerald-500">SECTOR_DART_ORBIT_ONLINE</div>
          <div className="text-[9px] text-emerald-500 uppercase">SYS_PHASE: {activePhase}</div>
        </div>
      </div>

      {/* Primary 3D Viewport Drawing Element */}
      <canvas 
        ref={canvasRef} 
        className="w-full h-full block bg-radial-[circle_at_center,rgba(2,44,34,0.3)_0%,rgba(0,0,0,0.95)_90%]"
      />

      {/* Bottom HUD Interaction & Settings overlays */}
      <div className="absolute bottom-4 left-4 right-4 flex flex-wrap justify-between items-center gap-3 pointer-events-auto z-20 font-mono text-[10px] select-none">
        {/* Color Palette Scan Options */}
        <div id="scan-mode-toggles" className="flex items-center gap-2 bg-black/75 border border-emerald-900/60 p-1.5 rounded-[4px] backdrop-blur-[8px]">
          <span className="text-emerald-500 px-1 font-semibold">VIEW:</span>
          <button
            id="toggle-laser-laser"
            onClick={() => setActiveScanMode('laser')}
            className={`px-2 py-1 rounded-[2px] transition ${activeScanMode === 'laser' ? 'bg-lime-500 text-black font-semibold' : 'text-lime-400 hover:bg-emerald-950/50'}`}
          >
            LIDAR SCAN
          </button>
          <button
            id="toggle-laser-radar"
            onClick={() => setActiveScanMode('radar')}
            className={`px-2 py-1 rounded-[2px] transition ${activeScanMode === 'radar' ? 'bg-cyan-500 text-black font-semibold' : 'text-cyan-400 hover:bg-cyan-950/35'}`}
          >
            RADAR MATRIX
          </button>
          <button
            id="toggle-laser-thermal"
            onClick={() => setActiveScanMode('thermal')}
            className={`px-2 py-1 rounded-[2px] transition ${activeScanMode === 'thermal' ? 'bg-orange-500 text-black font-semibold' : 'text-orange-400 hover:bg-orange-950/35'}`}
          >
            THERMAL DETECT
          </button>
        </div>

        {/* Diagnostic Toggle settings */}
        <div id="diagnostic-buttons-hud" className="flex items-center gap-2 bg-black/75 border border-emerald-900/60 p-1.5 rounded-[4px] backdrop-blur-[8px]">
          <button
            id="toggle-hud-grid"
            onClick={() => setShowGrid(!showGrid)}
            className={`px-2.5 py-1 rounded-[2px] transition ${showGrid ? 'border border-emerald-800 bg-emerald-900/40 text-white' : 'text-emerald-600'}`}
          >
            {showGrid ? '☒ GRID MESH' : '☐ GRID MESH'}
          </button>
          
          <button
            id="toggle-hud-speed"
            onClick={() => setScanSpeed(prev => (prev === 2 ? 0 : prev + 1))}
            className="px-2.5 py-1 text-white border border-emerald-800 bg-emerald-900/20 rounded-[2px] hover:bg-emerald-900/40 transition"
          >
            SPEED: {scanSpeed === 0 ? 'PAUSED' : scanSpeed === 1 ? '1.0X' : '2.0X'}
          </button>

          {(mouseRotX !== 0 || mouseRotY !== 0) && (
            <button
              id="reset-cam-hud"
              onClick={resetManualControl}
              className="px-2.5 py-1 text-black font-bold bg-white rounded-[2px] hover:bg-neutral-200 transition"
            >
              DRAGGING [RESET VIEW]
            </button>
          )}
        </div>
      </div>

      {/* Technical coordinate lines on sides */}
      <div className="absolute left-4 top-1/4 bottom-1/4 w-[1px] bg-gradient-to-b from-transparent via-lime-500/20 to-transparent flex items-center justify-center pointer-events-none z-10 font-mono text-[8px] text-lime-400/50">
        <div className="rotate-90 select-none whitespace-nowrap tracking-[0.3em]">ALTITUDE_SCAN_PLANE_VERIFIED_78A</div>
      </div>
      <div className="absolute right-4 top-1/4 bottom-1/4 w-[1px] bg-gradient-to-b from-transparent via-lime-500/20 to-transparent flex items-center justify-center pointer-events-none z-10 font-mono text-[8px] text-lime-400/50">
        <div className="-rotate-90 select-none whitespace-nowrap tracking-[0.3em]">ORBITAL_YAW_FLIGHT_PATH_R67</div>
      </div>
    </div>
  );
}
