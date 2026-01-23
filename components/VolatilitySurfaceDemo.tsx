"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

const strikeMin = 60;
const strikeMax = 140;
const strikeSteps = 25;

const maturityMin = 0.2;
const maturityMax = 3;
const maturitySteps = 22;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function formatPercent(value: number) {
  return `${(value * 100).toFixed(1)}%`;
}

export function VolatilitySurfaceDemo() {
  const [spot, setSpot] = useState(100);
  const [baseVol, setBaseVol] = useState(0.22);
  const [skew, setSkew] = useState(-0.25);
  const [smile, setSmile] = useState(0.6);
  const [term, setTerm] = useState(0.2);

  const { strikes, maturities, vols } = useMemo(() => {
    const strikeGrid = Array.from({ length: strikeSteps }, (_, index) =>
      strikeMin + (index / (strikeSteps - 1)) * (strikeMax - strikeMin)
    );
    const maturityGrid = Array.from({ length: maturitySteps }, (_, index) =>
      maturityMin + (index / (maturitySteps - 1)) * (maturityMax - maturityMin)
    );
    const surface = maturityGrid.map((t) =>
      strikeGrid.map((k) => {
        const moneyness = (k - spot) / spot;
        const curvature = smile * moneyness * moneyness;
        const skewTerm = skew * moneyness;
        const termTerm = term * Math.log(1 + t);
        return clamp(baseVol + skewTerm + curvature + termTerm, 0.05, 0.9);
      })
    );
    return { strikes: strikeGrid, maturities: maturityGrid, vols: surface };
  }, [spot, baseVol, skew, smile, term]);

  return (
    <div className="glass relative overflow-hidden rounded-3xl p-8">
      <div className="flex flex-col gap-6">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">Interactive Model</p>
          <h2 className="mt-3 text-2xl font-semibold text-white">Volatility Surface (Demo)</h2>
          <p className="mt-2 text-sm text-white/70">
            Educational visualization of implied volatility across strike and maturity.
          </p>
        </div>

        <div className="grid gap-4 text-xs text-white/70 md:grid-cols-2">
          <label className="space-y-2">
            <div className="flex items-center justify-between">
              <span>Spot (S)</span>
              <span className="font-mono text-white">{spot.toFixed(0)}</span>
            </div>
            <input
              type="range"
              min={80}
              max={140}
              value={spot}
              onChange={(event) => setSpot(Number(event.target.value))}
              className="w-full"
            />
          </label>
          <label className="space-y-2">
            <div className="flex items-center justify-between">
              <span>Base Vol</span>
              <span className="font-mono text-white">{formatPercent(baseVol)}</span>
            </div>
            <input
              type="range"
              min={0.1}
              max={0.6}
              step={0.01}
              value={baseVol}
              onChange={(event) => setBaseVol(Number(event.target.value))}
              className="w-full"
            />
          </label>
          <label className="space-y-2">
            <div className="flex items-center justify-between">
              <span>Skew</span>
              <span className="font-mono text-white">{skew.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min={-0.6}
              max={0.2}
              step={0.02}
              value={skew}
              onChange={(event) => setSkew(Number(event.target.value))}
              className="w-full"
            />
          </label>
          <label className="space-y-2">
            <div className="flex items-center justify-between">
              <span>Smile / Curvature</span>
              <span className="font-mono text-white">{smile.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min={0}
              max={1.2}
              step={0.05}
              value={smile}
              onChange={(event) => setSmile(Number(event.target.value))}
              className="w-full"
            />
          </label>
          <label className="space-y-2 md:col-span-2">
            <div className="flex items-center justify-between">
              <span>Term Structure</span>
              <span className="font-mono text-white">{term.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min={-0.1}
              max={0.5}
              step={0.02}
              value={term}
              onChange={(event) => setTerm(Number(event.target.value))}
              className="w-full"
            />
          </label>
        </div>

        <div className="rounded-2xl border border-white/10 bg-midnight/60 p-4">
          <Plot
            data={[
              {
                type: "surface",
                x: strikes,
                y: maturities,
                z: vols,
                showscale: false,
                colorscale: [
                  [0, "rgba(14, 18, 27, 0.95)"],
                  [0.4, "rgba(200, 16, 46, 0.4)"],
                  [0.8, "rgba(200, 16, 46, 0.85)"],
                  [1, "rgba(255, 122, 89, 0.9)"]
                ],
                hovertemplate:
                  "K: %{x:.0f}<br>T: %{y:.2f}y<br>Vol: %{z:.2%}<extra></extra>"
              }
            ]}
            layout={{
              autosize: true,
              height: 360,
              margin: { l: 0, r: 0, t: 10, b: 0 },
              paper_bgcolor: "rgba(0,0,0,0)",
              plot_bgcolor: "rgba(0,0,0,0)",
              scene: {
                xaxis: {
                  title: "Strike (K)",
                  color: "rgba(255,255,255,0.6)",
                  gridcolor: "rgba(255,255,255,0.08)",
                  zeroline: false
                },
                yaxis: {
                  title: "Maturity (T)",
                  color: "rgba(255,255,255,0.6)",
                  gridcolor: "rgba(255,255,255,0.08)",
                  zeroline: false
                },
                zaxis: {
                  title: "Implied Vol",
                  tickformat: ".0%",
                  color: "rgba(255,255,255,0.6)",
                  gridcolor: "rgba(255,255,255,0.08)",
                  zeroline: false
                },
                camera: { eye: { x: 1.4, y: 1.3, z: 0.9 } }
              }
            }}
            config={{
              displayModeBar: false,
              responsive: true
            }}
            className="h-[360px] w-full"
          />
        </div>
      </div>
    </div>
  );
}
