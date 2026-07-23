import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, business, service, budget, message, locale } = body;

    if (!process.env.AIMURAH_API_KEY) {
      return NextResponse.json(
        { error: "AIMURAH_API_KEY is not configured on the server." },
        { status: 500 }
      );
    }

    const systemPrompt =
      locale === "id"
        ? `Kamu adalah asisten rekomendasi digital marketing untuk The Micro Agent Company.
Tugasmu adalah menganalisis data klien dan memberikan rekomendasi paket jasa yang dipersonalisasi.
Gunakan bahasa Indonesia yang hangat dan profesional. Output harus PLAIN TEXT saja.

Bisnis ini menawarkan jasa:
- Pembuatan Website / Landing Page
- Foto & Video Produk / Brand
- Jasa Iklan (Meta/Google/TikTok)
- Manajemen Social Media
- Branding & Desain Grafis
- Copywriting & Konten
- SEO & Optimasi Website

Format output (tanpa markdown, tanpa bintang, tanpa simbol khusus):

REKOMENDASI PAKET
(deskripsi paket)

YANG TERMASUK:
- item 1
- item 2
- item 3

ESTIMASI HARGA
(estimasi harga)

TIPS TAMBAHAN
(1-2 tips)`
        : `You are a digital marketing recommendation assistant for The Micro Agent Company.
Your task is to analyze client data and provide personalized service package recommendations.
Use warm, professional English. Output must be PLAIN TEXT only.

This business offers:
- Website / Landing Page Creation
- Product & Brand Photo & Video
- Ad Management (Meta/Google/TikTok)
- Social Media Management
- Branding & Graphic Design
- Copywriting & Content
- SEO & Website Optimization

Output format (no markdown, no asterisks, no special symbols):

RECOMMENDED PACKAGE
(description)

INCLUDES:
- item 1
- item 2
- item 3

ESTIMATED PRICE
(price estimate)

EXTRA TIPS
(1-2 tips)`;

    const userPrompt =
      locale === "id"
        ? `Buatkan rekomendasi paket digital marketing untuk klien berikut:

Nama: ${name || "-"}
Bisnis: ${business || "-"}
Layanan dipilih: ${service || "-"}
Budget: ${budget || "-"}
Pesan tambahan: ${message || "-"}

Beri rekomendasi paket yang paling sesuai berdasarkan data di atas.`
        : `Create a digital marketing package recommendation for the following client:

Name: ${name || "-"}
Business: ${business || "-"}
Selected service: ${service || "-"}
Budget: ${budget || "-"}
Additional message: ${message || "-"}

Give the most suitable package recommendation based on the data above.`;

    const response = await fetch("https://aimurah.my.id/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.AIMURAH_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4.5",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        max_tokens: 1024,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("AIMurah API responded with error:", response.status, errText);
      return NextResponse.json(
        { error: `AIMurah API error: ${response.status}` },
        { status: response.status }
      );
    }

    const rawText = await response.text();
    const trimmed = rawText.trim();
    let data;
    try {
      data = JSON.parse(trimmed);
    } catch {
      const jsonStart = trimmed.indexOf("{");
      const jsonEnd = trimmed.lastIndexOf("}");
      if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd > jsonStart) {
        try {
          data = JSON.parse(trimmed.slice(jsonStart, jsonEnd + 1));
        } catch {
          console.error("AIMurah API still invalid after extraction. Preview:", trimmed.slice(0, 500));
          return NextResponse.json(
            { error: "Invalid JSON response from AI provider." },
            { status: 500 }
          );
        }
      } else {
        console.error("AIMurah API returned no JSON. Preview:", trimmed.slice(0, 500));
        return NextResponse.json(
          { error: "Non-JSON response from AI provider." },
          { status: 500 }
        );
      }
    }
    const text = data.choices?.[0]?.message?.content || "";

    return NextResponse.json({ text });
  } catch (error: any) {
    console.error("AIMurah API Error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
