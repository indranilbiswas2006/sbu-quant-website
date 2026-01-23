"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

const DEFAULT_PATHS = 100;
const STEPS = 60;
const T = 1;
const DT = T / STEPS;

function randn() {
  let u = 0;
  let v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

function formatPercent(value: number) {
  return `${(value * 100).toFixed(2)}%`;
}

function quantile(sorted: number[], q: number) {
  const pos = (sorted.length - 1) * q;
  const base = Math.floor(pos);
  const rest = pos - base;
  if (sorted[base + 1] !== undefined) {
    return sorted[base] + rest * (sorted[base + 1] - sorted[base]);
  }
  return sorted[base];
}

export function MarketCrashSimulator() {
  const [drift, setDrift] = useState(0.06);
  const [volatility, setVolatility] = useState(0.25);
  const [crashProb, setCrashProb] = useState(0.08);
  const [crashSize, setCrashSize] = useState(0.3);
  const [paths, setPaths] = useState(DEFAULT_PATHS);
  const [runSeed, setRunSeed] = useState(0);

  const simulation = useMemo(() => {
    const timeAxis = Array.from({ length: STEPS + 1 }, (_, i) => i * DT);
    const allPaths: number[][] = [];
    const finalReturns: number[] = [];

    for (let i = 0; i < paths; i += 1) {
      const path: number[] = [100];
      let price = 100;
      for (let step = 1; step <= STEPS; step += 1) {
        const shock = volatility * Math.sqrt(DT) * randn();
        const driftTerm = (drift - 0.5 * volatility * volatility) * DT;
        price *= Math.exp(driftTerm + shock);
        if (Math.random() < crashProb * DT) {
          price *= 1 - crashSize;
        }
        path.push(price);
      }
      allPaths.push(path);
      finalReturns.push(path[path.length - 1] / 100 - 1);
    }

    const sorted = [...finalReturns].sort((a, b) => a - b);
    const mean = finalReturns.reduce((acc, value) => acc + value, 0) / finalReturns.length;
    const worst5 = quantile(sorted, 0.05);
    const best5 = quantile(sorted, 0.95);

    return {
      timeAxis,
      allPaths,
      finalReturns,
      stats: { mean, worst5, best5 }
    };
  }, [drift, volatility, crashProb, crashSize, paths, runSeed]);

  return (
    <div className="glass relative overflow-hidden rounded-3xl p-8">
      <div className="flex flex-col gap-6">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">Interactive Lab</p>
          <h2 className="mt-3 text-2xl font-semibold text-white">Market Crash Simulator</h2>
          <p className="mt-2 text-sm text-white/70">
            Explore how drift, volatility, and crash risk reshape price paths and outcomes.
          </p>
        </div>

        <div className="grid gap-4 text-xs text-white/70 md:grid-cols-2">
          <label className="space-y-2">
            <div className="flex items-center justify-between">
              <span>Drift</span>
              <span className="font-mono text-white">{formatPercent(drift)}</span>
            </div>
            <input
              type="range"
              min={-0.05}
              max={0.15}
              step={0.005}
              value={drift}
              onChange={(event) => setDrift(Number(event.target.value))}
              className="w-full"
            />
          </label>
          <label className="space-y-2">
            <div className="flex items-center justify-between">
              <span>Volatility</span>
              <span className="font-mono text-white">{formatPercent(volatility)}</span>
            </div>
            <input
              type="range"
              min={0.05}
              max={0.6}
              step={0.01}
              value={volatility}
              onChange={(event) => setVolatility(Number(event.target.value))}
              className="w-full"
            />
          </label>
          <label className="space-y-2">
            <div className="flex items-center justify-between">
              <span>Crash Probability (annual)</span>
              <span className="font-mono text-white">{formatPercent(crashProb)}</span>
            </div>
            <input
              type="range"
              min={0}
              max={0.3}
              step={0.01}
              value={crashProb}
              onChange={(event) => setCrashProb(Number(event.target.value))}
              className="w-full"
            />
          </label>
          <label className="space-y-2">
            <div className="flex items-center justify-between">
              <span>Crash Size</span>
              <span className="font-mono text-white">{formatPercent(crashSize)}</span>
            </div>
            <input
              type="range"
              min={0.1}
              max={0.6}
              step={0.02}
              value={crashSize}
              onChange={(event) => setCrashSize(Number(event.target.value))}
              className="w-full"
            />
          </label>
          <label className="space-y-2 md:col-span-2">
            <div className="flex items-center justify-between">
              <span>Number of Paths</span>
              <span className="font-mono text-white">{paths}</span>
            </div>
            <input
              type="range"
              min={20}
              max={200}
              step={10}
              value={paths}
              onChange={(event) => setPaths(Number(event.target.value))}
              className="w-full"
            />
          </label>
        </div>

        <button
          type="button"
          onClick={() => setRunSeed((value) => value + 1)}
          className="w-full rounded-full border border-white/20 bg-white/10 px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:border-neon hover:text-neon"
        >
          Run Simulation
        </button>

        <div className="grid gap-3 text-xs text-white/60 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-midnight/60 p-4">
            <p className="uppercase tracking-[0.3em]">Mean Return</p>
            <p className="mt-2 text-lg font-semibold text-white">{formatPercent(simulation.stats.mean)}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-midnight/60 p-4">
            <p className="uppercase tracking-[0.3em]">Worst 5%</p>
            <p className="mt-2 text-lg font-semibold text-ember">{formatPercent(simulation.stats.worst5)}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-midnight/60 p-4">
            <p className="uppercase tracking-[0.3em]">Best 5%</p>
            <p className="mt-2 text-lg font-semibold text-neon">{formatPercent(simulation.stats.best5)}</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-midnight/60 p-4">
            <Plot
              data={simulation.allPaths.map((path) => ({
                type: "scatter",
                mode: "lines",
                x: simulation.timeAxis,
                y: path,
                line: { color: "rgba(124, 156, 255, 0.25)", width: 1 },
                hoverinfo: "skip"
              }))}
              layout={{
                autosize: true,
                height: 280,
                margin: { l: 30, r: 10, t: 20, b: 30 },
                paper_bgcolor: "rgba(0,0,0,0)",
                plot_bgcolor: "rgba(0,0,0,0)",
                xaxis: {
                  title: "Time (years)",
                  color: "rgba(255,255,255,0.6)",
                  gridcolor: "rgba(255,255,255,0.08)",
                  zeroline: false
                },
                yaxis: {
                  title: "Price",
                  color: "rgba(255,255,255,0.6)",
                  gridcolor: "rgba(255,255,255,0.08)",
                  zeroline: false
                }
              }}
              config={{ displayModeBar: false, responsive: true }}
              className="h-[280px] w-full"
            />
          </div>
          <div className="rounded-2xl border border-white/10 bg-midnight/60 p-4">
            <Plot
              data={[
                {
                  type: "histogram",
                  x: simulation.finalReturns,
                  nbinsx: 20,
                  marker: { color: "rgba(200, 16, 46, 0.75)" },
                  hovertemplate: "Return: %{x:.2%}<br>Count: %{y}<extra></extra>"
                }
              ]}
              layout={{
                autosize: true,
                height: 280,
                margin: { l: 30, r: 10, t: 20, b: 30 },
                paper_bgcolor: "rgba(0,0,0,0)",
                plot_bgcolor: "rgba(0,0,0,0)",
                xaxis: {
                  title: "Final return",
                  tickformat: ".0%",
                  color: "rgba(255,255,255,0.6)",
                  gridcolor: "rgba(255,255,255,0.08)",
                  zeroline: false
                },
                yaxis: {
                  title: "Count",
                  color: "rgba(255,255,255,0.6)",
                  gridcolor: "rgba(255,255,255,0.08)",
                  zeroline: false
                }
              }}
              config={{ displayModeBar: false, responsive: true }}
              className="h-[280px] w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
