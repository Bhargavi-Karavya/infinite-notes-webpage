'use client';

import { useState } from 'react';
import {
  ArrowLeft,
  Bookmark,
  Check,
  Compass,
  ListMusic,
  Music2,
  Play,
  Search,
  Share2,
  SlidersHorizontal,
  UserRound,
  Verified,
} from 'lucide-react';

type Section = {
  label: string;
  tone: 'cyan' | 'pink' | 'muted' | 'chorus';
  lines: string[];
};

const lyricSections: Section[] = [
  {
    label: 'Verse 1',
    tone: 'cyan',
    lines: [
      'I found a love for me',
      'Oh darling, just dive right in and follow my lead',
      'Well, I found a girl, beautiful and sweet',
      'Oh, I never knew you were the someone waiting for me',
    ],
  },
  {
    label: 'Pre-Chorus',
    tone: 'pink',
    lines: [
      "'Cause we were just kids when we fell in love",
      'Not knowing what it was',
      'I will not give you up this time',
      'But darling, just kiss me slow',
      'Your heart is all I own',
      "And in your eyes, you're holding mine",
    ],
  },
  {
    label: 'Chorus',
    tone: 'chorus',
    lines: [
      "Baby, I'm dancing in the dark",
      'With you between my arms',
      'Barefoot on the grass',
      'Listening to our favourite song',
      'When you said you looked a mess',
      'I whispered underneath my breath',
      'But you heard it',
      'Darling, you look perfect tonight',
    ],
  },
  {
    label: 'Verse 2',
    tone: 'cyan',
    lines: [
      'Well, I found a woman, stronger than anyone I know',
      "She shares my dreams, I hope that someday I'll share her home",
      'I found a lover, to carry more than just my secrets',
      'To carry love, to carry children of our own',
    ],
  },
  {
    label: 'Chorus 2',
    tone: 'chorus',
    lines: [
      "Baby, I'm dancing in the dark",
      'With you between my arms',
      'Barefoot on the grass',
      'Listening to our favourite song',
      'I have faith in what I see',
      'Now I know I have met an angel in person',
      'And she looks perfect',
      "I don't deserve this, darling, you look perfect tonight",
    ],
  },
  {
    label: 'Outro',
    tone: 'muted',
    lines: ['Mmm-mmm, mmm-mmm', 'Darling, you look perfect tonight'],
  },
];

function SectionHeading({ section }: { section: Section }) {
  return (
    <div className="section-heading">
      <span className={`section-label section-label-${section.tone}`}>{section.label}</span>
      <span className="section-rule" />
    </div>
  );
}

function LyricsSection({ section }: { section: Section }) {
  const isChorus = section.tone === 'chorus';
  const isOutro = section.tone === 'muted';

  return (
    <section className={`lyric-section ${isChorus ? 'chorus-card' : ''} ${isOutro ? 'outro' : ''}`}>
      <SectionHeading section={section} />
      <div className="lyric-lines">
        {section.lines.map((line, index) => {
          const isHighlight = isChorus && index === section.lines.length - 1;
          const isSecondaryHighlight = section.label === 'Chorus 2' && index === 6;
          return (
            <p
              className={`lyric-line ${isHighlight ? 'highlight-cyan' : ''} ${isSecondaryHighlight ? 'highlight-pink' : ''}`}
              key={`${section.label}-${line}`}
              tabIndex={0}
            >
              {line}
            </p>
          );
        })}
      </div>
    </section>
  );
}

export default function Home() {
  const [saved, setSaved] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [autoScroll, setAutoScroll] = useState(false);
  const [fontLarge, setFontLarge] = useState(false);
  const [shared, setShared] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: 'Perfect — Ed Sheeran', text: 'Lyrics on Infinite Notes' });
    } else {
      await navigator.clipboard?.writeText(window.location.href);
      setShared(true);
      window.setTimeout(() => setShared(false), 1800);
    }
  };

  return (
    <main className="app-shell">
      <header className="topbar">
        <button className="icon-button" aria-label="Go back" type="button" onClick={() => window.history.back()}>
          <ArrowLeft size={18} strokeWidth={2.2} />
        </button>
        <div className="brand" aria-label="Infinite Notes">
          <span className="brand-mark"><Music2 size={13} /></span>
          <span>Infinite<span>Notes</span></span>
        </div>
        <div className="top-actions">
          <button className={`icon-button ${fontLarge ? 'active' : ''}`} aria-label="Change text size" type="button" onClick={() => setFontLarge(!fontLarge)}>
            <SlidersHorizontal size={16} />
          </button>
          <button className="icon-button" aria-label="Share song" type="button" onClick={handleShare}>
            {shared ? <Check size={16} /> : <Share2 size={16} />}
          </button>
        </div>
      </header>

      <section className="song-header">
        <div className="song-summary">
          <div className="album-art" aria-label="Perfect album art">
            <div className="album-glow" />
            <Music2 size={28} strokeWidth={1.5} />
          </div>
          <div className="song-copy">
            <div className="verified-pill"><Verified size={11} /> Official Verified Lyrics</div>
            <h1>Perfect</h1>
            <button className="artist-link" type="button">Ed Sheeran <Verified size={13} /></button>
            <p>Album: ÷ (Divide) · Released 2017</p>
          </div>
        </div>
        <div className="quick-actions">
          <button className={`listen-button ${playing ? 'is-playing' : ''}`} type="button" onClick={() => setPlaying(!playing)}>
            {playing ? <Check size={15} /> : <Play size={15} fill="currentColor" />}
            {playing ? 'Playing' : 'Listen Along'}
          </button>
          <button className={`secondary-button ${saved ? 'selected' : ''}`} type="button" onClick={() => setSaved(!saved)}>
            {saved ? <Check size={14} /> : <Bookmark size={14} />}
            {saved ? 'Saved' : 'Save'}
          </button>
          <button className={`secondary-button ${autoScroll ? 'selected' : ''}`} type="button" onClick={() => setAutoScroll(!autoScroll)}>
            <ListMusic size={14} /> Auto-Scroll
          </button>
        </div>
      </section>

      <div className={`lyrics-content ${fontLarge ? 'font-large' : ''}`}>
        {lyricSections.map((section) => <LyricsSection key={section.label} section={section} />)}
        <footer className="credits">
          <p><strong>Songwriters:</strong> Edward Christopher Sheeran</p>
          <p><strong>Producers:</strong> Will Hicks, Ed Sheeran</p>
          <p className="license">Lyrics licensed and provided by Infinite Notes Catalog.</p>
        </footer>
      </div>

      <nav className="bottom-nav" aria-label="Main navigation">
        <button type="button"><Compass size={17} /><span>Explore</span></button>
        <button type="button"><Search size={17} /><span>Search</span></button>
        <button className="current" type="button"><ListMusic size={17} /><span>Lyrics</span></button>
        <button type="button"><UserRound size={17} /><span>Artist</span></button>
      </nav>
    </main>
  );
}
