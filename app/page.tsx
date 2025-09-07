"use client"

import { useState } from "react"
import DynamicFrameLayout from "../components/DynamicFrameLayout"
import { ppEditorialNewUltralightItalic, inter } from "./fonts"
import Link from "next/link"
import DocumentationPage from "./DocumentationPage"

export default function Home() {
  const [headerSize] = useState(1.2) // 120% is the default size
  const [textSize] = useState(0.8) // 80% is the default size
  const [currentSection, setCurrentSection] = useState<string | null>(null)

  const handleSectionClick = (section: string) => {
    setCurrentSection(section)
  }

  const handleBackToMain = () => {
    setCurrentSection(null)
  }

  if (currentSection) {
    return <DocumentationPage section={currentSection} onBack={handleBackToMain} />
  }

  return (
    <div
      className={`min-h-screen bg-[#0a0a0a] flex items-center justify-center p-8 ${ppEditorialNewUltralightItalic.variable} ${inter.variable}`}
    >
      <div className="w-full h-full flex flex-col md:flex-row items-start gap-8 md:gap-8">
        {/* Left Content */}
        <div className="w-full md:w-[260px] flex-shrink-0 flex flex-col justify-between h-full">
          <div className="flex flex-col gap-16">
            <h1
              className={`${ppEditorialNewUltralightItalic.className} text-4xl md:text-6xl font-light italic text-white/90 tracking-tighter leading-[130%]`}
              style={{ fontSize: `${4 * headerSize}rem` }}
            >
              GitMesh
              <br />
              Docs
            </h1>
            <div
              className={`${inter.className} flex flex-col gap-12 text-white/60 text-sm font-light max-w-[300px]`}
              style={{ fontSize: `${0.875 * textSize}rem` }}
            >
              <div className="space-y-6">
                <div className="h-px bg-white/20 w-full" />
                <p>
                  Intelligent Git collaboration network with branch-level AI assistance, smart contributor matching, and real-time workflow coordination for open-source projects.
                </p>
            <a
              href="https://github.com/LF-Decentralized-Trust-Mentorships/gitmesh"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition text-sm"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.562 21.8 24 17.302 24 12c0-6.627-5.373-12-12-12z" />
              </svg>

              <span>⭐ 78</span>
            </a>
                <div className="h-px bg-white/20 w-full" />
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-white/40 text-xs font-medium uppercase tracking-wider">Supported by</div>
              <div className="flex items-center">
                <img src="/lfdt.png" alt="Linux Foundation" className="w-40 h-20 object-contain" />
              </div>
              <div className="flex items-center">
                <img src="/aifaq.png" alt="AIFAQ" className="w-40 h-15 object-contain" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="w-full md:flex-grow h-[60vh] md:h-[80vh]">
          <DynamicFrameLayout onSectionClick={handleSectionClick} />
        </div>
      </div>
    </div>
  )
}
