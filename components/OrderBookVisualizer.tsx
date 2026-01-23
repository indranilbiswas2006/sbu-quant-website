"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

type Level = { price: number; size: number };

type Trade = {
  id: string;
  price: number;
  size: number;
  side: "buy" | "sell";
  time: string;
};

const LEVELS = 8;
const TICK = 0.25;

function formatPrice(value: number) {
  return value.toFixed(2);
}

function formatSize(value: number) {
  return value.toFixed(0);
}

function formatTime(date: Date) {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

function createBook(mid: number) {
  const bids: Level[] = Array.from({ length: LEVELS }, (_, idx) => ({
    price: mid - TICK * (idx + 1),
    size: 40 + Math.random() * 120
  }));
  const asks: Level[] = Array.from({ length: LEVELS }, (_, idx) => ({
    price: mid + TICK * (idx + 1),
    size: 40 + Math.random() * 120
  }));
  return { bids, asks };
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export default function OrderBookVisualizer() {
  const [isMounted, setIsMounted] = useState(false);
  const [{ bids, asks }, setBook] = useState<{ bids: Level[]; asks: Level[] }>({
    bids: [],
    asks: []
  });
  const [trades, setTrades] = useState<Trade[]>([]);

  const [orderSide, setOrderSide] = useState<"buy" | "sell">("buy");
  const [orderType, setOrderType] = useState<"market" | "limit">("market");
  const [orderPrice, setOrderPrice] = useState(100);
  const [orderSize, setOrderSize] = useState(25);

  const bestBid = bids[0]?.price ?? 0;
  const bestAsk = asks[0]?.price ?? 0;
  const mid = (bestBid + bestAsk) / 2;
  const spread = bestAsk - bestBid;

  useEffect(() => {
    setIsMounted(true);
    setBook(createBook(100));
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    const interval = setInterval(() => {
      setBook((prev) => {
        const nextBids = prev.bids.map((level) => ({
          ...level,
          size: clamp(level.size + (Math.random() - 0.45) * 18, 10, 240)
        }));
        const nextAsks = prev.asks.map((level) => ({
          ...level,
          size: clamp(level.size + (Math.random() - 0.45) * 18, 10, 240)
        }));
        return { bids: nextBids, asks: nextAsks };
      });

      if (Math.random() > 0.55) {
        const side = Math.random() > 0.5 ? "buy" : "sell";
        const size = 8 + Math.random() * 22;
        if (side === "buy") {
          setBook((prev) => {
            if (!prev.asks.length) return prev;
            const updatedAsks = [...prev.asks];
            updatedAsks[0] = { ...updatedAsks[0], size: updatedAsks[0].size - size };
            if (updatedAsks[0].size <= 5) {
              updatedAsks.shift();
              const last = updatedAsks[updatedAsks.length - 1]?.price ?? prev.asks[0].price;
              updatedAsks.push({ price: last + TICK, size: 60 + Math.random() * 120 });
            }
            return { bids: prev.bids, asks: updatedAsks };
          });
        } else {
          setBook((prev) => {
            if (!prev.bids.length) return prev;
            const updatedBids = [...prev.bids];
            updatedBids[0] = { ...updatedBids[0], size: updatedBids[0].size - size };
            if (updatedBids[0].size <= 5) {
              updatedBids.shift();
              const last = updatedBids[updatedBids.length - 1]?.price ?? prev.bids[0].price;
              updatedBids.push({ price: last - TICK, size: 60 + Math.random() * 120 });
            }
            return { bids: updatedBids, asks: prev.asks };
          });
        }

        const tradePrice = side === "buy" ? bestAsk : bestBid;
        setTrades((prev) => [
          {
            id: `${Date.now()}-${Math.random()}`,
            price: tradePrice,
            size,
            side,
            time: formatTime(new Date())
          },
          ...prev
        ].slice(0, 6));
      }
    }, 1800);

    return () => clearInterval(interval);
  }, [bestAsk, bestBid, isMounted]);

  const maxDepth = useMemo(() => {
    const sizes = [...bids, ...asks].map((level) => level.size);
    return Math.max(...sizes, 1);
  }, [bids, asks]);

  const handleSubmit = () => {
    const size = clamp(orderSize, 1, 500);

    if (orderType === "market") {
      const side = orderSide;
      if (side === "buy") {
        setBook((prev) => {
          if (!prev.asks.length) return prev;
          const updatedAsks = [...prev.asks];
          updatedAsks[0] = { ...updatedAsks[0], size: updatedAsks[0].size - size };
          if (updatedAsks[0].size <= 5) {
            updatedAsks.shift();
            const last = updatedAsks[updatedAsks.length - 1]?.price ?? prev.asks[0].price;
            updatedAsks.push({ price: last + TICK, size: 60 + Math.random() * 120 });
          }
          return { bids: prev.bids, asks: updatedAsks };
        });
        setTrades((prev) => [
          {
            id: `${Date.now()}-${Math.random()}`,
            price: bestAsk,
            size,
            side: "buy",
            time: formatTime(new Date())
          },
          ...prev
        ].slice(0, 6));
      } else {
        setBook((prev) => {
          if (!prev.bids.length) return prev;
          const updatedBids = [...prev.bids];
          updatedBids[0] = { ...updatedBids[0], size: updatedBids[0].size - size };
          if (updatedBids[0].size <= 5) {
            updatedBids.shift();
            const last = updatedBids[updatedBids.length - 1]?.price ?? prev.bids[0].price;
            updatedBids.push({ price: last - TICK, size: 60 + Math.random() * 120 });
          }
          return { bids: updatedBids, asks: prev.asks };
        });
        setTrades((prev) => [
          {
            id: `${Date.now()}-${Math.random()}`,
            price: bestBid,
            size,
            side: "sell",
            time: formatTime(new Date())
          },
          ...prev
        ].slice(0, 6));
      }
      return;
    }

    if (orderSide === "buy") {
      if (orderPrice >= bestAsk) {
        setTrades((prev) => [
          {
            id: `${Date.now()}-${Math.random()}`,
            price: bestAsk,
            size,
            side: "buy",
            time: formatTime(new Date())
          },
          ...prev
        ].slice(0, 6));
        return;
      }
      setBook((prev) => {
        const updatedBids = [...prev.bids, { price: orderPrice, size }]
          .sort((a, b) => b.price - a.price)
          .slice(0, LEVELS);
        return { bids: updatedBids, asks: prev.asks };
      });
    } else {
      if (orderPrice <= bestBid) {
        setTrades((prev) => [
          {
            id: `${Date.now()}-${Math.random()}`,
            price: bestBid,
            size,
            side: "sell",
            time: formatTime(new Date())
          },
          ...prev
        ].slice(0, 6));
        return;
      }
      setBook((prev) => {
        const updatedAsks = [...prev.asks, { price: orderPrice, size }]
          .sort((a, b) => a.price - b.price)
          .slice(0, LEVELS);
        return { bids: prev.bids, asks: updatedAsks };
      });
    }
  };

  return !isMounted ? (
    <div className="glass h-[560px] rounded-3xl" />
  ) : (
    <div className="glass relative overflow-hidden rounded-3xl p-8">
      <div className="flex flex-col gap-6">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">Interactive Desk</p>
          <h2 className="mt-3 text-2xl font-semibold text-white">Order Book Visualizer</h2>
          <p className="mt-2 text-sm text-white/70">
            Educational mock order flow with live depth, spreads, and simulated trades.
          </p>
        </div>

        <div className="grid gap-4 text-xs text-white/60 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-midnight/60 p-4">
            <p className="uppercase tracking-[0.3em]">Midprice</p>
            <p className="mt-2 text-lg font-semibold text-white">{formatPrice(mid)}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-midnight/60 p-4">
            <p className="uppercase tracking-[0.3em]">Spread</p>
            <p className="mt-2 text-lg font-semibold text-neon">{formatPrice(spread)}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-midnight/60 p-4">
            <p className="uppercase tracking-[0.3em]">Best Bid / Ask</p>
            <p className="mt-2 text-lg font-semibold text-white">
              {formatPrice(bestBid)} / {formatPrice(bestAsk)}
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-2xl border border-white/10 bg-midnight/60 p-4">
            <div className="grid grid-cols-2 gap-4 text-xs uppercase tracking-[0.3em] text-white/50">
              <span>Bid Depth</span>
              <span className="text-right">Ask Depth</span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="space-y-2">
                {bids.map((level) => (
                  <div key={`bid-${level.price}`} className="relative h-8 overflow-hidden rounded bg-white/5">
                    <motion.div
                      className="absolute inset-y-0 right-0 bg-signal/40"
                      animate={{ width: `${(level.size / maxDepth) * 100}%` }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                    <div className="relative z-10 flex h-full items-center justify-between px-2 text-xs text-white/80">
                      <span className="font-mono text-neon">{formatPrice(level.price)}</span>
                      <span className="font-mono">{formatSize(level.size)}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                {asks.map((level) => (
                  <div key={`ask-${level.price}`} className="relative h-8 overflow-hidden rounded bg-white/5">
                    <motion.div
                      className="absolute inset-y-0 left-0 bg-ember/40"
                      animate={{ width: `${(level.size / maxDepth) * 100}%` }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                    <div className="relative z-10 flex h-full items-center justify-between px-2 text-xs text-white/80">
                      <span className="font-mono">{formatSize(level.size)}</span>
                      <span className="font-mono text-ember">{formatPrice(level.price)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-white/10 bg-midnight/60 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">Order Controls</p>
              <div className="mt-4 grid gap-3 text-xs text-white/70">
                <div className="grid grid-cols-2 gap-3">
                  <label className="space-y-2">
                    <span>Side</span>
                    <select
                      value={orderSide}
                      onChange={(event) => setOrderSide(event.target.value as "buy" | "sell")}
                      className="w-full rounded-xl border border-white/10 bg-midnight/60 px-3 py-2 text-sm text-white"
                    >
                      <option value="buy">Buy</option>
                      <option value="sell">Sell</option>
                    </select>
                  </label>
                  <label className="space-y-2">
                    <span>Type</span>
                    <select
                      value={orderType}
                      onChange={(event) => setOrderType(event.target.value as "market" | "limit")}
                      className="w-full rounded-xl border border-white/10 bg-midnight/60 px-3 py-2 text-sm text-white"
                    >
                      <option value="market">Market</option>
                      <option value="limit">Limit</option>
                    </select>
                  </label>
                </div>
                <label className="space-y-2">
                  <span>Price</span>
                  <input
                    type="number"
                    value={orderPrice}
                    onChange={(event) => setOrderPrice(Number(event.target.value))}
                    step={0.25}
                    disabled={orderType === "market"}
                    className="w-full rounded-xl border border-white/10 bg-midnight/60 px-3 py-2 text-sm text-white disabled:opacity-40"
                  />
                </label>
                <label className="space-y-2">
                  <span>Size</span>
                  <input
                    type="number"
                    value={orderSize}
                    onChange={(event) => setOrderSize(Number(event.target.value))}
                    min={1}
                    className="w-full rounded-xl border border-white/10 bg-midnight/60 px-3 py-2 text-sm text-white"
                  />
                </label>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:border-neon hover:text-neon"
                >
                  Add Order
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-midnight/60 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">Recent Trades</p>
              <div className="mt-4 space-y-2 text-xs text-white/70">
                {trades.length === 0 && <p className="text-white/40">No trades yet.</p>}
                {trades.map((trade) => (
                  <div
                    key={trade.id}
                    className="flex items-center justify-between rounded-lg border border-white/5 bg-white/5 px-2 py-2"
                  >
                    <span className={trade.side === "buy" ? "text-neon" : "text-ember"}>
                      {trade.side.toUpperCase()}
                    </span>
                    <span className="font-mono">{formatPrice(trade.price)}</span>
                    <span className="font-mono">{formatSize(trade.size)}</span>
                    <span className="text-white/40">{trade.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
