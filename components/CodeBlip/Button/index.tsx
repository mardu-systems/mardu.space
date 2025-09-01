'use client'
import {GradientBorderPulsing} from '../../icons/GradientBorderIcon/GradientBorderIcon'
import {GradientBorderIcon} from '../../icons/GradientBorderIcon/GradientBorderIcon'
import {Plus} from 'lucide-react'
import {motion, cubicBezier} from 'framer-motion'
import React from 'react'

import type {CodeBlip} from '../types'

import {useCodeBlip} from '../CodeBlipContext'

const CodeBlipButton: React.FC<{ blip: CodeBlip; delay?: number; index?: number }> = ({
                                                                                          blip,
                                                                                          delay: delayFromProps = 500,
                                                                                          index = 1,
                                                                                      }) => {
    const {isOpen, openModal} = useCodeBlip()

    const delay = (delayFromProps * index) / 1000 // seconds for framer-motion
    const easing = cubicBezier(0.165, 0.84, 0.44, 1)
    const style = {['--animation-delay' as any]: `${delayFromProps * index}ms`} as React.CSSProperties

    return (
        <button
            aria-pressed={isOpen}
            onClick={() => openModal(blip)}
            style={style}
            className={[
                // base button
                'relative inline-flex items-center justify-center rounded-full p-3',
                'transition-all duration-300 ease-[cubic-bezier(0.165,0.84,0.44,1)]',
                // positioning (was absolute near heading). Leave positioning to parent; consumers can wrap.
                // enter animation
                'opacity-100 scale-100',
                isOpen ? 'pointer-events-none opacity-0 scale-0' : '',
                'group',
            ].join(' ')}
        >
            <span className="sr-only">Code feature</span>

            {/* background on hover */}
            <span
                className="absolute inset-0 -z-10 rounded-full bg-background/60 opacity-0 scale-0 transition-all duration-300 ease-[cubic-bezier(0.165,0.84,0.44,1)] group-hover:opacity-25 group-hover:scale-100"
            />

            {/* icon in center */}
            <span
                className="relative z-10 inline-flex items-center justify-center rounded-full border border-border bg-background text-foreground">
                <Plus className="size-[1.1rem]"/>
            </span>

            {/* decorative gradient ring + pulses */}
            <GradientBorderIcon className="pointer-events-none absolute inset-0 opacity-80"/>
            <GradientBorderPulsing className="" delaySec={delay} showStaticRing={false}/>
        </button>
    )
}

export default CodeBlipButton
