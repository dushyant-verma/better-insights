"use client";

import React from "react";
import CorePullCordLamp, { PullCord as CorePullCord } from "./pull-cord-lamp-core";

export interface PullCordLampProps {
  on?: boolean;
  defaultOn?: boolean;
  onChange?: (on: boolean) => void;
  size?: "sm" | "md" | "lg" | "fill";
  shade?: "dome" | "tube" | "bare";
  bulb?: "clear" | "frosted";
  finish?: "theme" | "auto" | "aluminium" | "graphite";
  warmth?: number;
  cord?: number;
  light?: number;
  label?: string;
  sound?: boolean;
  target?: HTMLElement | string | null;
  className?: string;
  style?: React.CSSProperties;
}

const TypedLamp = CorePullCordLamp as unknown as React.ComponentType<PullCordLampProps>;

export const PullCordLamp: React.FC<PullCordLampProps> = (props) => {
  return <TypedLamp {...props} />;
};

export const PullCord = CorePullCord;
export default PullCordLamp;
