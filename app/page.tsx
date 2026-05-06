"use client";

import Image from "next/image";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const originalProducts = [
  {
    name: "Argan Herbal Shampoo",
    description: "Inspired by traditional Moroccan argan haircare.",
    image: "/products/argan.png",
  },
  {
    name: "Rosemary Herbal Shampoo",
    description: "A herbal concept inspired by rosemary and scalp freshness.",
    image: "/products/rosemary.png",
  },
  {
    name: "Mint & Lemon Fresh Shampoo",
    description: "A fresh herbal shampoo concept with mint and lemon.",
    image: "/products/mint-lemon.png",
  },
];

const premiumProducts = [
  {
    name: "Argan & Prickly Pear Repair Shampoo",
    description: "For dry or stressed hair.",
  },
  {
    name: "Rosemary & Nigella Scalp Balance Shampoo",
    description: "For a fresh scalp feeling.",
  },
  {
    name: "Aloe & Argan Curl Moisture Shampoo",
    description: "For curls, waves and dry hair.",
  },
];

const hairTypes = [
  "Straight hair",
  "Wavy hair",
  "Curly hair",
  "Coily hair",
  "Dry / damaged hair",
  "Oily hair",
  "Sensitive scalp",
  "Dandruff / flaky scalp",
  "Hair loss concern",
  "Prefer not to say",
];

export default function Home() {
  const [selectedLine, setSelectedLine] = useState<"original" | "premium" | "">("");
  const [email, setEmail] = useState("");
  const [price, setPrice] = useState("");
  const [hairType, setHairType] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const prices =
    selectedLine === "original"
      ? ["€5.99", "€6.99", "€7.99", "Above €7.99 feels too high"]
      : ["€9.99", "€12.99", "€14.99", "€17.99"];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!email || !selectedLine || !price) {
      alert("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);

    const { error } = await supabase.from("waitlist_entries").insert({
      email,
      selected_line: selectedLine,
      selected_price: price,
      hair_type: hairType || null,
      source: "landing_page",
      consent: true,
    });

    setIsSubmitting(false);

    if (error) {
      console.log("Supabase error:", error);
      alert(error.message);
      return;
    }

    setSubmitted(true);
  }

  return (
    <main className="min-h-screen bg-[#f6efe4] text-[#1e1711]">
      <section className="relative overflow-hidden bg-[#201711] text-white">
        <div className="absolute left-[-10%] top-[-20%] h-80 w-80 rounded-full bg-[#c49a4c]/20 blur-3xl" />
        <div className="absolute bottom-[-20%] right-[-10%] h-96 w-96 rounded-full bg-[#6f8b55]/20 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-[1.1fr_0.9fr] md:py-24">
          <div>
            <p className="mb-5 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm uppercase tracking-[0.25em] text-[#e2c783]">
              Coming soon · Early access
            </p>

            <h1 className="mb-6 max-w-3xl text-5xl font-bold leading-[1.05] md:text-7xl">
              Moroccan Haircare, reimagined for Europe
            </h1>

            <p className="mb-8 max-w-2xl text-lg leading-8 text-white/75">
              We are testing whether customers in Belgium and Europe are more
              interested in authentic Moroccan herbal haircare or a modern
              premium botanical line.
            </p>

            <div className="flex flex-wrap gap-3 text-sm text-white/75">
              <span className="rounded-full border border-white/15 px-4 py-2">
                No sales yet
              </span>
              <span className="rounded-full border border-white/15 px-4 py-2">
                Waitlist only
              </span>
              <span className="rounded-full border border-white/15 px-4 py-2">
                Help shape the first launch
              </span>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/10 p-4 shadow-2xl backdrop-blur">
            <div className="grid grid-cols-3 gap-3">
              {originalProducts.map((product, index) => (
                <div
                  key={product.name}
                  className={`overflow-hidden rounded-3xl bg-white/10 ${
                    index === 1 ? "translate-y-8" : ""
                  }`}
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={500}
                    height={750}
                    className="h-72 w-full object-contain p-3"
                  />
                </div>
              ))}
            </div>

            <p className="mt-12 text-center text-sm text-white/55">
              Product visuals are used for concept testing. Packaging and final
              formulas may change.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#9b6b2f]">
            Choose your direction
          </p>
          <h2 className="text-4xl font-bold md:text-5xl">
            Which Moroccan haircare line would you try first?
          </h2>
        </div>

        <div className="grid items-stretch gap-6 lg:grid-cols-2">
          <div className="flex h-full flex-col rounded-[2rem] border border-black/10 bg-white p-7 shadow-sm">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#9b6b2f]">
              Original Herbal Line
            </p>

            <h3 className="mb-4 text-3xl font-bold">
              Authentic Moroccan-inspired herbal shampoos
            </h3>

            <p className="mb-6 leading-7 text-black/65">
              A more affordable herbal line inspired by classic Moroccan beauty
              products and traditional botanical ingredients such as argan,
              rosemary, mint and lemon.
            </p>

            <div className="mb-7 grid flex-1 gap-4 sm:grid-cols-3">
              {originalProducts.map((product) => (
                <div
                  key={product.name}
                  className="flex h-full flex-col overflow-hidden rounded-3xl border border-black/10 bg-[#f6efe4]"
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={500}
                    height={700}
                    className="h-80 w-full object-contain p-4 sm:h-52 sm:p-2"
                  />
                  <div className="flex flex-1 flex-col p-4">
                    <h4 className="font-bold">{product.name}</h4>
                    <p className="mt-2 text-sm leading-6 text-black/60">
                      {product.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                setSelectedLine("original");
                setSubmitted(false);
                setPrice("");
                setHairType("");
              }}
              className="mt-auto w-full rounded-full bg-[#1f1711] px-6 py-4 font-semibold text-white transition hover:bg-black"
            >
              I’m interested in the Original Line
            </button>
          </div>

          <div className="flex h-full flex-col rounded-[2rem] border border-black/10 bg-[#efe3cf] p-7 shadow-sm">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#9b6b2f]">
              Premium Botanical Line
            </p>

            <h3 className="mb-4 text-3xl font-bold">
              A modern premium line with Moroccan botanicals
            </h3>

            <p className="mb-6 leading-7 text-black/65">
              A future premium concept with a milder formula, sulfate-free
              direction, elevated fragrance and ingredients such as argan oil,
              prickly pear seed oil, rosemary, nigella, aloe and panthenol.
            </p>

            <div className="mb-7 flex flex-1 flex-col gap-4">
              {premiumProducts.map((product) => (
                <div
                  key={product.name}
                  className="rounded-3xl border border-black/10 bg-white/70 p-5"
                >
                  <h4 className="font-bold">{product.name}</h4>
                  <p className="mt-2 text-sm leading-6 text-black/60">
                    {product.description}
                  </p>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                setSelectedLine("premium");
                setSubmitted(false);
                setPrice("");
                setHairType("");
              }}
              className="mt-auto w-full rounded-full bg-[#9b6b2f] px-6 py-4 font-semibold text-white transition hover:bg-[#7d5524]"
            >
              I’m interested in the Premium Line
            </button>
          </div>
        </div>

        {selectedLine && (
          <section className="mt-10 rounded-[2rem] border border-black/10 bg-white p-8 shadow-sm">
            {submitted ? (
              <div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#9b6b2f]">
                  Thank you
                </p>
                <h3 className="mb-3 text-3xl font-bold">
                  You’re on the early access list.
                </h3>
                <p className="text-black/65">
                  We saved your interest. We’ll use this feedback to decide
                  which Moroccan haircare line should launch first.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#9b6b2f]">
                  Join the waitlist
                </p>

                <h3 className="mb-3 text-3xl font-bold">
                  Early access for{" "}
                  {selectedLine === "original"
                    ? "Original Herbal Line"
                    : "Premium Botanical Line"}
                </h3>

                <p className="mb-6 text-black/65">
                  Leave your email and choose the price point that would feel
                  acceptable for this type of product.
                </p>

                <div className="grid gap-4 md:grid-cols-3">
                  <input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="rounded-2xl border border-black/10 px-4 py-4 outline-none focus:border-[#9b6b2f]"
                  />

                  <select
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="rounded-2xl border border-black/10 px-4 py-4 outline-none focus:border-[#9b6b2f]"
                  >
                    <option value="">Which price feels acceptable?</option>
                    {prices.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>

                  <select
                    value={hairType}
                    onChange={(e) => setHairType(e.target.value)}
                    className="rounded-2xl border border-black/10 px-4 py-4 outline-none focus:border-[#9b6b2f]"
                  >
                    <option value="">Hair type / concern optional</option>
                    {hairTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <p className="mt-4 text-sm text-black/50">
                  Coming soon — this is an interest check only. No products are
                  currently being sold through this page.
                </p>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-6 rounded-full bg-[#1f1711] px-8 py-4 font-semibold text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? "Saving..." : "Join early access"}
                </button>
              </form>
            )}
          </section>
        )}

        <section className="mt-14 grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h4 className="mb-2 font-bold">Why this test?</h4>
            <p className="text-sm leading-6 text-black/60">
              We want to understand real demand before producing inventory or
              developing a final formula.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h4 className="mb-2 font-bold">No checkout yet</h4>
            <p className="text-sm leading-6 text-black/60">
              This page is for early access only. EU cosmetic compliance comes
              before any real sales.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h4 className="mb-2 font-bold">Your choice matters</h4>
            <p className="text-sm leading-6 text-black/60">
              The first line will be chosen based on signups, price interest and
              customer feedback.
            </p>
          </div>
        </section>
      </section>
    </main>
  );
}