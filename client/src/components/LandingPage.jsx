import React, { useEffect } from 'react'

import svgPaths from "../assets/svgs";
import imgLogo from "../assets/Logo.png";
import imgLandingPageImage from "../assets/teens-socializing.jpg";
import imgImage from "../assets/open-mind.png"
import imgImage1 from "../assets/game-controller.png";
import { Link, useNavigate } from 'react-router-dom';

function Company1() {
  return (
    <div className="basis-0 content-stretch flex gap-[8px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Company">
      <div className="h-[80px] relative shrink-0 w-[83px]" data-name="Logo">
        <img alt="Logomark" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgLogo} />
      </div>
      <div className="basis-0 flex flex-col font-['Inter:Semi_Bold',_sans-serif] font-semibold grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[24px] text-black tracking-[-0.48px]">
        <p className="leading-[1.45]">Pluralia</p>
      </div>
    </div>
  );
}

function PrimaryButton() {
  return (
    <Link to={`/login`} style={{textDecoration: 'none'}}>
      <div className="bg-[#3c6e91] box-border content-stretch flex gap-[8px] items-center justify-center px-[16px] py-[12px] relative rounded-[12px] shrink-0" data-name="Primary button">
        <div className="flex flex-col font-['Inter:Medium',_sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-center text-nowrap text-white tracking-[-0.08px]">
          <p className="leading-[1.45] whitespace-pre">LOG IN</p>
        </div>
      </div>
    </Link>
  );
}

function Buttons() {
  return (
    <nav className="box-border content-center flex flex-wrap gap-[24px] items-center overflow-visible p-0 relative shrink-0" data-name="Buttons">
      <Link to={`/signup`} style={{textDecoration: 'none'}}>
        <div className="flex flex-col font-['Inter:Medium',_sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-black text-nowrap tracking-[-0.08px]">
          <p className="leading-[1.45] whitespace-pre">SIGN UP</p>
        </div>
      </Link>
      <PrimaryButton />
    </nav>
  );
}

function Header1() {
  return (
    <header className="relative shrink-0 w-full" data-name="Header 1">
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex items-center justify-between px-[64px] py-[24px] relative w-full">
          <Company1 />
          <Buttons />
        </div>
      </div>
    </header>
  );
}

function Text() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-center leading-[0] relative shrink-0 text-center w-full" data-name="Text">
      <div className="flex flex-col font-['Inter:Bold',_sans-serif] font-bold justify-center min-w-full not-italic relative shrink-0 text-[#2b2b2b] text-[64px] tracking-[-1.6px]" style={{ width: "min-content" }}>
        <h1 className="block leading-[1.1]">Learn, Play, and Grow with Emotional Intelligence</h1>
      </div>
      <div className="flex flex-col font-['Inter:Italic',_sans-serif] font-normal italic justify-center relative shrink-0 text-[24px] text-[rgba(0,0,0,0.55)] tracking-[-0.12px] w-[729px]">
        <p className="leading-[1.45]">A science-based platform that turns emotional learning into engaging, interactive progress - designed for professionals, educators, and lifelong learners.</p>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="rise h-[356px] relative shrink-0 w-full" data-name="Hero">
      <div className="flex flex-col items-center relative size-full">
        <div className="box-border content-stretch flex flex-col gap-[48px] h-[356px] items-center px-[64px] py-[62px] relative w-full">
          <Text />
        </div>
      </div>
    </section>
  );
}

function PrimaryButton1() {
  return (
    <div className="bg-[#3c6e91] box-border content-stretch flex gap-[8px] items-center justify-center px-[16px] py-[12px] relative rounded-[12px] shrink-0" data-name="Primary button">
      <div className="flex flex-col font-['Inter:Medium',_sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-center text-nowrap text-white tracking-[-0.09px]">
        <p className="leading-[1.45] whitespace-pre">Begin Your Journey</p>
      </div>
    </div>
  );
}

function SecondaryButton() {
  return (
    <div className="box-border content-stretch flex gap-[8px] items-center justify-center px-[16px] py-[12px] relative rounded-[12px] shrink-0" data-name="Secondary button">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(0,0,0,0.15)] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="flex flex-col font-['Inter:Medium',_sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#2b2b2b] text-[18px] text-nowrap tracking-[-0.09px]">
        <p className="leading-[1.45] whitespace-pre">Instructions</p>
      </div>
    </div>
  );
}

function Buttons1() {
  return (
    <div className="content-center flex flex-wrap gap-[16px] items-center relative shrink-0" data-name="Buttons">
      <Link to={`/signup`} style={{textDecoration: 'none'}}>
        <PrimaryButton1 />
      </Link>
      
      <Link to={`/instructions`} style={{textDecoration: 'none'}}>
        <SecondaryButton />
      </Link>
    </div>
  );
}

function Image() {
  return (
    <section className="rise h-[716px] relative shrink-0 w-full" data-name="Image">
      <div className="flex flex-col items-center justify-center relative size-full">
        <div className="box-border content-stretch flex flex-col gap-[57px] h-[716px] items-center justify-center px-[64px] py-0 relative w-full">
          <Buttons1 />
          <div className="h-[542px] relative rounded-[40px] shadow-[0px_4px_20.8px_7px_rgba(0,0,0,0.25)] shrink-0 w-full" data-name="LandingPageImage">
            <img alt="Landing detail" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[40px] size-full" src={imgLandingPageImage} />
          </div>
        </div>
      </div>
    </section>
  );
}

function TextBlock1() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-[16px] grow items-start min-h-px min-w-[324px] pb-0 pt-[24px] px-0 relative shrink-0" data-name="Text block 1">
      <div aria-hidden="true" className="absolute border-[1px_0px_0px] border-[rgba(0,0,0,0.15)] border-solid inset-0 pointer-events-none" />
      <div className="font-['Inter:Bold',_sans-serif] font-bold leading-[0] not-italic relative shrink-0 text-[#2b2b2b] text-[24px] text-nowrap tracking-[-0.48px]">
        <p className="leading-none whitespace-pre">Interactive Emotional Quests</p>
      </div>
      <div className="flex flex-col font-['Inter:Medium',_sans-serif] font-medium justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[16px] text-[rgba(0,0,0,0.55)] tracking-[-0.08px]" style={{ width: "min-content" }}>
        <p className="leading-[1.45]">Engage in guided scenarios where the system generates prompts and asks you thought-provoking questions. Your responses influence your happiness level, resilience, and emotional balance, making learning both immersive and personal.</p>
      </div>
    </div>
  );
}

function TextBlock2() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-[16px] grow items-start min-h-px min-w-[324px] pb-0 pt-[24px] px-0 relative shrink-0" data-name="Text block 2">
      <div aria-hidden="true" className="absolute border-[1px_0px_0px] border-[rgba(0,0,0,0.15)] border-solid inset-0 pointer-events-none" />
      <div className="font-['Inter:Bold',_sans-serif] font-bold leading-[0] not-italic relative shrink-0 text-[#2b2b2b] text-[24px] text-nowrap tracking-[-0.48px]">
        <p className="leading-none whitespace-pre">Real-Time Emotional Stats</p>
      </div>
      <div className="flex flex-col font-['Inter:Medium',_sans-serif] font-medium justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[16px] text-[rgba(0,0,0,0.55)] tracking-[-0.08px]" style={{ width: "min-content" }}>
        <p className="leading-[1.45]">Track your growth with a dynamic dashboard. See how your decisions impact your happiness, stress, and self-awareness, turning emotional learning into measurable progress.</p>
      </div>
    </div>
  );
}

function TextBlock3() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-[16px] grow items-start min-h-px min-w-[324px] pb-0 pt-[24px] px-0 relative shrink-0" data-name="Text block 3">
      <div aria-hidden="true" className="absolute border-[1px_0px_0px] border-[rgba(0,0,0,0.15)] border-solid inset-0 pointer-events-none" />
      <div className="font-['Inter:Bold',_sans-serif] font-bold leading-[0] not-italic relative shrink-0 text-[#2b2b2b] text-[24px] text-nowrap tracking-[-0.48px]">
        <p className="leading-none whitespace-pre">Smart Knowledge Highlights</p>
      </div>
      <div className="flex flex-col font-['Inter:Medium',_sans-serif] font-medium justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[16px] text-[rgba(0,0,0,0.55)] tracking-[-0.08px]" style={{ width: "min-content" }}>
        <p className="leading-[1.45]">Confused by a concept? Key terms are automatically highlighted in context, with clear explanations shown on the side - so you never miss an opportunity to learn.</p>
      </div>
    </div>
  );
}

function TextBlock() {
  return (
    <div className="rise relative shrink-0 w-full" data-name="Text block">
      <div className="relative size-full">
        <div className="box-border content-stretch flex gap-[48px] items-start px-[42px] py-0 relative w-full">
          <TextBlock1 />
          <TextBlock2 />
          <TextBlock3 />
        </div>
      </div>
    </div>
  );
}

function Features() {
  return (
    <section className="rise bg-[rgba(0,0,0,0.02)] box-border content-stretch flex flex-col gap-[48px] h-[369px] items-start overflow-clip px-0 py-[19px] relative shrink-0 w-[1280px]" data-name="Features">
      <div className="flex flex-col font-['Inter:Bold',_sans-serif] font-bold h-[75px] justify-center leading-[0] not-italic relative shrink-0 text-[#2b2b2b] text-[64px] text-center tracking-[-0.32px] w-full">
        <p className="leading-[1.45]">Features</p>
      </div>
      <TextBlock />
    </section>
  );
}

function Text1() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start leading-[0] not-italic relative shrink-0 w-full" data-name="Text">
      <div className="flex flex-col font-['Inter:Bold',_sans-serif] font-bold justify-center relative shrink-0 text-[#2b2b2b] text-[36px] tracking-[-0.72px] w-full">
        <h2 className="block leading-[1.2]">Unlock Emotional Intelligence, Elevate Your Life</h2>
      </div>
      <div className="flex flex-col font-['Inter:Medium',_sans-serif] font-medium justify-center relative shrink-0 text-[18px] text-[rgba(0,0,0,0.55)] tracking-[-0.09px] w-full">
        <p className="leading-[1.45]">Master the skills that matter most - resilience, empathy, and self-awareness. Our science-based, gamified platform transforms emotional learning into daily growth.</p>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#3c6e91] box-border content-stretch flex gap-[8px] items-center justify-center px-[16px] py-[12px] relative rounded-[12px] shrink-0" data-name="Button">
      <div className="flex flex-col font-['Inter:Medium',_sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-center text-nowrap text-white tracking-[-0.09px]">
        <p className="leading-[1.45] whitespace-pre">SIGN UP</p>
      </div>
    </div>
  );
}

function Content() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[48px] grow h-full items-start justify-center min-h-px min-w-px relative shrink-0" data-name="Content">
      <Text1 />
      <Button />
    </div>
  );
}

function Image1() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[8px] grow h-[432px] items-start min-h-px min-w-px relative shrink-0" data-name="Image">
      <div className="basis-0 grow min-h-px min-w-px relative rounded-[16px] shrink-0 w-full" data-name="Image">
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[16px]">
          <img alt="Product detail" className="absolute h-full left-[7.81%] max-w-none top-0 w-[84.37%]" src={imgImage} />
        </div>
      </div>
    </div>
  );
}

function Row1() {
  return (
    <div className="rise bg-gray-300 box-border content-stretch flex gap-[64px] h-[552px] items-center justify-center pb-[40px] pt-[80px] px-[64px] relative rounded-[40px] shrink-0 w-[1216px]" data-name="Row 1">
      <Content />
      <Image1 />
    </div>
  );
}

function Image2() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[8px] grow h-[432px] items-start min-h-px min-w-px relative shrink-0" data-name="Image">
      <div className="basis-0 grow min-h-px min-w-px relative rounded-[16px] shrink-0 w-full" data-name="Image">
        <img alt="Product detail" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[16px] size-full" src={imgImage1} />
      </div>
    </div>
  );
}

function Text2() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start leading-[0] not-italic relative shrink-0 w-full" data-name="Text">
      <div className="flex flex-col font-['Inter:Bold',_sans-serif] font-bold justify-center relative shrink-0 text-[#2b2b2b] text-[36px] tracking-[-0.72px] w-full">
        <h2 className="block leading-[1.2]">Level Up Your Emotional Skills</h2>
      </div>
      <div className="flex flex-col font-['Inter:Medium',_sans-serif] font-medium justify-center relative shrink-0 text-[18px] text-[rgba(0,0,0,0.55)] tracking-[-0.09px] w-full">
        <p className="leading-[1.45]">Turn emotional education into an interactive experience. Track progress, earn milestones, and build lasting habits with tools grounded in psychology.</p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#3c6e91] box-border content-stretch flex gap-[8px] items-center justify-center px-[16px] py-[12px] relative rounded-[12px] shrink-0" data-name="Button">
      <div className="flex flex-col font-['Inter:Medium',_sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-center text-nowrap text-white tracking-[-0.09px]">
        <p className="leading-[1.45] whitespace-pre">Begin Learning</p>
      </div>
    </div>
  );
}

function Content1() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[48px] grow h-full items-start justify-center min-h-px min-w-px relative shrink-0" data-name="Content">
      <Text2 />
      <Button1 />
    </div>
  );
}

function Row2() {
  return (
    <div className="rise bg-gray-300 box-border content-stretch flex gap-[64px] items-center justify-center pb-[80px] pt-[40px] px-[64px] relative rounded-[40px] shrink-0 w-[1216px]" data-name="Row 2">
      <Image2 />
      <div className="basis-0 flex flex-row grow items-center self-stretch shrink-0">
        <Content1 />
      </div>
    </div>
  );
}

function Feature() {
  return (
    <section className="h-[1106px] relative shrink-0 w-full" data-name="Feature">
      <div className="flex flex-col items-center relative size-full">
        <div className="box-border content-stretch flex flex-col gap-[50px] h-[1106px] items-center px-[30px] py-[34px] relative w-full">
          <Row1 />
          <Row2 />
        </div>
      </div>
    </section>
  );
}

function TextBlock4() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-[16px] grow items-start min-h-px min-w-[324px] pb-0 pt-[24px] px-0 relative shrink-0" data-name="Text block 1">
      <div aria-hidden="true" className="absolute border-[1px_0px_0px] border-[rgba(0,0,0,0.15)] border-solid inset-0 pointer-events-none" />
      <div className="font-['Inter:Bold',_sans-serif] font-bold leading-[0] not-italic relative shrink-0 text-[#2b2b2b] text-[24px] text-nowrap tracking-[-0.48px]">
        <p className="leading-none whitespace-pre">Growth-Oriented</p>
      </div>
      <div className="flex flex-col font-['Inter:Medium',_sans-serif] font-medium justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[16px] text-[rgba(0,0,0,0.55)] tracking-[-0.08px]" style={{ width: "min-content" }}>
        <p className="leading-[1.45]">Emotional growth isn’t a destination - it’s a journey. With our platform, you’ll learn, practice, and progress every day. Start small, stay consistent, and watch your mindset transform.</p>
      </div>
    </div>
  );
}

function TextBlock5() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-[16px] grow items-start min-h-px min-w-[324px] pb-0 pt-[24px] px-0 relative shrink-0" data-name="Text block 2">
      <div aria-hidden="true" className="absolute border-[1px_0px_0px] border-[rgba(0,0,0,0.15)] border-solid inset-0 pointer-events-none" />
      <div className="font-['Inter:Bold',_sans-serif] font-bold leading-[0] not-italic relative shrink-0 text-[#2b2b2b] text-[24px] text-nowrap tracking-[-0.48px]">
        <p className="leading-none whitespace-pre">Professional Confidence</p>
      </div>
      <div className="flex flex-col font-['Inter:Medium',_sans-serif] font-medium justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[16px] text-[rgba(0,0,0,0.55)] tracking-[-0.08px]" style={{ width: "min-content" }}>
        <p className="leading-[1.45]">Whether you’re a student, professional, or lifelong learner, emotional intelligence is the skill that sets you apart. Build resilience, empathy, and self-awareness with tools that actually make learning engaging.</p>
      </div>
    </div>
  );
}

function TextBlock6() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-[16px] grow items-start min-h-px min-w-[324px] pb-0 pt-[24px] px-0 relative shrink-0" data-name="Text block 3">
      <div aria-hidden="true" className="absolute border-[1px_0px_0px] border-[rgba(0,0,0,0.15)] border-solid inset-0 pointer-events-none" />
      <div className="font-['Inter:Bold',_sans-serif] font-bold leading-[0] not-italic relative shrink-0 text-[#2b2b2b] text-[24px] text-nowrap tracking-[-0.48px]">
        <p className="leading-none whitespace-pre">Human Connection</p>
      </div>
      <div className="flex flex-col font-['Inter:Medium',_sans-serif] font-medium justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[16px] text-[rgba(0,0,0,0.55)] tracking-[-0.08px]" style={{ width: "min-content" }}>
        <p className="leading-[1.45]">We believe everyone deserves the tools to understand themselves and connect deeply with others. Begin your path to a more balanced, happier life - one decision at a time</p>
      </div>
    </div>
  );
}

function TextBlock7() {
  return (
    <div className="rise content-stretch flex gap-[48px] items-start relative shrink-0 w-full" data-name="Text block">
      <TextBlock4 />
      <TextBlock5 />
      <TextBlock6 />
    </div>
  );
}

function TextRow() {
  return (
    <section className="bg-[rgba(0,0,0,0.02)] h-[358px] relative shrink-0 w-full" data-name="Text row">
      <div className="overflow-clip relative size-full">
        <div className="box-border content-stretch flex flex-col gap-[48px] h-[358px] items-start px-[64px] py-[120px] relative w-full">
          <TextBlock7 />
        </div>
      </div>
    </section>
  );
}

function Image3() {
  return (
    <div className="relative rounded-[8px] shrink-0 size-[55px]" data-name="Image">
      <img alt="Logomark" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[8px] size-full" src={imgLogo} />
    </div>
  );
}

function Company2() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Company">
      <Image3 />
      <div className="flex flex-col font-['Inter:Semi_Bold',_sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[20px] text-black text-center text-nowrap tracking-[-0.4px]">
        <p className="leading-[1.45] whitespace-pre">Pluralia</p>
      </div>
    </div>
  );
}

function Nav() {
  return (
    <nav className="box-border content-stretch flex font-['Inter:Medium',_sans-serif] font-medium gap-[32px] items-start leading-[0] not-italic overflow-visible p-0 relative shrink-0 text-[20px] text-[rgba(0,0,0,0.55)] text-nowrap tracking-[-0.1px]" data-name="Nav">
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="leading-[1.45] text-nowrap whitespace-pre">Features</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="leading-[1.45] text-nowrap whitespace-pre">Learn more</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="leading-[1.45] text-nowrap whitespace-pre">Support</p>
      </div>
    </nav>
  );
}

function Text3() {
  return (
    <div className="content-stretch flex gap-[32px] items-center justify-center relative shrink-0" data-name="Text">
      <Company2 />
      <Nav />
    </div>
  );
}

function SocialLink1() {
  return (
    <nav className="block relative shrink-0 size-[24px]" data-name="Social link 1">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g clipPath="url(#clip0_4_299)" id="Social link 1">
          <path d={svgPaths.p3c382d72} fill="var(--fill-0, black)" fillOpacity="0.45" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_4_299">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </nav>
  );
}

function SocialLink2() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Social link 2">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g clipPath="url(#clip0_4_305)" id="Social link 2">
          <g id="Vector">
            <path clipRule="evenodd" d={svgPaths.p1fcf5070} fill="black" fillOpacity="0.45" fillRule="evenodd" />
            <path d={svgPaths.pe7ea00} fill="var(--fill-0, white)" />
            <path d={svgPaths.p1ab31680} fill="var(--fill-0, white)" />
            <path d={svgPaths.p28c6df0} fill="var(--fill-0, white)" />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_4_305">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function SocialLink3() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Social link 3">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Social link 3">
          <path d={svgPaths.pdaf0200} fill="var(--fill-0, black)" fillOpacity="0.45" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function SocialLinks() {
  return (
    <nav className="box-border content-stretch flex gap-[24px] items-center overflow-visible p-0 relative shrink-0" data-name="Social links">
      <SocialLink1 />
      <SocialLink2 />
      <SocialLink3 />
    </nav>
  );
}

function Footer() {
  return (
    <footer className="relative shrink-0 w-full" data-name="Footer">
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex items-center justify-between px-[64px] py-[21px] relative w-full">
          <Text3 />
          <SocialLinks />
        </div>
      </div>
    </footer>
  );
}

function Container() {
  return (
    <main className="box-border content-stretch flex flex-col items-start overflow-visible p-0 relative shrink-0 w-[1280px] mx-auto" data-name="Container" tabIndex="-1">
      <Header1 />
      <Hero />
      <Image />
      <Features />
      <Feature />
      <TextRow />
      <Footer />
    </main>
  );
}

const LandingPage = ({user}) => {
  
  const navigate = useNavigate()

  useEffect(() => {
    if (user){
      navigate('/dashboard')
      console.log('workin')
    }
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".rise").forEach((el) => {
      observer.observe(el);
    });

    // Cleanup on unmount
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-[#f8f5f2] content-stretch flex flex-col items-start relative size-full" data-name="Desktop">
          <Container />
    </div>
  )
}

export default LandingPage