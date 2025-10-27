import { useRef, useEffect } from 'react';

const AiSparks = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class StarSparkle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 40 + 30;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.02;
        this.pulsePhase = Math.random() * Math.PI * 2;
        this.color = `hsl(${Math.random() * 60 + 170}, 100%, 60%)`;
        this.particles = [];
        this.spawnParticles();
      }

      spawnParticles() {
        const count = Math.floor(Math.random() * 3) + 2;
        for (let i = 0; i < count; i++) {
          this.particles.push({
            angle: Math.random() * Math.PI * 2,
            distance: Math.random() * 60 + 40,
            speed: (Math.random() - 0.5) * 0.01,
            size: Math.random() * 8 + 4,
            phase: Math.random() * Math.PI * 2
          });
        }
      }

      drawStar(x, y, spikes, outerRadius, innerRadius, rotation) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotation);
        ctx.beginPath();

        const points = [];
        for (let i = 0; i < spikes * 2; i++) {
          const radius = i % 2 === 0 ? outerRadius : innerRadius;
          const angle = (Math.PI / spikes) * i;
          points.push({
            x: Math.cos(angle) * radius,
            y: Math.sin(angle) * radius
          });
        }

        ctx.moveTo(points[0].x, points[0].y);

        for (let i = 0; i < points.length; i++) {
          const current = points[i];
          const next = points[(i + 1) % points.length];
          const nextNext = points[(i + 2) % points.length];

          const cp1x = next.x;
          const cp1y = next.y;
          const cp2x = next.x;
          const cp2y = next.y;

          ctx.quadraticCurveTo(cp1x, cp1y, 
            (next.x + nextNext.x) / 2, 
            (next.y + nextNext.y) / 2);
        }

        ctx.closePath();
        ctx.restore();
      }

      update() {
        this.rotation += this.rotationSpeed;
        this.pulsePhase += 0.05;

        this.particles.forEach(p => {
          p.angle += p.speed;
          p.phase += 0.1;
        });
      }

      draw() {
        const pulse = Math.sin(this.pulsePhase) * 0.2 + 1;
        const size = this.size * pulse;

        // Draw glow
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, size * 1.5);
        gradient.addColorStop(0, this.color.replace('60%', '60%, 0.3'));
        gradient.addColorStop(1, this.color.replace('60%', '60%, 0'));

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, size * 1.5, 0, Math.PI * 2);
        ctx.fill();

        // Draw star
        this.drawStar(this.x, this.y, 4, size, size * 0.4, this.rotation);
        ctx.fillStyle = this.color;
        ctx.fill();

        // Draw inner highlight
        this.drawStar(this.x, this.y, 4, size * 0.6, size * 0.25, this.rotation);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.fill();

        // Draw orbiting particles
        this.particles.forEach(p => {
          const px = this.x + Math.cos(p.angle) * p.distance;
          const py = this.y + Math.sin(p.angle) * p.distance;
          const pulsePart = Math.sin(p.phase) * 0.3 + 1;
          const particleSize = p.size * pulsePart;

          // Particle glow
          const pGradient = ctx.createRadialGradient(px, py, 0, px, py, particleSize * 2);
          pGradient.addColorStop(0, 'rgba(100, 200, 255, 0.6)');
          pGradient.addColorStop(1, 'rgba(100, 200, 255, 0)');

          ctx.fillStyle = pGradient;
          ctx.beginPath();
          ctx.arc(px, py, particleSize * 2, 0, Math.PI * 2);
          ctx.fill();

          // Particle core
          ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
          ctx.beginPath();
          ctx.arc(px, py, particleSize, 0, Math.PI * 2);
          ctx.fill();
        });
      }
    }

    let sparkles = [];

    function init() {
      sparkles.push(new StarSparkle(
        canvas.width / 2,
        canvas.height / 2
      ));
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      sparkles.forEach(sparkle => {
        sparkle.update();
        sparkle.draw();
      });

      requestAnimationFrame(animate);
    }

    canvas.addEventListener('click', (e) => {
      if (sparkles.length === 0) {
        sparkles.push(new StarSparkle(e.clientX, e.clientY));
      }
    });

    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (sparkles.length > 0) {
        sparkles[0].x = canvas.width / 2;
        sparkles[0].y = canvas.height / 2;
      }
    });

    init();
    animate();
  }, []);

  return <canvas ref={canvasRef} />;
};

export default AiSparks;
