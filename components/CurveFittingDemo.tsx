"use client";

import { startTransition, useEffect, useMemo, useState } from "react";
import {
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Scatter,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

type Point = {
  x: number;
  y: number;
  split: "train" | "val";
};

type Coefficients = number[];

const DEFAULT_POINTS = 40;
const DEFAULT_NOISE = 0.6;
const DEFAULT_DEGREE = 3;
const RIDGE_LAMBDA = 1e-4;
const POINT_RADIUS = 5;

function randn() {
  let u = 0;
  let v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

function generatePoints(count: number, noise: number, showSplit: boolean) {
  const points: Point[] = [];
  for (let i = 0; i < count; i += 1) {
    const x = -1 + (2 * i) / (count - 1);
    const base = 0.6 * Math.sin(2.2 * x) + 0.3 * x * x + 0.1 * x;
    const y = base + randn() * noise * 0.4;
    const split = showSplit && i % 5 === 0 ? "val" : "train";
    points.push({ x, y, split });
  }
  return points;
}

function buildDesignMatrix(points: Point[], degree: number) {
  return points.map((p) => {
    const row = [1];
    for (let d = 1; d <= degree; d += 1) {
      row.push(row[row.length - 1] * p.x);
    }
    return row;
  });
}

function transpose(matrix: number[][]) {
  return matrix[0].map((_, col) => matrix.map((row) => row[col]));
}

function multiply(A: number[][], B: number[][]) {
  const result = Array.from({ length: A.length }, () => Array(B[0].length).fill(0));
  for (let i = 0; i < A.length; i += 1) {
    for (let k = 0; k < B.length; k += 1) {
      for (let j = 0; j < B[0].length; j += 1) {
        result[i][j] += A[i][k] * B[k][j];
      }
    }
  }
  return result;
}

function multiplyVec(A: number[][], v: number[]) {
  return A.map((row) => row.reduce((sum, value, idx) => sum + value * v[idx], 0));
}

function solveLinearSystem(A: number[][], b: number[]) {
  const n = A.length;
  const M = A.map((row, i) => [...row, b[i]]);

  for (let i = 0; i < n; i += 1) {
    let maxRow = i;
    for (let k = i + 1; k < n; k += 1) {
      if (Math.abs(M[k][i]) > Math.abs(M[maxRow][i])) {
        maxRow = k;
      }
    }
    [M[i], M[maxRow]] = [M[maxRow], M[i]];

    const pivot = M[i][i] || 1e-12;
    for (let j = i; j <= n; j += 1) {
      M[i][j] /= pivot;
    }

    for (let k = 0; k < n; k += 1) {
      if (k === i) continue;
      const factor = M[k][i];
      for (let j = i; j <= n; j += 1) {
        M[k][j] -= factor * M[i][j];
      }
    }
  }

  return M.map((row) => row[n]);
}

function fitPolynomial(points: Point[], degree: number) {
  if (points.length === 0) return [];
  const X = buildDesignMatrix(points, degree);
  const y = points.map((p) => p.y);
  const Xt = transpose(X);
  const XtX = multiply(Xt, X);
  for (let i = 0; i < XtX.length; i += 1) {
    XtX[i][i] += RIDGE_LAMBDA;
  }
  const XtY = multiplyVec(Xt, y);
  return solveLinearSystem(XtX, XtY);
}

function predict(coeffs: Coefficients, x: number) {
  return coeffs.reduce((sum, c, idx) => sum + c * Math.pow(x, idx), 0);
}

function meanSquaredError(points: Point[], coeffs: Coefficients) {
  if (!points.length) return 0;
  const total = points.reduce((sum, p) => {
    const err = p.y - predict(coeffs, p.x);
    return sum + err * err;
  }, 0);
  return total / points.length;
}

function renderScatterPoint(props: { cx?: number; cy?: number; fill?: string }) {
  const { cx, cy, fill } = props;
  if (cx === undefined || cy === undefined) return null;
  return <circle cx={cx} cy={cy} r={POINT_RADIUS} fill={fill ?? "rgba(200, 16, 46, 0.95)"} />;
}

export default function CurveFittingDemo() {
  const [isMounted, setIsMounted] = useState(false);
  const [count, setCount] = useState(DEFAULT_POINTS);
  const [noise, setNoise] = useState(DEFAULT_NOISE);
  const [degreeUI, setDegreeUI] = useState(DEFAULT_DEGREE);
  const [degree, setDegree] = useState(DEFAULT_DEGREE);
  const [showSplit, setShowSplit] = useState(false);
  const [points, setPoints] = useState<Point[]>([]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    const timeout = setTimeout(() => {
      setPoints(generatePoints(count, noise, showSplit));
    }, 150);
    return () => clearTimeout(timeout);
  }, [count, noise, showSplit, isMounted]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      startTransition(() => setDegree(degreeUI));
    }, 120);
    return () => clearTimeout(timeout);
  }, [degreeUI]);

  const coeffs = useMemo(() => fitPolynomial(points, degree), [points, degree]);

  const { curveData, trainPoints, valPoints } = useMemo(() => {
    const curveSamples = 120;
    const curve = Array.from({ length: curveSamples }, (_, idx) => {
      const x = -1 + (2 * idx) / (curveSamples - 1);
      return { x, yFit: coeffs.length ? predict(coeffs, x) : 0 };
    });
    return {
      curveData: curve,
      trainPoints: points.filter((p) => p.split === "train"),
      valPoints: points.filter((p) => p.split === "val")
    };
  }, [coeffs, points]);

  const mseTrain = useMemo(() => meanSquaredError(trainPoints, coeffs), [trainPoints, coeffs]);
  const mseVal = useMemo(() => meanSquaredError(valPoints, coeffs), [valPoints, coeffs]);

  if (!isMounted) {
    return <div className="glass h-[520px] rounded-3xl" />;
  }

  return (
    <div className="glass relative overflow-hidden rounded-3xl p-8">
      <div className="flex flex-col gap-6">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">Interactive Lab</p>
          <h2 className="mt-3 text-2xl font-semibold text-white">Curve Fitting Playground (Demo)</h2>
          <p className="mt-2 text-sm text-white/70">
            Generate noisy points and fit polynomials. Learn bias vs variance.
          </p>
        </div>

        <div className="grid gap-4 text-xs text-white/70 md:grid-cols-2">
          <label className="space-y-2">
            <div className="flex items-center justify-between">
              <span>Number of points</span>
              <span className="font-mono text-white">{count}</span>
            </div>
            <input
              type="range"
              min={10}
              max={80}
              value={count}
              onChange={(event) => setCount(Number(event.target.value))}
              className="w-full"
            />
          </label>
          <label className="space-y-2">
            <div className="flex items-center justify-between">
              <span>Noise level</span>
              <span className="font-mono text-white">{noise.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min={0}
              max={1.5}
              step={0.05}
              value={noise}
              onChange={(event) => setNoise(Number(event.target.value))}
              className="w-full"
            />
          </label>
          <label className="space-y-2">
            <div className="flex items-center justify-between">
              <span>Polynomial degree</span>
              <span className="font-mono text-white">{degreeUI}</span>
            </div>
            <input
              type="range"
              min={1}
              max={8}
              step={1}
              value={degreeUI}
              onChange={(event) => setDegreeUI(Number(event.target.value))}
              className="w-full"
            />
          </label>
          <label className="flex items-center gap-3 text-xs text-white/70">
            <input
              type="checkbox"
              checked={showSplit}
              onChange={(event) => setShowSplit(event.target.checked)}
            />
            Show train/validation split
          </label>
        </div>

        <div className="rounded-2xl border border-white/10 bg-midnight/60 p-4">
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={curveData}>
                <CartesianGrid stroke="rgba(255,255,255,0.08)" />
                <XAxis
                  dataKey="x"
                  type="number"
                  domain={[-1, 1]}
                  tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 10 }}
                  axisLine={{ stroke: "rgba(255,255,255,0.2)" }}
                  tickLine={{ stroke: "rgba(255,255,255,0.2)" }}
                />
                <YAxis
                  type="number"
                  tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 10 }}
                  axisLine={{ stroke: "rgba(255,255,255,0.2)" }}
                  tickLine={{ stroke: "rgba(255,255,255,0.2)" }}
                />
                <Tooltip
                  cursor={{ stroke: "rgba(124,156,255,0.3)", strokeWidth: 1 }}
                  contentStyle={{
                    backgroundColor: "rgba(10,16,26,0.95)",
                    border: "1px solid rgba(124,156,255,0.2)",
                    borderRadius: 8
                  }}
                  content={({ active, payload }) => {
                    if (!active || !payload || payload.length === 0) return null;
                    const point = payload[0]?.payload as { x?: number; y?: number } | undefined;
                    if (!point) return null;
                    return (
                      <div className="rounded-md border border-white/10 bg-midnight/90 px-3 py-2 text-[11px] text-white/80">
                        <div>x: {point.x?.toFixed(2)}</div>
                        <div>y: {point.y?.toFixed(2)}</div>
                      </div>
                    );
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="yFit"
                  stroke="rgba(200, 16, 46, 0.9)"
                  strokeWidth={2}
                  dot={false}
                  data={curveData}
                />
                <Scatter
                  data={points}
                  dataKey="y"
                  fill="rgba(200, 16, 46, 0.95)"
                  shape={renderScatterPoint}
                  line={false}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid gap-3 text-xs text-white/60 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-midnight/60 p-4">
            <p className="uppercase tracking-[0.3em]">Train MSE</p>
            <p className="mt-2 text-lg font-semibold text-white">{mseTrain.toFixed(4)}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-midnight/60 p-4">
            <p className="uppercase tracking-[0.3em]">Validation MSE</p>
            <p className="mt-2 text-lg font-semibold text-white">{showSplit ? mseVal.toFixed(4) : "--"}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-midnight/60 p-4">
            <p className="uppercase tracking-[0.3em]">Stability</p>
            <p className={`mt-2 text-lg font-semibold ${degree >= 7 ? "text-ember" : "text-neon"}`}>
              {degree >= 7 ? "High variance" : "Stable"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
